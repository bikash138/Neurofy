from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.db.models import Note
from src.db.db import get_db
from openai import OpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_qdrant import QdrantVectorStore
import os
load_dotenv()

app = FastAPI()
client = OpenAI()

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.post("/ai-server")
async def test_endpoint(data: dict, db:AsyncSession = Depends(get_db)):
    print("Ingestion Done")
    return JSONResponse(
        status_code=201,
        content={
            "success": "true",
            "message": "Embeddings stored in Qdrant successfully",
            "note_id": data,
        },
    )


# @app.post("/ai-server")
# async def convert_to_vector_embeddings(data: dict, db: AsyncSession = Depends(get_db)):
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
        
        page_content = f"{neuro.title}\n{neuro.content or ''}"

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

        print("Embedding Done")
        print("Saving to Qdrant")
        await QdrantVectorStore.from_documents(
            [document], 
            embeddings,
            {
                "url": "http://localhost:6333",
                "collection_name": "neurofy", 
            },
        )
        print("Ingestion Done")
        return JSONResponse(
            status_code=201,
            content={
                "success": "true",
                "message": "Embeddings stored in Qdrant successfully",
                "note_id": neuro.id,
            },
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))