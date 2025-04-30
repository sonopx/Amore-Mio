import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Howl } from "howler";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/musica.mpeg"],
      onend: () => setIsPlaying(false),
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      soundRef.current?.pause();
    } else {
      soundRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "rgba(0,0,0,0.7)",
      padding: "10px",
      borderRadius: "10px",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}>
      <button onClick={togglePlay} style={{ background: "none", border: "none", color: "white" }}>
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
      <p>Tocando agora: Nossa Música</p>
    </div>
  );
}