<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import EffarigRunUnlockReward from "./EffarigRunUnlockReward";
import EffarigUnlockButton from "./EffarigUnlockButton";

export default {
  name: "EffarigTab",
  components: {
    EffarigUnlockButton,
    EffarigRunUnlockReward,
    CelestialQuoteHistory,
  },
  data() {
    return {
      relicShards: new Decimal(0),
      shardRarityBoost: 0,
      shardPower: 0,
      shardMaxRarityIncrease: 0,
      shardsGained: new Decimal(0),
      currentShardsRate: new Decimal(0),
      amplification: 0,
      amplifiedShards: new Decimal(0),
      amplifiedShardsRate: new Decimal(0),
      runUnlocked: false,
      quote: "",
      isRunning: false,
      vIsFlipped: false,
      relicShardRarityAlwaysMax: false,
      hasSecondShop: false
    };
  },
  computed: {
    shopUnlocks: () => {
      let u = [
        EffarigUnlock.adjuster,
        EffarigUnlock.glyphFilter,
        EffarigUnlock.setSaves
      ];
      if (Achievement(227).isUnlocked) u.push(EffarigUnlock.maintainRS, EffarigUnlock.glyphGenerationBoost,
        EffarigUnlock.maxMomentum, EffarigUnlock.maxRarityBoost, EffarigUnlock.extendRun);
      return u;
    },
    runUnlock: () => EffarigUnlock.run,
    runUnlocks: () => {
      let r = [
        EffarigUnlock.infinity,
        EffarigUnlock.eternity,
        EffarigUnlock.reality,
      ];
      if (EffarigUnlock.extendRun.isUnlocked) r.push(EffarigUnlock.endgame);
      return r;
    },
    symbol: () => GLYPH_SYMBOLS.effarig,
    runButtonOuterClass() {
      return {
        "l-effarig-run-button": true,
        "c-effarig-run-button": true,
        "c-effarig-run-button--running": this.isRunning,
        "c-effarig-run-button--not-running": !this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runButtonInnerClass() {
      return this.isRunning ? "c-effarig-run-button__inner--running" : "c-effarig-run-button__inner--not-running";
    },
    runDescription() {
      return `${GameDatabase.celestials.descriptions[1].effects()}\n
      ${GameDatabase.celestials.descriptions[1].description()}`;
    },
    showShardsRate() {
      return this.currentShardsRate;
    },
    isDoomed: () => Pelle.isDoomed,
  },
  watch: {
    isRunning() {
      this.$recompute("runDescription");
    }
  },
  methods: {
    update() {
      this.relicShards.copyFrom(Currency.relicShards.value);
      this.shardRarityBoost = Effarig.maxRarityBoost / 100;
      this.shardPower = player.disablePostReality ? 1 : Ra.unlocks.maxGlyphRarityAndShardSacrificeBoost.effectOrDefault(1);
      this.shardMaxRarityIncrease = Effarig.rarityCapIncrease / 100;
      this.shardsGained.copyFrom(Effarig.shardsGained);
      this.currentShardsRate.copyFrom(this.shardsGained.div(Time.thisRealityRealTime.totalMinutes));
      this.amplification = simulatedRealityCount(false);
      this.amplifiedShards.copyFrom(this.shardsGained.times(1 + this.amplification));
      this.amplifiedShardsRate.copyFrom(this.amplifiedShards.div(Time.thisRealityRealTime.totalMinutes));
      this.quote = Effarig.quote;
      this.runUnlocked = EffarigUnlock.run.isUnlocked;
      this.isRunning = Effarig.isRunning;
      this.vIsFlipped = V.isFlipped;
      this.relicShardRarityAlwaysMax = (Ra.unlocks.extraGlyphChoicesAndRelicShardRarityAlwaysMax.canBeApplied || EndgameMilestone.startRa.isReached) && !player.disablePostReality;
      this.hasSecondShop = Achievement(227).isUnlocked;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Effarig", number: 1 });
    },
    createCursedGlyph() {
      Glyphs.giveCursedGlyph();
    }
  }
};
</script>

<template>
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="effarig" />
    <div class="l-effarig-shop-and-run">
      <div class="l-effarig-shop">
        <div class="c-effarig-relics">
          유물 파편을 {{ quantify("개", relicShards, 2, 0) }} 보유하고 있습니다.
          <br>
          <span v-if="relicShardRarityAlwaysMax">
            새 글리프의 희귀도가 +{{ formatPercents(shardRarityBoost, 2) }} 증가합니다.
          </span>
          <span v-else>
            새 글리프마다 희귀도가
            <br>
            +{{ formatPercents(0) }}에서 +{{ formatPercents(shardRarityBoost, 2) }} 사이의 무작위 값만큼 증가합니다.
          </span>
          <span v-if="shardPower > 1">
            <br>
            글리프 희생 획득량도 {{ formatPow(shardPower, 0, 2) }}만큼 증가합니다.
          </span>
          <span v-if="shardMaxRarityIncrease > 0">
            <br>
            글리프 희귀도 상한도 +{{ formatPercents(shardMaxRarityIncrease, 2) }} 증가합니다.
          </span>
        </div>
        <div class="c-effarig-relic-description">
          다음 현실에서 유물 파편을 {{ quantify("개", shardsGained, 2) }} 획득합니다.
          ({{ format(currentShardsRate, 2) }}/분)
          <span v-if="amplification !== 0">
            <br>
            현재 현실의 증폭으로 인해
            <br>
            실제로 유물 파편을 총
            {{ quantify("개", amplifiedShards, 2) }} 획득합니다. ({{ format(amplifiedShardsRate, 2) }}/분)
          </span>
        </div>
        <div class="c-effarig-relic-description">
          <br>
          영원 포인트가 많을수록 유물 파편 획득량이 조금 증가하고,
          <br>
          서로 다른 글리프 효과가 많을수록 유물 파편 획득량이
          <br>
          크게 증가합니다.
        </div>
        <EffarigUnlockButton
          v-for="(unlock, i) in shopUnlocks"
          :key="i"
          :unlock="unlock"
        />
        <EffarigUnlockButton
          v-if="!runUnlocked"
          :unlock="runUnlock"
        />
        <button
          v-if="vIsFlipped"
          class="c-effarig-shop-button c-effarig-shop-button--available"
          @click="createCursedGlyph"
        >
          저주받은 글리프 획득...
        </button>
      </div>
      <div
        v-if="runUnlocked"
        class="l-effarig-run"
      >
        <div class="c-effarig-run-description">
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            Effarig의 현실에 진입합니다.
          </span>
        </div>
        <div
          :class="runButtonOuterClass"
          @click="startRun"
        >
          <div
            :class="runButtonInnerClass"
            :button-symbol="symbol"
          >
            {{ symbol }}
          </div>
        </div>
        <div class="c-effarig-run-description">
          {{ runDescription }}
        </div>
        <EffarigRunUnlockReward
          v-for="(runRewardUnlock, j) in runUnlocks"
          :key="j"
          :unlock="runRewardUnlock"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-effarig-relic-description {
  width: 46rem;
}
</style>
