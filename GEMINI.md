# 메이플스토리 + 계산기 (mCal) 시스템 가이드

이 문서는 Gemini CLI 에이전트가 "메산기(mCal)" 프로젝트를 이해하고, 수정 및 확장하기 위한 지침서입니다.

## 🏗️ 시스템 아키텍처

본 프로젝트는 [Jekyll](https://jekyllrb.com/) 기반의 **다중 페이지 정적 웹사이트**입니다. 모든 로직은 클라이언트 측 JavaScript에서 처리됩니다.

### 1. 주요 파일 구조 및 역할

*   **`_layouts/default.html`**: 모든 페이지의 공통 뼈대. 헤더, 푸터, 공통 스크립트(`global.js`, `main.js`)를 포함합니다.
*   **`_includes/header.html`**: 사이드바 및 공통 입력 필드(`mainDiv`)를 포함합니다.
*   **`assets/js/global.js`**: 시스템의 **핵심 엔진**.
    *   `localStorage`를 이용한 데이터 로드/저장 (`dataLoad`, `saveData`).
    *   전역 변수 관리 및 공통 유틸리티(숫자 포맷팅, 단위 변환).
    *   `fn_collection()`: 모든 계산을 트리거하는 메인 루프.
    *   테마(다크모드) 및 사이드바 상태 관리.
*   **`assets/js/pages/*.js`**: 각 페이지별 독립된 계산 로직.
    *   `run_page_calculations()` 함수를 반드시 포함해야 하며, `global.js`에서 이를 호출합니다.
*   **`pages/*.html`**: 개별 계산기 페이지. Jekyll 프론트 매터를 통해 레이아웃, 제목, 필요한 스크립트를 정의합니다.
*   **`guides/index.html`**: 작성된 가이드 및 포스트 목록을 보여주는 페이지입니다.
*   **`_posts/`**: Markdown 형식의 가이드 및 정보성 포스트들이 저장되는 곳입니다. Jekyll의 블로그 기능을 활용합니다.

### 2. 핵심 기능 가이드

*   **데이터 지속성 (Persistence)**: 모든 입력 필드는 `localStorage`에 자동 저장됩니다. 새로운 입력 필드를 추가할 경우 `global.js`의 `firstValSetting`, `dataLoad`, `saveData` 함수에 해당 필드를 등록해야 합니다.
*   **실시간 계산**: `mainDiv` 내의 필드나 각 페이지의 입력 필드가 변경되면 `fn_collection()`이 호출되어 실시간으로 결과를 업데이트합니다.
*   **테마 시스템**: 다크모드와 라이트모드를 지원하며, `body` 태그의 `dark-mode` 클래스로 제어됩니다.
*   **단위 변환**: `formatKoreanUnit` 함수를 통해 대형 숫자를 '억/만' 단위의 한글로 변환하여 가독성을 높입니다.
*   **결과 공유**: `shareAsImage` 함수(html2canvas 기반)를 사용하여 특정 영역을 이미지로 캡처하고 공유할 수 있습니다.
*   **가이드 시스템**: `_posts`에 새로운 Markdown 파일을 추가하면 `guides/index.html`에 자동으로 리스팅됩니다. 파일명은 `YYYY-MM-DD-제목.md` 형식을 따라야 합니다.

## 🛠️ 개발 및 수정 지침 (Gemini CLI용)

### 1. 새로운 계산기 페이지 추가 프로세스
1.  `pages/` 디렉토리에 새로운 `.html` 파일 생성 (예: `new_calc.html`).
    *   프론트 매터에 `layout: default`, `title`, `scripts: [pages/new_calc.js]` 설정.
2.  `assets/js/pages/` 디렉토리에 해당 스크립트 생성 (예: `new_calc.js`).
    *   `function run_page_calculations() { ... }` 내부에 로직 작성.
3.  `_includes/header.html`의 내비게이션 메뉴(`nav`)에 새 링크 추가.
    *   `data-keywords` 속성에 검색용 키워드 명시.

### 2. 새로운 가이드 포스트 추가 프로세스
1.  `_posts/` 디렉토리에 `YYYY-MM-DD-파일명.md` 형식으로 파일 생성.
2.  프론트 매터에 `layout: post`, `title`을 작성합니다.
3.  Markdown 문법을 사용하여 본문을 작성합니다.

### 2. 공통 입력 필드 추가 프로세스
1.  `_includes/header.html`의 `mainDiv`에 HTML 요소 추가.
2.  `global.js` 상단에 전역 변수 선언.
3.  `global.js`의 `firstValSetting`에 기본값 설정.
4.  `global.js`의 `dataLoad` 및 `saveData`에 저장/로드 로직 추가.
5.  `global.js`의 `setNumber`에서 전역 변수에 값 할당.

### 3. 스타일 수정
*   **`assets/css/index.css`**: 계산기 관련 주요 스타일(테이블, 입력창 등)이 정의되어 있습니다.
*   **`simpleTable` 클래스**: 깔끔한 표 디자인을 위해 이 클래스를 활용하십시오.

## ⚠️ 주의사항
*   **상대 경로 사용**: Jekyll의 `{{ site.baseurl }}`을 활용하여 모든 리소스 경로를 처리하십시오.
*   **의존성**: `jQuery`를 기반으로 작동하며, `html2canvas` 및 `Kakao SDK`를 사용합니다.
*   **순수 JS**: 서버 측 로직이 없으므로 모든 계산은 브라우저에서 완결되어야 합니다.
*   **DOM 체크**: `global.js`는 모든 페이지에서 실행되므로, 특정 페이지 전용 요소를 조작할 때는 반드시 해당 요소의 존재 여부(`if ($("#element").length > 0)`)를 확인하십시오.