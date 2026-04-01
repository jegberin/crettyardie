import { json, err, requireAuth, type Ctx } from '../../_lib/types.js';

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  try {
    const id = ctx.params.id as string;
    const { DB } = ctx.env;
    const post = await DB.prepare(`
      SELECT p.id, p.user_id, p.username, p.title, p.body, p.created_at,
        json_group_array(
          CASE WHEN a.id IS NOT NULL THEN json_object(
            'id', a.id, 'filename', a.filename, 'content_type', a.content_type,
            'size', a.size, 'storage_key', a.storage_key
          ) ELSE NULL END
        ) AS attachments
      FROM posts p LEFT JOIN attachments a ON a.post_id = p.id
      WHERE p.id = ? GROUP BY p.id
    `).bind(id).first<Record<string, unknown>>();
    if (!post) return err('Post not found', 404);
    return json({ ...post, attachments: (JSON.parse(post.attachments as string) as Array<unknown>).filter(Boolean) });
  } catch (e) {
    console.error('[posts/get]', e);
    return err('Failed to load post', 500);
  }
}

const ADMIN_EMAIL = 'info@crettyard.ie';

export async function onRequestDelete(ctx: Ctx): Promise<Response> {
  const user = await requireAuth(ctx.request, ctx.env.JWT_SECRET);
  if (!user) return err('Authentication required', 401);
  try {
    const id = ctx.params.id as string;
    const { DB } = ctx.env;
    const post = await DB.prepare('SELECT user_id FROM posts WHERE id = ?').bind(id).first<{ user_id: string }>();
    if (!post) return err('Post not found', 404);
    const isOwner = post.user_id === user.userId;
    const isAdmin = user.email === ADMIN_EMAIL;
    if (!isOwner && !isAdmin) return err('You can only delete your own posts', 403);
    await DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();
    return json({ message: 'Post deleted' });
  } catch (e) {
    console.error('[posts/delete]', e);
    return err('Failed to delete post', 500);
  }
}
