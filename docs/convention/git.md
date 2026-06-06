# Git 컨벤션

## AI agent 규칙 (반드시)
- **사용자가 명시적으로 요청하기 전에는 절대 commit/push 하지 않는다.**
  - "커밋해줘", "푸시해줘" 같은 직접 지시가 있을 때만 수행.
  - 작업을 끝냈더라도 임의로 커밋하지 말고, 필요하면 "커밋할까요?"라고 제안만 한다.
- `git config` 변경 금지, 강제 푸시/`reset --hard` 등 파괴적 명령 금지(명시 요청 시 제외).
- 훅 우회(`--no-verify` 등) 금지.

## 커밋 메시지 (Conventional Commits + 한국어)
형식: `type: 설명` — 타입은 영어, 설명은 한국어.

```
feat: 결정 기록 API 추가
fix: 회고 기간 필터 오류 수정
docs: API 설계 문서 정리
refactor: AI 어댑터 분리
test: 결정 서비스 단위 테스트 추가
chore: 의존성 업데이트
```

### 타입
| 타입 | 용도 |
|---|---|
| feat | 새 기능 |
| fix | 버그 수정 |
| docs | 문서 |
| refactor | 동작 변화 없는 코드 개선 |
| test | 테스트 |
| chore | 빌드/설정/잡일 |
| style | 포맷팅 (로직 변화 없음) |

## 브랜치 전략
형식: `type/설명` (kebab-case)

```
feat/decision-api
fix/retrospective-filter
docs/convention
```

- `main` — 배포 가능한 안정 브랜치
- 작업은 브랜치에서 → PR로 병합
- 혼자 개발이라도 기능 단위 브랜치 권장 (이력 정리)

## PR
- 제목은 커밋 컨벤션과 동일하게
- 본문에 변경 요약 + 테스트 방법
