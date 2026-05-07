import { useEffect, useMemo, useState } from "react";

import { getGallery, getPhotoUrl } from "../api/get_photo";
import type { GalleryImage } from "./types";

export default function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getGallery()
      .then((data) => {
        if (ignore) return;
        setImages(data);
        setError(null);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err instanceof Error ? err.message : "Gallery load failed");
      })
      .finally(() => {
        if (ignore) return;
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 20000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images]);

  const currentImage = images[currentIndex] ?? null;

  const currentImageUrl = useMemo(() => {
    if (!currentImage) return null;
    return getPhotoUrl(currentImage.path);
  }, [currentImage]);

  return {
    images,
    currentIndex,
    currentImage,
    currentImageUrl,
    isLoading,
    error,
    setCurrentIndex,
  };
}
