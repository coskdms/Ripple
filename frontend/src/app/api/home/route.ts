import { NextResponse } from "next/server";

// BFF: 홈 화면 조합 (유저정보 + 오늘 결정 + 켜진 회고 묶기).
// 로직 없음 — backend(Spring) 호출 결과를 화면 단위로 묶어 전달만 한다.
export async function GET() {
  // TODO: backend(/api/...) 호출 결과 조합
  return NextResponse.json({ ok: true, todo: "home 조합" });
}
