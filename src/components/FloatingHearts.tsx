// components/FloatingHearts.tsx
import React, { useState, useEffect } from "react";

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const initialHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 2, // direção horizontal (-1 a 1)
      dy: (Math.random() - 0.5) * 2, // direção vertical (-1 a 1)
      size: Math.random() * 20 + 10,
    }));
    setHearts(initialHearts);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setHearts(prevHearts =>
        prevHearts.map(heart => {
          let newX = heart.x + heart.dx;
          let newY = heart.y + heart.dy;

          // Rebote nas bordas
          let newDx = heart.dx;
          let newDy = heart.dy;

          if (newX < 0 || newX > window.innerWidth) newDx = -newDx;
          if (newY < 0 || newY > window.innerHeight) newDy = -newDy;

          return {
            ...heart,
            x: Math.max(0, Math.min(window.innerWidth, newX)),
            y: Math.max(0, Math.min(window.innerHeight, newY)),
            dx: newDx,
            dy: newDy
          };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleHeartHover = (id: number) => {
    setHearts(prevHearts =>
      prevHearts.map(heart =>
        heart.id === id
          ? { ...heart, dx: heart.dx * 3, dy: heart.dy * 3 }
          : heart
      )
    );

    setTimeout(() => {
      setHearts(prevHearts =>
        prevHearts.map(heart =>
          heart.id === id
            ? { ...heart, dx: heart.dx / 3, dy: heart.dy / 3 }
            : heart
        )
      );
    }, 500);
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    pointerEvents: "none",
    overflow: "hidden",
  };

  const heartStyleBase: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "auto",
    opacity: 0.7,
    cursor: "pointer",
    transition: "transform 0.3s ease",
    userSelect: "none",
  };

  return (
    <div style={containerStyle}>
      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            ...heartStyleBase,
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            fontSize: `${heart.size}px`,
            transform: `scale(1)`,
          }}
          onMouseEnter={() => handleHeartHover(heart.id)}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
