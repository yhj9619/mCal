# mCal (메산기 - 메이플스토리 통합 계산기)

메산기(mCal)는 메이플스토리의 복잡한 재화 가치를 실시간 시세에 맞춰 정확하게 계산해 주는 웹 기반 통합 계산기입니다. [Jekyll](https://jekyllrb.com/)을 활용한 정적 사이트로 구축되어 있어 빠르고 안정적인 서비스를 제공합니다.

## ✨ 주요 기능

*   **다양한 계산기 지원**: 보상 분배, MVP작 비용, 주간 보스 시급, 아이템 현금 가치 등 10종 이상의 계산 기능 제공.
*   **게임 가이드 및 팁**: 메이플스토리 이용에 도움이 되는 다양한 정보성 포스트 제공 (`_posts` 관리).
*   **실시간 데이터 유지**: `localStorage`를 활용하여 페이지를 이동하거나 새로고침해도 입력한 시세와 설정값이 유지됩니다.
*   **다크모드 지원**: 사용자의 가독성을 위해 라이트/다크 모드 전환 기능을 제공합니다.
*   **메뉴 검색 및 동의어 지원**: 복잡한 메뉴를 키워드 검색(예: '쌀먹', '엠작' 등)으로 빠르게 찾을 수 있습니다.
*   **한글 단위 도우미**: 큰 숫자를 입력할 때 실시간으로 '억/만' 단위를 표시하여 입력 실수를 방지합니다.
*   **결과 이미지 공유**: 계산 결과를 이미지로 캡처하여 클립보드에 복사하거나 즉시 공유할 수 있습니다.

## 🚀 개발 환경 설정

본 프로젝트는 Ruby 기반의 Jekyll을 사용하여 관리됩니다.

### 1. 필수 소프트웨어 설치
*   **Ruby**: [RubyInstaller](https://rubyinstaller.org/) (WITH DEVKIT 버전 권장)
*   **Jekyll & Bundler**:
    ```shell
    gem install jekyll bundler
    ```

### 2. 프로젝트 실행
루트 디렉토리에서 다음 명령어를 실행하여 로컬 서버를 구동합니다.
```shell
bundle install
bundle exec jekyll serve
```
웹 브라우저에서 `http://127.0.0.1:4000`으로 접속하여 결과를 확인하십시오.

## 📂 프로젝트 구조

*   **`_includes/`, `_layouts/`**: Jekyll 템플릿 컴포넌트 및 기본 레이아웃.
*   **`assets/js/global.js`**: 전역 상태 관리, 데이터 지속성, 공통 유틸리티 포함.
*   **`assets/js/pages/`**: 각 페이지별 독립된 계산 로직 스크립트.
*   **`pages/`**: 개별 계산기 HTML 페이지.
*   **`assets/css/`**: 전역 및 페이지별 스타일시트.

## 🛠️ 기여 방법 및 기술 스택

*   **Language**: HTML5, CSS3, JavaScript (ES6+)
*   **Library**: jQuery, html2canvas, Toast UI Grid (일부 사용)
*   **Framework**: Jekyll (Static Site Generator)

새로운 계산기를 추가하거나 기존 로직을 수정하려면 `GEMINI.md` 파일의 상세 개발 지침을 참조하십시오.

---
**문의 및 제안**: [카카오톡 오픈채팅](https://open.kakao.com/me/mesangi)
