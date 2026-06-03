import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Admin route not found</h1>
      <p className="text-sm text-slate-300">
        The requested admin route does not exist. Go back to the CMS home page.
      </p>
      <Link className="text-sm font-medium underline underline-offset-4" href="/admin">
        Back to admin
      </Link>
    </main>
  );
};

export default NotFound;
