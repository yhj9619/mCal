# mCal (MapleStory Calculator)

이 프로젝트는 메이플스토리 게임에 필요한 다양한 계산 기능을 제공하는 웹 기반 계산기 시스템입니다. 현재 이 시스템은 정적 웹사이트 형태로 GitHub Pages를 통해 배포됩니다.

## 🚀 시작하기

이 프로젝트는 Ruby 기반의 정적 사이트 생성기인 [Jekyll](https://jekyllrb.com/)을 사용하여 관리됩니다. 로컬 환경에서 사이트를 개발하고 테스트하려면 다음 단계를 따라 Ruby 및 Jekyll을 설치해야 합니다.

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

### 2. 프로젝트 실행

Jekyll 및 Bundler 설치가 완료되면, 이 프로젝트의 루트 디렉토리(`D:\메산기\mCal\`)로 이동하여 다음 명령어를 실행하여 로컬 서버를 시작할 수 있습니다.

1.  프로젝트 디렉토리로 이동:
    ```shell
    cd D:\메산기\mCal\
    ```

2.  Jekyll 서버 실행:
    ```shell
    bundle install   # 프로젝트에 필요한 gem들을 설치 (최초 1회 또는 gemfile 변경 시)
    bundle exec jekyll serve
    ```
    *   `bundle install`은 `Gemfile`에 정의된 모든 Gem들을 설치합니다.
    *   `bundle exec jekyll serve` 명령을 실행하면, 로컬 개발 서버가 시작되고 웹 브라우저에서 `http://127.0.0.1:4000` (또는 터미널에 표시되는 주소)로 접속하여 사이트를 미리 볼 수 있습니다.

## 📦 프로젝트 구조 (Jekyll 전환 예정)

현재 이 시스템은 단일 `index.html` 파일로 구성된 클라이언트 측 단일 페이지 애플리케이션(SPA) 형태입니다. 향후 유지보수성 및 확장성을 위해 각 계산기 기능별로 별도의 페이지와 URL을 갖는 다중 페이지 구조로 [Jekyll](https://jekyllrb.com/)을 활용하여 전환할 예정입니다.

자세한 시스템 구조는 `GEMINI.md` 파일을 참조해주세요.
