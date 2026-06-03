export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;

  return Response.json({
    ok: true,
    received: body
  });
}
