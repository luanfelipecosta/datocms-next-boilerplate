import Link from 'next/link';
import type { ReactNode } from 'react';
import { siteConfig } from '@/lib/site';
import { Button } from '@/components/ui/button';

export const SiteShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link className="font-display text-lg font-semibold tracking-tight" href="/">
            {siteConfig.name}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" size="sm">
            Get started
          </Button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{siteConfig.name}</p>
          <p>Single-app Next.js scaffold prepared for DatoCMS later.</p>
        </div>
      </footer>
    </div>
  );
};
