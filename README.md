# Game Item Viewer

로스트아크 아이템 가격 분석 및 추이 확인 서비스

## 프로젝트 구조
```
gameItemViewer/
├── src/main/java/com/gameitemviewer/     # Spring Boot Backend
│   ├── entity/                          # JPA Entity
│   ├── repository/                      # Data Repository
│   ├── service/                         # Business Logic
│   ├── controller/                      # REST API
│   └── dto/                             # Data Transfer Object
├── src/main/resources/                  # Backend Resources
│   ├── application.yml                  # Backend 설정
│   └── bootstrap.yml                    # Config Server 연결
└── frontend/                            # React Frontend
    ├── src/components/                  # React Components
    │   ├── ItemSelector.js              # 아이템/날짜 선택
    │   ├── ItemPriceChart.js            # 가격 추이 차트
    │   └── ItemAnalysisTable.js         # 가격 분석 테이블
    └── public/                          # Static Files
```

## 실행 방법

### 1. Backend (Spring Boot)
```bash
# Config Server가 실행되어 있어야 함 (포트 8888)
./gradlew bootRun
```
- 포트: 9090
- Config Server에서 DB 설정 자동 로드

### 2. Frontend (React)
```bash
cd frontend
npm install
npm start
```
- 포트: 3000
- Backend API와 자동 연결 (proxy 설정)

## 주요 기능

### 📊 가격 분석
- 평균/최고/최저 가격 통계
- 총 거래 건수
- 선택된 아이템 vs 전체 아이템 분석

### 📈 가격 추이 차트
- 시간별 가격 변화 그래프
- 인터랙티브 차트 (Chart.js)
- 날짜 범위 선택 가능

### 🎯 아이템 선택
- 드롭다운으로 아이템 선택
- 날짜 범위 설정
- 실시간 데이터 조회

## API 엔드포인트

- `GET /api/items/names` - 모든 아이템명 조회
- `GET /api/items/{itemName}/analysis` - 특정 아이템 가격 분석
- `GET /api/items/{itemName}/trend` - 특정 아이템 가격 추이
- `GET /api/items/analysis/all` - 모든 아이템 분석

## 기술 스택

### Backend
- Spring Boot 3.4.1
- Spring Data JPA
- MySQL
- Spring Cloud Config Client
- Lombok

### Frontend
- React 18
- Chart.js & react-chartjs-2
- Axios
- CSS Grid & Flexbox

## 연동 서비스
- **Config Server** (포트 8888) - 설정 관리
- **API Batch Service** (포트 8080) - 데이터 수집
- **MySQL Database** - 데이터 저장소
