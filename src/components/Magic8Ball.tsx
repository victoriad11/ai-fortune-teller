import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { THEMES } from '../constants/fortunes';
import styles from './Magic8Ball.module.css';

interface Magic8BallProps {
  onShake: () => void;
}

export const Magic8Ball = ({ onShake }: Magic8BallProps) => {
  const { appState, currentAnswer, theme, reducedMotion } = useStore();
  const themeConfig = THEMES[theme];

  const isShaking = appState === 'shaking';
  const hasAnswer = appState === 'answered';
  const showBall = !hasAnswer;

  // Smooth shake animation - multiple small rotations and translations
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
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {showBall ? (
          <motion.div
            key="ball"
            className={styles.ballImageContainer}
            variants={shakeVariants}
            animate={isShaking ? 'shaking' : 'idle'}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ exit: { duration: 0.3 } }}
          >
            <img
              src="/magic-8-ball.png"
              alt="Magic 8 Ball"
              className={styles.ballImage}
            />
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            className={styles.answerContainer}
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div
              className={styles.answerBox}
              style={{
                background: `linear-gradient(135deg, ${themeConfig.gradient[0]}, ${themeConfig.gradient[1]})`,
                boxShadow: `0 10px 40px ${themeConfig.glowColor}40`,
              }}
            >
              <p className={styles.answerText}>{currentAnswer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
