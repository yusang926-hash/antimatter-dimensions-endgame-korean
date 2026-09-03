const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.reality.dualityRebuyables[props.id],
    1e20,
    props.initialCost,
    props.costMult,
    props.costMult,
    DC.E309,
    1e3,
    props.costMult
  );
  const { effect } = props;
  if (props.isDecimal) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, player.reality.dualityRebuyables[props.id]);
  else if (props.isQuadratic) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, (player.reality.dualityRebuyables[props.id] + 1) * (player.reality.dualityRebuyables[props.id] / 2));
  else props.effect = () => player.disablePostReality ? 1 : effect * player.reality.dualityRebuyables[props.id];
  if (!props.formatEffect) props.formatEffect = value => `+${format(value, 2, 2)}`;
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const dualityUpgrades = [
  rebuyable({
    name: "시간 공력증폭기",
    id: 1,
    initialCost: 1,
    costMult: 50,
    description: () => `시간 강화기 배율 +${format(0.01, 2, 2)}`,
    effect: 0.01
  }),
  rebuyable({
    name: "복제 공력증폭기",
    id: 2,
    initialCost: 3,
    costMult: 60,
    description: () => `복제 강화기 배율 +${format(0.01, 2, 2)}`,
    effect: 0.01
  }),
  rebuyable({
    name: "영원 공력증폭기",
    id: 3,
    initialCost: 8,
    costMult: 45,
    description: () => `영원 강화기 배율 +${format(0.02, 2, 2)}`,
    effect: 0.02
  }),
  rebuyable({
    name: "초광속 공력증폭기",
    id: 4,
    initialCost: 18,
    costMult: 75,
    description: () => `초광속 강화기 배율 +${format(0.01, 2, 2)}`,
    effect: 0.01
  }),
  rebuyable({
    name: "무한 공력증폭기",
    id: 5,
    initialCost: 30,
    costMult: 36,
    description: () => `무한 강화기 배율 +${format(0.03, 2, 2)}`,
    effect: 0.03
  }),
  rebuyable({
    name: "조작된 쌍곡선",
    id: 6,
    initialCost: 1e4,
    costMult: 360,
    description: () => `허수 머신 최대치를 ${formatX(1e100)}만큼 증가`,
    effect: 1e100,
    formatEffect: value => `${formatX(value)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "상형문자 강화",
    id: 7,
    initialCost: 2e5,
    costMult: 750,
    description: () => `글리프 불안정의 첫 ${formatInt(4)}단계 시작 레벨을 ${formatInt(2000)}만큼 늦춤`,
    effect: 2000,
    formatEffect: value => `+${formatInt(value)} 레벨`
  }),
  rebuyable({
    name: "다포체 사면체",
    id: 8,
    initialCost: 1.5e6,
    costMult: 1500,
    description: () => `무한 차원을 ${formatPow(1.25, 2, 3)}로 제곱`,
    effect: 1.25,
    formatEffect: value => `${formatPow(value, 2, 3)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "성운 신경총",
    id: 9,
    initialCost: 1.2e7,
    costMult: 2400,
    description: () => `은하의 성능에 배율 적용`,
    effect: 1.15,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "붕괴된 수축",
    id: 10,
    initialCost: 2e8,
    costMult: 4000,
    description: () => `특이점 획득량에 배율 적용`,
    effect: 1e100,
    formatEffect: value => `${formatX(value, 2)}`,
    isQuadratic: true
  }),
  {
    name: "영원의 간섭",
    id: 11,
    cost: new Decimal(1e9),
    requirement: () => `유물 파편 총 ${format("1e1640")}개
      (현재 ${format(player.celestials.effarig.relicShards, 2)}개 보유)`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.effarig.relicShards.gte(DC.E1640),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: "강입자화 횟수에 따라 연속체 구매량에 배율 적용",
    effect: () => player.disablePostReality ? 1 : Math.sqrt(Laitela.hadronizes),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    name: "환영의 여파",
    id: 12,
    cost: new Decimal(6e9),
    requirement: () => `모든 글리프 레벨 요소의 가중치를 ${formatInt(0)}으로 설정하여
    레벨 ${formatInt(102500)} 글리프 생성`,
    hasFailed: () => !Object.values(player.celestials.effarig.glyphWeights).every(w => w === 0),
    checkRequirement: () => Object.values(player.celestials.effarig.glyphWeights).every(w => w === 0) &&
      gainedGlyphLevel().actualLevel.gte(102500),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "반복 구매한 이중성 업그레이드 수에 따라 무료 차원 가속 획득량을 제곱",
    effect: () => player.disablePostReality ? 1 : 1 + Math.log10(DualityUpgrades.totalRebuyables) * 1.5,
    formatEffect: value => `${formatPow(value, 2, 3)}`
  },
  {
    name: "이중성의 덧없음",
    id: 13,
    cost: new Decimal(2e10),
    requirement: () => `Lai'tela의 현실을 ${formatInt(12)}번 강입자화`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.hadronizes >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "구매한 이중성 업그레이드 수에 따라 이중성 머신 최대치 증가",
    effect: () => player.disablePostReality ? 1 : 1 + DualityUpgrades.totalRebuyables / 20 + DualityUpgrades.totalSinglePurchase / 2,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    name: "타락의 회상",
    id: 14,
    cost: new Decimal(3e11),
    requirement: () => `틱스피드 ${format("e1e666")} 도달`,
    hasFailed: () => false,
    checkRequirement: () => Tickspeed.perSecond.log10().gte("1e666"),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `연속체 구매 효과를 ${formatPow(1.2, 0, 1)}로 제곱`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    name: "이중체의 발명",
    id: 15,
    cost: new Decimal(1e12),
    requirement: () => `이번 엔드게임에서 무한 차원, 시간 차원, 제${formatInt(8)} 반물질 차원을 한 번도 보유하지 않고
      시간 팽창 중 Pelle 밖에서 반물질 ${format("e5e55")} 도달`,
    hasFailed: () => !player.requirementChecks.endgame.onlyLowDims || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.onlyLowDims && player.dilation.active &&
      player.antimatter.add(1).log10().gte(5e55) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    description: "강입자 해금",
  },
  {
    name: "임계 가속",
    id: 16,
    cost: new Decimal(4e12),
    requirement: () => "완전히 강화된 강입자 보유",
    hasFailed: () => false,
    checkRequirement: () => Hadrons.timeFactor.times(4).gte(100),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "두 번째 강입자 효과 해금",
  },
  {
    name: "경이로운 회전",
    id: 17,
    cost: new Decimal(9e12),
    requirement: () => `특이점 ${format("1e44875")}개 도달`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.laitela.singularities.gte("1e44875"),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    description: "세 번째 강입자 효과 해금",
  },
  {
    name: "비례 평형",
    id: 18,
    cost: new Decimal(1.6e13),
    formatCost: x => format(x, 1),
    requirement: () => `Pelle 밖에서 모든 종류의 은하 총 ${format(2.4e9, 1)}개 보유`,
    hasFailed: () => Pelle.isDoomed,
    checkRequirement: () => GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
    player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)).gte(2.4e9) : Replicanti.galaxies.total.add(player.galaxies).add(
      player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies).gte(2.4e9) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "네 번째 강입자 효과 해금",
  },
  {
    name: "지정된 발산",
    id: 19,
    cost: new Decimal(4.2e13),
    formatCost: x => format(x, 1),
    requirement: () => `이번 엔드게임에서 시간 연구를 한 번도 보유하지 않고 Pelle 밖에서 틱스피드 연속체 ${format(1e45)} 보유`,
    hasFailed: () => player.requirementChecks.endgame.maxStudies > 0 || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.maxStudies <= 0 &&
      Tickspeed.continuumValue.gte(1e45) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: () => `시간 연구를 ${formatInt(0)}개보다 많이 구매`,
    description: "암흑 강입자 해금"
  },
  {
    name: "이중 속도",
    id: 20,
    cost: new Decimal(1e16),
    requirement: () => `연속체 증가량 최소 ${formatX(4444444, 2, 2)} 달성`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.matterExtraPurchaseFactor.gte(4444444),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `반복 구매 가능한 이중성 업그레이드의 자동구매기를 해금하고 이중성 머신을
      ${formatInt(10)}배 빠르게 생산`,
    effect: () => player.disablePostReality ? 1 : 10
  },
  {
    name: "천상의 근절",
    id: 21,
    cost: new Decimal(3e17),
    requirement: () => `엔드게임 내내 연속체를 비활성화한 채 Pelle 밖에서 반물질 ${format("e1e88")} 도달`,
    hasFailed: () => !player.requirementChecks.endgame.noContinuum || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.noContinuum &&
      Currency.antimatter.value.add(1).log10().gte(1e88) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "연속체 활성화",
    description: "이중성 머신에 따라 암흑 강입자의 성능 증가",
    effect: () => player.disablePostReality ? 0 : Decimal.log10(Currency.dualMachines.value.add(1)).div(100).toNumber(),
    formatEffect: value => `+${formatPercents(value, 2, 2)}`
  },
  {
    name: "묘사의 파괴",
    id: 22,
    cost: new Decimal(2e18),
    requirement: () => `이번 엔드게임에서 글리프를 한 번도 장착하지 않고 Pelle 밖에서 반물질 ${format("e1e85")} 도달`,
    hasFailed: () => !player.requirementChecks.endgame.noGlyphs || Pelle.isDoomed,
    checkRequirement: () => player.requirementChecks.endgame.noGlyphs &&
      Currency.antimatter.value.add(1).log10().gte(1e85) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "글리프 장착",
    description: () => `모든 글리프 희생 수치를 ${formatPow(1.2, 2, 3)}로 제곱`,
    effect: () => player.disablePostReality ? 1 : 1.2
  },
  {
    name: "사문자 외상",
    id: 23,
    cost: new Decimal(6e18),
    requirement: () => `글리프를 최대 -15개 장착하고 Ra의 현실에서
      글리프 레벨 ${formatInt(385000)} 도달`,
    hasFailed: () => !Ra.isRunning ||
      player.requirementChecks.reality.maxGlyphs > -15,
    checkRequirement: () => Ra.isRunning &&
      player.requirementChecks.reality.maxGlyphs <= -15 && gainedGlyphLevel().actualLevel.gte(385000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "테서랙트에 따라 은하의 성능 증가",
    effect: () => player.disablePostReality ? 1 : Tesseracts.effectiveCount / 100,
    formatEffect: value => `${formatX(value)}`
  },
  {
    name: "특이점화 파쇄",
    id: 24,
    cost: new Decimal(1.5e19),
    formatCost: x => format(x, 1),
    requirement: () => `셀레스티얼 물질을 끈 채 Ra의 현실에서
      반물질 은하 ${format(106e6, 2, 2)}개 보유`,
    hasFailed: () => !Ra.isRunning || !player.requirementChecks.reality.noCelMatter,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.noCelMatter &&
      player.galaxies.gte(106e6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "셀레스티얼 물질 활성화",
    description: "특이점에 따라 은하의 성능 증가",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.log10(player.celestials.laitela.singularities.add(1)).div(10000),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    name: "다차원 생산",
    id: 25,
    cost: new Decimal(1e20),
    requirement: () => `완전히 강화된 암흑 강입자 ${formatInt(32)}개 보유`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.laitela.hadrons.dark >= 32 && Hadrons.timeFactor.div(5).gte(100),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "하이퍼큐브 해금",
  },
];
