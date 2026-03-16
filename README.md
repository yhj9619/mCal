# mCal (MapleStory Calculator)

이 프로젝트는 메이플스토리 게임에 필요한 다양한 계산 기능을 제공하는 웹 기반 계산기 시스템입니다.
기존 단일 페이지 애플리케이션(SPA) 형태에서 [Jekyll](https://jekyllrb.com/) 기반의 **다중 페이지 웹사이트**로 성공적으로 전환되었습니다.

## 🚀 시작하기

이 프로젝트는 Ruby 기반의 정적 사이트 생성기인 Jekyll을 사용하여 관리됩니다. 로컬 환경에서 사이트를 개발하고 테스트하려면 다음 단계를 따라 Ruby 및 Jekyll을 설치해야 합니다.

### 1. Ruby 및 DevKit 설치 (Windows 환경)

1.  **RubyInstaller 다운로드**:
    *   [RubyInstaller for Windows 다운로드 페이지](https://rubyinstaller.org/downloads/)로 이동합니다.
    *   **"WITH DEVKIT"**이라고 표시된 버전 중 **추천(Recommended)** 딱지가 붙은 버전을 다운로드하여 설치합니다. (예: `Ruby+Devkit 3.x.x-x (x64)`)
    *   설치 과정 중, `MSYS2 DevKit` 설치 프롬프트가 나타나면 `Enter` 키를 눌러 기본 설정으로 설치를 완료합니다.

2.  **Jekyll 및 Bundler 설치**:
    *   Ruby 설치가 완료되면, 시작 메뉴에서 `Start Command Prompt with Ruby`를 찾아 실행합니다.
    *   열린 명령 프롬프트 창에 아래 명령어를 입력하여 Jekyll과 Bundler(프로젝트 의존성 관리 도구)를 설치합니다.

    ```shell
    gem install jekyll bundler
    ```

3.  **설치 확인**:
    *   설치가 잘 되었는지 확인하기 위해, 같은 명령 프롬프트 창에서 아래 명령어들을 실행하여 각 도구의 버전이 표시되는지 확인합니다.

    ```shell
    ruby -v
    jekyll -v
    ```

### 2. Jekyll 프로젝트 환경 설정 (GitHub Pages 호환)

GitHub Pages에서 사이트가 올바르게 빌드되려면 `Gemfile`과 `Gemfile.lock` 파일이 필요합니다.

1.  **`Gemfile` 생성 및 내용 확인**: 프로젝트 루트에 `Gemfile` 파일이 존재하며, 다음 내용이 포함되어 있는지 확인합니다.
    ```ruby
    source "https://rubygems.org"

    group :jekyll_plugins do
      gem "github-pages"
    end

    gem "jekyll", "~> 3.9" # GitHub Pages의 Jekyll 버전과 호환되도록 명시 (현재 3.9.x)
    ```
2.  **`bundle install` 실행**: "Start Command Prompt with Ruby"에서 프로젝트 루트로 이동한 후 `bundle install` 명령을 실행하여 `Gemfile.lock` 파일을 생성합니다.

3.  **`_config.yml` 설정 확인**: `_config.yml` 파일에서 `baseurl` 설정이 현재 사이트 도메인에 맞게 `baseurl: ""` (예: `https://mesangi.com/`와 같은 루트 도메인인 경우)로 설정되어 있는지 확인합니다.

### 3. 프로젝트 실행

Jekyll 및 Bundler 설치와 환경 설정이 완료되면, 프로젝트의 루트 디렉토리로 이동하여 다음 명령어를 실행하여 로컬 서버를 시작할 수 있습니다.

```shell
bundle exec jekyll serve
```
*   `bundle exec jekyll serve` 명령을 실행하면, 로컬 개발 서버가 시작되고 웹 브라우저에서 `http://127.0.0.1:4000` (또는 터미널에 표시되는 주소)로 접속하여 사이트를 미리 볼 수 있습니다.

## 📦 프로젝트 구조 및 주요 변경사항

이 프로젝트는 이제 [Jekyll](https://jekyllrb.com/) 기반의 다중 페이지 웹사이트로 구조화되어 있습니다.

*   **다중 페이지 전환**: 기존 `index.html`의 각 계산기 섹션(`section` 태그)이 `pages/` 디렉토리 아래의 별도 HTML 파일로 분리되었습니다. 각 페이지는 고유한 URL을 가집니다.
*   **공통 레이아웃**: `_layouts/default.html`이 모든 페이지의 공통적인 구조(헤더, 푸터, 스크립트 로드)를 담당합니다.
*   **헤더/푸터 분리**: `_includes/header.html`에는 로고, 공통 입력 항목(`mainDiv`), 내비게이션 메뉴가, `_includes/footer.html`에는 저작권 정보가 분리되어 관리됩니다.
*   **JavaScript 리팩토링**:
    *   `assets/js/global.js`: 모든 페이지에서 공통적으로 사용되는 변수, `localStorage` 관리 로직, 유틸리티 함수(숫자 포맷팅 등), 그리고 전역 이벤트 리스너를 포함합니다.
    *   `assets/js/pages/*.js`: 각 계산기 페이지에 특화된 계산 로직과 이벤트 리스너를 `run_page_calculations()` 함수 내에 캡슐화합니다.
*   **메뉴 검색 기능**: 사이드바 내비게이션에 메뉴 검색 입력 필드가 추가되었으며, 입력되는 검색어(`data-keywords` 속성 활용)에 따라 메뉴 항목을 필터링하여 보여줍니다.
*   **테이블 디자인 개선**: PC 화면에서의 테이블 디자인이 "깔끔하고 모던한" 스타일로 개선되었습니다.
*   **모바일 호환성 강화**: 모바일 햄버거 버튼 및 `mainDiv` 값 유지 등 Jekyll 전환 과정에서 발생할 수 있었던 문제들이 해결되었습니다.

자세한 시스템 구조는 `GEMINI.md` 파일을 참조해주세요.
