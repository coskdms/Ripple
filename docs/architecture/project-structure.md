# 프로젝트 폴더 구조

모노레포. 패턴 B — **프론트엔드(Next.js)가 BFF를 품는다.**

```
Ripple/
├── frontend/   Next.js (화면 + BFF 서버 라우트)
├── backend/    Spring Boot (헥사고날, 도메인)
├── docs/       문서
├── docker-compose.yml   PostgreSQL
└── CLAUDE.md
```

> 이름: `frontend`는 화면뿐 아니라 BFF(서버 라우트)도 포함하지만, 관행상 frontend로 부른다.

---

## frontend — Next.js (App Router, TypeScript)

화면(React 컴포넌트)과 BFF(서버 라우트)가 한 프로젝트.

```
frontend/src/
├── app/                    ← Next.js App Router (라우팅 + 페이지 + 서버 라우트)
│   ├── (화면 페이지들)
│   └── api/                ← BFF 역할: route handler가 backend(Spring) 호출
│       ├── home/route.ts
│       ├── decisions/route.ts
│       └── retrospective/route.ts
├── features/               ← 콜로케이션 (도메인별)
│   ├── decision/           ← components / hooks / (client) api
│   ├── retrospective/
│   └── auth/
└── shared/                 ← 공통 컴포넌트·유틸
```

### BFF (Next.js route handler)
- `src/app/api/**/route.ts` 가 BFF 역할
- 브라우저 → `/api/...`(Next 서버) → backend(Spring) 호출 → 화면용 데이터 조합
- **원칙**: 비즈니스 로직 없음. 조합·가공·전달만. 로직은 backend에.
- backend 호출 시 인증 토큰(JWT)을 실어 보냄. 브라우저와는 세션/쿠키.

---

## backend — Spring Boot (헥사고날, 도메인 우선)

도메인별로 먼저 나누고, 그 안에서 domain / application(port) / adapter 로 분리.

```
backend/src/main/java/com/ripple
├── decision/
│   ├── domain/                  ← 순수 비즈니스 (Decision 엔티티, 도메인 로직)
│   ├── application/
│   │   ├── port/in/             ← UseCase 인터페이스 (RecordDecisionUseCase 등)
│   │   ├── port/out/            ← DecisionRepository, AiClient 인터페이스
│   │   └── service/             ← UseCase 구현 (포트in 구현, 포트out 사용)
│   └── adapter/
│       ├── in/web/              ← REST Controller (frontend BFF 요청 수신)
│       └── out/persistence/     ← JPA 어댑터 (DecisionRepository 구현)
├── retrospective/               ← 동일 구조 (조회 중심)
├── auth/                        ← 동일 구조 (구글 로그인, JWT 발급)
├── ai/                          ← AI 어댑터 (GeminiAdapter/ClaudeAdapter, AiClient 구현)
└── common/                      ← 공통 설정, 예외, 보안
```

### 의존 방향 (반드시 안쪽으로)
```
adapter → application(port) → domain
```
- domain은 아무것도 import 안 함 (프레임워크/JPA/AI SDK 모름)
- adapter만 바깥 기술(Spring Web, JPA, Gemini SDK)을 안다
- AI 교체(Gemini→Claude)는 `ai/` 어댑터만 바꾸면 됨 → 도메인 무수정

---

## 실행 구조 (패턴 B)
```
[브라우저]  frontend (Next.js)       ← npm run dev   (포트 3000)
     │         └ /api/* = BFF (Next 서버 라우트)
     ▼ JWT
[서버]     backend (Spring Boot)     ← bootRun       (포트 8080)
     ▼
          PostgreSQL (Docker)                        (포트 5432)
```
실행 단위 2개(frontend / backend) + DB. 패턴 A 대비 서버 하나 적음.
