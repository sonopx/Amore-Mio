import React, { useState, useEffect } from "react";
import "./AutoCarousel.css";

const photos = Array.from({ length: 14 }, (_, i) => `/fotos/${i + 1}.jpeg`);

export function AutoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auto-carousel-container">
      <div className="auto-carousel-track">
        {/* Foto anterior (esquerda) */}
        <div className="side-photo left">
          <img
            src={photos[(currentIndex - 1 + photos.length) % photos.length]}
            alt="Foto anterior"
          />
        </div>

        {/* Foto central - sem borda, com hover */}
        <div className="center-photo">
          <img 
            src={photos[currentIndex]} 
            alt="Foto atual" 
            className="center-image" 
          />
        </div>

        {/* Próxima foto (direita) */}
        <div className="side-photo right">
          <img
            src={photos[(currentIndex + 1) % photos.length]}
            alt="Próxima foto"
          />
        </div>
      </div>
    </div>
  );
}