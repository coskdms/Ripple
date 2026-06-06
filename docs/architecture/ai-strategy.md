# AI 전략

## Ripple에서 AI가 하는 일
- 결정 패턴 분석 ("이달에 안정 3번, 도전 1번")
- 감정 톤 분석
- 회고 질문 생성
- 결정 요약

## 전환 전략: Gemini(무료) → Claude(유료)
AI 호출 코드를 **인터페이스로 추상화**해서 나중에 교체 쉽게 설계.

```java
interface AiClient {
    String analyze(String text);
}
// GeminiClient, ClaudeClient 둘 다 구현 → 교체 자유
```

## RAG + 벡터 DB (v2)
의미 기반 회고를 위해 RAG 도입.
- 새 결정/회고 시 **의미가 비슷한 과거 결정**을 벡터 검색 → LLM에 함께 전달
- 기간 필터로는 못 잡는 "비슷한 상황의 과거 결정" 회고 가능

**벡터 DB = pgvector** (별도 벡터 DB 안 씀)
- PostgreSQL 확장이라 DB 하나로 끝, 8GB 부담 없음, 운영 단순
- 결정 데이터와 벡터를 같은 DB에 저장

**헥사고날 매핑**
```
Outbound Port: EmbeddingClient   → 텍스트→벡터 (Gemini/Claude 임베딩)
Outbound Port: VectorRepository  → pgvector 검색/저장
```

**시점**: RAG는 결정이 쌓여야 의미 있음.
- MVP: 구현 X. 단 decision 텍스트를 임베딩하기 좋게 저장, 벡터 컬럼 나중에 추가 가능하게 염두
- v2: pgvector 추가 → 임베딩 생성 → RAG 회고/분석
