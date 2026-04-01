import BetterSqlite3 from 'better-sqlite3';
import { readFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'dev.db');
const SCHEMA_PATH = path.join(__dirname, '..', 'schema.sql');
const UPLOADS_PATH = path.join(__dirname, '..', 'uploads');

let _db: BetterSqlite3.Database;

export function getDb(): BetterSqlite3.Database {
  if (!_db) {
    _db = new BetterSqlite3(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    const schema = readFileSync(SCHEMA_PATH, 'utf8');
    _db.exec(schema);
  }
  return _db;
}

export function initDb(): void {
  mkdirSync(UPLOADS_PATH, { recursive: true });
  getDb();
  console.log('[db] SQLite ready at', DB_PATH);
}
