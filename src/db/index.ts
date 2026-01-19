import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Use environment variable or default to perfumery.db
const dbName = process.env.DB_FILE_NAME || 'perfumery.db';
const sqlite = new Database(dbName);

export const db = drizzle(sqlite, { schema });
