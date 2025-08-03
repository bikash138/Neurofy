from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.post("/ai-server")
async def test(request: Request):
    data = await request.json()
    response =  {
        "status": "success",
        "message": f"Received: {data}",
        "response": "This is a response from the Python server"
    }
    print(f"Response object: {response}") 
    return response 