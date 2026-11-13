import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    user: {
      id: "usr_free_unlimited",
      email: "viteshpallapothu07@gmail.com",
      displayName: "Creator",
      isPro: true,
      planId: "lifetime_free",
      planName: "Lifetime Free Unlimited (All Features Unlocked)",
      planExpiresAt: null,
      exportCounts: {
        assignments: 0,
        letters: 0,
        scrollLetters: 0,
        canvasDesigns: 0,
        orders: 0
      }
    }
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    user: {
      id: "usr_free_unlimited",
      email: "viteshpallapothu07@gmail.com",
      displayName: "Creator",
      isPro: true,
      planId: "lifetime_free",
      planName: "Lifetime Free Unlimited",
      planExpiresAt: null
    }
  });
}
