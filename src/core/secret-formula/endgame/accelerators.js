export const accelerators = {
  potency: {
    id: 1,
    key: "potency",
    name: "효력 가속기",
    drainResource: "반물질",
    baseEffect1: x => `반물질 생성 ${formatPow(x, 2, 3)}`,
    baseEffect2: x => `엔트로피 획득량 ${formatX(x, 2, 2)}`,
    baseEffect3: x => `신성 물질/에너지 생산량 ${formatX(x, 2, 2)}`,
    percentage: totalFill => Decimal.log10(totalFill.plus(1).log10().div(1e200)).div(100).toNumber(),
    percentageToFill: percentage => Decimal.pow10(Decimal.pow10(percentage * 100).times(1e200)).sub(1),
    effects: {
      alpha: percentage => player.disablePostReality ? DC.D1 : Decimal.pow10(percentage / 10),
      beta: percentage => player.disablePostReality ? DC.D1 : Decimal.pow10(percentage),
      gamma: percentage => player.disablePostReality ? DC.D1 : Decimal.pow10(percentage / 5),
    },
    currency: () => Currency.antimatter,
    unlockReq: () => Decimal.pow10(1e200),
    milestones: [
      {
        resource: "potency",
        requirement: 0.15,
        description: "공허 안에서는 반물질 차원의 배율이 제곱됩니다",
        effect: () => 2
      },
      {
        resource: "potency",
        requirement: 0.4,
        description: "보유한 총 하드론에 따라 반물질 하드캡이 증가합니다",
        effect: () => player.disablePostReality ? 0 : Math.clamp(Math.floor(Math.pow(2 * Math.max(player.celestials.laitela.hadrons.total - 100, 0) + 0.25, 0.5) - 0.5), 0, 25),
        formatEffect: value => `${format(LHC.breakingPoint.root(Decimal.pow10(value)), 2)} ➜ ${format(LHC.breakingPoint, 2)}`
      },
      {
        resource: "potency",
        requirement: 0.75,
        description: () => `셀레스티얼 차원을 연속체로 전환하고, 연속체 구매량에 따라 ${formatPow(0.1, 1, 1)}의 비율로 강화합니다`
      },
    ]
  },
  emptiness: {
    id: 2,
    key: "emptiness",
    name: "공허함 가속기",
    drainResource: "무효 물질",
    baseEffect1: x => `공허 안에서 반물질 차원 ${formatPow(x, 2, 3)}`,
    baseEffect2: x => `하드론 효율 상한 +${formatPercents(x - 1, 2)}`,
    baseEffect3: x => `반물질 오버플로 규모 ${formatInt(10)} ➜ ${format(x, 2, 2)}`,
    percentage: totalFill => Decimal.min(totalFill.div(20000), totalFill.max(1).log10()).div(100).toNumber(),
    percentageToFill: percentage => Decimal.max(new Decimal(percentage * 100).times(20000), Decimal.pow10(percentage * 100)),
    effects: {
      alpha: percentage => Decimal.pow(1 + percentage / 100, 1 + percentage / 100),
      beta: percentage => player.disablePostReality ? 1 : 1 + percentage / 100,
      gamma: percentage => player.disablePostReality ? 10 : 1 / (0.1 + percentage * 3 / 2000),
    },
    currency: () => Currency.nullMatter,
    unlockReq: () => Decimal.pow10(5),
    milestones: [
      {
        resource: "emptiness",
        requirement: 0.07,
        description: "공허 안에서는 파멸 밖에서 생성한 총 반물질에 따라 반물질 차원의 배율이 거듭제곱됩니다",
        effect: () => Decimal.log10(Decimal.log10(player.records.totalAntimatterOutsideDoom)).div(200).add(1),
        formatEffect: value => formatPow(value, 2, 3)
      },
      {
        resource: "emptiness",
        requirement: 0.3,
        description: "공허 안에서 기록한 최고 반물질에 따라 신성 차원의 배율이 거듭제곱됩니다",
        effect: () => player.disablePostReality ? DC.D1 : Decimal.log10(Decimal.log10(player.endgame.largeHadronCollider.void.highestAntimatter)).div(100).add(1),
        formatEffect: value => formatPow(value, 2, 3)
      },
      {
        resource: "emptiness",
        requirement: 1,
        description: () => `반물질 하드캡이 ${formatInt(25)} OoM^2s만큼 증가합니다`,
        effect: () => player.disablePostReality ? 0 : 25
      },
    ]
  },
  cosmic: {
    id: 3,
    key: "cosmic",
    name: "우주 가속기",
    drainResource: "은하",
    baseEffect1: x => `은하 생성량 ${formatPow(x, 2, 3)}`,
    baseEffect2: x => `파멸 상태에서 반물질 지수 ${formatPow(x, 2, 3)}`,
    baseEffect3: x => `파멸 상태에서 반물질 지수^2 ${formatPow(x, 2, 4)}`,
    percentage: totalFill => Math.min(Decimal.log10(totalFill.max("1e3000")).sub(3000).div(5000).sqrt().times(20).div(100).toNumber(),
      Decimal.log10(totalFill.max(1)).sub(3000).div(5000).times(20).div(100).toNumber()),
    percentageToFill: percentage => Decimal.max(Decimal.pow10(Decimal.sqr(percentage * 100 / 20).times(5000).add(3000)),
      Decimal.pow10(new Decimal(percentage * 100 / 20).times(5000).add(3000))),
    effects: {
      alpha: percentage => player.disablePostReality ? 1 : 1 + percentage / 200,
      beta: percentage => player.disablePostReality ? 1 : 1 + percentage / 100,
      gamma: percentage => player.disablePostReality ? 1 : 1 + percentage / 2000,
    },
    currency: () => Currency.galaxyGeneratorGalaxies,
    unlockReq: () => Decimal.pow10(3000),
    milestones: [
      {
        resource: "cosmic",
        requirement: 0.2,
        description: "공허 안에서는 우주 가속기의 충전 비율에 따라 은하가 강해집니다",
        effect: () => 1 + Accelerators.cosmic.percentage * 100,
        formatEffect: value => formatX(value, 2, 2)
      },
      {
        resource: "cosmic",
        requirement: 0.4,
        description: "새로운 은하 생성기 업그레이드를 해금합니다"
      },
      {
        resource: "cosmic",
        requirement: 1,
        description: () => `반물질 하드캡이 ${format(Decimal.log10(DC.NUMMAX).sub(275), 4, 4)} OoM^2s만큼 증가합니다`,
        effect: () => player.disablePostReality ? 0 : Decimal.log10(DC.NUMMAX).sub(275).toNumber()
      },
    ]
  }
};
