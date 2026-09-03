<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";

export default {
  name: "AlphaTab",
  components: {
    CelestialQuoteHistory,
  },
  data() {
    return {
      stage: 0,
      quote: "",
      isRunning: false,
      isDestroyed: false,
    };
  },
  computed: {
    symbol() {
      return Alpha.symbol;
    },
    layers() {
      return AlphaDescriptions.layerRow;
    },
    nerfs() {
      return AlphaDescriptions.nerfRow;
    },
    buffs() {
      return AlphaDescriptions.buffRow;
    },
    runButtonOuterClass() {
      return {
        "l-alpha-run-button": true,
        "c-alpha-run-button": true,
        "c-alpha-run-button--running": this.isRunning,
        "c-alpha-run-button--not-running": !this.isRunning && !this.isDestroyed,
        "c-alpha-run-button--not-running--dead": this.isDestroyed,
        "c-celestial-run-button--clickable": !this.isDoomed && !this.isDestroyed,
        "o-pelle-disabled-pointer": this.isDoomed || this.isDestroyed
      };
    },
    runButtonInnerClass() {
      return this.isRunning ? "c-alpha-run-button__inner--running" : "c-alpha-run-button__inner--not-running";
    },
    runDescription() {
      return `${GameDatabase.celestials.descriptions[7].effects()}\n
      ${GameDatabase.celestials.descriptions[7].description()}`;
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
      this.stage = Alpha.currentStage;
      this.quote = Alpha.quote;
      this.isRunning = Alpha.isRunning;
      this.isDestroyed = Alpha.isDestroyedForDisplay;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Alpha", number: 7 });
    }
  }
};
</script>

<template>
  <div class="l-alpha-celestial-tab">
    <CelestialQuoteHistory celestial="alpha" />
    <br>
    <div>
      <span class="l-alpha-text">
        Alpha의 각 계층을 완료할 때마다 엔드게임 및 에테리얼 파워 획득량도 {{ formatPercents(0.33) }} 증가합니다.
      </span>
    </div>
    <div class="l-alpha-unlocks-and-run">
      <div class="l-alpha-unlocks">
        <div>
          <span class="l-alpha-header">
            계층
          </span>
          <p
            v-for="(layer, idx) in layers"
            :key="idx"
          >
            {{ layer }}
          </p>
        </div>
        <div>
          <span class="l-alpha-header">
            약화
          </span>
          <p
            v-for="(nerf, idy) in nerfs"
            :key="idy"
          >
            {{ nerf }}
          </p>
        </div>
        <div>
          <span class="l-alpha-header">
            강화
          </span>
          <p
            v-for="(buff, idz) in buffs"
            :key="idz"
          >
            {{ buff }}
          </p>
        </div>
      </div>
      <div class="l-alpha-run">
        <div class="c-alpha-run-description">
          <span :class="{ 'o-pelle-disabled': isDoomed || isDestroyed }">
            Alpha의 현실에 진입합니다.
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
        <div class="c-alpha-run-description">
          {{ runDescription }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-alpha-celestial-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-alpha-unlocks-and-run {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.l-alpha-unlocks {
  width: 50rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: var(--var-border-width, 0.2rem) solid var(--color-alpha--base);
  border-radius: var(--var-border-radius, 0.5rem);
  margin: 1rem;
  padding: 1rem;
}

p {
  font-size: 1.2rem;
  color: var(--color-alpha--base);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  height: 10rem;
}

.l-alpha-header {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-alpha--base);
}

.l-alpha-text {
  font-size: 1rem;
  color: var(--color-alpha--base);
}
</style>
