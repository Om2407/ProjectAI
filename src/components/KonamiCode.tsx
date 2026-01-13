import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useKonamiCode } from "../hooks/useKonamiCode";

const KonamiCode = () => {
  const isActivated = useKonamiCode();

  useEffect(() => {
    if (isActivated) {
      // Play sound (optional)
      const audio = new Audio('https://www.myinstants.com/media/sounds/mlg-airhorn.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore if autoplay is blocked
      });

      // Confetti explosion
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981']
        });
        
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();

      // Show celebration message
      const message = document.createElement('div');
      message.innerHTML = `
        <div style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #a855f7, #ec4899);
          color: white;
          padding: 2rem 3rem;
          border-radius: 1rem;
          font-size: 2rem;
          font-weight: bold;
          z-index: 9999;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: bounce 0.5s ease;
          text-align: center;
        ">
          🎮 KONAMI CODE ACTIVATED! 🎉<br/>
          <span style="font-size: 1rem; font-weight: normal;">You found the secret!</span>
        </div>
        <style>
          @keyframes bounce {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
          }
        </style>
      `;
      
      document.body.appendChild(message);

      setTimeout(() => {
        document.body.removeChild(message);
      }, 3000);
    }
  }, [isActivated]);

  return null;
};

export default KonamiCode;