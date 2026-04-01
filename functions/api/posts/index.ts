import { json, err, requireAuth, type Ctx } from '../../_lib/types.js';
import { randomId } from '../../_lib/auth.js';

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  try {
    const { DB } = ctx.env;
    const { results } = await DB.prepare(`
      SELECT p.id, p.user_id, p.username, p.title, p.body, p.created_at,
        json_group_array(
          CASE WHEN a.id IS NOT NULL THEN json_object(
            'id', a.id, 'filename', a.filename, 'content_type', a.content_type,
            'size', a.size, 'storage_key', a.storage_key
          ) ELSE NULL END
        ) AS attachments
      FROM posts p
      LEFT JOIN attachments a ON a.post_id = p.id
      GROUP BY p.id ORDER BY p.created_at DESC
    `).all<Record<string, unknown>>();
    const posts = results.map(p => ({
      ...p,
      attachments: (JSON.parse(p.attachments as string) as Array<unknown>).filter(Boolean),
    }));
    return json(posts);
  } catch (e) {
    console.error('[posts/list]', e);
    return err('Failed to load posts', 500);
  }
}

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const user = await requireAuth(ctx.request, ctx.env.JWT_SECRET);
  if (!user) return err('Authentication required', 401);
  try {
    const formData = await ctx.request.formData();
    const title = (formData.get('title') as string | null)?.trim() ?? '';
    const body = (formData.get('body') as string | null)?.trim() ?? '';
    if (!title || !body) return err('Title and body are required');

    const { DB, R2 } = ctx.env;
    const postId = randomId();
    await DB.prepare('INSERT INTO posts (id, user_id, username, title, body) VALUES (?, ?, ?, ?, ?)')
      .bind(postId, user.userId, user.username, title, body).run();

    const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'application/pdf']);

    const file = formData.get('file') as File | null;
    if (file && file.size > 0) {
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return err('File type not allowed. Accepted: images, PDF, Word documents, plain text.');
      }
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storageKey = `${postId}_${safeName}`;
      await R2.put(storageKey, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type || 'application/octet-stream' },
      });
      await DB.prepare('INSERT INTO attachments (id, post_id, storage_key, filename, content_type, size) VALUES (?, ?, ?, ?, ?, ?)')
        .bind(randomId(), postId, storageKey, file.name, file.type || 'application/octet-stream', file.size).run();
    }

    const created = await DB.prepare(`
      SELECT p.*, json_group_array(
        CASE WHEN a.id IS NOT NULL THEN json_object(
          'id', a.id, 'filename', a.filename, 'content_type', a.content_type,
          'size', a.size, 'storage_key', a.storage_key
        ) ELSE NULL END
      ) AS attachments
      FROM posts p LEFT JOIN attachments a ON a.post_id = p.id
      WHERE p.id = ? GROUP BY p.id
    `).bind(postId).first<Record<string, unknown>>();

    return json({
      ...created,
      attachments: (JSON.parse(created!.attachments as string) as Array<unknown>).filter(Boolean),
    }, 201);
  } catch (e) {
    console.error('[posts/create]', e);
    return err('Failed to create post', 500);
  }
}
