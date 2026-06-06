# API 설계 (MVP)

2계층: **BFF(Next.js 서버 라우트) → backend(Spring)**. 브라우저는 BFF만 호출.

## backend API (Spring Boot) — 도메인/리소스 단위

### 인증
| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/api/auth/google` | 구글 토큰 검증 → 가입/로그인 |
| POST | `/api/auth/logout` | 로그아웃 |

### 결정 (decision)
| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/api/decisions` | 결정 기록 |
| GET | `/api/decisions` | 내 결정 목록 (시간순, 페이징) |
| GET | `/api/decisions/{id}` | 결정 상세 |
| DELETE | `/api/decisions/{id}` | 결정 삭제 |
| ~~PUT~~ | ~~`/api/decisions/{id}`~~ | **v2 예정** (수정, 원본 보존 방식) |

### 회고 (저장 없이 조회만)
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/retrospectives?period=MONTHLY&date=2026-06` | 기간 결정 조회 |
| GET | `/api/retrospectives/flashback?date=2026-06-06` | "N년/개월 전 오늘" |

### 회고 설정
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/retrospective-settings` | 프리셋 on/off 상태 |
| PUT | `/api/retrospective-settings` | 프리셋 켜고 끄기 |

## BFF API (Next.js route handler, `frontend/src/app/api/*`) — 화면 단위 조합 (로직 없음)
| 메서드 | 경로 | 하는 일 | 쓰는 화면 |
|---|---|---|---|
| GET | `/api/retrospective` | 기간 결정 + flashback + 감정 분포 묶기 | S1 회고 (랜딩) |
| GET | `/api/decisions` | 목록 (backend 거의 그대로 전달) | S3 목록 |
| POST | `/api/decisions` | 기록 폼 제출 | S2 기록 |
| GET | `/api/decisions/{id}` | 상세 (backend 거의 그대로 전달) | S4 상세 |

> 구조 C 채택으로 홈 화면을 두지 않으므로 `/api/home`은 없음.

## 결정 사항 (모두 확정)
- ✅ **결정 수정 불가, 삭제만** (MVP). 수정은 v2에서 원본 보존 방식으로.
- ✅ **인증**: 브라우저—BFF는 세션 쿠키, BFF—backend는 JWT 전달.
  (브라우저엔 쿠키로 안전, 서버 간은 stateless JWT)
- ✅ **회고 화면 조합은 BFF에서**: 브라우저는 `/api/retrospective` 한 번만 호출
  (flashback + 기간조회 묶기)
