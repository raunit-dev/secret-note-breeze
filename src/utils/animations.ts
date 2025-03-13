
import { MotionValue, useSpring, useTransform } from 'framer-motion';

export const useAppleSpring = (value: MotionValue<number>) => {
  return useSpring(value, {
    stiffness: 300,
    damping: 30,
    mass: 1,
  });
};

export const useScaleOnScroll = (scrollY: MotionValue<number>, inputRange: number[], outputRange: number[]) => {
  return useTransform(scrollY, inputRange, outputRange);
};

export const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const slideUpVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    y: -10, 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    }
  }
};
