from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.db.models import Note
from src.db.db import get_db
from src.utils.extract_text import extract_text
from openai import OpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_qdrant import FastEmbedSparse, QdrantVectorStore, RetrievalMode
from qdrant_client import QdrantClient
from fastapi.middleware.cors import CORSMiddleware
import os
load_dotenv()

app = FastAPI()
client = OpenAI()
client= QdrantClient("localhost", port=6333)
sparse_embeddings = FastEmbedSparse(model_name="Qdrant/bm25")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


@app.post("/ai-server")
async def convert_to_vector_embeddings(data: dict, db: AsyncSession = Depends(get_db)):
    try:
        print("Entering to process the note")
        neuroId = data.get("neuroId")
        if not neuroId:
            raise HTTPException(status_code=400, detail="NeuroId is Required")
        
        result = await db.execute(select(Note).where(Note.id == neuroId))
        neuro = result.scalars().first()
        print("Required Note is fetched from DB")

        if not neuro:
            raise HTTPException(status_code=404, detail="Neuro not found")
        
        print("Extracting Text")
        plain_text = extract_text(neuro.content)
        
        page_content = f"{neuro.title}\n{plain_text or ''}"

        document = Document(
            page_content=page_content,
            metadata={
                "id": neuro.id,
                "title": neuro.title,
                "user_id": neuro.userId,
                "created_at": neuro.createdAt,
                "updated_at": neuro.updatedAt,
            },
        )
        print("Document Creation Done")

        embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small",
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )

        print("Checking for pre existing Qdrant data")
        try:
            client.delete(
                collection_name="neurofy",
                points_selector=[neuroId]
            )
        except Exception as e:
            print("Qdrant Cheking failed:", e)
            raise

        print("Inserting the new embddings")
        try:
            QdrantVectorStore.from_documents(
                [document], 
                embeddings,
                url="http://localhost:6333",
                collection_name="neurofy",
                vector_name="dense-vector",
                ids=[neuroId]  
            )
        except Exception as e:
            print("Qdrant upsert failed:", e)
            raise

        print("Ingestion Done")
        return JSONResponse(
            status_code=201,
            content={
                "success": True,
                "message": "Embeddings stored in Qdrant successfully",
                "note_id": neuro.id,
                "title": neuro.title,
                "plain_text": plain_text
            },
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/search")
async def search(data: dict):
    try:
        print("Entering the Search Route")
        embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small",
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        print("Creating qdrant")
        qdrant = QdrantVectorStore(
            client=client,
            collection_name="neurofy",
            embedding=embeddings,
            sparse_embedding=sparse_embeddings,
            retrieval_mode=RetrievalMode.HYBRID,
            vector_name="dense-vector",
            sparse_vector_name="sparse-vector",
        )
        try:
            print("Performing Similarity Search")
            results = qdrant.similarity_search_with_score(data.get("query"))
        except Exception as e:
            print("Qdrant search failed:", e)
            raise
        print("Vector Search completed")
        print(results)
        return JSONResponse(
            status_code=201,
            content={
                "results": [
                    {
                        "metadata": doc.metadata,
                        "score": score
                    }
                    for doc, score in results
                ]
            }
        ) 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))