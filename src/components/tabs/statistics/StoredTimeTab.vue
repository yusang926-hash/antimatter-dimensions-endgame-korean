<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StoredTimeTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      storedTime: 0,
      fluxUnlocked: false,
      fluxLevel: 1,
      fluxTime: 0,
      maxFlux: 2
    };
  },
  computed: {
    timeDisplay() {
      return TimeSpan.fromSeconds(new Decimal(this.storedTime)).toStringShort();
    },
    fluxTimeDisplay() {
      return TimeSpan.fromSeconds(new Decimal(this.fluxTime)).toStringShort();
    },
    oneMinuteDisp() {
      return `저장된 시간 ${TimeSpan.fromMinutes(1).toStringShort()} 사용`;
    },
    tenMinutesDisp() {
      return `저장된 시간 ${TimeSpan.fromMinutes(10).toStringShort()} 사용`;
    },
    oneHourDisp() {
      return `저장된 시간 ${TimeSpan.fromHours(1).toStringShort()} 사용`;
    },
    fiveHoursDisp() {
      return `저장된 시간 ${TimeSpan.fromHours(5).toStringShort()} 사용`;
    },
    allDisp() {
      return `저장된 시간 모두 사용`;
    },
    fluxUnlockDisp() {
      return `저장된 시간 ${TimeSpan.fromHours(5).toStringShort()}을 사용해 플럭스 해금`;
    },
    fluxIncrementDisp() {
      return `저장된 시간 ${TimeSpan.fromHours(5).toStringShort()}을 사용해 최대 플럭스 레벨을
        ${format(Math.ceil(this.maxFlux * 1.1))}(으)로 증가`;
    },
    oneMinuteFlux() {
      return `저장된 시간 ${TimeSpan.fromMinutes(1).toStringShort()}을 플럭스에 주입`;
    },
    tenMinutesFlux() {
      return `저장된 시간 ${TimeSpan.fromMinutes(10).toStringShort()}을 플럭스에 주입`;
    },
    oneHourFlux() {
      return `저장된 시간 ${TimeSpan.fromHours(1).toStringShort()}을 플럭스에 주입`;
    },
    fiveHoursFlux() {
      return `저장된 시간 ${TimeSpan.fromHours(5).toStringShort()}을 플럭스에 주입`;
    },
    allFlux() {
      return `저장된 시간을 모두 플럭스에 주입`;
    },
    classObj1() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 60
      };
    },
    classObj2() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 600
      };
    },
    classObj3() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 3600
      };
    },
    classObj4() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime < 18000
      };
    },
    classObj5() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.storedTime <= 0
      };
    },
    classObj6() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel <= 1
      };
    },
    classObj7() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel >= this.maxFlux
      };
    },
    classObj8() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel <= 10
      };
    },
    classObj9() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel >= this.maxFlux - 9
      };
    },
    classObj10() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel <= 100
      };
    },
    classObj11() {
      return {
        "o-primary-btn": true,
        "o-primary-btn--disabled": this.fluxLevel >= this.maxFlux - 99
      };
    },
  },
  methods: {
    update() {
      this.storedTime = player.storedTime;
      this.fluxUnlocked = player.flux.isUnlocked;
      this.fluxLevel = player.flux.level;
      this.fluxTime = player.flux.fluxTime;
      this.maxFlux = player.flux.maxUnlockedFlux;
    },
    spendOneMin() {
      if (this.storedTime >= 60) {
        player.storedTime -= 60;
        simulateTime(60);
      }
    },
    spendTenMins() {
      if (this.storedTime >= 600) {
        player.storedTime -= 600;
        simulateTime(600);
      }
    },
    spendOneHour() {
      if (this.storedTime >= 3600) {
        player.storedTime -= 3600;
        simulateTime(3600);
      }
    },
    spendFiveHours() {
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        simulateTime(18000);
      }
    },
    spendAll() {
      if (this.storedTime >= 0) {
        simulateTime(player.storedTime);
        player.storedTime = 0;
      }
    },
    unlockFlux() {
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        player.flux.isUnlocked = true;
      }
    },
    incrementMaxFlux() {
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        player.flux.maxUnlockedFlux = Math.ceil(player.flux.maxUnlockedFlux * 1.1);
      }
    },
    decreaseFlux() {
      player.flux.level = Math.max(player.flux.level - 1, 1);
    },
    increaseFlux() {
      player.flux.level = Math.min(player.flux.level + 1, player.flux.maxUnlockedFlux);
    },
    decreaseFlux10() {
      player.flux.level = Math.max(player.flux.level - 10, 1);
    },
    increaseFlux10() {
      player.flux.level = Math.min(player.flux.level + 10, player.flux.maxUnlockedFlux);
    },
    decreaseFlux100() {
      player.flux.level = Math.max(player.flux.level - 100, 1);
    },
    increaseFlux100() {
      player.flux.level = Math.min(player.flux.level + 100, player.flux.maxUnlockedFlux);
    },
    minimizeFlux() {
      player.flux.level = 1;
    },
    maximizeFlux() {
      player.flux.level = player.flux.maxUnlockedFlux;
    },
    fluxOneMin() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 60) {
        player.storedTime -= 60;
        player.flux.fluxTime += 60;
      }
    },
    fluxTenMins() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 600) {
        player.storedTime -= 600;
        player.flux.fluxTime += 600;
      }
    },
    fluxOneHour() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 3600) {
        player.storedTime -= 3600;
        player.flux.fluxTime += 3600;
      }
    },
    fluxFiveHours() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 18000) {
        player.storedTime -= 18000;
        player.flux.fluxTime += 18000;
      }
    },
    fluxAll() {
      if (player.flux.level === 1) return;
      if (this.storedTime >= 0) {
        player.flux.fluxTime += player.storedTime;
        player.storedTime = 0;
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="normal-text">
      <br>
      <span>저장된 시간: </span><span class="special-text">{{ timeDisplay }}</span><span> 보유</span>
    </div>
    <div class="c-subtab-option-container">
      <PrimaryButton
        :class="classObj1"
        class="c-stored-time-action"
        @click="spendOneMin"
      >
        {{ oneMinuteDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj2"
        class="c-stored-time-action"
        @click="spendTenMins"
      >
        {{ tenMinutesDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj3"
        class="c-stored-time-action"
        @click="spendOneHour"
      >
        {{ oneHourDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj4"
        class="c-stored-time-action"
        @click="spendFiveHours"
      >
        {{ fiveHoursDisp }}
      </PrimaryButton>
      <PrimaryButton
        :class="classObj5"
        class="c-stored-time-action"
        @click="spendAll"
      >
        {{ allDisp }}
      </PrimaryButton>
    </div>
    <br>
    <br>
    <div v-if="!fluxUnlocked">
      <PrimaryButton
        :class="classObj4"
        class="c-stored-time-action"
        @click="unlockFlux"
      >
        {{ fluxUnlockDisp }}
      </PrimaryButton>
    </div>
    <div v-if="fluxUnlocked">
      <PrimaryButton
        :class="classObj4"
        class="c-stored-time-action c-stored-time-action--wide"
        @click="incrementMaxFlux"
      >
        {{ fluxIncrementDisp }}
      </PrimaryButton>
    </div>
    <br>
    <br>
    <div
      v-if="fluxUnlocked"
      class="normal-text"
    >
      <span>현재 플럭스 레벨: </span><span class="special-text">{{ fluxLevel }}</span>
      <br>
      <span>플럭스 시간: </span><span class="special-text">{{ fluxTimeDisplay }}</span><span> 보유</span>
      <br>
      <span v-if="fluxLevel === 1">
        플럭스 레벨 {{ formatInt(1) }}에서는 플럭스 시간을 사용할 수 없습니다.
      </span>
      <span v-if="fluxLevel !== 1">
        현실 시간 1초마다 플럭스 시간
        <span class="special-text">{{ format(fluxLevel - 1) }}</span>초를 소모하여 현실 시간에
        <span class="special-text">{{ formatX(fluxLevel) }}</span> 배율을 적용합니다.
      </span>
      <br>
      <br>
      <div class="c-subtab-option-container c-flux-control-container">
        <PrimaryButton
          :class="classObj6"
          class="c-stored-time-action"
          @click="minimizeFlux"
        >
          플럭스 레벨 최소화
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 200"
          :class="classObj10"
          class="c-stored-time-action"
          @click="decreaseFlux100"
        >
          플럭스 레벨 {{ formatInt(100) }} 감소
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 20"
          :class="classObj8"
          class="c-stored-time-action"
          @click="decreaseFlux10"
        >
          플럭스 레벨 {{ formatInt(10) }} 감소
        </PrimaryButton>
        <PrimaryButton
          :class="classObj6"
          class="c-stored-time-action"
          @click="decreaseFlux"
        >
          플럭스 레벨 감소
        </PrimaryButton>
        <PrimaryButton
          :class="classObj7"
          class="c-stored-time-action"
          @click="increaseFlux"
        >
          플럭스 레벨 증가
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 20"
          :class="classObj9"
          class="c-stored-time-action"
          @click="increaseFlux10"
        >
          플럭스 레벨 {{ formatInt(10) }} 증가
        </PrimaryButton>
        <PrimaryButton
          v-if="maxFlux > 200"
          :class="classObj11"
          class="c-stored-time-action"
          @click="increaseFlux100"
        >
          플럭스 레벨 {{ formatInt(100) }} 증가
        </PrimaryButton>
        <PrimaryButton
          :class="classObj7"
          class="c-stored-time-action"
          @click="maximizeFlux"
        >
          플럭스 레벨 최대화
        </PrimaryButton>
      </div>
      <br>
      <br>
      <div class="c-subtab-option-container c-flux-control-container">
        <PrimaryButton
          :class="classObj1"
          class="c-stored-time-action"
          @click="fluxOneMin"
        >
          {{ oneMinuteFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj2"
          class="c-stored-time-action"
          @click="fluxTenMins"
        >
          {{ tenMinutesFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj3"
          class="c-stored-time-action"
          @click="fluxOneHour"
        >
          {{ oneHourFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj4"
          class="c-stored-time-action"
          @click="fluxFiveHours"
        >
          {{ fiveHoursFlux }}
        </PrimaryButton>
        <PrimaryButton
          :class="classObj5"
          class="c-stored-time-action"
          @click="fluxAll"
        >
          {{ allFlux }}
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.normal-text {
  font-size: 1rem;
  color: #ffffff;
}

.special-text {
  font-size: 2.5rem;
  color: var(--color-dilation);
}

.c-stored-time-action {
  white-space: normal;
  min-width: 18rem;
  min-height: 4.8rem;
  line-height: 1.35;
}

.c-stored-time-action--wide {
  min-width: 34rem;
}

.c-flux-control-container {
  max-width: 100rem;
  margin: 0 auto;

  gap: 0.6rem;
}
</style>
