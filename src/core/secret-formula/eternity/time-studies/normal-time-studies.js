const thisInfinityMult = thisInfinity => {
  // All "this inf time" or "best inf time" mults are * 10
  const scaledInfinity = thisInfinity.times(10).plus(1);
  const cappedInfinity = Decimal.min(Decimal.pow(scaledInfinity, 0.125), 500);
  return DC.D15.pow(cappedInfinity.times(Decimal.ln(scaledInfinity)));
};
const passiveIPMult = () => {
  const isEffarigLimited = Effarig.isRunning && Effarig.currentStage === EFFARIG_STAGES.ETERNITY;
  const normalValue = (Perk.studyPassive.isBought && !player.disablePostReality) ? 1e50 : 1e25;
  return isEffarigLimited
    ? Math.min(normalValue, Effarig.eternityCap.toNumber())
    : normalValue;
};


/**
 * List of time study specifications and attributes
 * {
 *  @property {Number} id                   Numerical ID shown for each time study in code and in-game
 *  @property {Number} cost                 Amount of available time theorems required to purchase
 *  @property {Number} STcost               Amount of available space theorems required to purchase if needed
 *  @property {Object[]} requirement   Array of Numbers or functions which are checked to determine purchasability
 *  @property {Number} reqType              Number specified by enum in TS_REQUIREMENT_TYPE for requirement behavior
 *  @property {Number[]} requiresST    Array of Numbers indicating which other studies will cause this particular
 *    study to also cost space theorems - in all cases this applies if ANY in the array are bought
 *  @property {function: @return String} description  Text to be shown in-game for the time study's effects
 *  @property {function: @return Number} effect       Numerical value for the effects of a study
 *  @property {String[]} cap     Hard-coded cap for studies which don't scale forever
 *  @property {String} formatEffect   Formatting function for effects, if the default formatting isn't appropriate
 * }
 */
export const normalTimeStudies = [
  {
    id: 11,
    cost: 1,
    // All requirements of an empty array will always evaluate to true, so this study is always purchasable
    requirement: [],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: "제1 시간 차원이 틱스피드에 따라 배율을 받는다.",
    effect: () => {
      const tickspeed = Tickspeed.current.dividedBy(1000);
      const firstPart = tickspeed.pow(0.008).times(0.95);
      const secondPart = tickspeed.pow(0.00048).times(0.05);
      return firstPart.plus(secondPart).reciprocate();
    },
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E4000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 21,
    cost: 3,
    requirement: [11],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `복제자 배율 공식을
      (log2(x)${formatPow(2)})+x${formatPow(0.04, 3, 3)}로 개선한다.`,
    effect: () => Replicanti.amount.pow(0.04),
    // This is a special case because the study itself is *added* to the existing formula, but it makes more sense
    // to display a multiplicative increase just like every other study. We need to do the calculation in here in order
    // to properly show only the effect of this study and nothing else
    formatEffect: value => {
      const oldVal = Decimal.pow(Decimal.log2(Replicanti.amount.clampMin(1)), 2);
      const newVal = oldVal.plus(value);
      return formatX(newVal.div(oldVal.clampMin(1)), 2, 2);
    }
  },
  {
    id: 22,
    cost: 2,
    requirement: [11],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `복제자의 간격 제한을 ${formatInt(50)}ms ➜ ${formatInt(1)}ms로 낮춘다.`,
    effect: 1
  },
  {
    id: 31,
    cost: 3,
    requirement: [21],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `무한 횟수에 기반한 배율을 강화한다. (보너스${formatPow(100)})`,
    effect: 100
  },
  {
    id: 32,
    cost: 2,
    requirement: [22],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: `차원 가속 횟수에 비례하여 무한 횟수를 더욱 많이 얻는다.`,
    effect: () => Decimal.max(DimBoost.totalBoosts.times(10), 1),
    formatEffect: value => formatX(value, 2)
  },
  {
    id: 33,
    cost: 2,
    requirement: [22],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "빅 크런치를 해도 복제자 은하의 절반이 초기화되지 않는다."
  },
  {
    id: 41,
    cost: 4,
    requirement: [31],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 은하들의 수만큼 무한 포인트의 지급량을 ${formatX(DC.D1_2, 1, 1)} 늘린다`,
    effect: () => DC.D1_2.pow(GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(
      player.galaxies.max(1)).times(player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)) :
      Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies)),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 42,
    cost: 6,
    requirement: [32],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `반물질 은하 요구량이 제8 반물질 차원 ${formatInt(60)}개가 아닌
      ${formatInt(52)}개씩 증가한다.`,
    effect: 52
  },
  {
    id: 51,
    cost: 3,
    requirement: [41, 42],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `무한 포인트를 ${formatX(1e15)} 더 얻는다.`,
    effect: 1e15
  },
  {
    id: 61,
    cost: 3,
    requirement: [51],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `영원 포인트를 ${formatX(25)} 더 얻는다.`,
    effect: 25
  },
  {
    id: 62,
    cost: 3,
    requirement: [42, () => (Perk.bypassEC5Lock.isBought && !player.disablePostReality) || EternityChallenge(5).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `복제자 생성 속도가 ${formatInt(3)}배 빨라진다.`,
    effect: 3
  },
  {
    id: 71,
    cost: 4,
    requirement: [61, () => Perk.studyECRequirement.isBought || !EternityChallenge(12).isUnlocked],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "차원 희생이 다른 반물질 차원에게도 작은 영향을 미친다.",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower.sub(1).div(4).add(1) : Sacrifice.totalBoost.pow(0.25).clampMin(1),
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E210000),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 72,
    cost: 6,
    requirement: [61,
      () => Perk.studyECRequirement.isBought ||
        (!EternityChallenge(11).isUnlocked && !EternityChallenge(12).isUnlocked)],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "차원 희생이 제4 무한 차원에 아주 작은 영향을 미친다.",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower.sub(1).div(25).add(1) : Sacrifice.totalBoost.pow(0.04).clampMin(1),
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E30000),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 73,
    cost: 5,
    requirement: [61, () => Perk.studyECRequirement.isBought || !EternityChallenge(11).isUnlocked],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "차원 희생이 제3 시간 차원에 아주 작은 영향을 미친다.",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower.sub(1).div(200).add(1) : Sacrifice.totalBoost.pow(0.005).clampMin(1),
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E1300),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 81,
    cost: 4,
    requirement: [71],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `차원 가속의 생산량 증가 효과가 ${formatX(10)}으로 바뀐다.`,
    effect: 10
  },
  {
    id: 82,
    cost: 6,
    requirement: [72],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "차원 가속이 무한 차원에 영향을 미친다.",
    effect: () => DC.D1_0000109.pow(Decimal.pow(DimBoost.totalBoosts, 2)).min(Decimal.pow10(1e50)).times(
      DC.D1_0000109.pow(DimBoost.totalBoosts.sub(1e25).max(0).times(1e25))),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E1E7,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 83,
    cost: 5,
    requirement: [73],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "시간 차원으로 획득한 틱스피드 업그레이드가 차원 가속에 영향을 준다.",
    effect: () => DC.D1_0004.pow(player.totalTickGained).min(1e30).times(
      Decimal.pow(Decimal.max(player.totalTickGained.sub(172728), 1), 1000)),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E30,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 91,
    cost: 4,
    requirement: [81],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "반물질 차원이 현재 영원에서 보낸 시간에 따라서 증폭된다.",
    effect: () => Decimal.pow10(Decimal.min(Time.thisEternity.totalMinutes, 20).times(15).toNumber()).times(
      Time.thisEternity.totalMinutes.sub(20).times(15).max(1)),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E300,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 92,
    cost: 5,
    requirement: [82],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "무한 차원이 가장 빠른 영원 달성 기록에 따라서 증폭된다.",
    effect: () => DC.D2.pow(new Decimal(60).div(Time.bestEternityRealTime.totalSeconds)),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.C2P30,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 93,
    cost: 7,
    requirement: [83],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "시간 차원이 틱스피드 업그레이드 횟수에 따라서 증폭된다.",
    effect: () => Decimal.pow(player.totalTickGained, 0.25).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 101,
    cost: 4,
    requirement: [91],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "반물질 차원이 복제자의 개수만큼 증폭된다.",
    effect: () => Decimal.max(Replicanti.amount, 1),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 102,
    cost: 6,
    requirement: [92],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "복제자 은하가 복제자 배수를 증폭하게 된다.",
    effect: () => DC.D5.pow(player.replicanti.galaxies),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 103,
    cost: 6,
    requirement: [93],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "복제자 은하의 수 만큼 시간 차원을 증폭하게 된다.",
    effect: () => Decimal.max(player.replicanti.galaxies, 1),
    formatEffect: value => formatX(value, 2, 0)
  },
  {
    id: 111,
    cost: 12,
    requirement: [101, 102, 103],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => (Achievement(103).canBeApplied
      ? `무한 포인트 공식을 개선한다. log(x)/${formatFloat(307.8, 1)} ➜ log(x)/${formatInt(280)}`
      : `무한 포인트 공식을 개선한다. log(x)/${formatInt(308)} ➜ log(x)/${formatInt(280)}`),
    effect: 280
  },
  {
    id: 121,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [122, 123],
    description: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? `영원 포인트를 ${formatX(50)} 더 얻는다.`
      : `최근 영원 10회의 속도에 따라 영원 포인트를 더 얻는다${PlayerProgress.realityUnlocked() ? " (실제 시간)" : ""}`),
    effect: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? 50
      : Math.clamp(250 / Player.averageRealTimePerEternity, 1, 50)),
    formatEffect: value => ((Perk.studyActiveEP.isBought && !player.disablePostReality) ? undefined : formatX(value, 1, 1)),
    cap: 50
  },
  {
    id: 122,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [121, 123],
    description: () => ((Perk.studyPassive.isBought && !player.disablePostReality)
      ? `영원 포인트를 ${formatX(50)} 더 얻는다.`
      : `영원 포인트를 ${formatX(35)} 더 얻는다.`),
    effect: () => ((Perk.studyPassive.isBought && !player.disablePostReality) ? 50 : 35)
  },
  {
    id: 123,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [121, 122],
    description: "현재 영원에서 보낸 시간에 따라서 더 많은 영원 포인트를 얻는다.",
    effect: () => {
      const perkEffect = (player.disablePostReality
        ? TimeSpan.fromMinutes(DC.D0)
        : TimeSpan.fromMinutes(new Decimal(Perk.studyIdleEP.effectOrDefault(0))));
      const totalSeconds = Alpha.isRunning ? Time.thisEternityRealTime.totalSeconds : Time.thisEternity.plus(perkEffect).totalSeconds;
      return Decimal.pow(new Decimal(1.39).times(totalSeconds), 0.5);
    },
    formatEffect: value => formatX(value, 1, 1)
  },
  {
    id: 131,
    cost: 5,
    STCost: 8,
    requirement: [121],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [132, 133],
    description: () => (Achievement(138).isUnlocked
      ? `복제자 은하를 ${formatPercents(0.5)}개 더 많이 얻을 수 있다.`
      : `복제자 은하 자동구매기가 비활성화되지만, 복제자 은하를 ${formatPercents(0.5)}개 더 많이 얻을 수 있다.`),
    effect: () => Decimal.floor(player.replicanti.boughtGalaxyCap.div(2))
  },
  {
    id: 132,
    cost: 5,
    STCost: 8,
    requirement: [122],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [131, 133],
    description: () => ((Pelle.isDoomed && !PelleDestructionUpgrade.timestudy132.canBeApplied)
      ? `복제자 은하가 ${formatPercents(0.4)} 더 강해진다.`
      : `복제자 은하가 ${formatPercents(0.4)} 더 강해지고 복제자 생성 속도가
        ${(Perk.studyPassive.isBought && !player.disablePostReality) ? formatX(3) : formatX(1.5, 1, 1)} 빨라진다.`),
    effect: 0.4
  },
  {
    id: 133,
    cost: 5,
    STCost: 8,
    requirement: [123],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [131, 132],
    description: () => (Achievement(138).isUnlocked
      ? `복제자 은하가 ${formatPercents(0.5)} 효율적이게 된다.`
      : `복제자가 ${format(Number.MAX_VALUE, 2)}개가 될 때까지 생성 속도가 ${formatX(10)} 느려지지만, ` +
    `복제자 은하가 ${formatPercents(0.5)} 더 강해진다.`),
    effect: 0.5
  },
  {
    id: 141,
    cost: 4,
    STCost: 2,
    requirement: [131],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [142, 143],
    description: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? `무한 포인트를 ${formatX(DC.E45)} 더 얻는다.`
      : "현재 무한에서 지낸 시간에 반비례하여 무한 포인트의 획득량을 증폭한다."),
    effect: () => ((Perk.studyActiveEP.isBought && !player.disablePostReality)
      ? DC.E45
      : DC.E45.divide(thisInfinityMult(Alpha.isRunning
        ? Time.thisInfinityRealTime.totalSeconds
        : Time.thisInfinity.totalSeconds)).clampMin(1)),
    formatEffect: value => ((Perk.studyActiveEP.isBought && !player.disablePostReality) ? undefined : formatX(value, 2, 1))
  },
  {
    id: 142,
    cost: 4,
    STCost: 2,
    requirement: [132],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [141, 143],
    description: () => `무한 포인트를 ${formatX(passiveIPMult())} 더 얻는다.`,
    effect: passiveIPMult,
    cap: () => (Effarig.eternityCap === undefined ? undefined : Effarig.eternityCap.toNumber())
  },
  {
    id: 143,
    cost: 4,
    STCost: 2,
    requirement: [133],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [141, 142],
    description: "현재 무한에서 지낸 시간에 비례하여 무한 포인트의 획득량을 증폭한다.",
    effect: () => {
      const perkEffect = (player.disablePostReality
        ? TimeSpan.fromMinutes(DC.D0)
        : TimeSpan.fromMinutes(new Decimal(Perk.studyIdleEP.effectOrDefault(0))));
      const totalSeconds = Alpha.isRunning ? Time.thisInfinityRealTime.totalSeconds : Time.thisInfinity.plus(perkEffect).totalSeconds;
      return thisInfinityMult(totalSeconds);
    },
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  {
    id: 151,
    cost: 8,
    requirement: [141, 142, 143],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 시간 차원에 ${formatX(1e6)} 배율을 적용한다.`,
    effect: 1e6
  },
  {
    id: 161,
    cost: 7,
    requirement: [151],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 반물질 차원이 ${formatX(DC.E616)} 증폭된다.`,
    effect: () => DC.E616
  },
  {
    id: 162,
    cost: 7,
    requirement: [151],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 무한 차원이 ${formatX(1e11)} 증폭된다.`,
    effect: 1e11
  },
  {
    id: 171,
    cost: 15,
    requirement: [161, 162],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `다음 틱스피드 업그레이드의 시간 파편 요구량이 더 느리게 증가한다.
      ${formatX(1.33, 0, 2)} ➜ ${formatX(1.25, 0, 2)}`,
    effect: () => TS171_MULTIPLIER
  },
  {
    id: 181,
    cost: 200,
    requirement: [171,
      () => EternityChallenge(1).completions > 0 || (Perk.bypassEC1Lock.isBought && !player.disablePostReality),
      () => EternityChallenge(2).completions > 0 || (Perk.bypassEC2Lock.isBought && !player.disablePostReality),
      () => EternityChallenge(3).completions > 0 || (Perk.bypassEC3Lock.isBought && !player.disablePostReality)],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `현재 획득할 수 있는 무한 포인트의 ${formatPercents(0.01)}를 매초 획득한다.`,
    effect: () => gainedInfinityPoints().times(Time.deltaTime.div(100))
      .timesEffectOf(Ra.unlocks.continuousTTBoost.effects.autoPrestige)
  },
  {
    id: 191,
    cost: 400,
    requirement: [181, () => EternityChallenge(10).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `영원 후 무한 횟수의 ${formatPercents(0.05)}를 저장된 무한으로 영구 보존하고
    무한 횟수를 두 배로 얻는다.`,
    effects: {
      infinitiesGain: 2,
      bankedInfinitiesGain: () => Currency.infinities.value.times(0.05).floor()
    }
  },
  {
    id: 192,
    cost: 730,
    requirement: [181, () => EternityChallenge(10).completions > 0, () => !Enslaved.isRunning],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => (Enslaved.isRunning
      ? "이 현실에서 복제자를 만들 공간이 충분하지 않다."
      : `복제자를 ${format(replicantiCap(), 2, 1)}개 이상 획득할 수 있지만, 복제자 개수가 많을수록 복제자의 생성 속도가 느려진다.`)
  },
  {
    id: 193,
    cost: 300,
    requirement: [181, () => EternityChallenge(10).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: "반물질 차원이 영원 횟수에 비례하여 증폭된다.",
    effect: () => DC.E2000.pow(Currency.eternities.value.div(1e5).clampMax(15)).times(
      DC.E2000.pow(Decimal.log10(Currency.eternities.value.sub(1.4e6).div(1e5).max(1)))),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E30000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 201,
    cost: 900,
    requirement: [192],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "첫 번째 시간 연구 분기점에서 하나의 길을 더 고를 수 있다."
  },
  {
    id: 211,
    cost: 120,
    requirement: [191],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `차원 가속의 가격 상승 가속화가 ${formatInt(5)}개 만큼 미뤄진다.`,
    effect: 5
  },
  {
    id: 212,
    cost: 150,
    requirement: [191],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "모든 은하들의 성능이 시간 파편의 개수에 비례해 증가한다.",
    effect: () => Decimal.pow(Currency.timeShards.value.clampMin(2).log2(), 0.008).min(1.2).times(
      Currency.timeShards.value.clampMin(2).log2().add(1).log2().add(1).log2().sub(2.1).div(3).max(1)).toNumber(),
    cap: () => Alpha.isDestroyed ? Infinity : 1.2,
    formatEffect: value => `+${formatPercents(value - 1, 3)}`
  },
  {
    id: 213,
    cost: 200,
    requirement: [193],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `복제자 생성 속도가 ${formatInt(50)}배 빨라진다.`,
    effect: 50
  },
  {
    id: 214,
    cost: 120,
    requirement: [193],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "차원 희생이 제8 반물질 차원을 더욱 많이 증폭한다.",
    effect: () => {
      if (Ascensions.sacA.isUnlocked) return Sacrifice.totalPower.sub(1).times(21.5).add(1);
      const totalBoost = Sacrifice.totalBoost;
      const firstPart = totalBoost.pow(18).clampMaxExponent(Alpha.isDestroyed ? Infinity : 300000);
      const secondPart = totalBoost.pow(3.5).clampMaxExponent(Alpha.isDestroyed ? Infinity : 700000);
      return firstPart.times(secondPart);
    },
    cap: () => Ascensions.sacA.isUnlocked ? DC.BEMAX : (Alpha.isDestroyed ? DC.BEMAX : DC.E1E6),
    formatEffect: value => Ascensions.sacA.isUnlocked ? formatPow(value, 2, 3) : formatX(value, 2, 1)
  },
  {
    id: 221,
    cost: 900,
    STCost: 4,
    requirement: [211],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [222],
    description: "차원 가속 횟수에 비례하여 시간 차원이 증폭된다.",
    effect: () => DC.D1_0025.pow(DimBoost.totalBoosts),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 222,
    cost: 900,
    STCost: 4,
    requirement: [211],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [221],
    description: () => `차원 가속 구매 시 가격 상승량이 ${formatInt(2)}개 더 감소한다.`,
    effect: 2
  },
  {
    id: 223,
    cost: 900,
    STCost: 4,
    requirement: [212],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [224],
    description: () => `먼 반물질 은하의 가격 상승이 은하 ${formatInt(7)}개만큼 늦춰진다.`,
    effect: 7
  },
  {
    id: 224,
    cost: 900,
    STCost: 4,
    requirement: [212],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [223],
    description() {
      const effect = TimeStudy(224).effectValue;
      return `먼 반물질 은하의 가격 증가가 ${quantifyHybridLarge("은하", effect)}만큼 늦게 시작한다.
        (차원 가속 ${formatInt(2000)}회당 ${formatInt(1)}개)`;
    },
    effect: () => Decimal.floor(DimBoost.totalBoosts.div(2000)).toNumber()
  },
  {
    id: 225,
    cost: 900,
    STCost: 4,
    requirement: [213],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [226],
    description: "복제자의 개수에 따라서 복제자 은하를 추가로 얻는다.",
    effect: () => Decimal.floor(Replicanti.amount.add(1).log10().div(1000).min(1e10).times(Replicanti.amount.add(1).log10().add(1).log10().sub(3).div(10).max(1))),
    formatEffect: value => `+${formatHybridLarge(value, 3)} RG`
  },
  {
    id: 226,
    cost: 900,
    STCost: 4,
    requirement: [213],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [225],
    description: "복제자 은하의 최대 보유 개수에 비례하여 복제자 은하를 추가로 얻는다.",
    effect: () => Decimal.floor(player.replicanti.boughtGalaxyCap.div(12)),
    formatEffect: value => `+${formatHybridLarge(value, 3)} RG`
  },
  {
    id: 227,
    cost: 900,
    STCost: 4,
    requirement: [214],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [228],
    description: "차원 희생이 제4 시간 차원에 작은 영향을 미친다.",
    effect: () => Decimal.max(Decimal.pow(Sacrifice.totalBoost.add(1).pLog10(), 20), 1),
    cap: () => Alpha.isDestroyed ? DC.BEMAX : DC.E300,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 228,
    cost: 900,
    STCost: 4,
    requirement: [214],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [227],
    description: () => `차원 희생 공식의 증가 효율이 개선된다.
      ${Sacrifice.getSacrificeDescription({ "TimeStudy228": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "TimeStudy228": true })}`,
    effect: 0.2
  },
  {
    id: 231,
    cost: 500,
    STCost: 5,
    requirement: [221, 222],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [232],
    description: "차원 가속의 성능이 그 횟수에 비례하여 증가한다.",
    effect: () => Decimal.pow(DimBoost.totalBoosts, 0.375).clampMin(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 232,
    cost: 500,
    STCost: 5,
    requirement: [223, 224],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [231],
    description: "모든 은하들의 성능이 반물질 은하의 개수에 비례하여 증가한다.",
    effect: () => Decimal.pow(player.galaxies.div(500).add(1), 0.25).toNumber(),
    formatEffect: value => `+${formatPercents(value - 1, 3)}`
  },
  {
    id: 233,
    cost: 500,
    STCost: 5,
    requirement: [225, 226],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [234],
    description: "복제자 은하 최대 보유 개수 업그레이드의 비용이 복제자의 개수가 많을수록 감소한다.",
    effect: () => Replicanti.amount.pow(0.625),
    formatEffect: value => `/ ${format(value, 1, 2)}`
  },
  {
    id: 234,
    cost: 500,
    STCost: 5,
    requirement: [227, 228],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [233],
    description: "차원 희생이 제1 반물질 차원에 영향을 미친다.",
    effect: () => Ascensions.sacA.isUnlocked ? Sacrifice.totalPower : Sacrifice.totalBoost,
  },
  // Note: These last 4 entries are the triad studies
  {
    id: 301,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 1, 221, 222, 231],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [221, 222, 231],
    description: "시간 연구 231의 효과가 시간 연구 221의 효과를 증폭시킨다.",
    effect: () => Decimal.pow(TimeStudy(221).effectValue.pow(TimeStudy(231).effectValue.minus(1)),
      Ra.unlocks.triadBuff.effectOrDefault(1)).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 1
  },
  {
    id: 302,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 2, 223, 224, 232],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [223, 224, 232],
    description: () => `먼 반물질 은하의 가격 증가 기준점이 반물질 은하
      ${formatInt(Math.pow(3000, Ra.unlocks.triadBuff.effectOrDefault(1)))}개만큼 더 늦게 시작한다.`,
    effect: () => Math.pow(3000, Ra.unlocks.triadBuff.effectOrDefault(1)),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 2
  },
  {
    id: 303,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 3, 225, 226, 233],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [225, 226, 233],
    description: () => `시간 연구 225와 226 및 Effarig의 무한에서 추가 복제자 은하를
      ${formatPercents(0.5 * Ra.unlocks.triadBuff.effectOrDefault(1))} 더 얻는다.`,
    effect: () => 1 + 0.5 * Ra.unlocks.triadBuff.effectOrDefault(1),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 3
  },
  {
    id: 304,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 4, 227, 228, 234],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [227, 228, 234],
    description: () => (Ra.unlocks.triadBuff.canBeApplied
      ? `차원 희생 배율을 ${format(2 * Ra.unlocks.triadBuff.effectOrDefault(1), 2, 2)}제곱한다.`
      : `차원 희생 배율을 제곱한다.`),
    effect: () => 2 * Ra.unlocks.triadBuff.effectOrDefault(1),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 4
  }
];
