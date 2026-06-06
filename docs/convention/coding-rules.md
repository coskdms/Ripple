# 코딩 룰 (AI agent 공통)

> 이 문서는 **도구 중립** 규칙이다. Claude Code, Cursor, Copilot 등
> 어떤 AI 도구를 쓰든 이 규칙을 따른다. 루트 `CLAUDE.md`가 이 문서를 가리킨다.

## 언어
- 코드/식별자: **영어**
- 주석·문서·커밋 설명: **한국어**
- 주석은 "왜(Why)"를 설명. "무엇(What)"은 코드와 이름으로 드러낸다.

## 아키텍처 규칙 (반드시 지킬 것)
1. **헥사고날 경계 준수**
   - 도메인(core)은 외부(웹/DB/AI/프레임워크)에 의존하지 않는다.
   - 외부 연동은 반드시 **포트(인터페이스) + 어댑터(구현)** 로.
   - 예: `AiClient`(포트) ← `GeminiAdapter`/`ClaudeAdapter`(어댑터)
2. **BFF에 비즈니스 로직 금지**
   - BFF(Next.js 서버 라우트 `frontend/src/app/api/*`)는 데이터 조합·가공·전달만.
   - 도메인 규칙은 backend(Spring)에.
3. **AI 호출은 backend(Spring)에서만**
   - API 키를 프론트/BFF에 노출하지 않는다.
4. **AI 제공자 교체 가능성 유지**
   - Gemini → Claude 전환을 전제. 특정 SDK에 코어가 직접 묶이지 않게.

## 설계 원칙
- 과한 추상화·미래 대비 코드 금지. MVP에 필요한 것만.
- v2 기능(목표/숙성도/RAG/공유 등)은 **구현하지 말 것**. 단, 스키마/구조에서
  나중에 붙일 여지만 남긴다 (예: `updated_at`, `embedding` 자리).
- 결정 데이터는 **수정 불가, 삭제만** (MVP). 그때의 기록 보존이 본질.

## 문서 규칙
- 설계 결정은 `docs/`의 역할별 폴더에 기록·갱신 (planning/architecture/convention/decision).
- 새 결정이 생기면 해당 문서를 업데이트하고, 중요한 선택은 `docs/decision/`에 ADR로 남긴다.

## 네이밍
- 별도 문서 참고: `docs/convention/naming.md`

## Git
- **사용자가 명시적으로 요청하기 전에는 commit/push 하지 않는다.** 작업 완료 후에도 임의 커밋 금지, 필요 시 제안만.
- 별도 문서 참고: `docs/convention/git.md`
