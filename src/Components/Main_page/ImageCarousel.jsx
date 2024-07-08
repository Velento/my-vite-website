import React from 'react';
import './ImageCarousel.css';

import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

const ImageCarousel = () => {
  // Массив с изображениями
  const images = [image1, image2, image3];

  // Обработчик клика по изображению
  const handleClick = (image) => {
    // Здесь можно добавить логику для открытия изображения в полноразмерном режиме или другие действия
    console.log('Clicked image:', image);
  };

  return (
    <div className="image-carousel">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          onClick={() => handleClick(image)}
          className="carousel-image"
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
