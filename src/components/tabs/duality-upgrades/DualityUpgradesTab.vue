<script>
import DualityUpgradeButton from "./DualityUpgradeButton";

export default {
  name: "DualityUpgradesTab",
  components: {
    DualityUpgradeButton
  },
  data() {
    return {
      baseIMCap: new Decimal(),
      capIM: new Decimal(),
      scaleTime: 0,
      capStr: "",
    };
  },
  computed: {
    upgrades: () => DualityUpgrades.all,
    lockTooltip: () => `요구 조건 잠금은 수동 및 자동 동작만 막습니다. 관련 업그레이드는 비활성화되지 않으므로
      요구 조건 달성에 실패할 수도 있습니다.`,
  },
  methods: {
    update() {
      this.baseIMCap.copyFrom(MachineHandler.baseIMHardcap);
      this.capIM.copyFrom(MachineHandler.hardcapIM);
      this.scaleTime = MachineHandler.scaleTimeForDM;
      this.capStr = formatMachines(MachineHandler.hardcapRM, MachineHandler.currentIMCap, MachineHandler.currentDMCap);
    },
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  }
};
</script>

<template>
  <div class="l-reality-upgrade-grid">
    <div class="c-cap-text">
      기계 보유 상한은 <span class="c-reality-tab__reality-machines">{{ capStr }}</span>입니다.
    </div>
    <div class="c-info-text">
      현실의 한계에 도달하여 허수 머신을 {{ format(capIM) }}개보다 많이 보유할 수 없습니다.
      <br>
      {{ format(baseIMCap) }}개를 초과하여 얻은 기계는 이중성 기계의 최대 보유량을 늘립니다.
      <br>
      이중성 기계는 시간이 지나면 상한까지 자동으로 생성되지만, 상한에 가까워질수록
      생성 속도가 지수적으로 느려집니다.
      <br>
      {{ formatInt(scaleTime) }}초마다 현재 보유량과 상한 사이의 jM 차이가 절반으로 줄어듭니다.
      <br>
      <br>
      첫 두 줄의 업그레이드는 무한히 구매할 수 있으며, 나머지는 요구 조건이 있는 일회성 업그레이드입니다.
      <br>
      이곳의 업그레이드는 상상 업그레이드와 게임 및 시각적 동작은 같지만, 이중성 기계를 비용으로 사용합니다.
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <DualityUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
</template>

<style scoped>
.c-cap-text {
  color: var(--color-text);
  font-size: 1.5rem;
}

.c-info-text {
  color: var(--color-text);
  margin: 1.5rem;
}
</style>
