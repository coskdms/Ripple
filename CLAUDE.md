# Ripple

결정 기록·회고 앱. 내가 내린 결정을 기록하고 시간이 지나 다시 마주한다.
("결정 하나가 파문(ripple)처럼 삶에 퍼진다")

## AI agent 규칙
모든 코딩 규칙은 **도구 중립 문서**에 있다. 작업 전 반드시 따른다.

- 코딩 룰: `docs/convention/coding-rules.md`
- 네이밍: `docs/convention/naming.md`
- Git: `docs/convention/git.md`

> Cursor/Copilot 등 다른 도구를 써도 위 문서를 동일하게 따른다.

## 꼭 지킬 핵심 규칙
1. **헥사고날 경계** — 도메인은 외부에 의존 X. 외부 연동은 포트+어댑터로.
2. **BFF에 비즈니스 로직 금지** — 조합·전달만. 로직은 backend에. (BFF=Next.js 서버 라우트)
3. **AI 호출은 backend(Spring)에서만** — API 키 프론트/BFF 노출 금지.
4. **AI 제공자 교체 가능** — Gemini→Claude 전제, 도메인이 특정 SDK에 묶이지 않게.
5. **결정 데이터 수정 불가, 삭제만** (MVP) — 그때의 기록 보존이 본질.
6. **언어** — 코드/식별자 영어, 주석·문서·커밋 설명 한국어.
7. **MVP만** — v2 기능(목표/숙성도/RAG/공유)은 구현 X, 붙일 자리만 남김.
8. **사용자 명시 전 commit/push 금지** — 작업을 끝냈어도 임의로 커밋·푸시하지 않는다. 필요하면 제안만.

## 구조 (모노레포, 패턴 B)
```
frontend/   Next.js (화면 + BFF 서버 라우트 app/api/*, 콜로케이션 features/)
backend/    Spring Boot (헥사고날)
docs/       문서 (planning/architecture/convention/decision)
```
- BFF는 별도 서버가 아니라 Next.js 서버 라우트(`frontend/src/app/api/*`).
- 실행 단위 2개(frontend:3000 / backend:8080) + PostgreSQL(Docker:5432).

## 설계 문서
전체 맥락은 `docs/README.md`에서 시작. 새 결정이 생기면 해당 문서를 갱신한다.
