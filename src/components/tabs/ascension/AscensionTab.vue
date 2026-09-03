<script>
import AscensionRow from "./AscensionRow";

import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "AscensionTab",
  components: {
    AscensionRow,
    PrimaryButton
  },
  data() {
    return {
      divineEnergy: new Decimal(),
      divineEnergyPerSecond: new Decimal(),
      ascension: 0,
      nextAscension: 0,
      timeToNextAscension: new Decimal(),
      hasOvercharge: false,
      isRunning: false,
      isDoomed: false,
      infiniteEnergy: 0,
      eternalEnergy: 0,
      complexEnergy: 0,
      temporalEnergy: 0,
      maximumEnergy: [],
      highestUnlockedLevel: 1,
      currentLevel: 1,
      pending: 0,
      nextAt: new Decimal()
    };
  },
  computed: {
    ascensions() {
      return Ascensions.all;
    },
    rows() {
      return Math.ceil(this.ascensions.length);
    },
    nextAtDisplay() {
      const first = this.nextAscension?.id === 0;
      const next = this.nextAscension;

      if (first) return `${TimeSpan.fromMilliseconds(this.timeToNextAscension)} 후 첫 승천에 도달합니다.`;
      return next === undefined
        ? "더 이상 도달할 승천이 없습니다!"
        : `${TimeSpan.fromMilliseconds(this.timeToNextAscension)} 후 다음 승천에 도달합니다.`;
    },
    nextHintDisplay() {
      return `다음 승천은 ${this.nextAscension?.config.name}입니다.`;
    },
    runButtonOuterClass() {
      return {
        "l-overcharge-run-button": true,
        "c-overcharge-run-button": true,
        "c-overcharge-run-button--running": this.isRunning,
        "c-overcharge-run-button--not-running": !this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runButtonMiddleClass() {
      return {
        "l-overcharge-run-button-interior": true,
        "c-overcharge-run-button--running-top": this.isRunning
      };
    },
    runButtonInnerClass() {
      return {
        "c-overcharge-run-button__inner--running": this.isRunning
      };
    },
    symbol() {
      return this.isRunning
        ? `과충전 종료: ${this.currEnergyName} ${formatInt(this.pending)} 획득 (다음: 영원 포인트 ${format(this.nextAt, 2)})`
        : "과충전 진입";
    },
    currEnergy() {
      if (this.currentLevel === 4) return this.temporalEnergy;
      if (this.currentLevel === 3) return this.complexEnergy;
      if (this.currentLevel === 2) return this.eternalEnergy;
      return this.infiniteEnergy;
    },
    currEnergyName() {
      if (this.currentLevel === 4) return "시간 에너지";
      if (this.currentLevel === 3) return "복합 에너지";
      if (this.currentLevel === 2) return "영원 에너지";
      return "무한 에너지";
    }
  },
  methods: {
    update() {
      this.divineEnergy.copyFrom(Currency.divineEnergy.value.floor());
      this.divineEnergyPerSecond.copyFrom(DivineDimensions.energyPerSecond);
      this.ascension = player.endgame.ascension;
      this.nextAscension = Ascension.nextAscension;
      this.timeToNextAscension.copyFrom(Ascension.nextAscension?.timeRemaining ?? new Decimal(Infinity));
      this.hasOvercharge = Ascensions.ocA.isUnlocked;
      this.isRunning = player.endgame.overcharge.isRunning;
      this.isDoomed = Pelle.isDoomed;
      const energy = player.endgame.overcharge.completions;
      this.infiniteEnergy = energy.bi;
      this.eternalEnergy = energy.eter;
      this.complexEnergy = energy.chall;
      this.temporalEnergy = energy.ts;
      this.maximumEnergy = [null, 9, 6, 32, 62];
      this.highestUnlockedLevel = player.endgame.ascension - 5;
      this.currentLevel = player.endgame.overcharge.level;
      this.pending = Decimal.clamp(Currency.eternityPoints.value.log10().div(4000).log(1.1).add(1).sub(
        this.currEnergy).floor(), 0, this.maximumEnergy[this.currentLevel] - this.currEnergy).toNumber();
      this.nextAt.copyFrom(Decimal.pow10(Decimal.pow(1.1, this.currEnergy + this.pending).times(4000)));
    },
    getAscension(row, column) {
      return () => this.ascensions[(row - 1) + column - 1];
    },
    startRun() {
      if (this.isDoomed) return;
      if (this.isRunning) {
        exitOvercharge();
        let pendEnergy = [null, "bi", "eter", "chall", "ts"][this.currentLevel];
        player.endgame.overcharge.completions[pendEnergy] += this.pending;
        return;
      }
      tryEnterOvercharge();
    },
    increaseLevel() {
      if (this.isRunning) return;
      player.endgame.overcharge.level = Math.min(player.endgame.overcharge.level + 1, this.highestUnlockedLevel);
    },
    decreaseLevel() {
      if (this.isRunning) return;
      player.endgame.overcharge.level = Math.max(player.endgame.overcharge.level - 1, 1);
    }
  }
};
</script>

<template>
  <div>
    <div class="l-endgame-milestone-grid">
      <div>
        <span class="c-ascension-description-text">
          신성 에너지 {{ format(divineEnergy, 2, 2) }} 보유 중. +{{ format(divineEnergyPerSecond, 2, 2) }}/초
        </span>
      </div>
      <div>
        <span class="c-ascension-description-text">
          다음 승천에 도달하는 시간은 신성 에너지의 양에 따라 감소합니다.
        </span>
      </div>
      <div>
        <span class="c-ascension-description-text">
          현재 승천 단계는 {{ formatInt(ascension) }}입니다.
        </span>
      </div>
      <div
        v-for="row in rows"
        :key="row"
        class="l-endgame-milestone-grid__row"
      >
        <AscensionRow
          v-for="column in 1"
          :key="row + column"
          :get-ascension="getAscension(row, column)"
          class="l-endgame-milestone-grid__cell"
        />
      </div>
      <div>
        <span class="c-ascension-description-text">{{ nextAtDisplay }}</span>
        <br>
        <span class="c-ascension-description-text">{{ nextHintDisplay }}</span>
      </div>
    </div>
    <br>
    <br>
    <div
      class="c-overcharge-position"
      v-if="hasOvercharge"
    >
      <div
        :class="runButtonOuterClass"
        @click="startRun"
      >
        <div :class="runButtonMiddleClass">
          <div
            :class="runButtonInnerClass"
            :button-symbol="symbol"
          >
            {{ symbol }}
          </div>
        </div>
      </div>
    </div>
    <br>
    <div
      class="c-subtab-option-container"
      v-if="hasOvercharge"
    >
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="decreaseLevel"
      >
        -
      </PrimaryButton>
      <span class="c-ascension-basic-text">{{ currentLevel }}</span>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="increaseLevel"
      >
        +
      </PrimaryButton>
    </div>
    <br>
    <div v-if="highestUnlockedLevel >= 1">
      <span class="c-ascension-description-text">무한 에너지 {{ infiniteEnergy }} 보유 중.</span>
    </div>
    <div v-if="highestUnlockedLevel >= 2">
      <span class="c-ascension-description-text">영원 에너지 {{ eternalEnergy }} 보유 중.</span>
    </div>
    <div v-if="highestUnlockedLevel >= 3">
      <span class="c-ascension-description-text">복합 에너지 {{ complexEnergy }} 보유 중.</span>
    </div>
    <div v-if="highestUnlockedLevel >= 4">
      <span class="c-ascension-description-text">시간 에너지 {{ temporalEnergy }} 보유 중.</span>
    </div>
  </div>
</template>

<style scoped>
.c-ascension-description-text {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg,
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base),
    var(--color-pelle--secondary), var(--color-pelle--base)
  );
  background-size: 300% 100%;
  background-clip: text;
  animation: a-ascension-description-cycle 5s linear infinite;

  -webkit-text-fill-color: transparent;
}

@keyframes a-ascension-description-cycle {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.c-ascension-basic-text {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-pelle--secondary);
}

.c-overcharge-position {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
