import { Router, Request } from 'express';
import formidable from 'formidable';
import path from 'path';
import { fileURLToPath } from 'url';
import { renameSync } from 'fs';
import { getDb } from '../db.js';
import { verifyToken, randomId } from '../lib/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'application/pdf']);

export const postsRouter = Router();

async function getAuthUser(req: Request): Promise<{ userId: string; username: string; email: string } | null> {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    return await verifyToken(auth.slice(7));
  } catch {
    return null;
  }
}

// GET /api/posts
postsRouter.get('/', (req, res) => {
  try {
    const db = getDb();
    const posts = db.prepare(`
      SELECT p.id, p.user_id, p.username, p.title, p.body, p.created_at,
        json_group_array(
          CASE WHEN a.id IS NOT NULL THEN json_object(
            'id', a.id, 'filename', a.filename, 'content_type', a.content_type,
            'size', a.size, 'storage_key', a.storage_key
          ) ELSE NULL END
        ) AS attachments
      FROM posts p
      LEFT JOIN attachments a ON a.post_id = p.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `).all() as Array<Record<string, unknown>>;

    const parsed = posts.map(p => ({
      ...p,
      attachments: (JSON.parse(p.attachments as string) as Array<unknown>).filter(Boolean),
    }));
    return res.json(parsed);
  } catch (err) {
    console.error('[posts/list]', err);
    return res.status(500).json({ error: 'Failed to load posts' });
  }
});

// GET /api/posts/:id
postsRouter.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const post = db.prepare(`
      SELECT p.id, p.user_id, p.username, p.title, p.body, p.created_at,
        json_group_array(
          CASE WHEN a.id IS NOT NULL THEN json_object(
            'id', a.id, 'filename', a.filename, 'content_type', a.content_type,
            'size', a.size, 'storage_key', a.storage_key
          ) ELSE NULL END
        ) AS attachments
      FROM posts p
      LEFT JOIN attachments a ON a.post_id = p.id
      WHERE p.id = ?
      GROUP BY p.id
    `).get(req.params.id) as Record<string, unknown> | undefined;

    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json({
      ...post,
      attachments: (JSON.parse(post.attachments as string) as Array<unknown>).filter(Boolean),
    });
  } catch (err) {
    console.error('[posts/get]', err);
    return res.status(500).json({ error: 'Failed to load post' });
  }
});

// POST /api/posts (multipart/form-data)
postsRouter.post('/', async (req, res) => {
  const user = await getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Authentication required' });

  const form = formidable({
    uploadDir: UPLOADS_DIR,
    keepExtensions: true,
    maxFileSize: MAX_FILE_SIZE,
    maxFiles: 1,
  });

  try {
    const [fields, files] = await form.parse(req);
    const title = (fields.title?.[0] ?? '').trim();
    const body = (fields.body?.[0] ?? '').trim();
    if (!title || !body) return res.status(400).json({ error: 'Title and body are required' });

    const db = getDb();
    const postId = randomId();
    db.prepare('INSERT INTO posts (id, user_id, username, title, body) VALUES (?, ?, ?, ?, ?)').run(
      postId, user.userId, user.username, title, body
    );

    const fileArr = files.file;
    if (fileArr && fileArr.length > 0) {
      const f = fileArr[0];
      const mimeType = f.mimetype ?? 'application/octet-stream';
      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return res.status(400).json({ error: 'File type not allowed. Accepted: images, PDF, Word documents, plain text.' });
      }
      const originalName = f.originalFilename ?? 'upload';
      const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storageKey = `${postId}_${safeName}`;
      const destPath = path.join(UPLOADS_DIR, storageKey);
      renameSync(f.filepath, destPath);
      db.prepare(
        'INSERT INTO attachments (id, post_id, storage_key, filename, content_type, size) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(randomId(), postId, storageKey, originalName, f.mimetype ?? 'application/octet-stream', f.size ?? 0);
    }

    const created = db.prepare(`
      SELECT p.*, json_group_array(
        CASE WHEN a.id IS NOT NULL THEN json_object(
          'id', a.id, 'filename', a.filename, 'content_type', a.content_type,
          'size', a.size, 'storage_key', a.storage_key
        ) ELSE NULL END
      ) AS attachments
      FROM posts p LEFT JOIN attachments a ON a.post_id = p.id
      WHERE p.id = ? GROUP BY p.id
    `).get(postId) as Record<string, unknown>;

    return res.status(201).json({
      ...created,
      attachments: (JSON.parse(created.attachments as string) as Array<unknown>).filter(Boolean),
    });
  } catch (err) {
    console.error('[posts/create]', err);
    return res.status(500).json({ error: 'Failed to create post' });
  }
});

// DELETE /api/posts/:id
postsRouter.delete('/:id', async (req, res) => {
  const user = await getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Authentication required' });
  try {
    const db = getDb();
    const post = db.prepare('SELECT user_id FROM posts WHERE id = ?').get(req.params.id) as { user_id: string } | undefined;
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user_id !== user.userId) return res.status(403).json({ error: 'You can only delete your own posts' });
    db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
    return res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('[posts/delete]', err);
    return res.status(500).json({ error: 'Failed to delete post' });
  }
});

