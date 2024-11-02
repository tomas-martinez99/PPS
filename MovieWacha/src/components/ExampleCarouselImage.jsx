import React from 'react';

const ExampleCarouselImage = ({ text }) => {
  return (
    <img
      className="d-block w-100"
      src={text}
      alt={text}
      style={{ maxHeight: '560px', objectFit: 'cover' }}
    />
  );
};

export default ExampleCarouselImage;