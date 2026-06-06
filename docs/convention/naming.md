# 네이밍 컨벤션

> 언어 정책: **코드/식별자는 영어, 주석·문서·커밋 설명은 한국어** (혼합)

## 기본 규칙
| 대상 | 규칙 | 예시 |
|---|---|---|
| Java 클래스 | PascalCase | `DecisionService` |
| Java 메서드/변수 | camelCase | `recordDecision` |
| Java 패키지 | lowercase | `com.ripple.decision` |
| Node/React 변수·함수 | camelCase | `decisionList` |
| React 컴포넌트 | PascalCase | `DecisionCard` |
| React 훅 | use + PascalCase | `useDecision` |
| DB 테이블/컬럼 | snake_case | `app_user`, `created_at` |
| 상수 | UPPER_SNAKE | `MAX_LENGTH` |
| 문서 파일 | kebab-case | `db-schema.md` |
| 폴더 | kebab-case 또는 lowercase | `convention/`, `features/` |

## 도메인 용어 통일
코드 전반에서 같은 개념은 같은 단어로.

| 개념 | 코드 용어 | 비고 |
|---|---|---|
| 결정 | `decision` | `record`(동사)와 혼동 주의 |
| 회고 | `retrospective` | 줄임말 `retro` 지양, 풀어쓰기 |
| 상황 | `situation` | |
| 선택(한 것) | `choice` | `decision`과 구분 |
| 이유 | `reason` | |
| 감정 | `emotion` | |
| 감정 한마디 | `emotionNote` / `emotion_note` | |
| 회고 주기 | `period` (DAILY/WEEKLY/MONTHLY/YEARLY) | |
| N년 전 오늘 | `flashback` | |

## 프론트 구조: 콜로케이션 (도메인별)
파일 종류가 아니라 **기능(도메인)별로 관련된 것을 한곳에 모은다.**
(Next.js App Router — `frontend/src/`)

```
frontend/src/
├── app/                 ← Next.js 라우팅·페이지 + BFF(api/*/route.ts)
├── features/
│   ├── decision/        ← "결정" 관련 전부
│   │   ├── components/
│   │   ├── api/
│   │   └── hooks/
│   ├── retrospective/
│   └── auth/
└── shared/              ← 공통 (버튼, 유틸 등)
```

- MVP: **feature 단위 콜로케이션**으로 시작
- 컴포넌트가 복잡해지면 **컴포넌트 단위 콜로케이션**까지 내려감
  ```
  features/decision/components/DecisionCard/
  ├── DecisionCard.tsx
  ├── DecisionCard.css
  └── DecisionCard.test.tsx
  ```
- 원칙: **"관련된 건 가까이"**
