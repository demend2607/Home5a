import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import router as api_router
from core import settings
from services.ha_client import HAClient

ha_client = HAClient(settings.ha.home_url, settings.ha.api_token)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ha_client.start()
    app.state.ha_client = ha_client
    yield
    await ha_client.stop()

main_app = FastAPI(lifespan=lifespan)
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
