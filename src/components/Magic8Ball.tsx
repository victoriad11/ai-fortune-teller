import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export const Magic8Ball = () => {
  const { appState, currentAnswer, reducedMotion } = useStore();

  const isShaking = appState === 'shaking';
  const hasAnswer = appState === 'answered';
  const showBall = !hasAnswer;

  // Smooth shake animation
  const shakeVariants = {
    idle: {
      rotate: 0,
      x: 0,
      y: 0,
    },
    shaking: {
      rotate: reducedMotion
        ? [0, -5, 5, -5, 5, 0]
        : [0, -8, 8, -10, 10, -8, 8, -5, 5, -3, 3, 0],
      x: reducedMotion
        ? [0, -5, 5, -5, 5, 0]
        : [0, -10, 10, -12, 12, -10, 10, -7, 7, -4, 4, 0],
      y: reducedMotion
        ? [0, -3, 3, -3, 3, 0]
        : [0, -5, 5, -7, 7, -6, 6, -4, 4, -2, 2, 0],
      transition: {
        duration: reducedMotion ? 1.5 : 2.5,
        ease: 'easeInOut' as any,
      },
    },
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as any,
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[400px] min-h-[400px] mx-auto md:max-w-[300px] md:min-h-[300px]">
      <AnimatePresence mode="wait">
        {showBall ? (
          <motion.div
            key="ball"
            className="w-full max-w-[350px] flex items-center justify-center md:max-w-[280px]"
            variants={shakeVariants}
            animate={isShaking ? 'shaking' : 'idle'}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          >
            <img
              src="/magic-8-ball.png"
              alt="Magic 8 Ball"
              className="w-full h-auto block drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            className="w-full max-w-[350px] flex items-center justify-center md:max-w-[280px]"
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Triangular fortune window - upside down triangle like real 8-ball */}
              <div
                className="relative w-[380px] h-[260px] flex items-center justify-center"
                style={{
                  clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                  background: 'linear-gradient(to bottom, #1e3a8a, #1e40af, #3b82f6)',
                  boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Inner glow overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                    background: 'radial-gradient(ellipse at center, rgba(147, 197, 253, 0.4) 0%, transparent 70%)',
                  }}
                />

                {/* Fortune text */}
                <p
                  className="text-white text-center font-bold uppercase tracking-wide px-16 relative z-10 leading-relaxed max-w-[280px]"
                  style={{
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(147, 197, 253, 0.5)',
                    marginTop: '-50px', // Position text higher in triangle where it's wider
                  }}
                >
                  {currentAnswer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
