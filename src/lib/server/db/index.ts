// src/lib/db/index.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';

// Ensure DATABASE_URL is set in the environment
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Create and export the database connection
const client = new Database(env.DATABASE_URL);
export const db = drizzle(client);
