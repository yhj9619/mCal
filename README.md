# mCal (메산기 - 메이플스토리 통합 계산기)

메산기(mCal)는 메이플스토리의 복잡한 재화 가치를 실시간 시세에 맞춰 정확하게 계산해 주는 웹 기반 통합 계산기입니다. [Jekyll](https://jekyllrb.com/)을 활용한 정적 사이트로 구축되어 있어 빠르고 안정적인 서비스를 제공합니다.

## ✨ 주요 기능

*   **다양한 계산기 지원**: 보상 분배, 주간 보스 시급, 큐브/아이템 현실 가치, 메소가치 비교 등 10종 이상의 전문 계산 기능 제공.
*   **실시간 데이터 유지**: `localStorage`를 활용하여 페이지를 이동하거나 새로고침해도 입력한 시세와 설정값이 유지됩니다.
*   **강력한 메뉴 검색**: '엠작', '주보', '주흔' 등 게임 내 약어를 포함한 키워드 검색으로 필요한 기능을 빠르게 찾을 수 있습니다.
*   **다크모드 지원**: 사용자의 눈 피로도 감소를 위한 시스템 및 수동 테마 전환 기능을 제공합니다.
*   **결과 이미지 공유**: `html2canvas`를 통해 계산 결과를 깔끔한 이미지로 캡처하여 클립보드 복사 및 즉시 공유가 가능합니다.
*   **한글 단위 도우미**: '억/만' 단위를 실시간으로 표시하여 큰 숫자 입력 시 발생할 수 있는 실수를 방지합니다.
*   **가이드 시스템**: 메이플스토리 이용에 도움이 되는 팁과 정보성 포스트를 제공합니다.

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

*   **`pages/`**: 각 계산기 기능의 HTML 페이지.
*   **`assets/js/global.js`**: 전역 상태 관리, 데이터 지속성, 공통 유틸리티(검색, 테마 등).
*   **`assets/js/pages/`**: 각 페이지별 독립된 계산 로직.
*   **`_posts/`**: Markdown 기반의 가이드 포스트.
*   **`_includes/`, `_layouts/`**: Jekyll 공통 컴포넌트 및 레이아웃.

## 🛠️ 기술 스택

*   **Frontend**: HTML5, CSS3, JavaScript (ES6+), jQuery
*   **Library**: [html2canvas](https://html2canvas.hertzen.com/), Kakao SDK, FontAwesome 5
*   **Framework**: [Jekyll](https://jekyllrb.com/) (Static Site Generator)

상세한 개발 지침 및 구조 설명은 `GEMINI.md` 파일을 참조하십시오.

---
**문의 및 제안**: [카카오톡 오픈채팅](https://open.kakao.com/me/mesangi)
