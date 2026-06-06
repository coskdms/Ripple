# 개발 환경 셋업

## 0. PostgreSQL (완료 ✅)
Docker로 로컬 DB 실행. 루트 `docker-compose.yml`.
```bash
docker compose up -d     # 켜기
docker compose down      # 끄기 (데이터 유지)
docker compose ps        # 상태
```
접속: `localhost:5432` / db `ripple` / user `ripple` / pw `ripple`

---

## 1. Spring Boot 초기화 (backend/)

### start.spring.io 설정
[start.spring.io](https://start.spring.io) 에서 아래대로 입력:

| 항목 | 값 |
|---|---|
| Project | **Gradle - Groovy** |
| Language | **Java** |
| Spring Boot | **3.x 최신 안정 버전** (SNAPSHOT/M 제외) |
| Group | `com.ripple` |
| Artifact | `core` |
| Name | `core` |
| **Package name** | `com.ripple` (← 직접 수정, 기본 com.ripple.core 아님) |
| Packaging | **Jar** |
| Java | **21** (LTS) |

### 의존성 (Dependencies)
**지금 추가:**
- **Spring Web** — REST API (컨트롤러)
- **Spring Data JPA** — DB 접근
- **PostgreSQL Driver** — PostgreSQL 연결
- **Validation** — 입력 검증
- **Lombok** — 보일러플레이트 축소
- **Flyway Migration** — DB 스키마 버전 관리 (테이블을 코드로 관리)
- **Spring Security** — 인증 (MVP에 구글 로그인 있음)

**나중에 추가 (필요 시점에):**
- OAuth2 Client / Resource Server — 구글 로그인 + JWT 구체 구현할 때
- Spring Boot Actuator — 헬스체크/모니터링

### 생성 후 배치
다운로드한 zip을 풀어 **모노레포의 `backend/`** 폴더에 넣는다.
```
Ripple/
├── backend/     ← 여기에 Spring 프로젝트
├── frontend/    ← Next.js
├── docker-compose.yml
└── docs/
```

### DB 연결 설정 (backend/src/main/resources/application.yml)
`application.properties` 대신 `application.yml` 사용 권장:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ripple
    username: ripple
    password: ripple
  jpa:
    hibernate:
      ddl-auto: validate   # 스키마는 Flyway가 관리, JPA는 검증만
    properties:
      hibernate:
        format_sql: true
  flyway:
    enabled: true
```
> 실제 비밀번호는 추후 환경변수로 분리 (지금은 로컬이라 평문 OK)

### 패키지 구조 (헥사고날, 도메인 우선)
상세: `project-structure.md`. 첫 도메인은 `com.ripple.decision` 부터.

---

## 2. Next.js 초기화 (frontend/) — 완료 ✅
패턴 B: 화면 + BFF(서버 라우트)가 한 프로젝트.
```bash
npx create-next-app@latest frontend --typescript --app --eslint \
  --no-tailwind --src-dir --import-alias "@/*" --use-npm --no-turbopack
```
- TypeScript, App Router, src 디렉터리, import alias `@/*`
- BFF는 `src/app/api/*/route.ts` 로 구현 (backend 호출 + 화면용 조합)
- 실행: `npm run dev` (포트 3000)

## 3. GitHub Actions — 추후
빌드·배포 자동화. MVP 기능 완성 후.
배포 단위 2개(frontend / backend) + DB.
