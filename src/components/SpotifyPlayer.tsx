import React from "react";
import { useState, useEffect, useRef } from "react";

type ButtonStyle = 'spotify' | 'minimal' | 'retro' | 'neon';

interface PlayerProps {
  buttonStyle?: ButtonStyle;
  customPlayIcon?: React.ReactNode;
  customPauseIcon?: React.ReactNode;
}

export function SpotifyPlayer({ 
  buttonStyle = 'minimal',
  customPlayIcon,
  customPauseIcon
}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Estilos dos botões
  const buttonStyles = {
    spotify: {
      playButton: {
        background: "#1DB954",
        color: "white",
        borderRadius: "50%",
        width: "32px",
        height: "32px"
      },
      controlButton: {
        background: "none",
        color: "#b3b3b3"
      },
      volumeColor: "#1DB954"
    },
    minimal: {
      playButton: {
        background: "none",
        color: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(255,255,255,0.7)",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        transition: 'all 0.2s ease'
      },
      controlButton: {
        background: "none",
        color: "rgba(255,255,255,0.7)"
      },
      volumeColor: "rgba(255,255,255,0.7)"
    },
    retro: {
      playButton: {
        background: "#FF6B6B",
        color: "black",
        borderRadius: "4px",
        width: "32px",
        height: "32px"
      },
      controlButton: {
        background: "none",
        color: "#FF6B6B"
      },
      volumeColor: "#FF6B6B"
    },
    neon: {
      playButton: {
        background: "#08fdd8",
        color: "black",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        boxShadow: "0 0 10px #08fdd8"
      },
      controlButton: {
        background: "none",
        color: "#08fdd8"
      },
      volumeColor: "#08fdd8"
    }
  };

  // Estado para controlar hover
  const [hoverStates, setHoverStates] = useState({
    prevButton: false,
    playButton: false,
    nextButton: false,
    volumeSlider: false
  });

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Ícones padrão
  const defaultPlayIcon = (
    <span style={{ fontSize: "12px", marginLeft: "2px" }}>▶</span>
  );
  
  const defaultPauseIcon = (
    <span style={{ fontSize: "12px" }}>⏸</span>
  );

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      width: "300px",
      background: "rgba(25, 25, 25, 0.95)",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    }}>
      <audio
        ref={audioRef}
        src="/musica.mpeg"
        onEnded={() => setIsPlaying(false)}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
        <img 
          src="/capa-album.jpeg" 
          alt="Capa do álbum"
          style={{ 
            width: "50px", 
            height: "50px", 
            borderRadius: "5px",
            objectFit: "cover",
            border: "1px solid rgba(255,255,255,0.1)"
          }} 
        />
        <div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>Está tocando agora:</div>
          <div style={{ fontWeight: "bold", fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>Nossa Música</div>
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <div style={{
          height: "3px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "3px",
          marginBottom: "5px",
          cursor: "pointer"
        }}>
          <div 
            style={{
              height: "100%",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "3px",
              width: `${(currentTime / duration) * 100 || 0}%`
            }} 
          />
        </div>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          fontSize: "11px",
          color: "rgba(255,255,255,0.6)"
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button 
            onMouseEnter={() => setHoverStates({...hoverStates, prevButton: true})}
            onMouseLeave={() => setHoverStates({...hoverStates, prevButton: false})}
            style={{ 
              ...buttonStyles[buttonStyle].controlButton,
              border: "none",
              cursor: "pointer",
              padding: "5px",
              color: hoverStates.prevButton ? "rgba(255,255,255,0.9)" : buttonStyles[buttonStyle].controlButton.color
            }}
          >
            ⏮
          </button>
          
          <button 
            onClick={togglePlay}
            onMouseEnter={() => setHoverStates({...hoverStates, playButton: true})}
            onMouseLeave={() => setHoverStates({...hoverStates, playButton: false})}
            style={{ 
              ...buttonStyles[buttonStyle].playButton,
              border: buttonStyle === 'minimal' ? 
                `1px solid ${hoverStates.playButton ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)"}` : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: hoverStates.playButton ? "rgba(255,255,255,1)" : buttonStyles[buttonStyle].playButton.color
            }}
          >
            {isPlaying 
              ? (customPauseIcon || defaultPauseIcon)
              : (customPlayIcon || defaultPlayIcon)}
          </button>

          <button 
            onMouseEnter={() => setHoverStates({...hoverStates, nextButton: true})}
            onMouseLeave={() => setHoverStates({...hoverStates, nextButton: false})}
            style={{ 
              ...buttonStyles[buttonStyle].controlButton,
              border: "none",
              cursor: "pointer",
              padding: "5px",
              color: hoverStates.nextButton ? "rgba(255,255,255,0.9)" : buttonStyles[buttonStyle].controlButton.color
            }}
          >
            ⏭
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: buttonStyles[buttonStyle].controlButton.color }}>🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setVolume(newVolume);
              if (audioRef.current) audioRef.current.volume = newVolume;
            }}
            onMouseEnter={() => setHoverStates({...hoverStates, volumeSlider: true})}
            onMouseLeave={() => setHoverStates({...hoverStates, volumeSlider: false})}
            style={{
              width: "80px",
              accentColor: buttonStyles[buttonStyle].volumeColor,
              cursor: "pointer",
              opacity: hoverStates.volumeSlider ? 1 : 0.7,
              transition: 'opacity 0.2s'
            }}
          />
        </div>
      </div>
    </div>
  );
}