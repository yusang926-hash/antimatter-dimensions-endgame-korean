function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, layer, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    layer,
    cost: () => new Decimal(config.initialCost).times(
      Decimal.pow(config.costIncrease, player.celestials.pelle.divinityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.celestials.pelle.divinityRebuyables[config.id]),
    isDisabled,
    formatEffect: config.formatEffect ||
      (value => {
        return (value === config.maxUpgrades
          ? `현재: ${formatX(10 - value)}`
          : `현재: ${formatX(10 - value)} | 다음: ${formatX(10 - value - 1)}`);
      }),
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const divinityUpgrades = {
  divineL1U1: {
    name: "셀레스티얼 저장고",
    id: "divineL1U1",
    layer: 1,
    cost: new Decimal(10000),
    description: "우주 구역 강화가 감소된 비율로 셀레스티얼 차원 오버플로 시작점에 적용됩니다",
    effect: () => Decimal.pow(Ethereal.sectorBoost, 0.1),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL1U2: {
    name: "가속 재건",
    id: "divineL1U2",
    layer: 1,
    cost: new Decimal(1e9),
    description: () => `Alpha 붕괴의 잔재가 상한에 도달하는 시간을 ${formatPercents(0.1)}만큼 줄입니다`,
    effect: 0.9
  },
  divineL1U3: {
    name: "신성 모멘텀",
    id: "divineL1U3",
    layer: 1,
    cost: new Decimal(1e20),
    description: "셀레스티얼 포인트에 따라 신성 차원이 강화됩니다",
    effect: () => Decimal.pow(Decimal.log10(player.endgame.celestialPoints).div(Decimal.log10(DC.NUMMAX)).max(1), 3),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL1U4: {
    name: "파괴의 장인",
    id: "divineL1U4",
    layer: 1,
    cost: new Decimal(1e50),
    description: () => `Pelle에서만 반물질 지수의 지수에
      ${format(DivinityUpgrade.divineL5U2.isBought ? 1.02 : 1.01, 2, 2)}제곱을 적용합니다`,
    effect: () => DivinityUpgrade.divineL5U2.isBought ? 1.02 : 1.01
  },
  divineL1U5: {
    name: "위대한 부활",
    id: "divineL1U5",
    layer: 1,
    cost: new Decimal(1e100),
    description: "신성 에너지와 재기 업그레이드를 해금합니다"
  },
  divineL1U6: {
    name: "파장",
    id: "divineL1U6",
    layer: 1,
    cost: new Decimal(1e125),
    description: "신성 에너지가 신성 차원을 강화합니다",
    effect: () => Decimal.pow(Currency.divineEnergy.value.min(DC.E20000), 0.5).pow(
      Currency.divineEnergy.value.max(1).log10().max(1).log10().sub(3.3).max(1)).max(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL1U7: {
    name: "행운의 일곱",
    id: "divineL1U7",
    layer: 1,
    cost: new Decimal(1e160),
    description: () => `신성 에너지 생산량에 ${formatInt(7)}을 곱합니다`,
    effect: 7
  },
  divineL1U8: {
    name: "새로워진 에너지",
    id: "divineL1U8",
    layer: 1,
    cost: new Decimal(1e200),
    description: () => `신성 에너지를 정상 생산량의 ${formatPercents(0.1)} 비율로 생산합니다`,
    effect: 0.1
  },
  divineL1U9: {
    name: "불멸의 흐름",
    id: "divineL1U9",
    layer: 1,
    cost: new Decimal(1e250),
    description: "신성 에너지를 생산해도 더 이상 신성 차원 생산이 멈추지 않습니다"
  },
  divineL1U10: {
    name: "감당할 수 없어",
    id: "divineL1U10",
    layer: 1,
    cost: new Decimal(1e300),
    description: () => `이중 머신이 상한에 가까워지는 시간을 ${formatPercents(0.5)}만큼 줄입니다`,
    effect: 0.5
  },
  divineL2U1: {
    name: "별의 화합물",
    id: "divineL2U1",
    layer: 2,
    cost: new Decimal(1),
    description: "마지막 응축 이후 실제 경과 시간에 따라 신성 차원에 배율을 적용합니다",
    effect: () => Decimal.pow(DivinityUpgrade.divineL5U1.isBought ? Time.thisSupernovaRealTime.totalSeconds.add(1) :
      Time.thisCondenseRealTime.totalSeconds.add(1), 3),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL2U2: {
    name: "태양 플레어",
    id: "divineL2U2",
    layer: 2,
    cost: new Decimal(7),
    description: "신성 별이 신성 에너지 생산량에 배율을 적용합니다",
    effect: () => player.celestials.pelle.divinity.divineStars.max(1),
    formatEffect: value => formatX(value, 2)
  },
  divineL2U3: {
    name: "사후",
    id: "divineL2U3",
    layer: 2,
    cost: new Decimal(17),
    description: "신성 별이 에테리얼 파워 생산량을 강화합니다",
    effect: () => Decimal.pow(Decimal.log10(player.celestials.pelle.divinity.divineStars.add(1)).add(1), 7),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL2U4: {
    name: "전격화",
    id: "divineL2U4",
    layer: 2,
    cost: new Decimal(77),
    description: "신성 에너지 기본 획득량이 역대 최대 신성 물질을 기반으로 합니다"
  },
  divineL2U5: {
    name: "손실은 감당 못 해",
    id: "divineL2U5",
    layer: 2,
    cost: new Decimal(277),
    description: "응축 시 모든 첫 번째 층 신성 업그레이드를 유지합니다"
  },
  divineL2U6: {
    name: "선행 출발",
    id: "divineL2U6",
    layer: 2,
    cost: new Decimal(777),
    description: () => `신성 물질 ${format(5e36, 2, 2)}을 보유한 상태로 응축을 시작합니다`,
    effect: 5e36
  },
  divineL2U7: {
    name: "중력화",
    id: "divineL2U7",
    layer: 2,
    cost: new Decimal(2777),
    description: () => `신성 차원에 ${formatPow(1.1, 2, 3)}을 적용합니다`,
    effect: 1.1
  },
  divineL2U8: {
    name: "이륙",
    id: "divineL2U8",
    layer: 2,
    cost: new Decimal(7777),
    description: () => `신성 차원 구매당 배율이 ${formatX(17)}로 증가합니다`
  },
  divineL2U9: {
    name: "승천",
    id: "divineL2U9",
    layer: 2,
    cost: new Decimal(77777),
    description: "셀레스티얼 물질에 따라 신성 차원에 배율을 적용합니다",
    effect: () => Decimal.pow(Decimal.log10(Currency.celestialMatter.value.max(1)).add(1), 7),
    formatEffect: value => formatX(value, 2, 2)
  },
  divineL2U10: {
    name: "완성",
    id: "divineL2U10",
    layer: 2,
    cost: new Decimal(1777777),
    description: () => `신성 물질 효과가 역대 최대 신성 물질을 기준으로 적용되고 신성 에너지를
      항상 페널티 없이 ${formatPercents(1)} 비율로 생산합니다`
  },
  divineL3U1: rebuyable({
    name: "엔트로피 감소",
    id: 0,
    layer: 3,
    initialCost: 1e7,
    costIncrease: 200,
    maxUpgrades: 7,
    description: () => `무한 이후 신성 차원 비용 스케일링 배율을 ${formatInt(1)}만큼 낮춥니다`,
    noLabel: true,
    onPurchased: () => GameCache.divineDimensionMultDecrease.invalidate()
  }),
  divineL3U2: rebuyable({
    name: "신성의 정수",
    id: 1,
    layer: 3,
    initialCost: 1e8,
    costIncrease: 1e4,
    maxUpgrades: 12,
    description: () => `신성 차원 구매당 배율을 증가시킵니다`,
    effect: value => player.disablePostReality ? 1 : Math.pow(1 + value/2, Math.log2(10)),
    formatEffect: value => formatX(value, 2, 2),
    noLabel: false
  }),
  divineL3U3: rebuyable({
    name: "별의 과급기",
    id: 2,
    layer: 3,
    initialCost: 1e10,
    costIncrease: 1e10,
    maxUpgrades: 6,
    description: "신성 별 강화에 거듭제곱을 적용합니다",
    effect: value => player.disablePostReality ? 1 : value + 1,
    formatEffect: value => formatPow(value, 2),
    noLabel: false
  }),
  divineL3U4: rebuyable({
    name: "성운 생성",
    id: 3,
    layer: 3,
    initialCost: 1e12,
    costIncrease: 100,
    maxUpgrades: 10,
    effect: value => player.disablePostReality ? DC.D0 : Player.bestRunVSPM.times(value / 20),
    description: () => {
      let generation = `${formatInt(5 * player.celestials.pelle.divinityRebuyables[3])}%`;
      if (!DivinityUpgrade.divineL3U4.isCapped) {
        generation += ` ➜ ${formatInt(5 * (1 + player.celestials.pelle.divinityRebuyables[3]))}%`;
      }
      return `최근 10회 응축에서 기록한 최고 VS/분의 ${generation}를 생성합니다`;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} VS/분`,
    noLabel: false
  }),
  divineL3U5: {
    name: "힘은 여정이다",
    id: "divineL3U5",
    layer: 3,
    cost: new Decimal(1e77),
    description: "응축 횟수에 따라 신성 차원에 거듭제곱 효과를 적용합니다",
    effect: () => Decimal.log10(player.celestials.pelle.divinity.condenses.min(7000).div(777).add(1)).div(2).add(1).add(
      Decimal.log10(player.celestials.pelle.divinity.condenses.div(7000).max(1)).div(10)),
    formatEffect: value => formatPow(value, 2, 3)
  },
  divineL4U1: {
    name: "힘 움켜쥐기",
    id: "divineL4U1",
    layer: 4,
    cost: new Decimal(1),
    description: () => `총 성운 수에 따라 신성 에너지와 신성 별에 배율을,
      신성 차원에 거듭제곱을 적용합니다`,
    effects: {
      energy: () => player.records.bestSupernova.totalNeb.div(DivinityUpgrade.divineL4U4.isBought ? 7 : 10).add(1).pow(777),
      matter: () => Decimal.log10(player.records.bestSupernova.totalNeb.add(1)).add(1).pow(
        DivinityUpgrade.divineL4U4.isBought ? 0.25 : 0.2),
      stars: () => player.records.bestSupernova.totalNeb.add(1).pow(DivinityUpgrade.divineL4U4.isBought ? 2 : 1)
    }
  },
  divineL4U2: {
    name: "다시 깨어나다",
    id: "divineL4U2",
    layer: 4,
    cost: new Decimal(3),
    description: "초신성 시 두 번째 층의 처음 다섯 업그레이드를 유지하고 모든 신성 차원 자동구매기를 해금합니다"
  },
  divineL4U3: {
    name: "신성의 예술",
    id: "divineL4U3",
    layer: 4,
    cost: new Decimal(10),
    description: "이번 초신성의 실제 경과 시간에 따라 신성 차원에 거듭제곱 효과를 적용합니다",
    effect: () => Time.thisSupernovaRealTime.totalMinutes.min(300).div(10).add(1).pow(0.1).add(
      Time.thisSupernovaRealTime.totalMinutes.div(300).max(1).log10().div(10)),
    formatEffect: value => formatPow(value, 2, 3)
  },
  divineL4U4: {
    name: "보강",
    id: "divineL4U4",
    layer: 4,
    cost: new Decimal(30),
    description: "초신성 시 두 번째 층의 나머지 다섯 업그레이드를 유지하고 힘 움켜쥐기의 모든 효과를 향상시킵니다"
  },
  divineL4U5: {
    name: "더 이상의 한계는 없다",
    id: "divineL4U5",
    layer: 4,
    cost: new Decimal(100),
    description: "신성 물질 상한을 제거합니다"
  },
  divineL5U1: {
    name: "안전",
    id: "divineL5U1",
    layer: 5,
    cost: new Decimal(700),
    description: () => "이제 별의 화합물 효과가 초신성을 거쳐서도 적용됩니다"
  },
  divineL5U2: {
    name: "보상",
    id: "divineL5U2",
    layer: 5,
    cost: new Decimal(17000),
    description: "초신성 시 세 번째 층 업그레이드를 유지하고 파괴의 장인을 두 배로 강화합니다"
  },
  divineL5U3: {
    name: "효능",
    id: "divineL5U3",
    layer: 5,
    cost: new Decimal(7e5),
    description: "현재 성운 수에 따라 신성 차원에 추가 거듭제곱을 적용합니다",
    effect: () => Decimal.log10(Decimal.log10(player.celestials.pelle.divinity.nebulae.add(10))).add(1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  divineL5U4: {
    name: "끈기",
    id: "divineL5U4",
    layer: 5,
    cost: new Decimal(7e7),
    description: () => `가장 빠른 기록의 ${formatPercents(0.1)} 속도로 응축 횟수를 생성합니다`
  },
  divineL5U5: {
    name: "작별",
    id: "divineL5U5",
    layer: 5,
    cost: new Decimal(1e10),
    description: () => `대기 중인 신성 별의 ${formatPercents(0.01)}를 초당 생성합니다`
  }
};
