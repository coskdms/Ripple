# DB 스키마 (MVP)

테이블 3개. 회고는 저장하지 않고 `decision` 조회로 해결(기간 필터).

## `app_user` — 사용자
> `user`는 PostgreSQL 예약어 → `app_user`

| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | BIGINT PK | 식별자 |
| email | VARCHAR | 구글 계정 이메일 |
| provider | VARCHAR | 로그인 제공자 ("google") |
| provider_id | VARCHAR | 제공자 고유 ID |
| nickname | VARCHAR | 표시 이름 |
| created_at | TIMESTAMP | 가입 시각 |

## `decision` — 결정 기록 (핵심)
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | BIGINT PK | 식별자 |
| user_id | BIGINT FK | 누구의 결정 |
| situation | TEXT | 상황 |
| choice | TEXT | 결정 (무엇을 선택) |
| reason | TEXT | 이유 |
| emotion | VARCHAR | 감정 (코드 enum 값, 아래 8종 중 1) |
| emotion_note | TEXT (nullable) | 감정 한마디 (선택) |
| created_at | TIMESTAMP | 기록 시각 → **회고 기간 필터 기준** |
| updated_at | TIMESTAMP (nullable) | 수정 시각. MVP 미사용, v2 수정 기능 대비 |

### 감정 enum (`emotion`) — MVP 8종
결정 "그 순간"의 감정. 사후 감정(후회/아쉬움)은 v2 결과 평가로 분리.

| 한글 | 코드(enum) | 아이콘 | 결정 순간 |
|---|---|---|---|
| 확신 | `CONVICTION` | 😌 | "이게 맞아" |
| 설렘 | `EXCITEMENT` | ✨ | 새 시작에 두근 |
| 평온 | `CALM` | 🌊 | 차분히 받아들임 |
| 후련함 | `RELIEF` | 😮‍💨 | 미루다 결정해 홀가분 |
| 희망 | `HOPE` | 🌱 | "잘 될 것 같아" |
| 망설임 | `HESITATION` | 🤔 | 끝까지 갈등 |
| 불안 | `ANXIETY` | 😟 | 결과가 걱정 |
| 두려움 | `FEAR` | 😨 | 큰 리스크 앞에서 |

> DB엔 코드값(`CONVICTION` 등)만 저장. 한글 라벨·아이콘은 프론트(frontend)가 매핑.
> `emotion`은 단일 선택(택1). v2에서 enum 추가는 호환 유지하며 확장.

> v2 확장 자리: `selected_options`(선택지), `expectation`(기대), `embedding`(pgvector)
>
> **수정 정책**: MVP는 삭제만 허용, 수정 불가 (그때의 감정 보존이 본질).
> v2에서 수정 허용 시 **덮어쓰기 금지 → 원본 보존 + 수정 이력**(decision_history 등)으로.
> "처음엔 이렇게 적었는데 나중에 고쳤네"가 오히려 회고 자산. 지금은 updated_at 컬럼만 대비.

## `retrospective_setting` — 회고 주기 설정
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | BIGINT PK | 식별자 |
| user_id | BIGINT FK | 누구의 설정 |
| period_type | VARCHAR | DAILY / WEEKLY / MONTHLY / YEARLY |
| enabled | BOOLEAN | 켜짐/꺼짐 |

> v2 커스텀 주기(예: 3일마다)는 행 추가로 확장

## 관계
```
app_user 1 ─── N decision
app_user 1 ─── N retrospective_setting
```

## 확정 결정
- **감정 목록 = 코드 enum** (DB 테이블 X). 단순함 우선, 나중에 확장 가능
- **회고 설정 = 별도 테이블** (app_user 컬럼 X). v2 커스텀 주기 대비
- **회고 = 저장 안 함**, decision 조회로 해결
