import { Pool } from "pg";

let pool: Pool | undefined;

export function getPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL or POSTGRES_URL is not configured");
    }

    pool = new Pool({
      connectionString,
      max: 5,
    });
  }

  return pool;
}
