'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps, FC } from 'react';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
