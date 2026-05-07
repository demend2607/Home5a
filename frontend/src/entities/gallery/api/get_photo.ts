import { env } from "../../../shared/config/env";

import { api } from "../../../shared/api/api-client";
import type { GalleryImage } from "../model/types";

export async function getGallery() {
  return await api.get<GalleryImage[]>("/photo/list");
}

export function getPhotoUrl(path: string) {
  const safePath = path.split("/").map(encodeURIComponent).join("/");
  return `${env.apiUrl}/api/v1/photo/${safePath}`;
}
