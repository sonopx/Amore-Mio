import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export function QuestionBox() {
  const [clickCount, setClickCount] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleNoHover = () => {
    if (clickCount < 3) {
      setClickCount(clickCount + 1);
    }
  };

  const handleYesClick = () => {
    setAnswered(true);
  };

  // Configuração de animação baseada no clickCount
  const getAnimationProps = () => {
    if (clickCount === 0) return {};
    
    const distance = 100 + (clickCount * 30); // Aumenta a distância com cada tentativa
    const angle = Math.random() * Math.PI * 2; // Ângulo aleatório em radianos
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: Math.random() * 360,
      transition: {
        type: "spring",
        stiffness: 300 + (clickCount * 50), // Mais rígido com tentativas
        damping: 10,
        mass: 0.5,
      }
    };
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Quer morar comigo?</h2>
      
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px",
        position: "relative",
        minHeight: "60px" // Garante espaço para a animação
      }}>
        <motion.button
          onClick={handleYesClick}
          initial={false}
          animate={getAnimationProps()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(145deg, #ff6b81, #ff8e9e)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(255, 107, 129, 0.3)",
            position: "absolute", // Permite movimento livre
            zIndex: 2,
          }}
        >
          Sim
        </motion.button>

        <motion.button
          onMouseEnter={handleNoHover}
          whileHover={{ scale: 1.05 }}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(145deg, #cccccc, #e0e0e0)",
            color: "#555",
            border: "none",
            borderRadius: "8px",
            cursor: "not-allowed",
            fontSize: "1rem",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Não
        </motion.button>
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{ marginTop: "30px" }}
        >
          <motion.img 
            src="/fotos/especial.jpeg" 
            alt="Nós dois" 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              borderRadius: "10px", 
              maxWidth: "300px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" 
            }} 
          />
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              marginTop: "20px",
              color: "#ff6b81",
              textShadow: "0 2px 4px rgba(255, 107, 129, 0.3)"
            }}
          >
            Agora seremos um só, uma família ❤️
          </motion.h3>
        </motion.div>
      )}
    </div>
  );
}