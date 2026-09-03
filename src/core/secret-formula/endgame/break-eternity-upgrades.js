function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    cost: () => Decimal.pow(10, config.initialCost * Math.pow(config.costIncrease, player.breakEternityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => player.disablePostReality ? 1 : effectFunction(player.breakEternityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect,
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakEternityUpgrades = {
  antimatterDimensionPow: rebuyable({
    name: "반물질 거듭제곱",
    id: 0,
    initialCost: 1e15,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "모든 반물질 차원 배율을 제곱합니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  infinityDimensionPow: rebuyable({
    name: "무한 거듭제곱",
    id: 1,
    initialCost: 1e16,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "모든 무한 차원 배율을 제곱합니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  timeDimensionPow: rebuyable({
    name: "시간 거듭제곱",
    id: 2,
    initialCost: 1e17,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "모든 시간 차원 배율을 제곱합니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiIntervalPow: rebuyable({
    name: "복제 거듭제곱",
    id: 3,
    initialCost: 1e18,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(0.5, value),
    description: () => "복제자 간격에 제곱근을 적용합니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${format(value, 2, 3)}`,
    noLabel: false
  }),
  tachyonParticlePow: rebuyable({
    name: "팽창 거듭제곱",
    id: 4,
    initialCost: 1e19,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "타키온 입자 획득량을 제곱합니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  galaxyScaleDelay: rebuyable({
    name: "은하의 효력",
    id: 5,
    initialCost: 1e20,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => value * 10000,
    description: () => "먼 은하/아득한 은하 스케일링을 늦춥니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `은하 ${formatInt(value)}개`,
    noLabel: false
  }),
  infinityPowerConversion: rebuyable({
    name: "힘의 축적",
    id: 6,
    initialCost: 1e21,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "무한력 변환율을 두 배로 만듭니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  epMultiplierDelay: rebuyable({
    name: "소프트캡 방해",
    id: 7,
    initialCost: 1e22,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(10, value),
    description: () => `영원 포인트 다섯 배 업그레이드의 비용 스케일링 시작점을 ${formatPow(10)}만큼 거듭제곱합니다`,
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiGalaxyPower: rebuyable({
    name: "스케일링 유예",
    id: 8,
    initialCost: 1e23,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "복제자 은하 비용 스케일링 시작점을 두 배로 만듭니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  dilatedTimeMultiplier: rebuyable({
    name: "곱셈 증폭",
    id: 9,
    initialCost: 1e24,
    costIncrease: 1e10,
    maxUpgrades: 10,
    effect: value => Math.pow(2, value),
    description: () => "팽창 시간 두 배 업그레이드의 구매당 배율을 두 배로 만듭니다",
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatX(value, 2)}`,
    noLabel: false
  }),
  doubleIPUncap: {
    name: "증가한 무한",
    id: "doubleIPUncap",
    cost: Decimal.pow(10, 1e30),
    description: "무한 포인트 두 배 업그레이드의 상한을 제거합니다"
  },
  tgThresholdUncap: {
    name: "은하 성장",
    id: "tgThresholdUncap",
    cost: Decimal.pow(10, 1e40),
    description: "타키온 은하 요구량 업그레이드의 상한을 제거하고 공식을 개선합니다"
  },
  tesseractMultiplier: {
    name: "테서랙트 횡단",
    id: "tesseractMultiplier",
    cost: Decimal.pow(10, 1e50),
    description: "모든 유효 테서랙트를 두 배로 만듭니다",
    effect: 2
  },
  glyphSacrificeUncap: {
    name: "희생 보충",
    id: "glyphSacrificeUncap",
    cost: Decimal.pow(10, 1e70),
    description: "모든 글리프의 글리프 희생 수치 상한을 제거합니다"
  },
  glyphSlotImprovement: {
    name: "효력 증대",
    id: "glyphSlotImprovement",
    cost: Decimal.pow(10, 1e100),
    description: "Pelle 밖에서 글리프 슬롯을 3개 더 추가합니다",
    effect: 3
  },
};
