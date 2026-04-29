import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

const FadeInOnScroll = ({ children, delay = 0, y = 24 }: FadeInOnScrollProps) => {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
