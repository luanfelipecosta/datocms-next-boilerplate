'use client';

import { MotionConfig, motion } from 'framer-motion';

type RouteLoadingProps = {
  title?: string;
  description?: string;
};

export const RouteLoading = ({
  title = 'Loading page',
  description = 'Preparing the next view.'
}: RouteLoadingProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate flex min-h-[72svh] items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(37,99,235,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.14),transparent_40%)] dark:bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.1),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(37,99,235,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-border/70 to-transparent" />
        <motion.div
          aria-hidden="true"
          className="absolute -left-14 top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl"
          animate={{ x: [0, 36, 0], opacity: [0.3, 0.78, 0.3] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-accent/12 blur-3xl"
          animate={{ x: [0, -30, 0], opacity: [0.26, 0.72, 0.26] }}
          transition={{ duration: 6.1, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-border/70 bg-card/82 p-7 shadow-glow backdrop-blur-md md:p-8"
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, -20, 0], opacity: [0.22, 0.55, 0.22] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -left-12 bottom-2 h-32 w-32 rounded-full bg-secondary/12 blur-3xl"
            animate={{ x: [0, 18, 0], opacity: [0.18, 0.48, 0.18] }}
            transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/30" />
              <motion.span
                aria-hidden="true"
                className="relative inline-flex h-3 w-3 rounded-full bg-primary"
                animate={{ scale: [1, 2.35, 1], opacity: [0.82, 0.06, 0.82] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/90">{title}</p>
          </div>

          <p className="mt-4 max-w-xl text-base leading-7 text-foreground/90">{description}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.15fr_0.85fr]" aria-hidden="true">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-4">
              <div className="space-y-3">
                <div className="h-3 w-4/5 rounded-full bg-muted/80" />
                <div className="h-3 w-full rounded-full bg-muted/60" />
                <div className="h-3 w-11/12 rounded-full bg-muted/70" />
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted/75">
                <motion.div
                  className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,rgba(34,197,94,1),rgba(37,99,235,1))]"
                  animate={{ x: ['-40%', '120%'] }}
                  transition={{ duration: 1.7, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3">
                <div className="h-24 rounded-xl bg-muted/70" />
                <div className="mt-3 h-3 w-3/4 rounded-full bg-muted/80" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-muted/60" />
              </div>
              <div className="mt-3 overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3">
                <div className="h-24 rounded-xl bg-muted/60" />
                <div className="mt-3 h-3 w-2/3 rounded-full bg-muted/70" />
                <div className="mt-2 h-3 w-5/12 rounded-full bg-muted/60" />
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3">
                <div className="h-24 rounded-xl bg-muted/80" />
                <div className="mt-3 h-3 w-11/12 rounded-full bg-muted/80" />
                <div className="mt-2 h-3 w-2/5 rounded-full bg-muted/60" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <div className="ml-3 h-px flex-1 bg-border/80" />
            <span className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">Scene in motion</span>
          </div>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-muted/75" aria-hidden="true">
            <motion.div
              className="h-full w-1/3 rounded-full bg-[linear-gradient(90deg,rgba(34,197,94,1),rgba(37,99,235,1))]"
              animate={{ x: ['-18%', '120%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
};
