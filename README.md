# Antimatter Dimensions: Endgame 한국어판

[Antimatter Dimensions: Endgame Update](https://github.com/Supersonic-Seven/AntimatterDimensionsEndgameUpdate)의
GitHub 포크를 기반으로 SameMa가 번역하고 유지보수하는 비공식·비상업 팬 프로젝트입니다.
원작, Endgame 및 ADKorean 제작진과 공식 제휴되거나 공식 승인을 받은 배포판은 아닙니다.

- 플레이하기: <https://gyeol0710.github.io/antimatter-dimensions-endgame-korean/>
- 한국어 패치 소스: <https://github.com/gyeol0710/antimatter-dimensions-endgame-korean>
- 기준 버전: Endgame Update v1.2-patch-8 · 한국어 패치 업데이트: 2026-09-08

> **스포일러 안내:** 후반부 콘텐츠와 관련된 이름은 `████`로 가렸습니다.

## 한글패치 내용

- 기본 진행부터 오리지널 엔딩 이후의 추가 콘텐츠까지 탭, 버튼, 설명, 업그레이드와 도움말을 전반적으로 번역했습니다.
- 일반·비밀 도전과제의 이름과 달성 조건을 번역했습니다.
- 등장인물 대사, 초반 인트로와 엔딩 연출 문구를 번역했습니다.
- 글리프를 포함한 후반부 자원·업그레이드·필터 시스템과 `████` 이후 해금되는 추가 콘텐츠를 번역했습니다.
- 모달, 툴팁, 알림, 통계, 옵션, 저장·불러오기와 자동 백업 화면을 번역했습니다.
- 뉴스 문구도 대부분 번역했습니다. 원문의 농담, 코드, URL과 글자 변형 연출은 필요한 경우 그대로 보존했습니다.
- 날짜, 수량 단위, 띄어쓰기, 맞춤법, 조사와 동적 문장의 어색한 표현을 한국어에 맞게 교정했습니다.
- ADKorean에서 잘 번역된 문구는 참고하거나 계승하고, Endgame에서 추가된 콘텐츠는 새로 번역했습니다.

## 의도적으로 영어를 유지한 부분

- 후반부 등장인물과 일부 고유명사는 원문의 영어 표기를 유지했습니다.
- Automator의 명령어와 문법은 스크립트 호환성을 위해 영어로 유지했습니다. 도움말, 오류 메시지, 알림과 편집기 UI는 한국어로 번역했습니다.
- 게임 내 약어, 수식, 내부 코드 형식과 일부 말장난은 의미가 훼손되지 않도록 원문을 유지했습니다.
- 게임의 기존 영문 변경 내역(Changelog)은 현재 번역 대상에서 제외했습니다.

## 호환성과 품질 검사

- 표시 문구와 내부 식별자를 분리해 번역 변경이 게임 로직이나 세이브 형식에 영향을 주지 않도록 정리했습니다.
- 구형 영문 세이브의 도전과제 정보와 기존 한국어판 세이브를 불러올 수 있도록 호환 처리를 추가했습니다.
- 번역 문자열, 내부 구조, Automator 템플릿, 저장 키와 배포 파일을 자동 검사한 뒤 GitHub Pages에 배포합니다.

## 플레이 전 안내

- 세이브는 브라우저에 저장됩니다. 중요한 진행 상황은 옵션에서 세이브를 파일로 내보내 별도로 보관하는 것을 권장합니다.
- 시크릿 모드는 모든 시크릿 창을 닫으면 저장 데이터가 사라질 수 있으므로 권장하지 않습니다.
- 현재 GitHub Pages판에서는 클라우드 저장과 상점 기능을 지원하지 않습니다.

## 크레딧과 출처

- 원작: [Hevipelle 및 Antimatter Dimensions 기여자](https://github.com/IvarK/AntimatterDimensionsSourceCode)
- Endgame: [Supersonic Seven 및 Endgame 기여자](https://github.com/Supersonic-Seven/AntimatterDimensionsEndgameUpdate)
- 기존 한국어 번역 일부 재사용·용어 참고:
  [Seonjisoup621(Jihuu621)의 ADKorean](https://github.com/Jihuu621/ADKorean)
- 한국어 번역 및 유지보수: SameMa

이 프로젝트는 ADKorean의 일부 한국어 문구를 재사용하고, 기존 용어 선택을 참고했습니다. 게임 로직과
Endgame 고유 콘텐츠의 의미는 현재 Endgame 코드를 기준으로 유지합니다. 자세한 번역 원칙과 기준 리비전은
[LOCALIZATION.md](LOCALIZATION.md)를 참고하세요.

## 로컬 실행

[Node.js](https://nodejs.org/)를 설치한 뒤 저장소 루트에서 다음 명령을 실행합니다.

```sh
npm ci
npm run serve
```

터미널에 표시되는 로컬 주소로 접속하면 됩니다. 소스 변경은 개발 서버에 반영되므로 일반적으로 서버를
재시작하지 않고 페이지를 새로고침하면 확인할 수 있습니다.

## 검사와 빌드

한국어 패치 전용 검사와 프로덕션 빌드는 다음 순서로 실행합니다.

```sh
npm run check:ko
npm run test:localization:ko
npm run test:release-safety
npm run build:release
```

빌드 결과는 `dist/`에 생성되며, 루트의 `LICENSE`와 `ATTRIBUTION.md`도 배포 결과에 자동으로 포함됩니다.

## 라이선스

원작과 Endgame의 저작권 고지 및 MIT 허가문은 [LICENSE](LICENSE)에 보존되어 있습니다. 수정본을 복제하거나
배포할 때도 해당 고지와 허가문을 함께 유지해야 합니다. 프로젝트별 출처와 감사 표기는
[ATTRIBUTION.md](ATTRIBUTION.md)를 참고하세요. 포함된 외부 라이브러리, 글꼴, 이미지 및 음원에는 각
저작권자와 별도 라이선스가 적용될 수 있습니다.
