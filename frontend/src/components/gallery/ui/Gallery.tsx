import useGallery from "../../../entities/gallery/model/useGallery";

function getFolder({ path }: { path: string }) {
  // Стереть с конца .png
  const folder = path.slice(0, -4);
  console.log(folder);
  return folder;
}
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
    <div className="gallery relative min-h-0 overflow-hidden mr-2">
      <img src={currentImageUrl} alt={currentImage.name} className="absolute h-full w-full object-contain pb-5" />
      <p className="absolute bottom-0 text-[14px] text-white">{getFolder(currentImage)}</p>
    </div>
  );
}
