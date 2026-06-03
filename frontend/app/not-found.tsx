import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center gap-4 px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Page not found</h1>
      <p className="max-w-xl text-lg leading-8 text-muted-foreground">
        The page does not exist or the route has not been added yet.
      </p>
      <Button href="/">Go home</Button>
    </div>
  );
};

export default NotFound;
