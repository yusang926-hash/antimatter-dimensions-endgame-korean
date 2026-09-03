function dimInfinityMult() {
  return Currency.infinitiesTotal.value.times(0.2).plus(1);
}
function chargedDimInfinityMult() {
  return 1 + Decimal.log10(Decimal.max(1, Currency.infinitiesTotal.value.add(1).pLog10())).toNumber() * Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 150;
}

export const infinityUpgrades = {
  totalTimeMult: {
    id: "timeMult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: "게임을 플레이한 시간에 따라 반물질 차원이 배율을 받습니다.",
    effect: () => Decimal.pow(Time.totalTimePlayed.totalMinutes.div(2), 0.15),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "플레이 시간과 Teresa 레벨에 따라 반물질 차원을 거듭제곱합니다",
      effect: () => 1 +
        Decimal.log10(Decimal.log10(Time.totalTimePlayed.totalMilliseconds)).times(
        Math.pow(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1)), 0.5)).div(150).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim18mult: {
    id: "18Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.totalTimeMult.isBought,
    description: "제1 반물질 차원과 제8 반물질 차원이 무한 횟수에 따라 배율을 받습니다.",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 Teresa 레벨에 따라 제1 및 제8 반물질 차원을 거듭제곱합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim27mult: {
    id: "27Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.buy10Mult.isBought,
    description: "제2 반물질 차원과 제7 반물질 차원이 무한 횟수에 따라 배율을 받습니다.",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 Teresa 레벨에 따라 제2 및 제7 반물질 차원을 거듭제곱합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim36mult: {
    id: "36Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim18mult.isBought,
    description: "제3 반물질 차원과 제6 반물질 차원이 무한 횟수에 따라 배율을 받습니다.",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 Teresa 레벨에 따라 제3 및 제6 반물질 차원을 거듭제곱합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim45mult: {
    id: "45Mult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim27mult.isBought,
    description: "제4 반물질 차원과 제5 반물질 차원이 무한 횟수에 따라 배율을 받습니다.",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "무한 횟수와 Teresa 레벨에 따라 제4 및 제5 반물질 차원을 거듭제곱합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  resetBoost: {
    id: "resetBoost",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim36mult.isBought,
    description: () =>
      `차원 가속과 반물질 은하에 필요한 차원 수가 ${formatInt(9)}만큼 감소합니다.`,
    effect: 9,
    charged: {
      description: () => "Teresa 레벨에 따라 차원 가속 요구량을 줄입니다",
      effect: () => 1 / (1 + Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 10),
      formatEffect: value => `${formatX(value, 4, 4)}`
    }
  },
  buy10Mult: {
    id: "dimMult",
    cost: () => Math.pow(1, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: () => `${formatInt(10)}개의 차원을 살 때의 배율이 증가합니다.`,
    effect: () => 1.1,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.2, 0, 1)}`,
    charged: {
      description: () => `반물질 차원 ${formatInt(10)}개 구매 배율을 ` +
        "Teresa 레벨에 따라 거듭제곱합니다",
      effect: () => 1 + (Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  galaxyBoost: {
    id: "galaxyBoost",
    cost: () => Math.pow(2, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dim45mult.isBought,
    description: "모든 은하의 효과가 두 배가 됩니다.",
    effect: 2,
    charged: {
      description: "Teresa 레벨에 따라 모든 은하가 강해집니다",
      effect: () => 2 + Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 100,
      formatEffect: value => `+${formatPercents(value - 1)}`
    }
  },
  thisInfinityTimeMult: {
    id: "timeMult2",
    cost: () => Math.pow(3, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: "이번 무한에서 보낸 시간에 따라 반물질 차원이 배율을 얻습니다.",
    effect: () => Decimal.max(Decimal.pow(Time.thisInfinity.totalMinutes.div(4), 0.25), 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description:
        "현재 무한에서 보낸 시간과 Teresa 레벨에 따라 반물질 차원을 거듭제곱합니다",
      effect: () => 1 +
        Decimal.log10(Decimal.log10(Time.thisInfinity.totalMilliseconds.plus(100))).times(
        Math.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1)))).div(150).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  unspentIPMult: {
    id: "unspentBonus",
    cost: () => Math.pow(5, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.thisInfinityTimeMult.isBought,
    description: "보유 중인 무한 포인트에 비례하여 제1 반물질 차원이 배율을 얻습니다.",
    effect: () => {
      const divisor = (EndgameMastery(81).isBought && !player.disablePostReality) ? 5 : 10;
      const subtrahend = (EndgameMastery(81).isBought && !player.disablePostReality) ? 1.5 : 0;
      return Decimal.min(Currency.infinityPoints.value.dividedBy(2), Decimal.pow(DC.E1E15, EndgameUpgrade(1).effectOrDefault(1))).pow(Decimal.max((Decimal.log10(Currency.infinityPoints.value.add(10).log10()).div(divisor)).sub(subtrahend), 1.5)).plus(1);
    },
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "사용하지 않은 무한 포인트에 따른 제1 반물질 차원 배율을 Teresa 레벨에 따라 거듭제곱합니다",
      effect: () => {
        const divisor = (EndgameMastery(81).isBought && !player.disablePostReality) ? 5 : 10;
        const subtrahend = (EndgameMastery(81).isBought && !player.disablePostReality) ? 1.5 : 0;
        return Decimal.min(Currency.infinityPoints.value.dividedBy(2), Decimal.pow(DC.E1E15, EndgameUpgrade(1).effectOrDefault(1))).pow(Decimal.sqrt(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))).times(Decimal.max((Decimal.log10(Currency.infinityPoints.value.add(10).log10()).div(divisor)).sub(subtrahend), 1.5))).plus(1);
      },
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  dimboostMult: {
    id: "resetMult",
    cost: () => Math.pow(7, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.unspentIPMult.isBought,
    description: "차원 가속의 배율이 상승합니다.",
    effect: () => 2.5,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.5, 0, 1)}`,
    charged: {
      description: "Teresa 레벨에 따라 차원 가속 배율을 거듭제곱합니다",
      effect: () => 1 + (Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1))) / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  ipGen: {
    id: "passiveGen",
    cost: () => Math.pow(10, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.dimboostMult.isBought,
    description: () => `가장 빠른 무한 기록에 비해 ${formatInt(10)}배 느린 속도로 무한 포인트를 생산합니다.`,
    // Cutting corners: this is not actual effect, but it is totalIPMult that is displyed on upgrade
    effect: () => (Teresa.isRunning || V.isRunning || (Pelle.isDoomed && !PelleDestructionUpgrade.passiveIPGen.canBeApplied) ? DC.D0 : GameCache.totalIPMult.value),
    formatEffect: value => {
      if (Teresa.isRunning || V.isRunning) return "이 현실에서 비활성화됨";
      if (Pelle.isDoomed && !PelleDestructionUpgrade.passiveIPGen.canBeApplied) return "비활성화됨";
      if (Alpha.isRunning && player.records.bestInfinity.realTime >= 999999999999) return "생성하기에는 너무 느림";
      if (player.records.bestInfinity.time.gte(999999999999)) return "생성하기에는 너무 느림";
      if (Alpha.isRunning) return `${TimeSpan.fromMilliseconds(Time.bestInfinityRealTime.totalMilliseconds.times(10)).toStringShort()}마다 ${format(value, 2)}`;
      return `${TimeSpan.fromMilliseconds(Time.bestInfinity.totalMilliseconds.times(10)).toStringShort()}마다 ${format(value, 2)}`;
    },
    charged: {
      description: () =>
        `현실에서 획득한 양에 비례해 실제 시간으로 매초 리얼리티 머신을 획득하며,
        Teresa 레벨에 따라 증가합니다`,
      effect: () => Math.pow(Ra.pets.teresa.level * Ra.unlocks.chargeBoost.effectOrDefault(1) * (player.disablePostReality ? 1 : AlphaUnlocks.autoCrunchChallenge.effects.buff.effectOrDefault(1)), 2) *
        Ra.unlocks.continuousTTBoost.effects.autoPrestige.effectOrDefault(1),
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  skipReset1: {
    id: "skipReset1",
    cost: () => Math.pow(20, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    description: () =>
      `차원 가속을 ${formatInt(1)}개 획득한 상태로 시작하며 제5 반물질 차원이 자동으로 해금됩니다.`,
  },
  skipReset2: {
    id: "skipReset2",
    cost: () => Math.pow(40, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.skipReset1.isBought,
    description: () =>
      `차원 가속을 ${formatInt(2)}개 획득한 상태로 시작하며 제6 반물질 차원이 자동으로 해금됩니다.`,
  },
  skipReset3: {
    id: "skipReset3",
    cost: () => Math.pow(80, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.skipReset2.isBought,
    description: () =>
      `차원 가속을 ${formatInt(3)}개 획득한 상태로 시작하며 제7 반물질 차원이 자동으로 해금됩니다.`,
  },
  skipResetGalaxy: {
    id: "skipResetGalaxy",
    cost: () => Math.pow(300, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => InfinityUpgrade.skipReset3.isBought,
    description: () =>
      `모든 초기화를 차원 가속 ${formatInt(4)}회와 반물질 은하 1개를 보유한 상태로 시작하며,
      제8 반물질 차원이 자동으로 해금됩니다`,
  },
  ipOffline: {
    id: "ipOffline",
    cost: () => Math.pow(1000, Alpha.isRunning ? AlphaUnlocks.infinity.effects.nerf.effectOrDefault(1) : 1),
    checkRequirement: () => Achievement(41).isUnlocked,
    description: () => (player.options.offlineProgress
      ? `오프라인일 때 한정으로 최대치 버튼을 사용하지 않은 가장 높은 IP/분 기록의 ${formatPercents(0.5)} 속도로 IP를 생산합니다.`
      : "이 업그레이드는 오프라인일 때 무한 포인트를 제공하지만, 현재 세이브에서 오프라인 진행이 비활성화되어 있습니다."),
    effect: () => (player.options.offlineProgress
      ? player.records.thisEternity.bestIPMsWithoutMaxAll.times(TimeSpan.fromMinutes(new Decimal(1)).totalMilliseconds.div(2))
      : DC.D0),
    isDisabled: () => !player.options.offlineProgress,
    formatEffect: value => `${format(value, 2, 2)} IP/분`,
  },
  ipMult: {
    id: "ipMult",
    cost: () => InfinityUpgrade.ipMult.cost,
    checkRequirement: () => Achievement(41).isUnlocked || Ascensions.ipA.isUnlocked,
    costCap: () => Ascensions.ipA.isUnlocked ? DC.BEMAX : (Alpha.isRunning ? Decimal.pow10(AlphaUnlocks.infinityChallenges.effects.nerf.effectOrDefault(Decimal.log10((BreakEternityUpgrade.doubleIPUncap.isBought && !player.disablePostReality) ? DC.BEMAX : DC.E6E6).sub(1))).times(10) : ((BreakEternityUpgrade.doubleIPUncap.isBought && !player.disablePostReality) ? DC.BEMAX : DC.E6E6)),
    costIncreaseThreshold: () => Ascensions.ipA.isUnlocked ? DC.BEMAX : ((EndgameUpgrade(21).isBought && !player.disablePostReality) ? Decimal.pow10(1e125) : DC.E3E6),
    description: () => Ascensions.ipA.isUnlocked ? `무한 포인트의 지수를 +${formatPow(0.01, 2, 2)}만큼 증가시킵니다` : `모든 출처의 무한 포인트에 ${formatX(2)} 배율을 적용합니다`,
    // Normally the multiplier caps at e993k or so with 3300000 purchases, but if the cost is capped then we just give
    // an extra e7k to make the multiplier look nice
    effect: () => Ascensions.ipA.isUnlocked ? player.IPMultPurchases.div(100).add(1) : ((player.IPMultPurchases.gte(3300000) && (!BreakEternityUpgrade.doubleIPUncap.isBought || player.disablePostReality) ? DC.E1E6 : Decimal.round(DC.D2.pow(player.IPMultPurchases)))),
    cap: () => {
      if (Ascensions.ipA.isUnlocked) return DC.BEMAX;
      const normcap = (BreakEternityUpgrade.doubleIPUncap.isBought && !player.disablePostReality) ? DC.BEMAX : DC.E1E6;
      return Alpha.isRunning ? Decimal.pow(2, AlphaUnlocks.infinityChallenges.effects.nerf.effectOrDefault(Decimal.log2(Effarig.eternityCap ?? normcap))) : (Effarig.eternityCap ?? normcap);
    },
    formatEffect: value => `${Ascensions.ipA.isUnlocked ? formatPow(value, 2, 2) : formatX(value, 2, 2)}`,
  }
};
