# 기술 스택 & 아키텍처

## 기술 스택
```
프론트+BFF → Next.js (React, TypeScript, App Router)
백엔드     → Java (Spring Boot, 헥사고날)
DB         → PostgreSQL
배포        → GitHub Actions + Docker
AI         → Gemini (무료, 시작) → Claude (품질 필요 시 전환)
```

### 개발 환경
- IntelliJ IDEA (한글 버전) / VS Code
- 8GB MacBook → DB는 Docker 로컬로 가볍게

### 연동 구조 (패턴 B — BFF가 프론트에 통합)
```
Next.js (frontend) ── 서버 라우트(BFF) ── Spring Boot (backend) → AI API (Gemini/Claude)
                                                              → PostgreSQL
```
- **AI 호출은 반드시 backend(Spring)에서** — API 키 프론트 노출 금지
- BFF = Next.js의 서버 라우트(`app/api/*`). 별도 서버 아님.

### 저장소 전략
**모노레포** — 한 저장소에 frontend/backend 모두.
```
Ripple/
├── frontend/   (Next.js: 화면 + BFF)
├── backend/    (Spring)
└── docs/
```
혼자 개발하고 함께 진화하므로 모노레포가 적합.

### BFF 패턴 선택 (A vs B)
- 패턴 A: 별도 BFF 서버(Node/Express) — 분리 명확, 서버 3개, 배포 복잡
- **패턴 B (채택)**: Next.js가 BFF를 품음 — 서버 2개, 배포 단순, 학습/가독성 유리
- 사용자가 B를 학습했고, 실무 신규 프로젝트도 B(Next.js)가 우세 → B 채택

---

## 아키텍처: 헥사고날(backend) + BFF(Next.js 통합)

```
Next.js (frontend)
   │  화면(React) + BFF(서버 라우트 app/api/*)
   │  → 프론트 전용 데이터 조합·가공
   ▼  JWT
Spring Boot (backend, 헥사고날)   ← 순수 비즈니스 로직 (결정/회고)
   │                    │
   ▼                    ▼
PostgreSQL          AI (Gemini→Claude)
```

### 헥사고날 (Spring backend)
도메인을 중심에 두고 외부(웹/DB/AI)는 포트-어댑터로 교체 가능하게 한다.

```
[Inbound Adapter]         [Outbound Adapter]
REST Controller → PORT →  DECISION DOMAIN  → PORT → PostgreSQL Adapter
(BFF 요청 수신)  (in)      (순수 비즈니스)    (out)   AI Adapter (Gemini/Claude)
```

| 레이어 | 역할 | Ripple 예시 |
|---|---|---|
| Domain (core) | 순수 비즈니스 규칙, 외부 의존 X | 결정·회고 로직 |
| Inbound Port | 외부→도메인 진입 (UseCase) | `RecordDecisionUseCase` |
| Inbound Adapter | 포트 호출 | REST Controller |
| Outbound Port | 도메인→외부 인터페이스 | `DecisionRepository`, `AiClient` |
| Outbound Adapter | 포트 구현 | `JpaDecisionAdapter`, `GeminiAdapter`/`ClaudeAdapter` |

> **AI 전환 전략이 곧 헥사고날**: `AiClient`가 outbound port,
> `GeminiAdapter`/`ClaudeAdapter`가 어댑터 → 도메인 수정 없이 교체.

### BFF (Next.js 서버 라우트, `frontend/src/app/api/*`)
| 책임 | 설명 |
|---|---|
| 데이터 조합·가공 | 화면이 필요한 형태로 응답 정리 |
| API 묶기 | 여러 backend API를 한 번에 호출해 프론트 왕복 줄임 |
| 프론트 인증 | 세션/토큰 등 프론트 맞춤 처리 |

> **원칙**: BFF는 비즈니스 로직을 갖지 않는다.
> 로직은 backend에, BFF는 "프론트를 위한 통역"만 담당.
