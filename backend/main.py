from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from database import engine, Base
from routes import usuarios, rutinas, progreso

Base.metadata.create_all(bind=engine)

app = FastAPI(title="🏋️ API Gimnasio", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )

app.include_router(usuarios.router)
app.include_router(rutinas.router)
app.include_router(progreso.router)

@app.get("/")
def root():
    return {"mensaje": "API Gimnasio funcionando ✅"}