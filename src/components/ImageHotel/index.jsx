import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const ImageHotel = ({ photos }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const previousImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-44 rounded-l-xl overflow-hidden group">
      <div className="w-full h-full transition-all duration-500 ease-in-out">
        <Image
          alt="Hotel Image"
          className="object-cover transition-opacity duration-500 ease-in-out"
          src={photos[currentImageIndex].url}
          fill
          referrerPolicy="no-referrer"
        />
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 rounded-full p-1"
          >
            <CaretLeft size={18} color="white" weight="bold"/>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 rounded-full p-1"
          >
            <CaretRight size={18} color="white" weight="bold" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageHotel;
