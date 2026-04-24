import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import router as api_router
from core import settings


main_app = FastAPI()
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
main_app.include_router(
    api_router,
)


if __name__ == "__main__":
    uvicorn.run("main:main_app", host=settings.run.host,
                port=settings.run.port, reload=True)
