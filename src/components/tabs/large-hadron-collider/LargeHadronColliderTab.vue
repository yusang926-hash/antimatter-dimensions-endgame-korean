<script>
import AcceleratorsPanel from "./AcceleratorsPanel";
import NullUpgradesTabComponent from "./NullUpgradesTabComponent";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "LargeHadronColliderTab",
  components: {
    AcceleratorsPanel,
    NullUpgradesTabComponent,
    PrimaryButton
  },
  data() {
    return {
      hasAccelerator: false,
      canSeeEntropy1: false,
      canSeeEntropy2: false,
      hadronSpeed: 0,
      accelPower: 1,
      amSoftcap: new Decimal(),
      amSoftcap2: new Decimal(),
      amHardcap: new Decimal(),
      isRunning: false,
      highestAntimatter: new Decimal(),
      nullMatter: new Decimal(),
      nullPerSecond: new Decimal(),
      nullified: false,
      voidMode: 0,
      nullParticles: new Decimal(),
      nullParticlesPerSecond: new Decimal(),
      nullParticleEffect: new Decimal(),
    };
  },
  computed: {
    hadronSpeedText() {
      if (this.hadronSpeed === 0) return `하드론이 정지해 있습니다`;
      if (this.hadronSpeed >= 1000) return `하드론이 ${formatHybridLarge(this.hadronSpeed, 3)} m/s로 움직이고 있습니다`;
      return `하드론이 ${format(this.hadronSpeed, 3, 3)} m/s로 움직이고 있습니다`;
    },
    modeDisplay() {
      return this.voidMode === 0
        ? "공허 모드: 일반"
        : "공허 모드: 무효화";
    },
    voidText() {
      return this.isRunning ? "[공허에서 나가기.]" : "[공허에 진입하기.]";
    },
    runButtonOuterClass() {
      return {
        "l-void-run-button": true,
        "c-void-run-button": true,
        "c-void-run-button--running": this.isRunning,
        "c-void-run-button--not-running": !this.isRunning,
      };
    },
  },
  methods: {
    update() {
      this.hasAccelerator = Accelerators.all.some(a => a.isUnlocked);
      this.canSeeEntropy1 = player.records.totalAntimatterOutsideDoom.gte(Decimal.pow10(1e200));
      this.canSeeEntropy2 = player.records.totalAntimatterOutsideDoom.gte(Decimal.pow10(1e260)) && !Pelle.isDoomed;
      this.hadronSpeed = LHC.hadronSpeed;
      this.accelPower = LHC.acceleratorSpeed * 100000;
      this.amSoftcap.copyFrom(Pelle.isDoomed ? DC.E9E15 : Decimal.pow10(1e200));
      this.amSoftcap2.copyFrom(Decimal.pow10(1e260));
      this.amHardcap.copyFrom(Pelle.isDoomed ? DC.ENUMMAX : LHC.breakingPoint);
      this.isRunning = LHC.voidRunning || LHC.nullifiedVoidRunning;
      this.highestAntimatter.copyFrom(player.endgame.largeHadronCollider.void.highestAntimatter);
      this.nullMatter.copyFrom(player.endgame.largeHadronCollider.void.nullMatter);
      const productionLog = Decimal.log10(
        Decimal.pow(AntimatterDimension(1).productionPerSecond, 0.01).max(1)
      );
      this.nullPerSecond.copyFrom(LHC.voidRunning
        ? productionLog.pow(Decimal.log10(productionLog.max(1)))
        : DC.D0);
      this.nullified = player.endgame.largeHadronCollider.void.nullified;
      this.voidMode = player.endgame.largeHadronCollider.void.mode;
      this.nullParticles.copyFrom(player.endgame.largeHadronCollider.void.nullParticles);
      this.nullParticlesPerSecond.copyFrom(LHC.nullifiedVoidRunning ? getNullParticleGainPerSecond() : DC.D0);
      this.nullParticleEffect.copyFrom(Currency.nullParticles.value.max(1).log10().div(5).add(1).pow(5));
    },
    formatNullAmount(amount) {
      return amount.gte(DC.NUMMAX) ? Notations.current.infinite : format(amount, 2, 2);
    },
    glitchAnim() {
      const flux = Math.random() / (this.voidMode === 1 ? 2 : 4);
      const negFlux = -flux;
      return {
        "text-shadow": `${negFlux}rem 0 red, ${flux}rem 0 blue`,
      };
    },
    startRun() {
      if (this.voidMode === 1) {
        if (this.isRunning) exitNullifiedVoid();
        else enterNullifiedVoid();
      } else if (this.isRunning) exitTheVoid();
      else enterTheVoid();
    },
    changeMode() {
      if (this.isRunning) return;
      player.endgame.largeHadronCollider.void.mode = (player.endgame.largeHadronCollider.void.mode + 1) % 2;
    }
  }
};
</script>

<template>
  <div class="l-large-hadron-collider-tab">
    <div class="l-large-hadron-collider-all-content-container">
      <div
        v-if="hasAccelerator"
        class="c-large-hadron-collider-description"
      >
        {{ hadronSpeedText }}
        <br>
        대형 강입자 충돌기가 현재 {{ formatInt(accelPower) }} GWh의 전력을 소비하고 있습니다.
      </div>
      <AcceleratorsPanel v-if="hasAccelerator" />
      <div
        v-if="!hasAccelerator"
        class="c-large-hadron-collider-description"
      >
        반물질 {{ format(Decimal.pow10(1e200), 2, 2) }} 도달 필요
      </div>
      <div
        class="c-large-hadron-collider-entropy"
        v-if="canSeeEntropy1"
      >
        우주의 과도한 엔트로피 때문에 반물질이 {{ format(amSoftcap, 2, 2) }} 이후로 붕괴하며,
        {{ format(amHardcap, 2, 2) }}를 초과할 수 없습니다.
      </div>
      <div
        class="c-large-hadron-collider-entropy"
        v-if="canSeeEntropy2"
      >
        반물질이 {{ format(amSoftcap2, 2, 2) }}를 넘으면 붕괴가 훨씬 강해집니다.
      </div>
    </div>
    <br>
    <br>
    <div v-if="highestAntimatter.gt(10)">
      <span class="c-void-antimatter-amount">[공허 안에서의 반물질 최고 기록: {{ format(highestAntimatter, 2, 1) }}.]</span>
      <br>
      <span class="c-null">[무효 물질 보유량: {{ formatNullAmount(nullMatter) }}. +{{ formatNullAmount(nullPerSecond) }}/초]</span>
    </div>
    <div v-if="nullified">
      <span class="c-null">[무효 입자 보유량: {{ format(nullParticles, 2, 2) }}. +{{ format(nullParticlesPerSecond, 2, 2) }}/초]</span>
    </div>
    <div class="l-void-run">
      <div
        :class="runButtonOuterClass"
        @click="startRun"
      >
        <div
          :button-symbol="voidText"
          :style="glitchAnim()"
        >
          {{ voidText }}
        </div>
      </div>
    </div>
    <PrimaryButton
      v-if="nullified"
      class="o-primary-btn--subtab-option"
      @click="changeMode"
    >
      {{ modeDisplay }}
    </PrimaryButton>
    <div v-if="voidMode === 0">
      공허에 진입하면 엔드게임이 강제로 초기화되고 현실 이후의 모든 기능이 비활성화됩니다.
      <br>
      반물질이 서서히 붕괴하며, 붕괴한 반물질에서 무효 물질을 얻습니다.
      <span v-if="nullified">
        <br>
        다중우주를 무효화했으므로 공허 안에서 ANR 특전과 수동 EP 생성이 다시 활성화됩니다.
      </span>
    </div>
    <div v-if="voidMode === 1">
      무효화 모드로 공허에 진입하면 엔드게임이 강제로 초기화되고 반물질에 {{ format(0.01, 2, 2) }}제곱이 적용됩니다.
      <br>
      반물질에 따라 무효 입자를 생성하며, 일반 모드의 공허 안에서 반물질 차원을 강화합니다.
      (현재: {{ formatPow(nullParticleEffect, 2, 3) }})
    </div>
    <NullUpgradesTabComponent />
  </div>
</template>

<style scoped>
.l-large-hadron-collider-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-large-hadron-collider-all-content-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.c-large-hadron-collider-description {
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-alpha--base);
}

.c-large-hadron-collider-entropy {
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  color: red;
}

.c-void-antimatter-amount {
  position: relative;
  font-size: 1rem;
  color: red;
}

.c-null {
  position: relative;
  font-size: 2rem;
  color: black;
  text-shadow: 0 0 0.2rem white;
}
</style>
