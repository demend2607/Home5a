import useGallery from "../../../entities/gallery/model/useGallery";

export default function Gallery() {
  const { currentImage, currentImageUrl, isLoading, error } = useGallery();

  if (isLoading) {
    return <div className="gallery">Loading photo...</div>;
  }

  if (error) {
    return <div className="gallery">Error: {error}</div>;
  }

  if (!currentImage || !currentImageUrl) {
    return <div className="gallery">No photos</div>;
  }

  return (
    <div className="gallery relative h-full overflow-hidden mr-2">
      <img src={currentImageUrl} alt={currentImage.name} className="absolute h-full w-full object-contain" />
    </div>
  );
}
