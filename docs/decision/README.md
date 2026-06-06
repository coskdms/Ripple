# 결정 기록 (ADR)

중요한 설계/기술 선택을 "왜 그렇게 정했는지"와 함께 남긴다.
파일명: `NNNN-제목.md` (예: `0001-monorepo.md`)

## 템플릿
```
# NNNN. 제목

- 상태: 제안 / 채택 / 폐기
- 날짜: YYYY-MM-DD

## 맥락
어떤 상황·문제에서 이 결정이 필요했나.

## 결정
무엇을 선택했나.

## 이유
왜 이걸 골랐나. 고려한 대안과 트레이드오프.

## 결과
이 결정으로 무엇이 바뀌나. 후속 영향.
```

## ADR 목록
- [0001-bff-pattern-b-nextjs.md](0001-bff-pattern-b-nextjs.md) — BFF 패턴 B(Next.js 통합) 채택, frontend/backend 개명

## 기록된 결정 (요약)
지금까지의 주요 결정은 아래 문서에 정리되어 있다. 필요 시 개별 ADR로 분리.
- 모노레포 채택 → `../architecture/tech-stack.md`
- 헥사고날 + BFF(패턴 B) → `../architecture/tech-stack.md`
- 회고 저장 안 함(조회로 해결) → `../architecture/db-schema.md`
- 감정=코드 enum, 회고설정=별도 테이블 → `../architecture/db-schema.md`
- 결정 수정 불가·삭제만 → `../architecture/api-design.md`
- 인증: BFF 세션쿠키 + 코어 JWT → `../architecture/api-design.md`
- AI: Gemini→Claude, RAG는 pgvector → `../architecture/ai-strategy.md`
