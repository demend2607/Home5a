
from pydantic import BaseModel
from datetime import datetime


class GalleryImage(BaseModel):
    id: int
    path: str
    name: str
    last_created: datetime


class Image(BaseModel):
    path: str
