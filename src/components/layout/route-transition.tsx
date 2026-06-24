'use client';

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type RouteTransitionProps = {
  children: ReactNode;
};

const defaultMotionConfig = {
  container: {
    initial: { opacity: 0, y: 12, scale: 0.992 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.994 },
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
  topGlow: {
    initial: { opacity: 0, y: -14 },
    animate: { opacity: 0.62, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  bottomGlow: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const reducedMotionConfig = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.01, ease: [0.22, 1, 0.36, 1] as const },
  },
  topGlow: {
    initial: { opacity: 0 },
    animate: { opacity: 0.62 },
    exit: { opacity: 0 },
    transition: { duration: 0.01, ease: [0.22, 1, 0.36, 1] as const },
  },
  bottomGlow: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.01, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const RouteTransition = ({ children }: RouteTransitionProps) => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const motionConfig = reduceMotion ? reducedMotionConfig : defaultMotionConfig;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={pathname} className="relative isolate" {...motionConfig.container}>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.18),transparent_28%)]"
            {...motionConfig.topGlow}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.05))] dark:bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.04))]"
            {...motionConfig.bottomGlow}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          />
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
};
