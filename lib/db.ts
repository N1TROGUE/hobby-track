import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "hobbytrack.db");

function createDatabase() {
  mkdirSync(dataDirectory, { recursive: true });

  const database = new Database(databasePath);

  database.pragma("journal_mode = WAL");

  database
    .prepare(
      `
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        note TEXT NOT NULL
      )
      `,
    )
    .run();

  return database;
}

export const database = createDatabase();