import { PlayerProgress } from "../../player-progress";

import { MultiplierTabHelper } from "./helper-functions";
import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const ID = {
  total: {
    name: dim => {
      if (dim) return `제${dim} 무한 차원 배율`;
      if (EternityChallenge(7).isRunning) return "제7 반물질 차원 생산량";
      return "무한력 생산량";
    },
    displayOverride: dim => (dim
      ? formatX(InfinityDimension(dim).multiplier, 2)
      : `${format(InfinityDimension(1).productionPerSecond, 2)}/초`
    ),
    multValue: dim => (dim
      ? InfinityDimension(dim).multiplier
      : InfinityDimensions.all
        .filter(id => id.isProducing)
        .map(id => id.multiplier)
        .reduce((x, y) => x.times(y), DC.D1)),
    isActive: dim => (dim
      ? InfinityDimension(dim).isProducing
      : (PlayerProgress.eternityUnlocked() || InfinityDimension(1).isProducing)),
    dilationEffect: () => {
      const baseEff = player.dilation.active
        ? 0.75 * Effects.product(DilationUpgrade.dilationPenalty)
        : 1;
      return baseEff * (Effarig.isRunning ? Effarig.multDilation : 1);
    },
    isDilated: true,
    overlay: ["∞", "<i class='fa-solid fa-cube' />"],
    icon: dim => MultiplierTabIcons.DIMENSION("ID", dim),
  },
  purchase: {
    name: dim => (dim ? `구매한 제${dim} 무한 차원` : "구매"),
    multValue: dim => {
      const getMult = id => Decimal.pow(InfinityDimension(id).powerMultiplier,
        Math.floor(InfinityDimension(id).baseAmount / 10));
      if (dim) return getMult(dim);
      return InfinityDimensions.all
        .filter(id => id.isProducing)
        .map(id => getMult(id.tier))
        .reduce((x, y) => x.times(y), DC.D1);
    },
    isActive: () => !EternityChallenge(2).isRunning && !EternityChallenge(10).isRunning,
    icon: dim => MultiplierTabIcons.PURCHASE("ID", dim),
  },
  highestDim: {
    name: () => `가장 높은 차원 보유량`,
    displayOverride: () => {
      const dim = MultiplierTabHelper.activeDimCount("ID");
      return `제${dim} 무한 차원, ${format(InfinityDimension(dim).amount, 2)}`;
    },
    multValue: () => InfinityDimension(MultiplierTabHelper.activeDimCount("ID")).amount,
    isActive: () => InfinityDimension(1).isProducing,
    icon: MultiplierTabIcons.DIMENSION("ID"),
  },

  basePurchase: {
    name: "기본 구매",
    multValue: dim => {
      const getMult = id => {
        const purchases = id === 8
          ? Math.floor(InfinityDimension(id).baseAmount / 10)
          : Math.min(InfinityDimensions.HARDCAP_PURCHASES, Math.floor(InfinityDimension(id).baseAmount / 10));
        const baseMult = InfinityDimension(id)._powerMultiplier;
        return Decimal.pow(baseMult, purchases);
      };
      if (dim) return getMult(dim);
      return InfinityDimensions.all
        .filter(id => id.isProducing)
        .map(id => getMult(id.tier))
        .reduce((x, y) => x.times(y), DC.D1);
    },
    isActive: true,
    icon: MultiplierTabIcons.PURCHASE("baseID"),
  },
  tesseractPurchase: {
    name: "테서랙트",
    multValue: dim => {
      const getMult = id => {
        if (id === 8) return DC.D1;
        const purchases = Math.floor(InfinityDimension(id).baseAmount / 10);
        return Decimal.pow(InfinityDimension(id)._powerMultiplier,
          Math.clampMin(purchases - InfinityDimensions.HARDCAP_PURCHASES, 0));
      };
      if (dim) return getMult(dim);
      return InfinityDimensions.all
        .filter(id => id.isProducing)
        .map(id => getMult(id.tier))
        .reduce((x, y) => x.times(y), DC.D1);
    },
    isActive: () => Tesseracts.bought > 0,
    icon: MultiplierTabIcons.PURCHASE("tesseractID"),
  },
  infinityGlyphSacrifice: {
    name: "무한 글리프 희생",
    multValue: () => (InfinityDimension(8).isProducing
      ? Decimal.pow(GlyphSacrifice.infinity.effectValue, Math.floor(InfinityDimension(8).baseAmount / 10))
      : DC.D1),
    isActive: () => GlyphSacrifice.infinity.effectValue > 1,
    icon: MultiplierTabIcons.SACRIFICE("infinity"),
  },
  powPurchase: {
    name: "허수 업그레이드 - 침입의 회상",
    powValue: () => ImaginaryUpgrade(14).effectOrDefault(1),
    isActive: () => ImaginaryUpgrade(14).canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("imaginary"),
  },

  replicanti: {
    name: "복제자 배율",
    multValue: dim => Decimal.pow(replicantiMult(), dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    isActive: () => Replicanti.areUnlocked,
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("replication"),
  },
  achievementMult: {
    name: "도전과제 배율",
    multValue: dim => Decimal.pow(Achievements.power, dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    isActive: () => Achievement(75).canBeApplied && !Pelle.isDoomed,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  achievement: {
    // Note: This only applies to ID1
    name: () => "도전과제 94",
    multValue: dim => ((dim ?? 1) === 1 ? Achievement(94).effectOrDefault(1) : 1),
    isActive: () => Achievement(94).canBeApplied,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  timeStudy: {
    name: dim => (dim ? `시간 연구 (제${dim} 무한 차원)` : "시간 연구"),
    multValue: dim => {
      const allMult = DC.D1.timesEffectsOf(
        TimeStudy(82),
        TimeStudy(92),
        TimeStudy(162)
      );
      if (dim) return dim === 4 ? allMult.times(TimeStudy(72).effectOrDefault(1)) : allMult;
      const maxActiveDim = MultiplierTabHelper.activeDimCount("ID");
      return Decimal.pow(allMult, maxActiveDim).times(maxActiveDim >= 4 ? TimeStudy(72).effectOrDefault(1) : DC.D1);
    },
    isActive: () => PlayerProgress.eternityUnlocked(),
    icon: MultiplierTabIcons.TIME_STUDY,
  },
  eternityUpgrade: {
    name: "영원 업그레이드",
    multValue: dim => {
      const allMult = DC.D1.timesEffectsOf(
        EternityUpgrade.idMultEP,
        EternityUpgrade.idMultEternities,
        EternityUpgrade.idMultICRecords,
      );
      return Decimal.pow(allMult, dim ? 1 : MultiplierTabHelper.activeDimCount("ID"));
    },
    isActive: () => PlayerProgress.eternityUnlocked(),
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },

  eu1: {
    name: () => "사용하지 않은 영원 포인트",
    multValue: dim => Decimal.pow(EternityUpgrade.idMultEP.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    isActive: () => EternityUpgrade.idMultEP.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },
  eu2: {
    name: () => "영원 횟수",
    multValue: dim => Decimal.pow(EternityUpgrade.idMultEternities.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    isActive: () => EternityUpgrade.idMultEternities.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },
  eu3: {
    name: () => "무한 도전 기록",
    multValue: dim => Decimal.pow(EternityUpgrade.idMultICRecords.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    isActive: () => EternityUpgrade.idMultICRecords.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("eternity"),
  },

  infinityChallenge: {
    name: "무한 도전",
    multValue: dim => {
      const allMult = DC.D1.timesEffectsOf(
        InfinityChallenge(1).reward,
        InfinityChallenge(6).reward,
      );
      return Decimal.pow(allMult, dim ? 1 : MultiplierTabHelper.activeDimCount("ID"));
    },
    isActive: () => InfinityChallenge(1).isCompleted,
    icon: MultiplierTabIcons.CHALLENGE("infinity"),
  },
  eternityChallenge: {
    name: dim => (dim ? `영원 도전 (제${dim} 무한 차원)` : "영원 도전"),
    multValue: dim => {
      const allMult = DC.D1.timesEffectsOf(
        EternityChallenge(4).reward,
        EternityChallenge(9).reward,
      ).times(EternityChallenge(7).isRunning ? Tickspeed.perSecond : DC.D1);
      if (dim) {
        if (dim === 1) return allMult.times(EternityChallenge(2).reward.effectOrDefault(1));
        return allMult;
      }
      const maxActiveDim = MultiplierTabHelper.activeDimCount("ID");
      return Decimal.pow(allMult, maxActiveDim)
        .times(maxActiveDim >= 1 ? EternityChallenge(2).reward.effectOrDefault(1) : DC.D1);
    },
    isActive: () => EternityChallenge(2).completions > 0,
    icon: MultiplierTabIcons.CHALLENGE("eternity"),
  },
  tickspeed: {
    name: () => "틱스피드 (영원 도전 7)",
    displayOverride: () => {
      const tickRate = Tickspeed.perSecond;
      const activeDims = MultiplierTabHelper.activeDimCount("ID");
      const dimString = MultiplierTabHelper.pluralizeDimensions(activeDims);
      return `${format(tickRate, 2, 2)}/초, ${formatInt(activeDims)}개 ${dimString}적용
        ➜ ${formatX(tickRate.pow(activeDims), 2, 2)}`;
    },
    multValue: () => Tickspeed.perSecond.pow(8),
    isActive: () => EternityChallenge(7).isRunning,
    icon: MultiplierTabIcons.TICKSPEED,
  },
  glyph: {
    name: "글리프 효과",
    multValue: () => 1,
    powValue: () => getAdjustedGlyphEffect("infinitypow") * getAdjustedGlyphEffect("effarigdimensions"),
    isActive: () => PlayerProgress.realityUnlocked(),
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  alchemy: {
    name: "글리프 연금술",
    multValue: dim => Decimal.pow(AlchemyResource.dimensionality.effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    powValue: () => AlchemyResource.infinity.effectOrDefault(1) * Ra.momentumValue,
    isActive: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
    icon: MultiplierTabIcons.ALCHEMY,
  },
  imaginaryUpgrade: {
    name: "허수 업그레이드 - 쌍곡 무한각형",
    multValue: dim => Decimal.pow(ImaginaryUpgrade(8).effectOrDefault(1),
      dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    isActive: () => ImaginaryUpgrade(8).canBeApplied,
    icon: MultiplierTabIcons.UPGRADE("imaginary"),
  },
  pelle: {
    name: "Pelle 균열 효과",
    multValue: dim => {
      const mult = DC.D1.timesEffectsOf(PelleRifts.recursion.milestones[1]);
      const maxActiveDim = MultiplierTabHelper.activeDimCount("ID");
      // This only affects ID1
      const decayMult = ((dim ? dim === 1 : maxActiveDim >= 1)
        ? PelleRifts.decay.milestones[0].effectOrDefault(1)
        : DC.D1);
      return Decimal.pow(mult, dim ? 1 : maxActiveDim).times(decayMult);
    },
    powValue: () => PelleRifts.paradox.effectOrDefault(DC.D1).toNumber(),
    isActive: () => Pelle.isDoomed,
    icon: MultiplierTabIcons.PELLE,
  },
  iap: {
    name: "상점 탭 구매",
    multValue: dim => Decimal.pow(ShopPurchase.allDimPurchases.currentMult,
      dim ? 1 : MultiplierTabHelper.activeDimCount("ID")),
    isActive: () => ShopPurchaseData.totalSTD > 0,
    icon: MultiplierTabIcons.IAP,
  },

  powerConversion: {
    name: "무한력 변환",
    powValue: () => InfinityDimensions.powerConversionRate,
    isActive: () => Currency.infinityPower.value.gt(1) && !EternityChallenge(9).isRunning,
    icon: MultiplierTabIcons.IPOW_CONVERSION,
  },

  nerfV: {
    name: "V의 현실",
    powValue: () => 0.5,
    isActive: () => V.isRunning,
    icon: MultiplierTabIcons.GENERIC_V,
  },
  nerfCursed: {
    name: "저주받은 글리프",
    powValue: () => getAdjustedGlyphEffect("curseddimensions"),
    isActive: () => getAdjustedGlyphEffect("curseddimensions") !== 1,
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("cursed"),
  },
  nerfPelle: {
    name: "파멸한 현실",
    powValue: 0.5,
    isActive: () => PelleStrikes.powerGalaxies.hasStrike,
    icon: MultiplierTabIcons.PELLE,
  }
};
