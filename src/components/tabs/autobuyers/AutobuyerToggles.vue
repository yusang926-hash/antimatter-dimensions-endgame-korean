<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "AutobuyerToggles",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      isDoomed: false,
      autobuyersOn: false,
      showContinuum: false,
      disableContinuum: false,
      allAutobuyersDisabled: false,
      antimatterAutobuyersBuyMax: false,
    };
  },
  watch: {
    autobuyersOn(newValue) {
      player.auto.autobuyersOn = newValue;
    },
    disableContinuum(newValue) {
      if (ImaginaryUpgrade(21).isLockingMechanics && !newValue) {
        ImaginaryUpgrade(21).tryShowWarningModal();
        return;
      }
      if (DualityUpgrade(21).isLockingMechanics && !newValue) {
        DualityUpgrade(21).tryShowWarningModal();
        return;
      }
      Laitela.setContinuum(!newValue);
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.autobuyersOn = player.auto.autobuyersOn;
      this.showContinuum = Laitela.isUnlocked;
      this.disableContinuum = player.auto.disableContinuum;
      this.allAutobuyersDisabled = Autobuyers.unlocked.every(autobuyer => !autobuyer.isActive);
      this.antimatterAutobuyersBuyMax = Autobuyer.antimatterDimension.zeroIndexed.every(
        autobuyer => autobuyer.mode === AUTOBUYER_MODE.BUY_10
      );
    },
    toggleAllAutobuyers() {
      for (const autobuyer of Autobuyers.unlocked) {
        autobuyer.isActive = this.allAutobuyersDisabled;
      }
    },
    toggleAntimatterSingles() {
      for (const autobuyer of Autobuyer.antimatterDimension.zeroIndexed) {
        autobuyer.mode = this.antimatterAutobuyersBuyMax ? AUTOBUYER_MODE.BUY_SINGLE : AUTOBUYER_MODE.BUY_10;
      }
    }
  }
};
</script>

<template>
  <div class="c-subtab-option-container">
    <PrimaryToggleButton
      v-model="autobuyersOn"
      on="자동 구매기 일시 정지"
      off="자동 구매기 재개"
      class="o-primary-btn--subtab-option"
    />
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="toggleAllAutobuyers()"
    >
      모든 자동 구매기 {{ allAutobuyersDisabled ? "활성화" : "비활성화" }}
    </PrimaryButton>
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="toggleAntimatterSingles()"
    >
      반물질 차원 자동 구매기를 {{ antimatterAutobuyersBuyMax ? "1개씩" : "최대" }} 구매로 설정
    </PrimaryButton>
    <span v-if="false">
      <PrimaryButton
        v-if="showContinuum"
        class="o-primary-btn--subtab-option"
      >
        연속체가 비활성화됨
      </PrimaryButton>
    </span>
    <span v-else>
      <PrimaryToggleButton
        v-if="showContinuum"
        v-model="disableContinuum"
        on="연속체 활성화"
        off="연속체 비활성화"
        class="o-primary-btn--subtab-option"
      />
    </span>
  </div>
</template>

<style scoped>

</style>
