import type { Variants } from 'framer-motion';

export function getShakeVariants(reducedMotion: boolean): Variants {
  return {
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
        ease: 'easeInOut',
      },
    },
  };
}

export const answerVariants: Variants = {
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
      ease: 'easeOut',
    },
  },
};
