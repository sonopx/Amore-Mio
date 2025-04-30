import './App.css';
import React, { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { FloatingHearts } from "./components/FloatingHearts";
import { AutoCarousel } from "./components/AutoCarousel";
import { MusicPlayer } from "./components/MusicPlayer";
import { QuestionBox } from "./components/QuestionBox";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { LoveTextSection } from "./components/LoveTextSection";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: "'Montserrat', sans-serif"
    }}>
      {/* Fundo com corações */}
      <FloatingHearts />

      {/* Gradiente escuro de fundo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)'
      }} />

      {/* Logo de coração no canto superior esquerdo */}
      <img
        src="/logo-coracao.png"
        alt="Logo de Coração"
        className="logo-pulsante"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          zIndex: 3,
          filter: 'drop-shadow(0 0 6px #ff6b81)',
        }}
      />

      {/* Conteúdo principal */}
      <div style={{ 
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        color: 'white'
      }}>
        {isLoading && <LoadingScreen />}

        {/* Spotify player no topo direito */}
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 3
        }}>
          <SpotifyPlayer />
        </div>

        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(4px)'
        }}>
          {/* Cabeçalho */}
          <div style={{
            marginBottom: '40px',
            animation: 'fadeIn 1s ease-out'
          }}>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: 'transparent',
              background: 'linear-gradient(45deg, #ff6b81, #ffb8c6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              margin: '0 auto 20px',
              fontWeight: 700,
              letterSpacing: '1px',
              lineHeight: 1.2,
              paddingBottom: '15px',
              position: 'relative',
              display: 'inline-block'
            }}>
              Nosso Amor em Cada Detalhe
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, #ff6b81, transparent)',
                borderRadius: '3px'
              }} />
            </h1>
            
            <p style={{ 
              maxWidth: '600px', 
              margin: '0 auto',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              lineHeight: 1.8,
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.9)',
              position: 'relative',
              padding: '20px 0'
            }}>
              <span style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                fontSize: '2.5rem',
                color: '#ff6b81',
                lineHeight: 0.5
              }}>"</span>
              
              Desde o primeiro momento, soube que você era especial. Cada riso, cada olhar, cada momento ao seu lado é um sentimento inexplicável.
              
              <span style={{
                position: 'absolute',
                bottom: 0,
                right: '20%',
                fontSize: '2.5rem',
                color: '#ff6b81',
                lineHeight: 0.5
              }}>"</span>
            </p>
          </div>

          <div style={{ 
            width: '100%', 
            maxWidth: '800px', 
            margin: '40px auto',
            minHeight: '400px'
          }}>
            <AutoCarousel />
          </div>
          
          <div style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 2
          }}>
            <LoveTextSection />
          </div>

          <div style={{ marginTop: '60px' }}>
            <QuestionBox />
          </div>
        </div>

        <MusicPlayer />
      </div>
    </div>
  );
}
