// This is supposed to be in ./navigation.js but importing doesn't work for some stupid reason
// progress should always return number, even if it will return infinity
function emphasizeEnd(fraction) {
  return Decimal.pow(fraction, 10).toNumber();
}

function rebuyableCost(initialCost, increment, id) {
  return initialCost * Math.pow(increment, player.celestials.v.upgrades[id]);
}

function rebuyable(config) {
  const { id, cap, costCap, description, formatEffect, formatCost } = config;
  return {
    id,
    cost: () => rebuyableCost(config.initialCost, config.increment, config.id),
    cap,
    costCap,
    description,
    effect: () => config.effect(player.celestials.v.upgrades[config.id]),
    formatEffect,
    formatCost,
    rebuyable: true
  };
}

export const V_REDUCTION_MODE = {
  SUBTRACTION: 1,
  DIVISION: 2
};

export const v = {
  // Note: mainUnlock IDs here are one-indexed to match with navigation indices
  mainUnlock: {
    realities: {
      id: 1,
      name: "리얼리티 횟수",
      resource: () => Currency.realities.value,
      requirement: 1250,
      format: x => formatInt(x),
      progress: () => new Decimal(Currency.realities.value).div(EndgameMilestone.vReduction.isReached ? 100 : 1250).toNumber(),
    },
    eternities: {
      id: 2,
      name: "영원 횟수",
      resource: () => Currency.eternities.value,
      requirement: 1e70,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.eternities.value.add(1).pLog10().div(70)),
    },
    infinities: {
      id: 3,
      name: "무한 횟수",
      resource: () => Currency.infinitiesTotal.value,
      requirement: 1e160,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.infinitiesTotal.value.add(1).pLog10().div(160)),
    },
    dilatedTime: {
      id: 4,
      name: "팽창 시간",
      resource: () => player.records.thisReality.maxDT,
      requirement: DC.E320,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(player.records.thisReality.maxDT.add(1).pLog10().div(320)),
    },
    replicanti: {
      id: 5,
      name: "복제자",
      resource: () => player.records.thisReality.maxReplicanti,
      requirement: DC.E320000,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(player.records.thisReality.maxReplicanti.add(1).pLog10().div(320000)),
    },
    realityMachines: {
      id: 6,
      name: "리얼리티 머신",
      resource: () => Currency.realityMachines.value,
      requirement: 1e60,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.realityMachines.value.add(1).pLog10().div(60)),
    },
  },
  runUnlocks: [
    {
      id: 0,
      name: "글리프 기사",
      description: value => `최대 ${quantifyInt("개", -value)}의 글리프만 장착하고 현실을 해금하세요.`,
      // This achievement has internally negated values since the check is always greater than
      values: [-5, -4, -3, -2, -1, 0],
      condition: () => V.isRunning && TimeStudy.reality.isBought,
      currentValue: () => new Decimal(-Glyphs.activeWithoutCompanion.length),
      formatRecord: x => (x.gte(-5) ? formatInt(x.neg()) : "미달성"),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 1,
      name: "반항성",
      description: value => `모든 유형을 합쳐 은하를 총 ${formatInt(value)}개 보유하세요.`,
      values: [4000, 4300, 4600, 4900, 5200, 5500],
      condition: () => V.isRunning,
      currentValue: () => GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(
        player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)) : Replicanti.galaxies.total.add(player.galaxies).add(
        player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies),
      formatRecord: x => formatHybridLarge(x, 3),
      shardReduction: tiers => Math.floor(300 * tiers),
      maxShardReduction: goal => goal - 4000,
      perReductionStep: 3,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 2,
      name: "7개의 치명적인 물질",
      description: value => `영원 도전 7에서 무한 포인트 ${format(Decimal.pow10(value))}을 획득하세요.`,
      values: [6e5, 7.2e5, 8.4e5, 9.6e5, 1.08e6, 1.2e6],
      condition: () => V.isRunning && EternityChallenge(7).isRunning,
      currentValue: () => Currency.infinityPoints.value.add(1).log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => 1.2e5 * tiers,
      maxShardReduction: goal => goal - 6e5,
      perReductionStep: DC.E1200,
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 3,
      name: "어린 소년",
      description: value => `시간 팽창을 해금하지 않고 영원 도전 12에서
        반물질 ${format(Decimal.pow10(value))}을 획득하세요.`,
      values: [400e6, 450e6, 500e6, 600e6, 700e6, 800e6],
      condition: () => V.isRunning && EternityChallenge(12).isRunning && !PlayerProgress.dilationUnlocked(),
      currentValue: () => Currency.antimatter.value.add(1).log10(),
      formatRecord: x => format(Decimal.pow10(x)),
      shardReduction: tiers => 50e6 * tiers,
      maxShardReduction: goal => goal - 400e6,
      perReductionStep: DC.E500000,
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 4,
      name: "영원한 햇살",
      description: value => `영원 포인트 ${format(Decimal.pow10(value))}을 획득하세요.`,
      values: [7000, 7600, 8200, 8800, 9400, 10000],
      condition: () => V.isRunning,
      currentValue: () => Currency.eternityPoints.value.add(1).log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => 600 * tiers,
      maxShardReduction: goal => goal - 7000,
      perReductionStep: 1e6,
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 5,
      name: "물질셉션",
      description: value => `시간이 팽창하고 영원 도전 5 안인 상태에서 차원 가속을 ${formatInt(value)}회 구매하세요.`,
      values: [51, 52, 53, 54, 55, 56],
      condition: () => V.isRunning && player.dilation.active && EternityChallenge(5).isRunning,
      currentValue: () => DimBoost.purchasedBoosts,
      formatRecord: x => formatHybridLarge(x, 3),
      shardReduction: tiers => Math.floor(tiers),
      maxShardReduction: () => 5,
      reductionStepSize: 100,
      perReductionStep: 1,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 6,
      name: "글리프를 위한 진혼곡",
      description: value => `현실 내내 글리프를 최대 ${formatInt(-value)}개만 장착한 상태로 현실을 해금하세요.`,
      // This achievement has internally negated values since the check is always greater than
      values: [1, 4, 7, 10, 13],
      condition: () => V.isRunning && TimeStudy.reality.isBought,
      currentValue: () => new Decimal(-player.requirementChecks.reality.maxGlyphs),
      formatRecord: x => formatInt(x.neg()),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isHard: true
    },
    {
      id: 7,
      name: "목적지 이후",
      description: value => `저장한 시간을 방출하거나 영원 도전 12에 진입하지 않고 /${format(Decimal.pow10(value), 2, 2)}
        이하 속도의 블랙홀로 시간 정리 ${formatInt(400000)}개를 획득하세요.`,
      values: [100, 150, 200, 250, 300],
      condition: () => V.isRunning,
      currentValue: () => new Decimal(
        // Dirty hack I know lmao
        Currency.timeTheorems.gte(400000)
          ? -Math.log10(player.requirementChecks.reality.slowestBH)
          : 0),
      formatRecord: x => `${formatInt(1)} / ${format(Decimal.pow(10, x))}`,
      shardReduction: tiers => 50 * tiers,
      maxShardReduction: goal => goal - 50,
      reductionStepSize: 2,
      perReductionStep: 10,
      mode: V_REDUCTION_MODE.DIVISION,
      isHard: true
    },
    {
      id: 8,
      name: "셔터 글리프",
      description: value => `레벨 ${formatInt(value)}의 글리프에 도달하세요.`,
      values: [6500, 7000, 8000, 9000, 10000],
      condition: () => V.isRunning,
      currentValue: () => new Decimal(gainedGlyphLevel().actualLevel),
      formatRecord: x => formatHybridLarge(x, 3),
      shardReduction: tiers => Math.floor(500 * tiers),
      maxShardReduction: () => 500,
      perReductionStep: 5,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isHard: true
    }
  ],
  unlocks: {
    vAchievementUnlock: {
      id: 0,
      reward: "도전과제의 셀레스티얼 V를 해금합니다",
      description: "위의 모든 조건을 동시에 달성하세요",
      requirement: () => Object.values(GameDatabase.celestials.v.mainUnlock).every(e => e.progress() >= 1)
    },
    shardReduction: {
      id: 1,
      reward: `퍼크 포인트를 사용해 각 V-도전과제의 모든 단계 목표치를 낮출 수 있습니다.`,
      description: () => `V-도전과제를 ${formatInt(2)}개 달성하세요`,
      requirement: () => V.spaceTheorems >= 2,
      pelleDisabled: () => !PelleCelestialUpgrade.vMilestones1.canBeApplied
    },
    adPow: {
      id: 2,
      reward: "총 공간 정리에 따라 반물질 차원에 거듭제곱을 적용합니다.",
      description: () => `V-도전과제를 ${formatInt(5)}개 달성하세요`,
      effect: () => player.disablePostReality ? 1 : 1 + Math.sqrt(V.spaceTheorems) / 80,
      format: x => formatPow(x, 3, 3),
      requirement: () => V.spaceTheorems >= 5,
      pelleDisabled: () => !PelleCelestialUpgrade.vMilestones1.canBeApplied
    },
    fastAutoEC: {
      id: 3,
      reward: "도전과제 배율이 영원 도전 자동 완료 시간을 줄입니다.",
      description: () => `V-도전과제를 ${formatInt(10)}개 달성하세요`,
      effect: () => player.disablePostReality ? 1 : Achievements.power,
      // Base rate is 60 ECs at 20 minutes each
      format: x => ((Ra.unlocks.instantECAndRealityUpgradeAutobuyers.canBeApplied || EndgameMilestone.startRa.isReached) && !player.disablePostReality
        ? "즉시(Ra 업그레이드)"
        : `전체 완료까지 ${TimeSpan.fromMinutes(new Decimal(60).times(20).div(x)).toStringShort()}`),
      requirement: () => V.spaceTheorems >= 10,
      pelleDisabled: () => !PelleCelestialUpgrade.vMilestones2.canBeApplied
    },
    autoAutoClean: {
      id: 4,
      reward: "현실 시 글리프를 자동으로 제거하는 기능을 해금합니다.",
      description: () => `V-도전과제를 ${formatInt(16)}개 달성하세요`,
      requirement: () => V.spaceTheorems >= 16,
      pelleDisabled: () => !PelleCelestialUpgrade.vMilestones2.canBeApplied
    },
    achievementBH: {
      id: 5,
      reward: "도전과제 배율이 블랙홀 위력에 적용됩니다.",
      description: () => `V-도전과제를 ${formatInt(30)}개 달성하세요`,
      effect: () => player.disablePostReality ? 1 : Achievements.power,
      format: x => formatX(x, 2, 0),
      requirement: () => V.spaceTheorems >= 30,
      pelleDisabled: () => !PelleCelestialUpgrade.vMilestones3.canBeApplied
    },
    raUnlock: {
      id: 6,
      reward() {
        return `시간 연구의 공간 정리 비용을 ${formatInt(2)}만큼 줄입니다.
                잊힌 자의 셀레스티얼 Ra를 해금합니다.`;
      },
      description: () => `V-도전과제를 ${formatInt(36)}개 달성하세요`,
      effect: 2,
      requirement: () => V.spaceTheorems >= 36,
      pelleDisabled: () => !PelleCelestialUpgrade.vMilestones3.canBeApplied
    }
  }
};

export const vUpgrades = {
  auto: rebuyable({
    id: 0,
    initialCost: 1e80,
    increment: 1e5,
    description: () => `V-도전과제 자동 완료 시간을 줄입니다`,
    effect: bought => 60 / Math.pow(2, bought),
    formatEffect: value => value <= 0.03 ? "즉시" : TimeSpan.fromMilliseconds(new Decimal(value * 1000)).toStringShort(),
    formatCost: value => format(value, 2),
    costCap: 1e135,
    cap: Number.MAX_VALUE
  }),
};
