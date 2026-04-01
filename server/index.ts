import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import { authRouter } from './routes/auth.js';
import { postsRouter } from './routes/posts.js';
import { contactRouter } from './routes/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8788;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/contact', contactRouter);

// Serve uploaded attachments at /api/uploads/:key (mirrors CF Pages Function)
app.get('/api/uploads/:key', (req, res) => {
  const key = req.params.key.replace(/\.\./g, '');
  res.sendFile(path.join(__dirname, '..', 'uploads', key), (err) => {
    if (err) res.status(404).json({ error: 'File not found' });
  });
});

app.get('/api/health', (_req, res) => res.json({ ok: true, env: 'dev' }));

initDb();
app.listen(PORT, () => {
  console.log(`[api] Dev API server listening on port ${PORT}`);
});
