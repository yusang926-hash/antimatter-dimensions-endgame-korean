<script>
import CelestialDimensionBoostRow from "./ModernCelestialDimensionBoostRow";
import CelestialDimensionRow from "./ModernCelestialDimensionRow";
import CelestialGalaxyRow from "./ModernCelestialGalaxyRow";
import CelestialTickspeedRow from "./CelestialTickspeedRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernCelestialDimensionTab",
  components: {
    PrimaryButton,
    CelestialDimensionBoostRow,
    CelestialDimensionRow,
    CelestialGalaxyRow,
    CelestialTickspeedRow
  },
  data() {
    return {
      celestialMatter: new Decimal(0),
      unnerfedCelestialMatter: new Decimal(0),
      dimMultiplier: new Decimal(0),
      matterPerSecond: new Decimal(0),
      incomeType: "",
      conversionExponent: 0,
      nextDimCapIncrease: 0,
      totalDimCap: new Decimal(0),
      creditsClosed: false,
      showLockedDimCostNote: true,
      softcapPow: 0,
      softcap: new Decimal(0),
      unstable: false,
      overflowMag: 0,
      overflow: new Decimal(0),
      isOverflowing: false,
      massOverflowMag: 0,
      massOverflow: new Decimal(0),
      isCorrupted: false,
      isEffectActive: false,
      collapsedInfo: false,
      anySoftcapApplicable: false,
      alphaDecayRemnant: 0,
      hasRemnant: false,
      isExpanded: false,
      canCrunch: false,
      isBroken: false,
      hasInfinities: false,
      infinityPoints: new Decimal(0),
      isAnyAutobuyerUnlocked: false,
      timeToCap: new Decimal(0),
      hasEternities: false,
      eternityPoints: new Decimal(0),
    };
  },
  computed: {
    softcapCollapseDisplay() {
      return this.collapsedInfo
        ? "소프트캡 정보 표시"
        : "소프트캡 정보 숨기기";
    },
    timeToCapText() {
      return TimeSpan.fromHours(this.timeToCap).toStringShort();
    }
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !CelestialDimension(8).isUnlocked;
      this.celestialMatter.copyFrom(Currency.celestialMatter);
      this.unnerfedCelestialMatter.copyFrom(Currency.unnerfedCelestialMatter);
      this.conversionExponent = CelestialDimensions.conversionExponent;
      this.dimMultiplier.copyFrom(this.celestialMatter.pow(this.conversionExponent).max(1));
      this.matterPerSecond.copyFrom(CelestialDimension(1).productionPerSecond);
      this.incomeType = "셀레스티얼 물질";
      this.totalDimCap.copyFrom(CelestialDimensions.totalDimCap);
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.softcapPow = CelestialDimensions.softcapPow;
      this.softcap.copyFrom(CelestialDimensions.SOFTCAP);
      this.unstable = this.celestialMatter.gte(this.softcap);
      this.overflowMag = CelestialDimensions.OVERFLOW_MAG;
      this.overflow.copyFrom(CelestialDimensions.OVERFLOW);
      this.isOverflowing = this.celestialMatter.gt(this.overflow);
      this.massOverflowMag = CelestialDimensions.MASS_OVERFLOW_MAG;
      this.massOverflow.copyFrom(CelestialDimensions.MASS_OVERFLOW);
      this.isCorrupted = this.celestialMatter.gt(this.massOverflow);
      this.isEffectActive = player.endgame.celestialMatterMultiplier.isActive;
      this.collapsedInfo = player.endgame.celDimExpansion.softcapsCollapsed;
      this.anySoftcapApplicable = this.unstable || this.isOverflowing || this.isCorrupted;
      this.alphaDecayRemnant = CelestialDimensions.alphaDecayRemnant;
      this.hasRemnant = Alpha.isDestroyed;
      this.isExpanded = Achievement(221).isUnlocked;
      this.canCrunch = Currency.celestialMatter.value.gte(DC.NUMMAX) && this.isExpanded;
      this.isBroken = player.endgame.celDimExpansion.isBroken;
      this.hasInfinities = PlayerProgress.celestialInfinityUnlocked();
      this.infinityPoints.copyFrom(player.endgame.celDimExpansion.celestialInfinityPoints);
      this.isAnyAutobuyerUnlocked = Autobuyer.celestialDimension(1).isUnlocked;
      this.timeToCap.copyFrom(DC.D5.times(CelestialDimensions.alphaDecaySpeed));
      this.hasEternities = PlayerProgress.celestialEternityUnlocked();
      this.eternityPoints.copyFrom(player.endgame.celDimExpansion.celestialEternityPoints);
    },
    maxAll() {
      CelestialDimensions.buyMax();
    },
    toggleCelestialMatterMultiplier() {
      toggleCelestialMatter();
    },
    toggleAllAutobuyers() {
      toggleAllCelDims();
    },
    instabilityClassObject() {
      return {
        "c-celestial-dim-description__accent": !this.anySoftcapApplicable,
        "c-celestial-dim-description__accent-unstable": this.anySoftcapApplicable,
      };
    },
    toggleSeenSoftcaps() {
      player.endgame.celDimExpansion.softcapsCollapsed = !player.endgame.celDimExpansion.softcapsCollapsed;
    },
    celestialCrunch() {
      if (PlayerProgress.celestialInfinityUnlocked()) celestialCrunchResetRequest();
      else Modal.celestialCrunch.show();
    }
  }
};
</script>

<template>
  <div class="l-celestial-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        모두 최대 구매
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="toggleCelestialMatterMultiplier"
      >
        셀레스티얼 물질 효과 전환
      </PrimaryButton>
      <PrimaryButton
        v-if="isAnyAutobuyerUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        모든 자동 구매기 전환
      </PrimaryButton>
    </div>
    <div v-if="!canCrunch || isBroken">
      <div>
        <div>
          <span v-if="hasEternities">
            셀레스티얼 영원 포인트
            <span class="c-celestial-eternity-text">{{ format(eternityPoints, 2) }}</span>개를 보유하고 있습니다.
          </span>
          <br>
          <span v-if="hasInfinities">
            셀레스티얼 무한 포인트
            <span class="c-celestial-infinity-text">{{ format(infinityPoints, 2) }}</span>개를 보유하고 있습니다.
          </span>
          <br>
          보유량:
          <span :class="instabilityClassObject()">{{ format(celestialMatter, 2, 1) }}</span>
          <span v-if="unstable"> 불안정한</span> <span v-if="isOverflowing">범람하는</span>
          <span v-if="isCorrupted"> 오염된</span> 셀레스티얼 물질,
          <br>
          <span>
            여기에
            <span :class="instabilityClassObject()">{{ formatPow(conversionExponent, 2, 3) }}</span>
            제곱을 적용하면
          </span>
          게임 속도에
          <span :class="instabilityClassObject()">
            {{ formatX(dimMultiplier, 2, 1) }}<span v-if="!isEffectActive"> (비활성화)</span>
          </span>
          배율을 <span>제공합니다.</span>
          <div v-if="anySoftcapApplicable">
            <div v-if="!collapsedInfo">
              <div v-if="unstable">
                소프트캡이 없었다면 <i>셀레스티얼 물질을</i>
                <span :class="instabilityClassObject()">{{ format(unnerfedCelestialMatter, 2, 1) }}</span>개
                보유했겠지만, 실제로는 그렇지 않습니다.
                <br>
                셀레스티얼 물질 <span :class="instabilityClassObject()">{{ format(softcap, 2, 1) }}</span>개부터
                소프트캡이 적용되기 때문입니다.
                <br>
                현재 이 값을 초과하는 셀레스티얼 물질에는
                <span :class="instabilityClassObject()">{{ format(1 / softcapPow, 2, 3) }}</span>제곱이 적용됩니다.
                <br>
                셀레스티얼 물질 소프트캡은 셀레스티얼 물질 소프트캡 강도에만 따라 결정되며, 현재 강도는
                <span :class="instabilityClassObject()">{{ format(softcapPow, 2, 3) }}</span>입니다.
              </div>
              <div v-if="isOverflowing">
                셀레스티얼 물질 <span :class="instabilityClassObject()">{{ format(overflow, 2, 1) }}</span>개부터
                소프트캡이 <i>다시</i> 적용됩니다.
                <br>
                현재 이 값을 초과하는 셀레스티얼 물질과 셀레스티얼 물질 소프트캡 시작점에는
                <span :class="instabilityClassObject()">{{ format(1 / overflowMag, 2, 3) }}</span>제곱이 적용됩니다.
                <br>
                셀레스티얼 물질 범람은 셀레스티얼 물질 범람 강도에만 따라 결정되며, 현재 강도는
                <span :class="instabilityClassObject()">{{ format(overflowMag, 2, 3) }}</span>입니다.
              </div>
              <div v-if="isCorrupted">
                셀레스티얼 물질 <span :class="instabilityClassObject()">{{ format(massOverflow, 2, 1) }}</span>개부터
                소프트캡이 <i>또다시</i> 적용됩니다.
                <br>
                현재 이 값을 초과하는 셀레스티얼 물질에는
                <span :class="instabilityClassObject()">{{ format(1 / massOverflowMag, 2, 3) }}</span>제곱이 적용됩니다.
                <br>
                셀레스티얼 물질 오염은 셀레스티얼 물질 오염 강도에만 따라 결정되며, 현재 강도는
                <span :class="instabilityClassObject()">{{ format(massOverflowMag, 2, 3) }}</span>입니다.
              </div>
            </div>
            <PrimaryButton
              class="o-primary-btn--subtab-option"
              @click="toggleSeenSoftcaps"
            >
              {{ softcapCollapseDisplay }}
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div v-if="hasRemnant">
        Alpha 붕괴의 잔재가 모든 셀레스티얼 차원에
        <span class="c-celestial-dim-description__accent-unstable">{{ format(alphaDecayRemnant, 2, 3) }}</span>
        제곱을 적용합니다. 이 값은 상한인 {{ formatInt(1) }}까지 이번 셀레스티얼 무한에서 {{ timeToCapText }}에 걸쳐 증가합니다.
      </div>
      <div>
        모든 셀레스티얼 차원은 셀레스티얼 포인트 {{ format(totalDimCap, 2, 2) }}개까지 구매할 수 있습니다.
      </div>
      <div>초당 {{ format(matterPerSecond, 2, 0) }} {{ incomeType }}을 획득하고 있습니다.</div>
    </div>
    <div v-if="canCrunch && !isBroken">
      <br>
      <button
        :class="{
          'btn-celestial-crunch': true
        }"
        @click="celestialCrunch"
      >
        셀레스티얼 크런치
      </button>
      <br>
      <br>
    </div>
    <CelestialTickspeedRow v-if="isExpanded" />
    <div class="l-dimensions-container">
      <CelestialDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div
      v-if="isExpanded"
      class="resets-container"
    >
      <CelestialDimensionBoostRow v-if="isExpanded" />
      <CelestialGalaxyRow v-if="isExpanded" />
    </div>
    <div v-if="showLockedDimCostNote">
      Shift 키를 누르면 잠긴 셀레스티얼 차원의 셀레스티얼 포인트 비용을 볼 수 있습니다.
    </div>
  </div>
</template>

<style scoped>
.c-celestial-infinity-text {
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(var(--color-infinity), var(--color-celestials));
  background-clip: text;

  -webkit-text-fill-color: transparent;
}

.c-celestial-eternity-text {
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(var(--color-eternity), var(--color-celestials));
  background-clip: text;

  -webkit-text-fill-color: transparent;
}
</style>
