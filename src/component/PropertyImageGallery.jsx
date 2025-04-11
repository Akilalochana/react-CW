import React from 'react';
import ImageGallery from 'react-image-gallery'; // Import the actual gallery component
// import 'react-image-gallery/styles/css/image-gallery.css'; // Import styles
import "./PropertyImageGallery.css";

const PropertyImageGallery = ({ images }) => {
  const galleryImages = images.map((image, index) => ({
    original: image.src,
    thumbnail: image.src,
    description: image.alt || `Image ${index + 1}`,
  }));

  return (
    <div className="max-w-2xl mx-auto"> {/* Container with max width */}
      <ImageGallery 
        items={galleryImages}
        showPlayButton={false}  // Remove play button for cleaner look
        showFullscreenButton={true}
        thumbnailPosition="bottom"
        showNav={true}
        showBullets={false}
        additionalClass="property-gallery"
      />
    </div>
  );
};

export default PropertyImageGallery;
