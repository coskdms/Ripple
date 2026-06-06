import { NextResponse } from "next/server";

// BFF: 회고 화면 조합 (기간 조회 + flashback 묶기).
// 브라우저는 이 라우트 한 번만 호출하면 되도록 backend 두 호출을 묶는다.
export async function GET() {
  // TODO: backend GET /api/retrospectives + /api/retrospectives/flashback 조합
  return NextResponse.json({ ok: true, todo: "retrospective 조합" });
}
