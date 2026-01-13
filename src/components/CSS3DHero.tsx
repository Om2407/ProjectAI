import { useEffect, useState } from 'react';

const CSS3DHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Laptop */}
      <div
        className="laptop-3d"
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
        }}
      >
        {/* Laptop Base */}
        <div className="laptop-base">
          <div className="keyboard"></div>
        </div>

        {/* Laptop Screen */}
        <div className="laptop-screen">
          <div className="screen-content">
            {/* Code Lines */}
            <div className="code-line" style={{ width: '80%', animationDelay: '0s' }}></div>
            <div className="code-line" style={{ width: '60%', animationDelay: '0.2s' }}></div>
            <div className="code-line" style={{ width: '70%', animationDelay: '0.4s' }}></div>
            <div className="code-line" style={{ width: '50%', animationDelay: '0.6s' }}></div>
            <div className="code-line" style={{ width: '75%', animationDelay: '0.8s' }}></div>
          </div>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          border-radius: 50%;
          opacity: 0.6;
          animation: float-particle linear infinite;
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) scale(0.5);
            opacity: 0;
          }
        }

        .laptop-3d {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
          animation: float-laptop 6s ease-in-out infinite;
        }

        @keyframes float-laptop {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .laptop-base {
          width: 300px;
          height: 20px;
          background: linear-gradient(135deg, #374151, #1f2937);
          border-radius: 10px;
          transform: translateX(-50%) translateY(-50px);
          box-shadow: 0 10px 40px rgba(168, 85, 247, 0.3);
          position: relative;
        }

        .keyboard {
          width: 90%;
          height: 80%;
          background: #111827;
          margin: auto;
          margin-top: 2px;
          border-radius: 5px;
        }

        .laptop-screen {
          width: 280px;
          height: 180px;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border-radius: 10px;
          transform: translateX(-50%) translateY(-150px) rotateX(-10deg);
          box-shadow: 0 20px 60px rgba(168, 85, 247, 0.4);
          border: 3px solid #374151;
          padding: 15px;
          position: relative;
          overflow: hidden;
        }

        .screen-content {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          border-radius: 5px;
          padding: 10px;
          position: relative;
        }

        .code-line {
          height: 8px;
          background: #10b981;
          margin: 8px 0;
          border-radius: 4px;
          animation: code-typing 2s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }

        @keyframes code-typing {
          0%, 100% {
            opacity: 0.3;
            width: 0%;
          }
          50% {
            opacity: 1;
          }
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          opacity: 0.3;
          animation: float-shape 10s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          border-radius: 20px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          top: 20%;
          right: 15%;
          border-radius: 50%;
          animation-delay: 1s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          bottom: 15%;
          left: 15%;
          border-radius: 30px;
          animation-delay: 2s;
        }

        .shape-4 {
          width: 70px;
          height: 70px;
          top: 60%;
          right: 20%;
          border-radius: 50%;
          animation-delay: 3s;
        }

        .shape-5 {
          width: 50px;
          height: 50px;
          bottom: 30%;
          right: 30%;
          border-radius: 15px;
          animation-delay: 4s;
        }

        @keyframes float-shape {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) rotate(90deg);
          }
          50% {
            transform: translateY(0) rotate(180deg);
          }
          75% {
            transform: translateY(30px) rotate(270deg);
          }
        }

        @media (max-width: 768px) {
          .laptop-3d {
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default CSS3DHero;