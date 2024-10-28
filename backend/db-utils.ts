import path from "path";
import sqlite3Module from "sqlite3";
const sqlite3 = sqlite3Module.verbose();

export function query<T = unknown>(query: string, params: any[] = []): Promise<T> {
  return new Promise((res, rej) => {
    const db = new sqlite3.Database(path.join(__dirname, "db.txt"), sqlite3Module.OPEN_READWRITE, async error => {
      if (error) {
        return rej(error);
      }

      db.all(query, params, (err, rows) => {
        if (err) {
          return rej(err);
        }

        return res(rows as T);
      });
    });
  });
}

export function command<T = unknown>(query: string, params: any[] = []): Promise<void> {
  return new Promise((res, rej) => {
    const db = new sqlite3.Database(path.join(__dirname, "db.txt"), sqlite3Module.OPEN_READWRITE, async error => {
      if (error) {
        return rej(error);
      }

      db.run(query, params, err => {
        if (err) {
          return rej(err);
        }

        return res();
      });
    });
  });
}
