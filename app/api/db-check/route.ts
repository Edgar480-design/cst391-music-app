import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const database = getPool();
    const result = await database.query("SELECT NOW() AS current_time");

    return NextResponse.json({
      status: "success",
      message: "Music database connection successful",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Music database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
