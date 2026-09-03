<script>
import HeaderCenterContainer from "./prestige-header/HeaderCenterContainer";
import HeaderEternityContainer from "./prestige-header/HeaderEternityContainer";
import HeaderInfinityContainer from "./prestige-header/HeaderInfinityContainer";

export default {
  name: "HeaderPrestigeGroup",
  components: {
    HeaderCenterContainer,
    HeaderEternityContainer,
    HeaderInfinityContainer,
  },
  data() {
    return {
      isDestroyed: false,
      isDivine: false,
      hasRealityButton: false,
      antimatterPerSec: new Decimal(0),
      antimatterPerSecBeforeAlter: new Decimal(0),
      antimatterPerSecAfterAlter: new Decimal(0),
      hasSeenAlterations: false,
    };
  },
  computed: {
    alterText() {
      return this.hasSeenAlterations
        ? "반물질 생산량 변화와 게임 속도 효과 적용 전"
        : "게임 속도 효과 적용 전";
    }
  },
  methods: {
    update() {
      this.isDestroyed = Alpha.isDestroyedForDisplay;
      this.isDivine = DivinityMilestone.divineDimensions.isReached;
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      const baseProduction = AntimatterDimension(1).amount.times(AntimatterDimension(1).multiplier)
        .times(Tickspeed.perSecond).times(player.chall2Pow).times(player.chall3Pow);
      this.antimatterPerSec.copyFrom(Currency.antimatter.productionPerSecond);
      this.antimatterPerSecBeforeAlter.copyFrom(baseProduction);
      this.antimatterPerSecAfterAlter.copyFrom(this.locallyDilate(
        baseProduction.pow(Accelerators.potency.effectValue1).powEffectOf(ResurgenceUpgrade.synergy5)
      ));
      this.hasSeenAlterations = EffarigUnlock.reality.isUnlocked || PlayerProgress.endgameUnlocked();
    },
    locallyDilate(multiplier) {
      const log10 = multiplier.log10();
      const endgames = Currency.endgames.value;
      const logarithmicFactor = Math.log10(
        Math.min(endgames, 1e6) * Math.max(Math.log2(endgames + 1) - Math.log2(5e5), 1) + 1
      );
      const endgameMult = 1 + logarithmicFactor / (Pelle.isDoomed ? 80 : 200);
      const endgameMultValue = EndgameMilestone.endgameAntimatter.isReached && !player.disablePostReality
        ? endgameMult
        : 1;
      const pelleOnly = Pelle.isDoomed
        ? DivineDimensions.conversionFormula2 * Accelerators.cosmic.effectValue2 *
          EndgameMastery(222).effectOrDefault(1) * SingularityMilestone.singAMDoomDilation.effectOrDefault(1)
        : 1;
      return Decimal.pow10(Decimal.pow(log10,
        getAdjustedGlyphEffect("effarigantimatter") *
        Effects.product(EndgameMastery(101), EndgameUpgrade(15),
          SingularityMilestone.antimatterExponentPower, Achievement(233)) *
        endgameMultValue * EtherealStars.black.reward.toNumber() * pelleOnly));
    },
    classObject() {
      return {
        "c-prestige-info-blocks": true,
        "c-prestige-info-blocks--tall": this.isDestroyed && !this.isDivine,
        "c-prestige-info-blocks--taller": this.isDivine
      };
    }
  }
};
</script>

<template>
  <div>
    <div :class="classObject()">
      <HeaderEternityContainer class="l-game-header__eternity" />
      <HeaderCenterContainer class="l-game-header__center" />
      <HeaderInfinityContainer class="l-game-header__infinity" />
    </div>
    <div
      v-if="hasRealityButton"
      class="c-production-text"
    >
      <br>
      현재 반물질을 초당 {{ format(antimatterPerSec, 2) }}개 얻고 있습니다.
      <br>
      {{ alterText }} 기준 생산량은 초당 {{ format(antimatterPerSecBeforeAlter, 2) }}개입니다.
    </div>
    <div
      v-if="hasRealityButton && hasSeenAlterations"
      class="c-prevent-overflow"
    >
      양의 반물질 생산량 변화를 적용한 뒤, 음의 변화와 그 뒤에 적용되는 양의 변화 및 게임 속도 효과를
      적용하기 전의 생산량은 초당 {{ format(antimatterPerSecAfterAlter, 2) }}개입니다.
    </div>
  </div>
</template>

<style scoped>
.c-prevent-overflow {
  max-width: calc(100% - 10rem);
  color: var(--color-text);
  margin: 0 auto;
  line-height: 1.4;
}

.c-production-text {
  color: var(--color-text);
  line-height: 1.4;
}

.c-prestige-info-blocks {
  display: flex;
  flex-direction: row;
  height: 14rem;
  width: 100%;
  color: var(--color-text);
}

.c-prestige-info-blocks--tall {
  height: 24rem;
}

.c-prestige-info-blocks--taller {
  height: 30rem;
}

.l-game-header__eternity {
  position: absolute;
  left: calc(25% - 22rem);
  width: 22rem;
}

.l-game-header__center {
  position: absolute;
  right: calc(50% - 25rem);
  width: 50rem;
}

.l-game-header__infinity {
  position: absolute;
  right: calc(25% - 22rem);
  width: 22rem;
}
</style>
