# Ripple 문서

> 결정 기록·회고 앱 Ripple의 기획·설계·컨벤션 문서. 개발이 진행되며 계속 갱신한다.

## 폴더 구조
```
docs/
├── planning/       기획 — 무엇을, 왜
├── architecture/   설계 — 어떻게
├── convention/     규칙 — 어떤 약속으로
└── decision/       ADR — 왜 그렇게 정했나
```

## 문서 인덱스

### planning — 기획
- [overview.md](planning/overview.md) — 프로젝트 개요, 핵심 컨셉(결정 6항목/회고 주기), 목표 설정 구조
- [mvp-scope.md](planning/mvp-scope.md) — MVP 범위 (만들 것 / 나중에)
- [roadmap.md](planning/roadmap.md) — 개발 준비 체크리스트, 다음 할 일

### architecture — 설계
- [tech-stack.md](architecture/tech-stack.md) — 기술 스택, 모노레포, 헥사고날 + BFF 아키텍처
- [project-structure.md](architecture/project-structure.md) — 폴더 구조 (core 헥사고날 도메인우선 / bff / web)
- [db-schema.md](architecture/db-schema.md) — DB 스키마 (app_user/decision/retrospective_setting)
- [api-design.md](architecture/api-design.md) — 코어 API + BFF API
- [ai-strategy.md](architecture/ai-strategy.md) — Gemini→Claude 전환, RAG/pgvector
- [dev-setup.md](architecture/dev-setup.md) — 개발 환경 셋업 (DB/Spring/React/BFF 초기화)

### convention — 규칙
- [coding-rules.md](convention/coding-rules.md) — AI agent 공통 코딩 룰 (도구 중립)
- [naming.md](convention/naming.md) — 네이밍 컨벤션, 콜로케이션 구조
- [git.md](convention/git.md) — 커밋/브랜치 컨벤션

### decision — ADR
- [README.md](decision/README.md) — 결정 기록 가이드 + 주요 결정 요약
