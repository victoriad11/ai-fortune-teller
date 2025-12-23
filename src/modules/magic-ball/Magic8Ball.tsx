import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getShakeVariants, answerVariants } from './animations';
import { triangleContainerStyle, triangleGlowStyle, fortuneTextStyle } from './styles';

export const Magic8Ball = () => {
  const { appState, currentAnswer, reducedMotion } = useStore();

  const isShaking = appState === 'shaking';
  const hasAnswer = appState === 'answered';
  const showBall = !hasAnswer;

  const shakeVariants = getShakeVariants(reducedMotion);

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
              <div
                className="relative w-[380px] h-[260px] flex items-center justify-center"
                style={triangleContainerStyle}
              >
                <div className="absolute inset-0" style={triangleGlowStyle} />

                <p
                  className="text-white text-center font-bold uppercase tracking-wide px-16 relative z-10 leading-relaxed max-w-[280px]"
                  style={fortuneTextStyle}
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
