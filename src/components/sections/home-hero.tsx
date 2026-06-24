'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const HomeHero = ({ title, description }: { title: string; description: string }) => {
  return (
    <section className="px-6 pt-14 md:pt-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          <Badge>Next.js App Router</Badge>
          <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight text-balance md:text-7xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/blog">Browse posts</Button>
            <Button href="/contact" variant="outline">
              Contact
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <Card className="relative overflow-hidden border-border/60 bg-card/85">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_40%)]" />
            <div className="relative space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Starter system
              </p>
              <p className="text-xl font-medium leading-8">
                Clean routing, reusable components, and a thin content boundary ready for a future CMS.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
