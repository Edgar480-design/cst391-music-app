import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const database = getPool();

    const result = await database.query(
      `SELECT
         NOW() AS current_time,
         (SELECT artist FROM albums ORDER BY id LIMIT 1) AS artist`
    );

    return NextResponse.json({
      status: "success",
      message: "Edgar Mendoza Music database connection successful",
      artist: result.rows[0].artist,
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database connection verification failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Music database connection failed",
      },
      { status: 500 }
    );
  }
}
