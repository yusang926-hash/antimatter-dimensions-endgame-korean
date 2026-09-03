# 한국어 현지화 정책

이 저장소는 Antimatter Dimensions: Endgame의 비공식·비상업 한국어판입니다.
사용자에게 표시되는 문자열은 한국어로 번역하되 게임 로직, 수치, ID, 저장 스키마와 내부 키는
Endgame 정본의 의미를 유지합니다.

## 공개 기준 소스

- Endgame 비교 기준
  - 저장소: <https://github.com/Supersonic-Seven/AntimatterDimensionsEndgameUpdate>
  - 리비전: `796a911c74a8e55e345e2e15480f31ed5b590237` (Endgame Update v1.2.0)
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
