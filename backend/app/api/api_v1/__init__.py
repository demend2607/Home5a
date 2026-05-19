from fastapi import APIRouter

from core.config import settings
from .health_check import router as health_check_router
from .weather import router as weather_router
from .gallery import router as gallery_router
from .sensor import router as sensor_router
# + need main router


router = APIRouter(prefix=settings.api.v1.prefix)

router.include_router(health_check_router)
router.include_router(weather_router)
router.include_router(gallery_router)
router.include_router(sensor_router)
