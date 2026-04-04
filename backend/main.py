from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import usuarios, rutinas, progreso

Base.metadata.create_all(bind=engine)

app = FastAPI(title="🏋️ API Gimnasio", version="1.0.0")

@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(rutinas.router)
app.include_router(progreso.router)

@app.get("/")
def root():
    return {"mensaje": "API Gimnasio funcionando ✅"}