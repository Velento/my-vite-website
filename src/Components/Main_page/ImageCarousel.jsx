import './ImageCarousel.css';

import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

/** @type {string[]} Carousel image sources */
const CAROUSEL_IMAGES = [image1, image2, image3];

/**
 * Horizontal image carousel with snap scrolling.
 */
const ImageCarousel = () => {
  return (
    <div className="image-carousel">
      {CAROUSEL_IMAGES.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className="carousel-image"
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
