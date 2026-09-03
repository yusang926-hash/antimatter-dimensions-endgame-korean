<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ArmageddonModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      remnantsGain: new Decimal(0),
      realityShardGain: new Decimal(0),
      nextRealityShardGain: new Decimal(0),
      canArmageddon: false,
    };
  },
  computed: {
    topLabel() {
      if (!this.isDoomed) return `현실을 파멸시키려 합니다`;
      return `아마겟돈 초기화를 진행하려 합니다`;
    },
    message() {
      const isFirstReset = (Currency.remnants.eq(0))
        ? `초당 ${format(this.nextRealityShardGain, 2, 2)}개의 현실 파편을 생산하게 됩니다`
        : `초당 현실 파편 획득량이 ${format(this.realityShardGain, 2, 2)}에서
          ${format(this.nextRealityShardGain, 2, 2)}로 증가합니다`;

      return `아마겟돈은 새로운 파멸한 현실을 시작합니다. ${quantify("잔재", this.remnantsGain, 2, 0)}를 얻으며,
      ${isFirstReset}.`;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.remnantsGain.copyFrom(Pelle.remnantsGain);
      this.realityShardGain.copyFrom(Pelle.realityShardGainPerSecond);
      this.nextRealityShardGain.copyFrom(Pelle.nextRealityShardGain);
      this.canArmageddon = Pelle.canArmageddon;
    },
    handleYesClick() {
      Pelle.initializeRun();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="isDoomed ? 'armageddon' : 'doom'"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div
      v-if="!isDoomed"
      class="c-modal-message__text"
    >
      현실을 파멸시키면 도전 기록, 셀레스티얼 진행도, 통계 탭의 일반 및 현실 항목을 제외한 모든 것이
      초기화됩니다. 현재 현실의 진행도에서는 어떤 보상도 얻지 못합니다. 또한 보호하지 않은 글리프
      대부분을 정리하고 일부 게임 요소를 비활성화합니다.
      <br>
      <br>
      정말로 진행하시겠습니까?
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
