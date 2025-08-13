import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
