# 0001. BFF는 패턴 B (Next.js 통합) 채택

- 상태: 채택
- 날짜: 2026-06-06

## 맥락
처음엔 BFF를 별도 Node/Express 서버(패턴 A)로 만들었으나, 사용자가 실제 학습한 것은
패턴 B(BFF가 프론트엔드 프레임워크에 통합된 형태, Next.js)였다.
폴더 구조(별도 `bff/`)가 어색하다는 피드백에서 시작해 재검토.

## 결정
**패턴 B 채택.** Next.js가 화면 + BFF(서버 라우트)를 함께 담당.
- `frontend/` (Next.js) — 화면 + BFF(`src/app/api/*/route.ts`)
- `backend/` (Spring) — 도메인(헥사고날), 변경 없음
- 기존 `web/`(Vite), `bff/`(Express) 제거. `core/` → `backend/` 개명.

## 이유
- **학습**: 사용자가 B를 배웠음 → 마찰 적음
- **가독성**: 폴더/실행 단위 3개 → 2개로 감소
- **배포**: 배포 단위 3개 → 2개(frontend/backend)+DB. GitHub Actions·Docker 단순화
- **실무 추세**: 신규 웹 프로젝트는 Next.js(B)가 우세
- 패턴 A의 장점(완전 분리, 다중 클라이언트)은 개인 학습 프로젝트엔 과함

## 결과
- 프론트+BFF가 한 프로젝트 → 인증(세션/JWT) 흐름이 Next 서버 라우트 안에서 처리
- backend(Spring 헥사고날)와 DB(Docker)는 그대로 유지
- 네이밍: `frontend` / `backend` 로 통일 (frontend는 BFF 포함하지만 관행상 OK)
