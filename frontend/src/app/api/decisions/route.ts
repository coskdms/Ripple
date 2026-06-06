import { NextResponse } from "next/server";

// BFF: 결정 목록/기록. backend(/api/decisions)로 거의 그대로 전달.
export async function GET() {
  // TODO: backend GET /api/decisions 전달
  return NextResponse.json({ ok: true, todo: "decisions 목록" });
}

export async function POST() {
  // TODO: backend POST /api/decisions 전달 (기록 폼 제출)
  return NextResponse.json({ ok: true, todo: "decision 기록" });
}
