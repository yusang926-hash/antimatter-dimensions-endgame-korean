const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.reality.rebuyables[props.id],
    1e30,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  const { effect } = props;
  props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(
    effect + ImaginaryUpgrade(props.id).effectOrDefault(0),
    player.reality.rebuyables[props.id] * getAdjustedGlyphEffect("realityrow1pow"));
  props.description = () => props.textTemplate.replace("{value}",
    ImaginaryUpgrade(props.id).effectValue === 0
      ? formatInt(effect)
      : format(effect + ImaginaryUpgrade(props.id).effectOrDefault(0), 2, 2));
  props.formatEffect = value => formatX(value, 2, 0);
  props.formatCost = value => format(value, 2, 0);
  return props;
};


export const realityUpgrades = [
  rebuyable({
    name: "시간 증폭기",
    id: 1,
    initialCost: 1,
    costMult: 30,
    textTemplate: "팽창된 시간을 {value}배 빠르게 획득",
    effect: 3
  }),
  rebuyable({
    name: "복제 증폭기",
    id: 2,
    initialCost: 1,
    costMult: 30,
    textTemplate: "복제자를 {value}배 빠르게 획득",
    effect: 3
  }),
  rebuyable({
    name: "영원 증폭기",
    id: 3,
    initialCost: 2,
    costMult: 30,
    textTemplate: "영원 횟수를 {value}배 더 획득",
    effect: 3
  }),
  rebuyable({
    name: "초광속 증폭기",
    id: 4,
    initialCost: 2,
    costMult: 30,
    textTemplate: "타키온 입자를 {value}배 더 획득",
    effect: 3
  }),
  rebuyable({
    name: "무한 증폭기",
    id: 5,
    initialCost: 3,
    costMult: 50,
    textTemplate: "무한 횟수를 {value}배 더 획득",
    effect: 5
  }),
  {
    name: "우주적 복제",
    id: 6,
    cost: 15,
    requirement: "복제자 은하를 사용하지 않고 첫 수동 영원 달성",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => !(player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities),
    checkRequirement: () => player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "복제자 은하 획득",
    description: "복제자 은하 수에 따라 복제 속도에 배율 적용",
    effect: () => player.disablePostReality ? 1 : Replicanti.galaxies.total.div(25).add(1).toNumber(),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "무수한 구축",
    id: 7,
    cost: 15,
    requirement: "반물질 은하를 최대 1개만 보유하고 첫 무한 달성",
    hasFailed: () => !(player.galaxies.lte(1) && player.requirementChecks.reality.noInfinities),
    checkRequirement: () => player.galaxies.lte(1) && player.requirementChecks.reality.noInfinities,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    canLock: true,
    lockEvent: "반물질 은하 추가 획득",
    description: "반물질 은하 수에 따라 무한 횟수 획득량 증가",
    effect: () => player.disablePostReality ? DC.D1 : player.galaxies.div(20).add(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "역설적 성취",
    id: 8,
    cost: 15,
    requirement: "자동으로 달성된 도전과제 없이 수동으로 영원 달성",
    hasFailed: () => player.reality.gainedAutoAchievements,
    checkRequirement: () => !player.reality.gainedAutoAchievements,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    // We don't have lockEvent because the modal can never show up for this upgrade
    description: "도전과제 배율에 따라 타키온 입자 획득량 증가",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.sqrt(Achievements.power),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "언어적 확장",
    id: 9,
    cost: 15,
    requirement: () => `레벨 ${formatInt(3)} 이상의 글리프 하나만 사용하여
      ${format("1e4000")} 영원 포인트로 영원 달성`,
    hasFailed: () => {
      const invalidEquippedGlyphs = Glyphs.activeWithoutCompanion.length > 1 ||
        (Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level.lt(3));
      const hasValidGlyphInInventory = Glyphs.inventory.countWhere(g => g && g.level.gte(3)) > 0;
      return invalidEquippedGlyphs || (Glyphs.activeWithoutCompanion.length === 0 && !hasValidGlyphInInventory);
    },
    checkRequirement: () => Currency.eternityPoints.value.add(1).log10().gte(4000) &&
      Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level.gte(3),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    // There are two locking events - equipping a glyph with too low a level, and equipping a second glyph
    description: "글리프 슬롯 1개 추가 획득",
    effect: () => 1
  },
  {
    name: "실존적 연장",
    id: 10,
    cost: 15,
    requirement: () => `최소 ${formatPostBreak(DC.E400)} 무한 포인트를 보유하고 첫 수동 영원 달성`,
    hasFailed: () => !player.requirementChecks.reality.noEternities,
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(400) &&
      player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "영원 달성",
    bypassLock: () => Currency.infinityPoints.value.add(1).log10().gte(400),
    description: () => `모든 현실을 영원 횟수 ${formatInt(100)}회로 시작 (현재 현실에도 적용)`,
    automatorPoints: 15,
    shortDescription: () => `영원 횟수 ${formatInt(100)}회로 시작`,
    effect: () => player.disablePostReality ? 0 : 100
  },
  {
    name: "끝없는 흐름",
    id: 11,
    cost: 50,
    requirement: () => `저장된 무한 횟수 ${format(Currency.infinitiesBanked.value, 2)}/${format(DC.E12)}`,
    checkRequirement: () => Currency.infinitiesBanked.value.add(1).log10().gte(12),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: "매초 무한 달성으로 얻을 무한 횟수의 10% 획득",
    automatorPoints: 5,
    shortDescription: () => `무한 횟수 지속 생산`,
    effect: () => player.disablePostReality ? DC.D0 : gainedInfinities().times(0.1),
    formatEffect: value => `초당 ${format(value)}`
  },
  {
    name: "깨달은 존재",
    id: 12,
    cost: 50,
    requirement: () => `영원 도전 1을 완료하지 않고 ${format(DC.E70)} 영원 포인트로 영원 달성`,
    hasFailed: () => EternityChallenge(1).completions !== 0,
    checkRequirement: () => Currency.eternityPoints.value.add(1).log10().gte(70) && EternityChallenge(1).completions === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "영원 도전 1 완료",
    description: "현실 및 시간 정리 수에 따라 영원 포인트에 배율 적용",
    effect: () => player.disablePostReality ? DC.D1 : Currency.timeTheorems.value
      .minus(DC.E3).clampMin(2)
      .pow(Decimal.log2(Decimal.clamp(Currency.realities.value, 1, 1e4))).clampMin(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "원격기계적 과정",
    id: 13,
    cost: 50,
    requirement: () => `제5-8 시간 차원 없이 ${format(DC.E4000)} 영원 포인트로 영원 달성`,
    hasFailed: () => !Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkRequirement: () => Currency.eternityPoints.value.add(1).log10().gte(4000) &&
      Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "제5 이상의 시간 차원 구매",
    description: () => `영원 자동구매기를 개선하고 시간 차원 및 ${formatX(5)} 영원 포인트 자동구매기 해금`,
    automatorPoints: 10,
    shortDescription: () => `시간 차원 및 ${formatX(5)} 영원 포인트 자동구매기, 영원 자동구매기 개선`,
  },
  {
    name: "영원한 흐름",
    id: 14,
    cost: 50,
    requirement: () => `영원 횟수 ${format(Currency.eternities.value, 2)}/${format(1e7)}`,
    checkRequirement: () => Currency.eternities.gte(1e7),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: "매초 현실 횟수만큼 영원 횟수 획득",
    automatorPoints: 5,
    shortDescription: () => `영원 횟수 지속 생산`,
    effect: () => player.disablePostReality ? 0 : Currency.realities.value.times(Ra.unlocks.continuousTTBoost.effects.eternity.effectOrDefault(1)),
    formatEffect: value => `초당 ${format(value)}`
  },
  {
    name: "역설적 영원",
    id: 15,
    cost: 50,
    requirement: () => `${formatX(5)} 영원 포인트 업그레이드를 구매하지 않고
      영원 포인트 ${format(DC.E10)} 보유`,
    hasFailed: () => player.epmultUpgrades.neq(0),
    checkRequirement: () => Currency.eternityPoints.value.add(1).log10().gte(10) && player.epmultUpgrades.eq(0),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: () => `${formatX(5)} 영원 포인트 업그레이드 구매`,
    description: () => `${formatX(5)} 영원 포인트 배율에 따라 타키온 입자 획득량 증가`,
    effect: () => player.disablePostReality ? 1 : Decimal.max(Decimal.sqrt(Decimal.log10(EternityUpgrade.epMult.effectValue)).div(9), 1).toNumber(),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "희귀도의 격차",
    id: 16,
    cost: 1500,
    requirement: () => `고급 이상의 글리프를 최소 ${formatInt(4)}개 장착하고 현실 달성
      (현재 ${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && g.strength >= 1.5))}개 장착)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && g.strength >= 1.5);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => g.strength >= 1.5);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => g.strength >= 1.5) >= 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "글리프 희귀도 공식 개선",
    effect: 1.3,
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "효능의 이중성",
    id: 17,
    cost: 1500,
    requirement: () => `각각 효과가 최소 ${formatInt(2)}개인 글리프를 최소 ${formatInt(4)}개 장착하고 현실 달성
      (현재 ${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && countValuesFromBitmask(g.effects) >= 2))}개 장착)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && countValuesFromBitmask(g.effects) >= 2);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => countValuesFromBitmask(g.effects) >= 2);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => countValuesFromBitmask(g.effects) >= 2) >= 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => `글리프에 추가 효과가 붙을 확률 ${formatPercents(0.5)}`,
    effect: 0.5,
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "영원의 척도",
    id: 18,
    cost: 1500,
    requirement: () => `각각 레벨 ${formatInt(10)} 이상인 글리프를 최소 ${formatInt(4)}개 장착하고 현실 달성
      (현재 ${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && g.level.gte(10)))}개 장착)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && g.level.gte(10));
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => g.level.gte(10));
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => g.level.gte(10)) >= 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "영원 횟수에 따라 글리프 레벨 증가",
    effect: () => Decimal.max(Decimal.sqrt(Currency.eternities.value.plus(1).log10()).times(0.45), 1).toNumber(),
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "정화하여 강화",
    id: 19,
    cost: 1500,
    requirement: () => `동시에 글리프를 총 ${formatInt(10)}개 이상 보유
      (현재 ${formatInt(Glyphs.allGlyphs.countWhere(g => g.type !== "companion"))}개 보유)`,
    hasFailed: () => Glyphs.allGlyphs.countWhere(g => g.type !== "companion") < 10,
    checkRequirement: () => Glyphs.allGlyphs.countWhere(g => g.type !== "companion") >= 10,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "글리프를 희생하여 영구 보너스 획득 가능 (Shift + 클릭)",
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "특이점의 동등성",
    id: 20,
    cost: 1500,
    requirement: () => `블랙홀 해금 후 총 플레이 시간 ${formatInt(100)}일
      (현재: ${Time.timeSinceBlackHole.toStringShort(false)})`,
    hasFailed: () => !BlackHole(1).isUnlocked && Currency.realityMachines.lt(100),
    checkRequirement: () => Time.timeSinceBlackHole.totalDays.gte(100) && BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "두 번째 블랙홀 해금",
    automatorPoints: 10,
    shortDescription: () => `두 번째 블랙홀`,
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "우주적 집합체",
    id: 21,
    cost: 100000,
    requirement: () => `${formatInt(GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
      player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)) : Replicanti.galaxies.total.add(player.galaxies).add(
      player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies))}/${formatInt(2800)} 모든 종류의 은하 합계`,
    checkRequirement: () =>
      GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
      player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)).gte(2800) : Replicanti.galaxies.total.add(player.galaxies).add(
      player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies).gte(2800),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `더욱 먼 반물질 은하의 가격 상승 시작점을 은하 ${formatInt(1e5)}개로 변경`,
    effect: () => player.disablePostReality ? 800 : 1e5
  },
  {
    name: "시간적 초월",
    id: 22,
    cost: 100000,
    requirement: () => `시간 파편 ${format(Currency.timeShards.value, 1)}/${format(DC.E28000)}`,
    checkRequirement: () => Currency.timeShards.value.add(1).log10().gte(28000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "이번 현실에서 보낸 일수에 따라 시간 차원에 배율 적용",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow10(Decimal.pow(Decimal.log10(Time.thisReality.totalDays.plus(1)).times(2).plus(1), 2.2)),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "복제의 신속함",
    id: 23,
    cost: 100000,
    requirement: () => `게임 시간 ${formatInt(15)}분 이내에 현실 달성
      (최고 기록: ${Time.bestReality.toStringShort()})`,
    hasFailed: () => Time.thisReality.totalMinutes.gte(15),
    checkRequirement: () => Time.thisReality.totalMinutes.lt(15),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "게임 시간 기준 가장 빠른 현실 기록에 따라 복제자 속도 증가",
    effect: () => player.disablePostReality ? 1 : DC.D15.div(Decimal.min(Time.bestReality.totalMinutes, DC.D15)).toNumber(),
    cap: () => Alpha.isDestroyed ? Infinity : 180,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "인공적 상징주의",
    id: 24,
    cost: 100000,
    requirement: () => `글리프를 장착하지 않고 리얼리티 머신 ${formatInt(5000)}개로 현실 달성`,
    hasFailed: () => Glyphs.activeWithoutCompanion.length > 0,
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(5000) &&
      Glyphs.activeWithoutCompanion.length === 0,
    canLock: true,
    lockEvent: "동반자 이외의 글리프 장착",
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "글리프 슬롯 1개 추가 획득",
    effect: () => 1
  },
  {
    name: "힘들이지 않는 존재",
    id: 25,
    cost: 100000,
    requirement: () => `영원 포인트 ${format(DC.E11111)} 도달 (최고: ${format(player.records.bestReality.bestEP, 2)} 영원 포인트)`,
    checkRequirement: () => player.records.bestReality.bestEP.add(1).log10().gte(11111),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    description: "현실 자동구매기 및 오토메이터 명령어 해금",
    automatorPoints: 100,
    shortDescription: () => `현실 자동구매기`,
  },
];
