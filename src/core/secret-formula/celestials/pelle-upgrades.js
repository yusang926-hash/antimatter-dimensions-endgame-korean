const formatCost = c => format(c, 2);
// eslint-disable-next-line max-params
const expWithIncreasedScale = (base1, base2, incScale, coeff, x) =>
  Decimal.pow(base1, x).times(Decimal.pow(base2, x - incScale).max(1)).times(coeff);

const rebuyable = config => {
  const { id, description, cost, effect, formatEffect, cap } = config;
  return {
    id,
    description,
    cost: () => expWithIncreasedScale(...cost, player.celestials.pelle.rebuyables[id]),
    formatCost,
    cap,
    effect: (x = player.celestials.pelle.rebuyables[id]) => effect(x),
    formatEffect,
    rebuyable: true
  };
};

export const pelleUpgrades = {
  antimatterDimensionMult: rebuyable({
    id: "antimatterDimensionMult",
    description: "반물질 차원에 배율을 적용합니다",
    cost: [10, 250, 41, 10],
    effect: x => Pelle.antimatterDimensionMult(x),
    formatEffect: x => formatX(x, 2, 2),
    cap: 47
  }),
  timeSpeedMult: rebuyable({
    id: "timeSpeedMult",
    description: "게임 속도에 배율을 적용합니다",
    cost: [20, 1e3, 30, 1e5],
    effect: x => Decimal.pow(1.3, x),
    formatEffect: x => formatX(x, 2, 2),
    cap: 35
  }),
  glyphLevels: rebuyable({
    id: "glyphLevels",
    description: "Pelle에서 허용되는 글리프 레벨을 증가시킵니다",
    cost: [30, 1e3, 25, 1e15],
    effect: x => Math.floor(((3 * (x + 1)) - 2) ** 1.6),
    formatEffect: x => formatInt(x),
    cap: 26
  }),
  infConversion: rebuyable({
    id: "infConversion",
    description: "무한력 변환율을 증가시킵니다",
    cost: [40, 1e3, 20, 1e18],
    effect: x => (x * 3.5) ** 0.37,
    formatEffect: x => `+${format(x, 2, 2)}`,
    cap: 21
  }),
  galaxyPower: rebuyable({
    id: "galaxyPower",
    description: "은하의 위력을 증가시킵니다",
    cost: [1000, 1e3, 10, 1e30],
    effect: x => 1 + x / 50,
    formatEffect: x => formatX(x, 2, 2),
    cap: 9
  }),
  antimatterDimAutobuyers1: {
    id: 0,
    description: "반물질 차원 1-4의 자동구매기를 영구적으로 획득합니다",
    cost: 1e5,
    formatCost,
  },
  dimBoostAutobuyer: {
    id: 1,
    description: "차원 가속 자동구매기를 영구적으로 획득합니다",
    cost: 5e5,
    formatCost,
  },
  keepAutobuyers: {
    id: 2,
    description: "아마겟돈 시 자동구매기 업그레이드가 더 이상 초기화되지 않습니다",
    cost: 5e6,
    formatCost,
  },
  antimatterDimAutobuyers2: {
    id: 3,
    description: "반물질 차원 5-8의 자동구매기를 영구적으로 획득합니다",
    cost: 2.5e7,
    formatCost,
  },
  galaxyAutobuyer: {
    id: 4,
    description: "반물질 은하 자동구매기를 영구적으로 획득합니다",
    cost: 1e8,
    formatCost,
  },
  tickspeedAutobuyer: {
    id: 5,
    description: "틱스피드 업그레이드 자동구매기를 영구적으로 획득합니다",
    cost: 1e9,
    formatCost,
  },
  keepInfinityUpgrades: {
    id: 6,
    description: "아마겟돈 시 무한 업그레이드가 더 이상 초기화되지 않습니다",
    cost: 1e10,
    formatCost,
  },
  dimBoostResetsNothing: {
    id: 7,
    description: "차원 가속이 더 이상 아무것도 초기화하지 않습니다",
    cost: 1e11,
    formatCost,
  },
  keepBreakInfinityUpgrades: {
    id: 8,
    description: "아마겟돈 시 무한 돌파 업그레이드가 더 이상 초기화되지 않습니다",
    cost: 1e12,
    formatCost,
  },
  IDAutobuyers: {
    id: 9,
    description: "무한 차원 자동구매기를 영구적으로 획득합니다",
    cost: 1e14,
    formatCost,
  },
  keepInfinityChallenges: {
    id: 10,
    description: "아마겟돈 시 무한 도전의 해금과 완료가 더 이상 초기화되지 않습니다",
    cost: 1e15,
    formatCost,
  },
  galaxyNoResetDimboost: {
    id: 11,
    description: "은하가 더 이상 차원 가속을 초기화하지 않습니다",
    cost: 1e16,
    formatCost
  },
  replicantiAutobuyers: {
    id: 12,
    description: "복제자 업그레이드 자동구매기를 영구적으로 획득합니다",
    cost: 1e17,
    formatCost,
  },
  replicantiGalaxyNoReset: {
    id: 13,
    description: "무한 시 복제자 은하가 더 이상 초기화되지 않습니다",
    cost: 1e19,
    formatCost,
  },
  eternitiesNoReset: {
    id: 14,
    description: "아마겟돈 시 영원 횟수가 더 이상 초기화되지 않습니다",
    cost: 1e20,
    formatCost,
  },
  timeStudiesNoReset: {
    id: 15,
    description: "아마겟돈 시 시간 연구와 시간 정리가 더 이상 초기화되지 않습니다",
    cost: 1e21,
    formatCost,
  },
  replicantiStayUnlocked: {
    id: 16,
    description: "복제자가 영구적으로 해금됩니다",
    cost: 1e22,
    formatCost,
  },
  keepEternityUpgrades: {
    id: 17,
    description: "아마겟돈 시 영원 업그레이드가 더 이상 초기화되지 않습니다",
    cost: 1e24,
    formatCost,
  },
  TDAutobuyers: {
    id: 18,
    description: "시간 차원 자동구매기를 영구적으로 획득합니다",
    cost: 1e25,
    formatCost,
  },
  keepEternityChallenges: {
    id: 19,
    description: "아마겟돈 시 영원 도전 완료가 더 이상 초기화되지 않습니다",
    cost: 1e26,
    formatCost,
  },
  dilationUpgradesNoReset: {
    id: 20,
    description: "아마겟돈 시 시간 팽창 업그레이드가 더 이상 초기화되지 않습니다",
    cost: 1e45,
    formatCost,
  },
  tachyonParticlesNoReset: {
    id: 21,
    description: "아마겟돈 시 타키온 입자가 더 이상 초기화되지 않습니다",
    cost: 1e50,
    formatCost,
  },
  replicantiGalaxyEM40: {
    id: 22,
    description: "복제자 은하가 평소 초기화하던 것을 더 이상 초기화하지 않습니다",
    cost: 1e30,
    formatCost,
  }
};
