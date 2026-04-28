import { err, type Ctx } from '../../_lib/types.js';

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const key = ctx.params.key as string;
  if (!key) return err('Not found', 404);

  const ifNoneMatch = ctx.request.headers.get('If-None-Match');
  const obj = await ctx.env.R2.get(key, {
    onlyIf: ifNoneMatch ? { etagDoesNotMatch: ifNoneMatch } : undefined,
  });

  if (!obj) return err('File not found', 404);

  const headers = new Headers();
  headers.set('Content-Type', obj.httpMetadata?.contentType ?? 'application/octet-stream');
  headers.set('Content-Length', String(obj.size));
  headers.set('ETag', obj.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  if (!('body' in obj)) {
    return new Response(null, { status: 304, headers });
  }

  return new Response(obj.body, { headers });
}

export async function onRequestHead(ctx: Ctx): Promise<Response> {
  const key = ctx.params.key as string;
  const head = await ctx.env.R2.head(key);
  if (!head) return new Response(null, { status: 404 });
  return new Response(null, {
    headers: {
      'Content-Type': head.httpMetadata?.contentType ?? 'application/octet-stream',
      'Content-Length': String(head.size),
      ETag: head.httpEtag,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
