# 한국어 현지화 정책

이 저장소는 Antimatter Dimensions: Endgame의 비공식·비상업 한국어판입니다.
사용자에게 표시되는 문자열은 한국어로 번역하되 게임 로직, 수치, ID, 저장 스키마와 내부 키는
Endgame 정본의 의미를 유지합니다.

## 공개 기준 소스

- Endgame 비교 기준
  - 저장소: <https://github.com/Supersonic-Seven/AntimatterDimensionsEndgameUpdate>
  - 리비전: `b7d4bfd2fbd66a3c4f8b73a6a9a7f79536165745` (Endgame Update v1.2-patch-8, 한국어 패치 반영일 2026-09-08)
- ADKorean 번역 참고 기준
  - 저장소: <https://github.com/Jihuu621/ADKorean>
  - 영문 기준: `7767d453ee01d1b2f906dc98e90078140c0bed98`
  - 한국어 기준: `2747c4272ced074a3f68f251fd7e96cfc0c12ec0`
- 용어 정본: `localization/ko-KR/glossary.json`
- ADKorean 재사용 보고서: `localization/ko-KR/reuse-report.json`

## 번역 원칙

1. 사용자에게 표시되는 문자열만 번역한다.
2. Endgame에서 의미가 달라진 내용은 현재 Endgame의 의미를 우선한다.
3. `${...}`, `{{ ... }}`, HTML, placeholder와 의미 있는 숫자는 보존한다.
4. 저장 필드, 내부 key, enum, CSS 클래스와 Automator 문법은 번역하지 않는다.
5. ADKorean 문구를 일부 재사용하고 기존 용어 선택을 참고한다.
6. 보호 토큰이나 구조를 의도적으로 변경할 때는 정확한 해시, 사유와 제거 조건을 기록한다.
7. `Infinity Power`는 문맥 전체에서 `무한력`으로 통일한다.

## v1.2 동기화

Endgame v1.1 patch-5 기준 `05f31bbeb`부터 v1.2 기준 `796a911c7`까지의 변경 경로 114개를
검토했습니다. 런타임에서 참조하지 않는 크레딧 음원 2개를 제외한 코드·UI·스타일·이미지 112개 경로를
반영하고, 기존 한국어판의 저장 호환 마이그레이션과 내부 키를 보존했습니다.

## v1.2-patch-8 동기화

`796a911c7..b7d4bfd2f`의 변경 파일 13개를 모두 반영했습니다. 게임 로직 변경은 원본 패치와 동일하며,
기존 한국어 번역과 저장 호환 처리를 유지했습니다. Teresa 확장팩의 퍼크 상점 유지 설명을 번역하고,
정보 창 버전 옆에 한국어 패치 반영일을 작게 표시합니다.

CI는 직전 검증 완료 배포 `b23a2b07ea79764bcdb739ca453fff22ba2f4397`을 고정 감사 기준으로 사용하며,
대조한 원본 수정과 표시 변경만 정확한 구조·보호 토큰 해시로 허용합니다.

## 검증

```sh
npm run check:ko
npm run check:ko:structure
npm run test:localization:ko
npm run test:v12-regressions
npm run test:release-safety
npm run build:release
```

저작권과 출처는 `LICENSE` 및 `ATTRIBUTION.md`를 따릅니다.
