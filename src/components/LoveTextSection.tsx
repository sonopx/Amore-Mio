import React from "react";
import "./LoveTextSection.css";

export function LoveTextSection() {
  return (
    <div className="text-container">
      <h2 className="title">Para o Amor da Minha Vida</h2>
      
      <div className="text-content">
        <p className="paragraph fade-in">
          Desde que você entrou na minha vida, tudo ganhou mais cor, mais sentido e mais propósito. 
          Ver o brilho nos seus olhos e a força com que você enfrenta o mundo me faz admirar você todos os dias.
        </p>

        <p className="paragraph fade-in delay-1">
          Tenho um orgulho imenso da mulher incrível que você é - dedicada, carinhosa e com um coração gigante.
          Como enfermeira, você cuida de tantas vidas com amor e coragem, mesmo nos dias mais difíceis.
        </p>

        <p className="paragraph fade-in delay-2">
          Eu te amo com uma intensidade que mal cabe em palavras. E mais do que isso, eu sonho em construir 
          uma vida ao seu lado. Quero formar uma família com você, viver nossos dias com amor, respeito e 
          muitos sorrisos.
        </p>

        <div className="signature fade-in delay-3">
          <p>Obrigado por existir 💖</p>
        </div>
      </div>
    </div>
  );
}