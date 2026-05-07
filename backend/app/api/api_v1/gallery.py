from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

import os
from datetime import datetime
from typing import List

from core.config import settings
from schemas.gallery import GalleryImage

router = APIRouter(prefix=settings.api.v1.photo, tags=["Gallery"])

PHOTOS_ROOT = "/app/photos"
TARGET_FOLDER = "1"


def collect_images(root_path: str, base_path_for_url: str = ""):
    images = []

    full_path = os.path.join(PHOTOS_ROOT, root_path)

    for index, entry in enumerate(sorted(os.listdir(full_path)), start=1):
        entry_full = os.path.join(full_path, entry)
        rel_path = os.path.join(
            base_path_for_url, entry) if base_path_for_url else entry
        if os.path.isdir(entry_full):
            images.extend(collect_images(
                os.path.join(root_path, entry), rel_path))
        else:
            if entry.lower().endswith(('.jpg', '.jpeg', '.png')):
                stat = os.stat(entry_full)
                images.append({
                    "id": index,
                    "path": rel_path,
                    "name": entry,
                    "last_created": datetime.fromtimestamp(stat.st_mtime),
                })

    return images


@router.get("/list", response_model=List[GalleryImage])
async def list_photos():
    folder_full = os.path.join(PHOTOS_ROOT, TARGET_FOLDER)

    if not os.path.isdir(folder_full):
        raise HTTPException(404, "Папка не найдена")
    images = collect_images(TARGET_FOLDER)

    return images


@router.get("/{path:path}", response_class=FileResponse)
async def get_image(path: str):
    safe_path = os.path.normpath(path).lstrip('/')
    if '..' in safe_path or safe_path.startswith('/'):
        raise HTTPException(403, "Запрещённый путь")

    full_path = os.path.join(PHOTOS_ROOT, TARGET_FOLDER, safe_path)
    if not os.path.isfile(full_path):
        raise HTTPException(404, "Изображение не найдено")

    return FileResponse(full_path)
