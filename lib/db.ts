import { Pool } from "pg";

let pool: Pool | undefined;

export function getPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("POSTGRES_URL or DATABASE_URL is not configured");
    }

    pool = new Pool({
      connectionString,
      max: 5,
    });
  }

  return pool;
}
