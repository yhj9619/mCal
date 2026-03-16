# 메이플스토리 + 계산기 (mCal) 시스템 아키텍처

"메이플스토리 + 계산기" (mCal) 시스템은 기존의 **클라이언트 측 단일 페이지 애플리케이션(SPA)**에서 [Jekyll](https://jekyllrb.com/) 기반의 **다중 페이지 정적 웹사이트**로 성공적으로 전환되었습니다.
이 시스템은 사용자의 웹 브라우저 내에서 전적으로 작동하며, Jekyll의 빌드 과정을 통해 생성된 정적 파일을 제공하는 것 외에, 계산 또는 동적 콘텐츠 생성을 담당하는 서버 측 구성 요소는 없습니다.

## 주요 구성 요소 및 역할 (Jekyll 기반):

### 1. HTML 파일 구조 (프레젠테이션 및 구조)

Jekyll의 템플릿 시스템을 활용하여 HTML 파일 구조가 재구성되었습니다.

*   **`_layouts/default.html` (기본 레이아웃):**
    *   모든 페이지에 적용되는 공통 HTML 구조(<html>, <head>, <body> 태그)와 외부 리소스(CSS, 기본 JavaScript 라이브러리) 로딩을 담당합니다.
    *   `{% include header.html %}`와 `{% include footer.html %}`를 통해 공통 헤더와 푸터를 포함합니다.
    *   `{{ content }}` 위치에 각 페이지의 고유한 콘텐츠가 삽입됩니다.
    *   `{{ site.baseurl }}`을 활용하여 GitHub Pages 환경에 맞는 상대 경로를 자동으로 처리합니다.
*   **`_includes/header.html` (공통 헤더):**
    *   사이트 로고, 고정된 공통 입력 항목(`mainDiv`), 그리고 모든 페이지에서 사용되는 내비게이션 메뉴(`nav`)를 포함합니다.
    *   내비게이션 메뉴에는 **메뉴 검색 입력 필드**와 **돋보기 아이콘**이 추가되었습니다.
    *   각 메뉴 링크(`<a>` 태그)에는 **`data-keywords` 속성**이 추가되어, 동의어 검색 기능을 지원합니다.
*   **`_includes/footer.html` (공통 푸터):**
    *   사이트의 저작권 정보 등 공통 푸터 내용을 포함합니다.
*   **`index.html` (랜딩 페이지):**
    *   사이트의 메인 화면 역할을 하며, `_layouts/default.html` 레이아웃을 사용합니다.
    *   환영 메시지, 좌측 공통 입력 항목(`mainDiv`)에 대한 상세 안내, 그리고 사이드바를 통한 메뉴 이동 방법을 명시하는 문구로 개선되었습니다.
*   **`pages/*.html` (계산기 페이지):**
    *   기존 `index.html`의 각 계산기 섹션(`section` 태그)이 `/pages/` 디렉토리 아래의 별도 HTML 파일로 분리되었습니다. 현재 다음 페이지들이 존재합니다:
        *   `bunbae.html` (보상분배계산기)
        *   `juHeunVal.html` (주흔&아즈모스코인가치)
        *   `juhwa.html` (골드주화가치)
        *   `mesoMarket.html` (메소와 메포 구매)
        *   `mesoToWon.html` (아이템의 현금가치)
        *   `mvpCost.html` (MVP작 비용 계산기)
        *   `pcRoom.html` (피시방 효율)
        *   `saleProfit.html` (메소판매차익)
        *   `valueOf.html` (과거와 현재 아이템 가치)
    *   `mesoMarket.html` 페이지에는 설명 텍스트가 보강되었으며, `유형정보` 아코디언이 추가되고 해당 정보는 `simpleTable` 스타일의 표 형태로 제공됩니다.
    *   각 페이지는 `_layouts/default.html` 레이아웃을 사용하며, 페이지 고유의 `title`, `description` 및 해당 페이지에 필요한 JavaScript 파일(`scripts`)을 프론트 매터(Front Matter)에 명시합니다.

### 2. `assets/css/` (스타일링)

*   **`main.css` 및 `index.css`**: 전반적인 시각적 모양, 레이아웃 및 계산기 요소에 대한 사용자 지정 스타일시트입니다.
*   **`fontawesome-all.min.css`**: 아이콘 라이브러리를 제공합니다.
*   **외부 CSS**: `tui-grid.css`와 같은 외부 스타일시트를 통합합니다.
*   **스타일 개선**:
    *   **메뉴 검색 입력 필드**: 크기, 색상, 패딩 등 스타일이 조정되어 입력된 텍스트의 가시성이 향상되고 돋보기 아이콘과 조화를 이룹니다.
    *   **테이블 디자인**: PC 화면의 테이블(`table`, `th`, `td` 등) 디자인이 "깔끔하고 모던한" 스타일로 전면 개편되었습니다. (부드러운 테두리, 배경색, 패딩, 호버 효과 등 적용) 특히 `th` 부분은 더 진한 회색으로 변경되었고, `simpleTable` 클래스를 통해 얇고 심플한 새로운 테이블 스타일이 추가되었습니다.

### 3. `assets/js/` (클라이언트 측 로직 및 상호 작용)

JavaScript 파일 구조가 다중 페이지 환경에 맞춰 리팩토링되었습니다.

*   **`global.js` (공통 전역 로직):**
    *   모든 페이지에서 공통적으로 사용되는 전역 변수(예: `vPresentMeso`, `vAuctionCharge` 등), 유틸리티 함수(숫자 포맷팅 `customFormatNumber`, 콤마 처리 `onlyNumberWithComma` 등)를 포함합니다.
    *   **데이터 지속성**: `mainDiv` 및 다른 페이지별 입력 필드들의 값들을 `localStorage`에 저장하고 로드하는 `dataLoad()`, `saveData()`, `firstValSetting()`, `clearData()` 함수가 포함되어 있어, 사용자가 페이지를 이동해도 입력 값이 유지됩니다. `dataLoad()`와 `firstValSetting()` 함수는 DOM 요소의 존재 여부를 확인하는 로직이 추가되어 안정성을 높였습니다.
    *   `$(document).ready()` 시 초기 계산(`fn_collection()`)을 호출하며, `mainDiv` 입력 필드의 변경 이벤트에 반응하여 계산을 재실행합니다.
    *   **메뉴 검색 기능**: `_includes/header.html`에 추가된 `menuSearchInput` 필드에 대한 `keyup` 이벤트 리스너를 포함하며, `data-keywords` 속성을 활용하여 메뉴 항목을 필터링하고 동의어 검색을 지원합니다.
    *   **공통 아코디언 기능**: `.accordion-header` 클래스를 가진 모든 제목에 대해 클릭 시 다음 `.accordion-content`를 토글하고 아이콘을 전환하는 공통 아코디언 로직이 추가되었습니다.
*   **`main.js` (UI/UX 및 반응형 동작):**
    *   웹사이트의 반응형 디자인 처리, 페이지 로딩 애니메이션 관리를 담당합니다.
    *   모바일 환경에서 사이드바를 토글하는 `#headerToggle` 버튼 생성 및 `#header` 패널 초기화 로직을 포함합니다.
    *   기존 단일 페이지 스크롤링 (`scrollex`, `scrolly`) 관련 로직은 다중 페이지 환경에 맞춰 **비활성화**되었습니다. (`Syntax error` 발생 방지)
*   **`assets/js/pages/*.js` (페이지별 로직):**
    *   각 계산기 페이지에 특화된 계산 로직을 포함합니다. 현재 다음 스크립트들이 존재합니다:
        *   `bunbae.js`
        *   `juHeunVal.js`
        *   `juhwa.js`
        *   `mesoMarket.js`
        *   `mesoToWon.js`
        *   `mvpCost.js`
        *   `pcRoom.js`
        *   `saleProfit.js`
        *   `valueOf.js`
    *   `run_page_calculations()` 함수 내에 해당 페이지의 핵심 계산 로직과 페이지별 입력 필드에 대한 이벤트 리스너가 캡슐화되어, `global.js`의 `fn_collection()` 호출에 의해 실행됩니다.

### 4. `images/` (시각적 자산)

*   배너, 아바타 및 특정 계산기 아이콘(`calculator.png`, `mapleIcon.png` 등)에 사용되는 다양한 이미지 파일을 포함합니다.

## 전반적인 애플리케이션 흐름 (Jekyll 다중 페이지):

1.  **페이지 요청:** 사용자가 특정 계산기 페이지 URL(예: `https://mesangi.com/pages/mesoMarket.html`)을 요청합니다.
2.  **Jekyll 빌드 (GitHub Pages):** GitHub Pages 서버에서 Jekyll이 해당 요청에 맞는 `pages/*.html` 파일과 `_layouts/default.html`을 결합하여 최종 HTML을 빌드하고 제공합니다.
3.  **리소스 로딩:** 브라우저는 제공된 HTML 구조를 로드하고, `_layouts/default.html`에 명시된 공통 CSS 파일, `global.js`를 로드합니다. 또한 해당 페이지의 프론트 매터에 명시된 페이지별 JavaScript 파일(`assets/js/pages/xxx.js`)도 로드합니다.
4.  **UI/JS 초기화:**
    *   `main.js`가 반응형 UI 및 모바일 사이드바 토글 등을 초기화합니다.
    *   `global.js`가 실행되어 `$(document).ready()` 내에서 `firstValSetting()` (기본값 설정), `dataLoad()` (localStorage에서 값 로드), `메뉴 검색 기능` 및 `공통 아코디언 기능`을 초기화하고, `fn_collection()`을 호출합니다.
5.  **데이터 및 계산 처리:**
    *   `fn_collection()`은 `setNumber()`를 호출하여 `mainDiv`의 입력 필드 값을 전역 변수에 할당합니다.
    *   이후 `run_page_calculations()` (해당 페이지의 JS 파일에 정의된) 함수를 호출하여 페이지별 계산을 수행하고 결과를 DOM에 표시합니다.
6.  **사용자 상호 작용:** 사용자가 `mainDiv` 또는 페이지별 입력 필드를 변경하면, `global.js` 또는 페이지별 JS의 이벤트 리스너가 이를 감지하여 `saveData()` (localStorage 저장) 및 `fn_collection()` (재계산)을 호출, 실시간으로 결과를 업데이트합니다.

이러한 구조는 각 계산기 기능의 독립성을 높여 유지보수 및 확장을 용이하게 하며, 웹사이트의 전반적인 반응성과 사용자 경험을 개선합니다.