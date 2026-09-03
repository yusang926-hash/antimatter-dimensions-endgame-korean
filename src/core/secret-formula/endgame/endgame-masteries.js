export const endgameMasteries = [
  {
    id: 11,
    cost: 1,
    requirement: [],
    reqType: EM_REQUIREMENT_TYPE.ALL,
    description: () => `엔드게임 횟수마다 분당 퍼크 포인트를 ${formatInt(1)}개 생성합니다`,
    effect: () => player.disablePostReality ? 0 : player.endgames,
    formatEffect: value => `${formatHybridSmall(value, 3)}/분`
  },
  {
    id: 21,
    cost: 2,
    requirement: [11],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `오토메이터 속도가 ${formatPercents(0.006, 1, 1)}가 아니라 ${formatPercents(0.06)}씩 증가합니다`
  },
  {
    id: 22,
    cost: 2,
    requirement: [11],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `자동 영원 도전이 해금된 상태로 시작하고, 소요 시간을 ${formatInt(60)}으로 나눕니다`,
    effect: () => player.disablePostReality ? 1 : 60
  },
  {
    id: 31,
    cost: 2,
    requirement: [21],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `현실 ${formatInt(100)}회를 보유한 채 엔드게임을 시작합니다`,
    effect: () => player.disablePostReality ? 0 : 100
  },
  {
    id: 32,
    cost: 2,
    requirement: [22],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `리얼리티 머신 ${formatInt(1000000)}개를 보유한 채 엔드게임을 시작합니다`,
    effect: () => player.disablePostReality ? 0 : 1000000
  },
  {
    id: 41,
    cost: 3,
    requirement: [31],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `도전과제 "나는 스피드다"의 보상을 ${formatPercents(1)} 확률로 강화합니다`,
    effect: () => player.disablePostReality ? 0.1 : 1
  },
  {
    id: 42,
    cost: 3,
    requirement: [32],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "모든 현실 업그레이드가 해금된 상태로 엔드게임을 시작합니다"
  },
  {
    id: 51,
    cost: 4,
    requirement: [41],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `잔재에 따라 은하 위력에 배율을 적용합니다`,
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Decimal.log10(Currency.remnants.value.add(1)).add(1), 0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 52,
    cost: 6,
    requirement: [41, 42],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `은하가 ${formatPercents(0.1)} 더 강해집니다`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 53,
    cost: 4,
    requirement: [42],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `무료 테서랙트를 하나 얻습니다`,
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    id: 61,
    cost: 4,
    requirement: [52],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "잔재 공식을 개선합니다(Pelle 하위 탭의 잔재 획득 요소 참고)"
  },
  {
    id: 71,
    cost: 7,
    requirement: [61],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `엔드게임 시 기본 글리프를 종류마다 ${formatInt(5)}개씩 보유하고 시작합니다. 각 글리프는 효과 ${formatInt(4)}개, 희귀도 ${formatPercents(1)}이며 레벨은 엔드게임 횟수와 최고 글리프 레벨을 기반으로 합니다`,
    effect: () => player.disablePostReality ? DC.D1 : (EffarigUnlock.endgame.canBeApplied ? player.records.bestEndgame.glyphLevel : new Decimal(1 - ((1 / Math.max(player.endgames, 1)) ** 0.1)).times(player.records.bestEndgame.glyphLevel)),
    formatEffect: value => formatHybridSmall(value, 3)
  },
  {
    id: 81,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `무한 업그레이드 ${formatInt(23)}의 소프트캡을 ${formatPercents(0.5)}만큼 약화합니다`
  },
  {
    id: 82,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `무한 차원 압축 규모를 ${formatPercents(0.05)}만큼 감소시킵니다`,
    effect: () => player.disablePostReality ? 1 : 0.95
  },
  {
    id: 83,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `시간 차원 압축 규모를 ${formatPercents(0.05)}만큼 감소시킵니다`,
    effect: () => player.disablePostReality? 1 : 0.95
  },
  {
    id: 84,
    cost: 4,
    requirement: [71],
    reqType: EM_REQUIREMENT_TYPE.COMPRESSION_PATH,
    description: () => `셀레스티얼 물질 소프트캡을 ${formatPercents(0.1)}만큼 감소시킵니다`,
    effect: () => player.disablePostReality ? 1 : 0.9
  },
  {
    id: 91,
    cost: 7,
    requirement: [81],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `엔드게임 횟수에 따라 무한 도전 ${formatInt(8)} 보상의 하드캡을 늦춥니다`,
    effect: () => player.disablePostReality ? 1 : player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 92,
    cost: 7,
    requirement: [82],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "엔드게임 횟수에 따라 무한 차원 압축 시작점을 늦춥니다",
    effect: () => player.disablePostReality ? 1 : player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 93,
    cost: 7,
    requirement: [83],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "엔드게임 횟수에 따라 시간 차원 압축 시작점을 늦춥니다",
    effect: () => player.disablePostReality ? 1 : player.endgames,
    formatEffect: value => formatPow(value, 2)
  },
  {
    id: 94,
    cost: 7,
    requirement: [84],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "엔드게임 횟수에 따라 셀레스티얼 물질 소프트캡 시작점을 늦춥니다",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(10, Decimal.pow(player.endgames, 0.25)),
    formatEffect: value => formatX(value, 2)
  },
  {
    id: 101,
    cost: 6,
    requirement: [91],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `반물질 지수를 ${format(1.01, 2, 2)}제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.01
  },
  {
    id: 102,
    cost: 6,
    requirement: [92],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `무한력 변환율을 ${format(1.01, 2, 2)}제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.01
  },
  {
    id: 103,
    cost: 6,
    requirement: [93],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "무료 틱스피드 요구량 배율에 제곱근을 적용합니다",
    effect: () => player.disablePostReality ? 1 : 0.5
  },
  {
    id: 104,
    cost: 6,
    requirement: [94],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `셀레스티얼 물질 변환 지수를 ${formatPercents(0.1)}만큼 증가시킵니다`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 111,
    cost: 5,
    requirement: [101, 102, 103, 104],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "허수 머신이 항상 최대치가 됩니다"
  },
  {
    id: 112,
    cost: 4,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "현실 파편 보유량이 팽창된 시간 획득량에 배율을 적용합니다",
    effect: () => player.disablePostReality ? DC.D1 : Currency.realityShards.value.plus(1),
    formatEffect: value => formatX(value, 2)
  },
  {
    id: 121,
    cost: 7,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "Pelle에서 글리프 슬롯을 하나 더 얻습니다",
    effect: 1
  },
  {
    id: 122,
    cost: 7,
    requirement: [111],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `은하 생성기 불안정성을 ${formatInt(1)}만큼 감소시킵니다`,
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    id: 131,
    cost: 8,
    requirement: [121, 122],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `허수 업그레이드 "엔트로피 응축"의 효과를 개선합니다`,
  },
  {
    id: 141,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `무한 포인트 획득량을 ${format(1.2, 2, 1)}제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    id: 142,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `영원 포인트 획득량을 ${format(1.3, 2, 1)}제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.3
  },
  {
    id: 143,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `리얼리티 머신 획득량을 ${format(1.4, 2, 1)}제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.4
  },
  {
    id: 144,
    cost: 4,
    requirement: [131],
    reqType: EM_REQUIREMENT_TYPE.CURRENCY_PATH,
    description: () => `허수 머신 획득량을 ${format(1.1, 2, 1)}제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 151,
    cost: 3,
    requirement: [141],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `무한 포인트 공식을 개선합니다`,
    effect: () => player.disablePostReality ? Effects.min(308, Achievement(103), TimeStudy(111)) : Effects.min(308, Achievement(103), TimeStudy(111)) / ((Decimal.log10(Decimal.log10(Currency.celestialPoints.value.plus(1)).add(1)).div(20)).add(1)).toNumber(),
    formatEffect: value => `log(x)/${format(Effects.min(308, Achievement(103), TimeStudy(111)), 2, 2)} ➜ log(x)/${format(value, 2, 2)}`
  },
  {
    id: 152,
    cost: 3,
    requirement: [142],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `영원 포인트 ${formatX(5)} 배율의 지수 스케일링을 제거합니다`
  },
  {
    id: 153,
    cost: 3,
    requirement: [143],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `허수 업그레이드 "타원형 물질성"의 효과를 ${formatPercents(0.5)}만큼 증가시킵니다`,
    effect: () => player.disablePostReality ? 1 : 1.5
  },
  {
    id: 154,
    cost: 3,
    requirement: [144],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `허수 업그레이드 "정보의 덧없음" 효과를 ${formatInt(10)}제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    id: 161,
    cost: 5,
    requirement: [151, 152, 153, 154],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "보유한 특이점에 따라 일괄 증가당 특이점 획득량을 개선합니다",
    effect: () => player.disablePostReality ? DC.D0 : Decimal.floor((new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(1e50), 1, 1e120))).div(5)).add(
      new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(1e170), 1, 1e250))).div(10)).add(
      new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(new Decimal("1e420")), 1, new Decimal("1e2500")))).div(100)).add(
      Decimal.pow(new Decimal(Decimal.log10(Decimal.clamp(Currency.singularities.value.div(new Decimal("1e2920")), 1, new Decimal("1e390625")))), 0.25)).add(1)),
    cap: DC.E2,
    formatEffect: value => `+${format(value, 2)}`
  },
  {
    id: 171,
    cost: 7,
    requirement: [161],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모멘텀이 ${formatInt(10)}배 빠르게 증가합니다`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    id: 181,
    cost: 175000,
    requirement: [171],
    reqType: EM_REQUIREMENT_TYPE.EXPANDED,
    description: () => `은하 생성기의 기본 불안정성을 다시 ${formatInt(1)}만큼 감소시킵니다`,
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    id: 191,
    cost: 50000,
    requirement: [181],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "이제 도전과제 배율이 셀레스티얼 차원에 영향을 줍니다",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow10(Decimal.pow(Achievements.power.max(1).log10(), 0.5))
  },
  {
    id: 192,
    cost: 50000,
    requirement: [181],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "이제 도전과제 배율이 감소된 비율로 신성 차원에 영향을 줍니다",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow10(Decimal.pow(Achievements.power.max(1).log10(), 0.25))
  },
  {
    id: 201,
    cost: 75000,
    requirement: [191, 192],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "이제 도전과제 배율이 크게 감소된 비율로 엔트로피 획득량에 영향을 줍니다",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Achievements.power.max(1).log10(), 2)
  },
  {
    id: 211,
    cost: 100000,
    requirement: [201],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `신성 차원의 배율을 ${formatPow(1.3, 1, 1)}만큼 거듭제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.3
  },
  {
    id: 212,
    cost: 100000,
    requirement: [201],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `셀레스티얼 포인트를 ${formatPow(1.2, 1, 1)}만큼 거듭제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    id: 213,
    cost: 100000,
    requirement: [201],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `이중성 머신을 ${formatPow(1.1, 1, 1)}만큼 거듭제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.1
  },
  {
    id: 221,
    cost: 150000,
    requirement: [211],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "하드론에 따라 신성 에너지 획득량에 배율을 적용합니다",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow10(new Decimal(player.celestials.laitela.hadrons.total).pow(1.25))
  },
  {
    id: 222,
    cost: 150000,
    requirement: [212],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `Pelle에서 반물질 지수를 ${formatPow(1.2, 1, 1)}만큼 거듭제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    id: 223,
    cost: 150000,
    requirement: [213],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "별의 힘에 따라 이중성 머신 획득량에 배율을 적용합니다",
    effect: () => player.disablePostReality ? 1 : Ethereal.starPower.add(1).log10().pow(10)
  },
  {
    id: 231,
    cost: 200000,
    requirement: [221],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "신성 별 공식을 소폭 개선합니다",
    effect: () => player.disablePostReality ? 308 : 280
  },
  {
    id: 232,
    cost: 200000,
    requirement: [222],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "도전과제 207의 효과를 소폭 개선합니다",
    effect: () => player.disablePostReality ? 1 : 1.05
  },
  {
    id: 233,
    cost: 200000,
    requirement: [223],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `이중성 머신이 상한에 가까워지는 데 걸리는 시간을 ${formatX(5)}만큼 단축합니다`,
    effect: () => player.disablePostReality ? 1 : 5
  },
  {
    id: 241,
    cost: 300000,
    requirement: [231, 232, 233],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "총 엔드게임 스킬에 따라 에테리얼 파워 획득량에 배율이 적용됩니다",
    effect: () => player.disablePostReality ? 1 : player.endgameMasteries.maxSkills.pow(2)
  },
  {
    id: 251,
    cost: 500000,
    requirement: [241],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `하드론 효율 상한을 ${formatPercents(1)}만큼 증가시킵니다`,
    effect: () => player.disablePostReality ? 0 : 100
  },
  {
    id: 261,
    cost: 750000,
    requirement: [251],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `셀레스티얼 물질 변환 지수를 ${formatPow(1.25, 2, 2)}만큼 거듭제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1.25
  },
  {
    id: 262,
    cost: 750000,
    requirement: [251],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 암흑 물질 상한의 시작점을 ${formatPow(2)}만큼 늦춥니다`,
    effect: () => player.disablePostReality ? 1 : 2
  },
  {
    id: 271,
    cost: 1000000,
    requirement: [261],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "팽창 시간 소프트캡을 제거합니다"
  },
  {
    id: 272,
    cost: 1000000,
    requirement: [261],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `가혹한 복제자 소프트캡을 약화합니다`,
    effect: () => player.disablePostReality ? 10 : 2
  },
  {
    id: 273,
    cost: 1000000,
    requirement: [262],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `영원 도전 12의 보상이 ${formatX(10)} 더 강해집니다`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    id: 274,
    cost: 1000000,
    requirement: [262],
    reqType: EM_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 글리프 불안정성 요구량이 ${formatX(2)} 약해집니다`,
    effect: () => player.disablePostReality ? 1 : 2
  }
];
