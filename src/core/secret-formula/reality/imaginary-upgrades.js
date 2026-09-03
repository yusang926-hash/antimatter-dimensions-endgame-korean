const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.reality.imaginaryRebuyables[props.id],
    1e15,
    props.initialCost,
    props.costMult,
    props.costMult / 2,
    DC.E309,
    1e3,
    props.costMult
  );
  const { effect } = props;
  if (props.isDecimal) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, player.reality.imaginaryRebuyables[props.id]);
  else props.effect = () => player.disablePostReality ? 0 : (props.id < 6
    ? (effect + DualityUpgrade(props.id).effectOrDefault(0)) * player.reality.imaginaryRebuyables[props.id]
    : effect * player.reality.imaginaryRebuyables[props.id]);
  if (!props.description) props.description = () => props.textTemplate.replace("{value}",
    DualityUpgrade(props.id).effectValue === 0
      ? format(effect, 2, 2)
      : format(effect + DualityUpgrade(props.id).effectOrDefault(0), 2, 2));
  if (!props.formatEffect) props.formatEffect = value => `+${format(value, 2, 2)}`;
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const imaginaryUpgrades = [
  rebuyable({
    name: "시간 강화기",
    id: 1,
    initialCost: 3,
    costMult: 60,
    textTemplate: "시간 증폭기 배율 +{value}",
    effect: 0.15,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.temporalIntensifier.canBeApplied
  }),
  rebuyable({
    name: "복제 강화기",
    id: 2,
    initialCost: 4,
    costMult: 60,
    textTemplate: "복제 증폭기 배율 +{value}",
    effect: 0.15,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.replicativeIntensifier.canBeApplied
  }),
  rebuyable({
    name: "영원 강화기",
    id: 3,
    initialCost: 1,
    costMult: 40,
    textTemplate: "영원 증폭기 배율 +{value}",
    effect: 0.4,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.eternalIntensifier.canBeApplied
  }),
  rebuyable({
    name: "초광속 강화기",
    id: 4,
    initialCost: 5,
    costMult: 80,
    textTemplate: "초광속 증폭기 배율 +{value}",
    effect: 0.15,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.superluminalIntensifier.canBeApplied
  }),
  rebuyable({
    name: "무한 강화기",
    id: 5,
    initialCost: 1,
    costMult: 30,
    textTemplate: "무한 증폭기 배율 +{value}",
    effect: 0.6,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.boundlessIntensifier.canBeApplied
  }),
  rebuyable({
    name: "타원형 물질성",
    id: 6,
    initialCost: 1e4,
    costMult: 500,
    description: () => `리얼리티 머신 최대치를 ${formatX(1e100 ** Effects.product(EndgameMastery(153)))}만큼 증가`,
    effect: 1e100,
    formatEffect: value => `${formatX(EndgameMastery(153).isBought ? value.powEffectsOf(EndgameMastery(153)) : value)}`,
    isDecimal: true,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.ellipticMateriality.canBeApplied
  }),
  rebuyable({
    name: "룬의 보장",
    id: 7,
    initialCost: 2e5,
    costMult: 500,
    description: () => `글리프 불안정 시작 레벨을 ${formatInt(200)}만큼 늦춤`,
    effect: 200,
    formatEffect: value => `+${formatInt(value)} 레벨`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.runicAssurance.canBeApplied
  }),
  rebuyable({
    name: "쌍곡 무한각형",
    id: 8,
    initialCost: 1e7,
    costMult: 800,
    description: () => `무한 차원에 ${format("1e100000")} 배율 적용`,
    effect: DC.E100000,
    formatEffect: value => `${formatX(value)}`,
    isDecimal: true,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.hyperbolicApeirogon.canBeApplied
  }),
  rebuyable({
    name: "우주 필라멘트",
    id: 9,
    initialCost: 1e9,
    costMult: 1000,
    description: () => `은하의 성능 증가`,
    effect: 0.03,
    formatEffect: value => `+${formatPercents(value)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.cosmicFilament.canBeApplied
  }),
  rebuyable({
    name: "엔트로피 응축",
    id: 10,
    initialCost: 8e9,
    costMult: 2000,
    description: () => `특이점 획득량 증가`,
    effect: 1,
    formatEffect: value => `${formatX((EndgameMastery(131).isBought && !player.disablePostReality) ? Decimal.pow(1 + value, value) : new Decimal(1 + value), 2)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.entropicCondensing.canBeApplied
  }),
  {
    name: "간섭의 의혹",
    id: 11,
    cost: new Decimal(5e7),
    requirement: () => `유물 파편 총 ${format(1e90)}개
      (현재 ${format(player.celestials.effarig.relicShards, 2)}개 보유)`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.effarig.relicShards.gte(1e90),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: "총 반물질에 따라 시간 차원의 지수 증가",
    effect: () => player.disablePostReality ? 1 : 1 + Decimal.log10(player.records.totalEndgameAntimatter.add(10).log10()).div(100).toNumber(),
    formatEffect: value => `${formatPow(value, 0, 4)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.suspicionOfInterference.canBeApplied
  },
  {
    name: "환상의 결과",
    id: 12,
    cost: new Decimal(5e7),
    requirement: () => `글리프 레벨 요소 하나의 가중치를 ${formatInt(100)}으로 설정하여
    레벨 ${formatInt(9000)} 글리프 생성`,
    hasFailed: () => false,
    checkRequirement: () => Object.values(player.celestials.effarig.glyphWeights).some(w => w === 100) &&
      gainedGlyphLevel().actualLevel.gte(9000),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "반복 구매한 허수 업그레이드 수에 따라 무료 차원 가속 획득",
    effect: () => player.disablePostReality ? 0 : 2e4 * ImaginaryUpgrades.totalRebuyables,
    formatEffect: value => `${format(value, 1)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.consequencesOfIllusions.canBeApplied
  },
  {
    name: "정보의 덧없음",
    id: 13,
    cost: new Decimal(5e7),
    requirement: () => `The Nameless Ones의 현실에서 예상 리얼리티 머신
      ${format(Number.MAX_VALUE, 2)}개 도달`,
    hasFailed: () => !Enslaved.isRunning,
    // This is for consistency with the UI, which displays an amplified "projected RM" value on the reality button
    checkRequirement: () => Enslaved.isRunning &&
      MachineHandler.uncappedRM.times(simulatedRealityCount(false) + 1).gte(Number.MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "구매한 허수 업그레이드 수에 따라 허수 머신 최대치 증가",
    effect: () => player.disablePostReality ? 1 : Math.pow(1 + ImaginaryUpgrades.totalRebuyables / 20 + ImaginaryUpgrades.totalSinglePurchase / 2, EndgameMastery(154).effectOrDefault(1)),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.transienceOfInformation.canBeApplied
  },
  {
    name: "침입의 회상",
    id: 14,
    cost: new Decimal(3.5e8),
    formatCost: x => format(x, 1),
    requirement: () => `영원 도전 5에서 틱스피드 초당 ${format("1e75000000000")} 도달`,
    hasFailed: () => false,
    checkRequirement: () => EternityChallenge(5).isRunning && Tickspeed.perSecond.log10().gte(7.5e10),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `모든 차원의 구매당 배율을 ${formatPow(1.5, 0, 1)}로 제곱`,
    effect: () => player.disablePostReality ? 1 : 1.5,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.recollectionOfIntrusion.canBeApplied
  },
  {
    name: "이상의 조작",
    id: 15,
    cost: new Decimal(1e9),
    requirement: () => `제1 무한 차원을 한 번도 보유하지 않고
      반물질 ${format("1e1500000000000")} 도달`,
    hasFailed: () => player.requirementChecks.reality.maxID1.gt(0),
    checkRequirement: () => player.requirementChecks.reality.maxID1.eq(0) && player.antimatter.add(1).log10().gte(1.5e12),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // This upgrade lock acts in multiple different conditions, but isn't 100% foolproof and also blocks a few edge
    // cases which technically should be allowed but would be hard to communicate in-game. Forbidden actions are:
    // - Purchasing any ID (edge case: this is acceptable for ID2-8 inside EC2 or EC10)
    // - Purchasing any TD with any amount of EC7 completions (edge case: acceptable within EC1 or EC10)
    // - Entering EC7 with any amount of purchased TD
    description: () => `차원의 셀레스티얼 Lai'tela ${
      Pelle.isDoomed ? "해금" : "해금 및 반물질 차원의 연속체 전환"
    }`,
  },
  {
    name: "질량 없는 운동량",
    id: 16,
    cost: new Decimal(3.5e9),
    formatCost: x => format(x, 1),
    requirement: () => `Lai'tela의 현실을 ${formatInt(30)}초 이내에 두 번 불안정화`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.maxAllowedDimension <= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "제2 암흑 물질 차원 해금",
  },
  {
    name: "카이랄 진동",
    id: 17,
    cost: new Decimal(6e9),
    requirement: () => `한 번에 특이점을 최소 ${formatInt(20)}개 자동 응축`,
    hasFailed: () => false,
    checkRequirement: () => Singularity.singularitiesGained.gte(20) &&
      Currency.darkEnergy.gte(Singularity.cap.times(SingularityMilestone.autoCondense.effectOrDefault(Infinity))),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    description: "제3 암흑 물질 차원 해금",
  },
  {
    name: "차원 대칭",
    id: 18,
    cost: new Decimal(1.5e10),
    formatCost: x => format(x, 1),
    requirement: () => `모든 종류의 은하 총 ${formatInt(80000)}개 보유`,
    hasFailed: () => false,
    checkRequirement: () => GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
      player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)).gte(80000) : Replicanti.galaxies.total.add(player.galaxies).add(
      player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies).gte(80000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "제4 암흑 물질 차원 해금",
  },
  {
    name: "결정론적 복사",
    id: 19,
    cost: new Decimal(2.8e10),
    formatCost: x => format(x, 1),
    requirement: () => `이번 현실에서 시간 연구를 ${formatInt(8)}개보다 많이 보유하지 않고
      틱스피드 연속체 ${formatInt(3.85e6)} 도달`,
    hasFailed: () => player.requirementChecks.reality.maxStudies > 8,
    checkRequirement: () => player.requirementChecks.reality.maxStudies <= 8 &&
      Tickspeed.continuumValue.gte(3.85e6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: () => `시간 연구를 ${formatInt(8)}개보다 많이 구매`,
    description: "암흑 물질 소멸 해금"
  },
  {
    name: "진공 가속",
    id: 20,
    cost: new Decimal(3e12),
    requirement: () => `연속체 증가량 최소 ${formatPercents(1)} 달성`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.matterExtraPurchaseFactor.gte(2),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `반복 구매 가능한 허수 업그레이드의 자동구매기를 해금하고 허수 머신을
      ${formatInt(10)}배 빠르게 생산`,
    effect: () => player.disablePostReality ? 1 : 10,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.vacuumAcceleration.canBeApplied
  },
  {
    name: "실존 제거",
    id: 21,
    cost: new Decimal(1e13),
    requirement: () => `현실 내내 연속체를 비활성화한 채 반물질 ${format("1e7400000000000")} 도달`,
    hasFailed: () => !player.requirementChecks.reality.noContinuum,
    checkRequirement: () => player.requirementChecks.reality.noContinuum &&
      Currency.antimatter.value.add(1).log10().gte(7.4e12),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "연속체 활성화",
    description: "허수 머신에 따라 소멸 배율 획득량 증가",
    effect: () => player.disablePostReality ? 1 : Decimal.clampMin(Decimal.pow(Decimal.log10(Currency.imaginaryMachines.value.add(1)).sub(10), 3), 1).toNumber(),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.existentialElimination.canBeApplied
  },
  {
    name: "완전 종결",
    id: 22,
    cost: new Decimal(1.5e14),
    formatCost: x => format(x, 1),
    requirement: () => `저주받은 글리프를 최소 ${formatInt(4)}개 장착하고 Effarig의 현실에서
      반물질 ${format("1e150000000000")} 도달`,
    // Note: 4 cursed glyphs is -12 glyph count, but equipping a positive glyph in the last slot is allowed
    hasFailed: () => !Effarig.isRunning || player.requirementChecks.reality.maxGlyphs > -10,
    checkRequirement: () => Effarig.isRunning && player.requirementChecks.reality.maxGlyphs < -10 &&
      Currency.antimatter.value.add(1).log10().gte(1.5e11),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `모든 글리프 희생 총량이 ${format(1e100)}으로 증가`,
    effect: () => player.disablePostReality ? DC.D0 : new Decimal(1e100),
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.totalTermination.canBeApplied
  },
  {
    name: "평면 정화",
    id: 23,
    cost: new Decimal(6e14),
    requirement: () => `글리프를 최대 ${formatInt(0)}개 장착하고 Ra의 현실에서
      글리프 레벨 ${formatInt(20000)} 도달`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.maxGlyphs > 0,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.maxGlyphs <= 0 &&
      gainedGlyphLevel().actualLevel.gte(20000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "테서랙트 수에 따라 무료 차원 가속 수 증가",
    effect: () => player.disablePostReality ? 1 : Math.floor(0.25 * Math.pow(Tesseracts.effectiveCount, 2)),
    formatEffect: value => `${formatX(value)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.planarPurification.canBeApplied
  },
  {
    name: "절대 무효화",
    id: 24,
    cost: new Decimal(6e14),
    // We unfortunately don't have the UI space to be more descriptive on this button without causing text overflow,
    // so hopefully the additional modals (from the upgrade lock) will mostly communicate the idea that this is under
    // the same conditions as hard V's Post-destination
    requirement: () => `블랙홀을 완전히 반전시킨 채 Ra의 현실에서
      반물질 은하 ${formatInt(13000)}개 보유`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.slowestBH > 1e-300,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.slowestBH <= 1e-300 &&
      player.galaxies.gte(13000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // Three locking events: uninvert, discharge, and entering (but not auto-completing) EC12
    description: "특이점 수에 따라 무료 차원 가속의 성능 증가",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(player.celestials.laitela.singularities, 300),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: () => !PelleImaginaryUpgrade.absoluteAnnulment.canBeApplied
  },
  {
    name: "편재하는 소멸",
    id: 25,
    cost: new Decimal(1.6e15),
    formatCost: x => format(x, 1),
    requirement: () => `모든 차원을 비활성화하고 빈 글리프 슬롯을 최소 ${formatInt(4)}개 남긴 채
      Lai'tela의 현실에서 현실 도달`,
    hasFailed: () => !Laitela.isRunning || Laitela.maxAllowedDimension !== 0 ||
      Glyphs.activeWithoutCompanion.length > 1,
    checkRequirement: () => Laitela.isRunning && Laitela.maxAllowedDimension === 0 &&
      Glyphs.activeWithoutCompanion.length <= 1 && TimeStudy.reality.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "동반자 이외의 글리프를 추가 장착",
    description: "반물질의 셀레스티얼 Pelle 해금",
  },
  {
    name: "특이점 비축",
    id: 26,
    cost: new Decimal(1e50),
    requirement: () => `특이점 ${format(DC.E100, 2)}개 도달`,
    hasFailed: () => false,
    checkRequirement: () => Currency.singularities.value.gte(1e100),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `제5 암흑 물질 차원을 해금하고 암흑 물질 최대치를 ${formatPostBreak("1e1000")}으로 증가`,
  },
  {
    name: "긴급한 멸종",
    id: 27,
    cost: new Decimal(1e100),
    requirement: () => `Pelle에서 글리프를 한 번도 장착하지 않고 반물질 ${format(DC.E9E15)} 도달`,
    hasFailed: () => !Pelle.isDoomed || player.requirementChecks.endgame.noGlyphsDoomed === false,
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(9e15) && Pelle.isDoomed &&
      player.requirementChecks.endgame.noGlyphsDoomed === true,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `제6 암흑 물질 차원을 해금하고 암흑 물질 최대치를 ${formatPostBreak("1e4000")}으로 증가`,
  },
  {
    name: "연금술적 소멸",
    id: 28,
    cost: new Decimal(1e150),
    requirement: () => `연금술 자원을 하나도 보유하지 않고 Pelle 해금`,
    hasFailed: () => player.celestials.ra.alchemy[0].amount > 0 ||
      player.celestials.ra.alchemy[1].amount > 0 ||
      player.celestials.ra.alchemy[2].amount > 0 ||
      player.celestials.ra.alchemy[3].amount > 0 ||
      player.celestials.ra.alchemy[4].amount > 0 ||
      player.celestials.ra.alchemy[5].amount > 0,
    checkRequirement: () => Pelle.isUnlocked && !Pelle.isDoomed &&
      player.celestials.ra.alchemy[0].amount === 0 &&
      player.celestials.ra.alchemy[1].amount === 0 &&
      player.celestials.ra.alchemy[2].amount === 0 &&
      player.celestials.ra.alchemy[3].amount === 0 &&
      player.celestials.ra.alchemy[4].amount === 0 &&
      player.celestials.ra.alchemy[5].amount === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `제7 암흑 물질 차원을 해금하고 암흑 물질 최대치를 ${formatPostBreak("1e20000")}으로 증가`,
  },
  {
    name: "은하 학살",
    id: 29,
    cost: new Decimal(1e200),
    requirement: () => `모든 종류의 은하 총 ${format(1e75, 2, 2)}개 보유`,
    hasFailed: () => false,
    checkRequirement: () => GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
      player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)).times(GalaxyGenerator.galaxies.max(1)).gte(1e75) :
      Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies).add(GalaxyGenerator.galaxies).gte(1e75),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `제8 암흑 물질 차원을 해금하고 암흑 물질 최대치를 ${formatPostBreak("1e100000")}으로 증가`,
  },
  {
    name: "시작의 개시",
    id: 30,
    cost: DC.NUMMAX,
    requirement: () => `Pelle의 모든 약화와 스트라이크 비활성화`,
    hasFailed: () => !PelleStrikeUpgrade.pelleStrike1.isAvailableForPurchase,
    checkRequirement: () => PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length >= 5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => {
      if (ImaginaryUpgrade(30).isBought) return "어둠의 셀레스티얼 Alpha 해금";
      return "???의 셀레스티얼 ??? 해금";
    },
  },
];
