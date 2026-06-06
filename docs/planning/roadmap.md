# 개발 준비 순서 (체크리스트)

- [x] 서비스 정의 (본질/이름)
- [x] 기능 정의 (MVP 범위)
- [x] 기술 스택 확정
- [x] 아키텍처 확정 (헥사고날 + BFF)
- [x] DB 스키마 설계
- [x] API 설계
- [x] 컨벤션 / AI 룰 정의
- [x] 프로젝트 폴더 구조 (core 헥사고날 도메인우선 / bff / web)
- [x] 개발 환경 셋업
  - [x] PostgreSQL (Docker, 로컬 localhost:5432)
  - [x] Spring Boot 초기화 (core/, Gradle, Java 21, Boot 4.0.6)
  - [x] React 초기화 (web/, Vite + TS, 콜로케이션 폴더)
  - [x] BFF 초기화 (bff/, Node + Express 5 + TS)
  - [ ] GitHub Actions (추후)
- [ ] UX 플로우 / 와이어프레임
- [ ] 개발 시작 (첫 도메인: decision)

---

## 다음 할 일
**개발 시작** — 첫 도메인 `decision` 구현 (Flyway 마이그레이션으로 테이블 생성 →
헥사고날 도메인/포트/어댑터 → 결정 기록·목록·상세 API). 또는 먼저 UX 와이어프레임.
