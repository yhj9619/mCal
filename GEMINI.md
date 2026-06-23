# 메이플스토리 + 계산기 (mCal) 시스템 가이드

이 문서는 Gemini CLI 에이전트가 "메산기(mCal)" 프로젝트를 이해하고, 수정 및 확장하기 위한 지침서입니다.

## 🏗️ 시스템 아키텍처

본 프로젝트는 [Jekyll](https://jekyllrb.com/) 기반의 **다중 페이지 정적 웹사이트**입니다. 모든 로직은 클라이언트 측 JavaScript에서 처리되며, `jQuery`를 주요 라이브러리로 사용합니다.

### 1. 주요 파일 구조 및 역할

*   **`_layouts/default.html`**: 모든 페이지의 공통 뼈대. 헤더, 푸터, 공통 스크립트(`global.js`, `main.js`)를 포함합니다.
*   **`_includes/header.html`**: 사이드바 및 공통 입력 필드(`mainDiv`)를 포함합니다. 메뉴 검색 및 다크모드 토글이 위치합니다.
*   **`assets/js/global.js`**: 시스템의 **핵심 엔진**.
    *   `localStorage`를 이용한 데이터 로드/저장 (`dataLoad`, `saveData`).
    *   전역 변수 관리 및 공통 유틸리티(숫자 포맷팅, 단위 변환 도우미).
    *   `fn_collection()`: 모든 계산을 트리거하는 메인 루프. `run_page_calculations()`를 호출합니다.
    *   테마(다크모드), 사이드바 상태, 메뉴 검색 및 아코디언 기능 관리.
    *   `shareAsImage()`: `html2canvas`를 이용한 결과 영역 캡처 및 공유.
*   **`assets/js/pages/*.js`**: 각 페이지별 독립된 계산 로직.
    *   `function run_page_calculations() { ... }`를 구현하여 `global.js`의 메인 루프에 통합됩니다.
*   **`pages/*.html`**: 개별 계산기 페이지. Jekyll 프론트 매터를 통해 레이아웃, 제목, 필요한 스크립트(`scripts: [pages/FILENAME.js]`)를 정의합니다.
*   **`guides/index.html`**: `_posts`에 작성된 가이드 및 정보성 포스트 목록을 자동으로 리스팅하는 페이지입니다.
*   **`_posts/`**: Markdown 형식의 포스트들이 저장되는 곳입니다. `YYYY-MM-DD-제목.md` 형식을 따릅니다.

### 2. 주요 화면 및 기능 명세 (Page Directory)

| 한글 화면명 | 파일 경로 | 주요 기능 설명 |
| :--- | :--- | :--- |
| **보상분배계산기** | `pages/bunbae.html` | 결정석 가격 및 수수료를 반영한 파티 분배(1/N, 차등) 계산 |
| **주간보스 시급** | `pages/weeklyBoss.html` | 보스별 클리어 타임 대비 수익을 시급으로 환산 및 캐릭터 합산 |
| **메소마켓 효율** | `pages/mesoMarket.html` | 현금 직거래 vs 메소마켓(캐시/엠작) 구매 효율 비교 |
| **아이템 현실가치** | `pages/mesoToWon.html` | 인게임 아이템의 메소 가격을 현재 시세 기준 현실 가치로 변환 |
| **큐브 현실가치** | `pages/cubeValue.html` | 큐브(블랙/에디 등) 사용 시 기대되는 현실 가치 환산 |
| **큐브 기대값** | `pages/cubeExpectancy.html` | 목표 등급/옵션 도달을 위한 큐브 기대 개수 및 비용 계산 |
| **주화 가치** | `pages/juhwa.html` | 메소 주화(강력한 주화 등)의 실제 메소 가치 및 효율 계산 |
| **주흔 가치** | `pages/juHeunVal.html` | 주문의 흔적 가치 산정 및 선데이 메이플(50% 할인) 반영 |
| **피시방 효율** | `pages/pcRoom.html` | 피시방 비용 대비 솔 에르다 조각 등 보상의 가치 효율 계산 |
| **메소가치 비교** | `pages/valueOf.html` | 과거 시점과 현재 시점의 메소 구매력 및 상대 가치 비교 |
| **메소판매차익** | `pages/saleProfit.html` | 메소 구매가와 판매가, 수수료를 고려한 실제 판매 순수익 계산 |
| **MVP 유지비용** | `pages/mvpCost.html` | MVP 등급 달성 및 유지를 위한 예상 소요 비용 계산 |

### 3. 핵심 기술 및 라이브러리

*   **Jekyll**: 정적 사이트 생성기.
*   **jQuery**: DOM 조작 및 이벤트 핸들링.
*   **html2canvas**: 계산 결과 영역을 이미지로 변환하여 공유/복사.
*   **Kakao SDK**: 카카오톡 공유 기능 연동.
*   **LocalStorage**: 사용자의 입력값(시세, 수수료 등)을 브라우저에 영구 저장.

## 🛠️ 개발 및 수정 지침

### 1. 새로운 계산기 추가 프로세스
1.  `pages/`에 `.html` 파일 생성. (프론트 매터에 `layout: default`, `scripts: [pages/NAME.js]` 필수)
2.  `assets/js/pages/`에 해당 `.js` 파일 생성 및 `run_page_calculations()` 함수 구현.
3.  `_includes/header.html`의 `<nav>` 리스트에 새 항목 추가 및 `data-keywords` 설정.

### 2. 공통 변수 및 시세 추가
1.  `_includes/header.html`의 `mainDiv`에 HTML 요소 추가.
2.  `assets/js/global.js`의 `vVariableName` 선언, `firstValSetting`, `dataLoad`, `saveData`, `setNumber`에 각각 로직 추가.

### 3. 스타일 및 UI
*   `assets/css/index.css`를 기본 스타일로 사용.
*   `simpleTable` 클래스로 표 디자인 통일.
*   `accordion-header`, `accordion-content` 클래스로 접고 펴기 기능 구현 가능.
*   `capture-hide` 클래스를 사용하면 `shareAsImage()` 실행 시 해당 요소가 이미지에서 제외됩니다.

## ⚠️ 주의사항
*   **순수 클라이언트 로직**: 서버 측 DB가 없으므로 모든 중요 설정은 `localStorage`에 의존합니다.
*   **DOM 체크**: `global.js`는 전역 실행되므로, 특정 페이지 전용 요소를 다룰 때는 반드시 존재 여부(`if ($("#id").length > 0)`)를 확인하십시오.
*   **경로**: Jekyll의 `{{ site.baseurl }}`을 사용하여 절대 경로 문제를 방지하십시오.
