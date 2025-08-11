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
import asyncio
load_dotenv()

app = FastAPI()
client = OpenAI()

@app.get("/")
async def root():
    return {"message": "Hello, World!"}


def extract_text(doc):
    result = []

    for block in doc.get("content",[]):
        for node in block.get("content",[]):
            text = node.get("text", '')
            if text:
                result.append(text)
    return ("\n".join(result))



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
        
        print("Saving to Qdrant")
        try:
            QdrantVectorStore.from_documents(
                [document], 
                embeddings,
                url="http://localhost:6333",
                collection_name="neurofy",
                vector_name="dense-vector"
            )
        except asyncio.TimeoutError:
            print("Qdrant upsert timed out!")
            raise HTTPException(status_code=504, detail="Qdrant upsert timed out")
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
            },
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))