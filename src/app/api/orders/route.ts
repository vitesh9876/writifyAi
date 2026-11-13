import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    isFree: true,
    message: "All features and exports are 100% free of charge forever."
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    isFree: true,
    message: "All features are completely unlocked without any payment required."
  });
}
