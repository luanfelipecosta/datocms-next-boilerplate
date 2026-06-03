const cmsUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3001';

export function cmsEndpoint(path: string) {
  return new URL(path, cmsUrl).toString();
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const headers = new Headers(init?.headers);
    headers.set('Accept', 'application/json');
    const next = (init as (RequestInit & { next?: Record<string, unknown> }) | undefined)?.next;

    const response = await fetch(cmsEndpoint(path), {
      ...init,
      headers,
      next: {
        revalidate: 60,
        ...next
      }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}
