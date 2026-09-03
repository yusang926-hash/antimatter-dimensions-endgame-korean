export const galacticPowerRewards = {
  galaxyStrength: {
    id: 1,
    galacticPower: 0,
    reward: "은하의 위력을 증가시킵니다",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(10), 3).add(1).min(30000).times(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `은하가 ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)} 더 강해집니다`
  },
  remoteGalaxyScale: {
    id: 2,
    galacticPower: 1e10,
    reward: "아득한 은하 스케일링을 늦춥니다",
    effect: () => player.disablePostReality ? 0 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).times(5), 2).min(2.5e6).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 2)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `아득한 은하 스케일링이 은하 ${formatHybridLarge(value, 3)}개만큼 늦춰집니다`
  },
  remoteGalaxyPower: {
    id: 3,
    galacticPower: 1e20,
    reward: "아득한 은하 스케일링을 약화합니다",
    effect: () => player.disablePostReality ? 1 : DC.D1.sub(((Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)), 0.5).times(5)).div(100))).max(0.1).div(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? 1 / GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? 1 / GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `아득한 은하 스케일링이 ${formatPercents(1 - value, 2, 2)} 약해집니다`
  },
  galGenInstability1: {
    id: 4,
    galacticPower: 1e50,
    reward: "첫 번째 은하 생성기 불안정성 요구량을 늦춥니다",
    effect: () => player.disablePostReality ? DC.D0 : Decimal.pow(10, Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).times(50)).min(1e50).pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).max(1)),
    formatEffect: value => `첫 번째 은하 생성기 불안정성 요구량이 은하 ${formatX(value, 2, 2)}개만큼 늦춰집니다`
  },
  replicantiGalaxies: {
    id: 5,
    galacticPower: 1e100,
    reward: "복제자 은하 획득량에 배율을 적용합니다",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(100), 1.25).add(1).min(6).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 0.5)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `복제자 은하 획득량 ${formatX(value, 2, 2)}`
  },
  tachyonGalaxies: {
    id: 6,
    galacticPower: 1e150,
    reward: "타키온 은하 요구량 배율을 감소시킵니다",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(200), 3).add(1).min(5).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 0.5)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `타키온 은하 요구량 배율에 ${format(value, 2, 2)}제곱근을 적용합니다`
  },
  galGenInstability2: {
    id: 7,
    galacticPower: 1e200,
    reward: "두 번째 은하 생성기 불안정성 규모의 지수를 감소시킵니다",
    effect: () => player.disablePostReality ? 1 : (Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(100), 1.5).div(10)).add(1).min(1.6).times(Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(Decimal.log10(DC.NUMMAX)).max(1), 0.25)).pow(GalacticPowers.galaxyEmpowerment1.isUnlocked ? GalacticPowers.galaxyEmpowerment1.reward : 1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `두 번째 은하 생성기 불안정성 규모에 ${format(value, 2, 2)}제곱근을 적용합니다`
  },
  etherealUnlock: {
    id: 8,
    galacticPower: Number.MAX_VALUE,
    reward: "에테리얼을 해금합니다"
  },
  galacticAscension: {
    id: 9,
    galacticPower: new Decimal("1e7800"),
    reward: "보유량이 영보다 큰 은하 종류끼리 이제 더하는 대신 서로 곱합니다"
  },
  galaxyEmpowerment1: {
    id: 10,
    galacticPower: new Decimal("1e10000"),
    reward: "위의 모든 은하력 효과를 지수적으로 증가시킵니다",
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).add(1)).div(4).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `위의 은하력이 ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)} 더 강해집니다`
  },
  celestialGalaxyEmpowerment: {
    id: 11,
    galacticPower: new Decimal("1e15000"),
    reward: "셀레스티얼 은하의 위력을 증가시킵니다",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.galacticPower.value.add(1)).div(15000), 5).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `셀레스티얼 은하가 ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)} 더 강해집니다`
  },
  freeGalaxies: {
    id: 12,
    galacticPower: new Decimal("1e25000"),
    reward: "무료 은하를 획득합니다",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Currency.galacticPower.value.div("1e25000"), 0.001).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1),
    formatEffect: value => `무료 은하 ${formatHybridLarge(value, 3)}개`
  },
  galaxyScaling: {
    id: 13,
    galacticPower: new Decimal("1e40000"),
    reward: "반물질 은하의 기본 비용 스케일링을 감소시킵니다",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(0.9, Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).div(40000)).add(1).pow(2).sub(1)).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `반물질 은하 비용 스케일링이 ${formatPercents(1 - value, 2, 2)} 감소합니다`
  },
  galaxyGenerationEmpowerment: {
    id: 14,
    galacticPower: new Decimal("1e66000"),
    reward: "은하 생성을 강화합니다",
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).div(66000)).add(1).pow(GalacticPowers.galaxyEmpowerment2.isUnlocked ? GalacticPowers.galaxyEmpowerment2.reward : 1).toNumber(),
    formatEffect: value => `은하 생성에 ${formatPow(value, 2, 3)}을 적용합니다`
  },
  galaxyEmpowerment2: {
    id: 15,
    galacticPower: new Decimal("1e100000"),
    reward: "위의 모든 은하력 효과를 지수적으로 증가시킵니다",
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Decimal.log10(Currency.galacticPower.value.add(1)).div(100000)).add(1).toNumber(),
    formatEffect: value => `위의 은하력이 ${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)} 더 강해집니다`
  },
  stelliferousUniverse: {
    id: 16,
    galacticPower: new Decimal("1e250000"),
    reward: "성상 우주를 해금합니다"
  }
};
