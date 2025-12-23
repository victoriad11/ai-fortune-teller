export interface ShakeAnimationConfig {
  rotate: number[];
  x: number[];
  y: number[];
  duration: number;
}

export interface AnimationVariants {
  idle: {
    rotate: number;
    x: number;
    y: number;
  };
  shaking: {
    rotate: number[];
    x: number[];
    y: number[];
    transition: {
      duration: number;
      ease: string;
    };
  };
}

export interface AnswerVariants {
  hidden: {
    opacity: number;
    scale: number;
    y: number;
  };
  visible: {
    opacity: number;
    scale: number;
    y: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
}
