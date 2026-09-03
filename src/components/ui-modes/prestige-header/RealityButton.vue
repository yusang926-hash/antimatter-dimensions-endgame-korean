<script>
export default {
  name: "RealityButton",
  data() {
    return {
      canReality: false,
      showSpecialEffect: false,
      beatingAlpha: false,
      readyToWarp: false,
      hasRealityStudy: false,
      machinesGained: new Decimal(),
      projectedRM: new Decimal(),
      newIMCap: new Decimal(),
      newDMCap: new Decimal(),
      realityTime: 0,
      glyphLevel: new Decimal(),
      nextGlyphPercent: 0,
      nextMachineEP: 0,
      shardsGained: new Decimal(0),
      currentShardsRate: new Decimal(0),
      bestShardRate: new Decimal(0),
      bestShardRateVal: new Decimal(0),
      ppGained: 0,
      celestialRunText: ["", "", "", "", ""]
    };
  },
  computed: {
    formatMachinesGained() {
      if (this.machinesGained.gt(0)) return `획득 머신: ${format(this.machinesGained, 2)}`;
      return "획득한 머신 없음";
    },
    formatMachineStats() {
      if (!PlayerProgress.realityUnlocked() && this.nextMachineEP.gt("1e8000")) {
        return `(이번 현실에서 상한 도달!)`;
      }
      if (this.machinesGained.gt(0) && this.machinesGained.lt(100)) {
        return `(다음 획득: ${format(this.nextMachineEP, 2)} EP)`;
      }
      if (this.machinesGained.eq(0) && this.newIMCap.eq(0)) {
        return `(예상: ${format(this.projectedRM, 2)} RM)`;
      }
      if (this.newIMCap.neq(0) && this.newDMCap.eq(0)) {
        return `(iM 상한: ${formatMachines(0, this.newIMCap, 0)})`;
      }
      if (this.newDMCap.neq(0)) {
        return `(jM 상한: ${formatMachines(0, 0, this.newDMCap)})`;
      }
      if (this.machinesGained.lt(Number.MAX_VALUE)) {
        return `(분당 ${format(this.machinesGained.divide(this.realityTime), 2, 2)} RM)`;
      }
      return "";
    },
    formatGlyphLevel() {
      if (this.glyphLevel.gte(10000)) return `글리프 레벨: ${formatHybridLarge(this.glyphLevel, 3)}`;
      return `글리프 레벨: ${formatHybridLarge(this.glyphLevel, 3)} (다음까지 ${this.nextGlyphPercent})`;
    },
    showsRate() {
      return this.currentsRate;
    },
    shardsGainedText() {
      return quantify("유물 파편", this.shardsGained, 2);
    },
    warpMessage() {
      return false ? "현실을 저주하기" : "Pelle의 영역에 진입";
    },
    classObject() {
      return {
        "c-reality-button--unlocked": this.canReality || this.readyToWarp,
        "c-reality-button--locked": !this.canReality && !this.readyToWarp,
        "c-reality-button--special": this.showSpecialEffect,
        "c-reality-button--alpha": this.beatingAlpha,
        "c-reality-button--warp": this.readyToWarp
      };
    }
  },
  methods: {
    percentToNextGlyphLevelText() {
      const glyphState = getGlyphLevelInputs();
      let level = glyphState.actualLevel;
      const decimalPoints = this.glyphLevel.gt(1000) ? 0 : 1;
      return `${formatDecimalPercents(Decimal.min(((level.sub(Decimal.floor(level)))), 0.999), decimalPoints)}`;
    },
    update() {
      this.hasRealityStudy = TimeStudy.reality.isBought;
      this.canReality = isRealityAvailable();
      this.showSpecialEffect = this.hasSpecialReward();
      this.beatingAlpha = Alpha.isRunning && Currency.eternityPoints.value.add(1).log10().gt(4000);
      this.readyToWarp = CelestialEternityPlusUpgrade.oldStoneSlabAndSteelDrill.isBought;
      if (!this.canReality) {
        this.sGained = new Decimal(0);
        return;
      }
      function EPforRM(rm) {
        const adjusted = Decimal.divide(rm, MachineHandler.realityMachineMultiplier);
        if (adjusted.lte(1)) return Decimal.pow10(4000);
        if (adjusted.lte(10)) return Decimal.pow10(4000 / 27 * (adjusted.toNumber() + 26));
        let result = Decimal.pow10((adjusted.log10().div(3).add(1)).times(4000));
        if (!PlayerProgress.realityUnlocked() && result.gte("1e6000")) {
          result = result.div("1e6000").pow(4).times("1e6000");
        }
        return result;
      }

      const multiplier = simulatedRealityCount(false) + 1;
      this.projectedRM = MachineHandler.gainedRealityMachines.times(multiplier)
        .clampMax(MachineHandler.hardcapRM);
      this.newIMCap.copyFrom(MachineHandler.projectedIMCap);
      this.newDMCap.copyFrom(MachineHandler.projectedDMCap);
      this.machinesGained = this.projectedRM.clampMax(MachineHandler.distanceToRMCap);
      this.realityTime = Time.thisRealityRealTime.totalMinutes.toNumber();
      this.glyphLevel.copyFrom(gainedGlyphLevel().actualLevel);
      this.nextGlyphPercent = this.percentToNextGlyphLevelText();
      this.nextMachineEP = EPforRM(this.machinesGained.plus(1));
      this.ppGained = multiplier;
      this.shardsGained.copyFrom(Effarig.shardsGained.times(multiplier));
      this.currentShardsRate.copyFrom(this.shardsGained.div(Time.thisRealityRealTime.totalMinutes));
      this.bestShardRate.copyFrom(player.records.thisReality.bestRSmin.times(multiplier));
      this.bestShardRateVal.copyFrom(player.records.thisReality.bestRSminVal.times(multiplier));

      const teresaReward = this.formatScalingMultiplierText(
        "글리프 희생",
        Teresa.runRewardMultiplier,
        Decimal.max(Teresa.runRewardMultiplier, Teresa.rewardMultiplier(Currency.antimatter.value)));
      const teresaThreshold = this.formatThresholdText(
        Teresa.rewardMultiplier(Currency.antimatter.value).gt(Teresa.runRewardMultiplier),
        player.celestials.teresa.bestRunAM,
        "반물질");
      this.celestialRunText = [
        [Teresa.isRunning, teresaReward, teresaThreshold]];
    },
    handleClick() {
      if (this.readyToWarp) {
        Modal.message.show(`이 기능은 v2.0에서 이용할 수 있습니다. Antimatter Dimensions: Endgame을 플레이해 주셔서 감사합니다!`, {}, 3);
        //requestRealityWarp();
      }
      else if (this.canReality) {
        requestManualReality();
      }
    },
    formatScalingMultiplierText(resource, before, after) {
      return `${resource} ${formatX(before, 2, 2)} ➜ ${formatX(after, 2, 2)}`;
    },
    formatThresholdText(condition, threshold, resourceName) {
      if (condition) return "";
      return `(개선하려면 ${resourceName} ${format(threshold, 2, 2)} 필요)`;
    },
    // Make the button have a visual animation if Realitying will give a reward
    hasSpecialReward() {
      if (Teresa.isRunning && Teresa.rewardMultiplier(Currency.antimatter.value).gt(Teresa.runRewardMultiplier)) {
        return true;
      }
      return Currency.eternityPoints.value.add(1).log10().gt(4000) &&
        ((Effarig.isRunning && !EffarigUnlock.reality.isUnlocked) || (Enslaved.isRunning && !Enslaved.isCompleted));
    }
  }
};
</script>

<template>
  <div class="l-reality-button">
    <button
      class="c-reality-button infotooltip"
      :class="classObject"
      @click="handleClick"
    >
      <div class="l-reality-button__contents">
        <template v-if="readyToWarp">
          <div>{{ warpMessage }}</div>
        </template>
        <template v-else-if="canReality">
          <div class="c-reality-button__header">
            새로운 현실 만들기
          </div>
          <div>{{ formatMachinesGained }} {{ formatMachineStats }}</div>
          <div>{{ formatGlyphLevel }}</div>
        </template>
        <template v-else-if="hasRealityStudy">
          <div>새로운 현실을 해금하려면 영원 포인트 {{ format("1e4000") }} 획득</div>
        </template>
        <template v-else>
          <div>영원 탭에서 연구를 구매하여 새로운 현실을 해금하세요</div>
        </template>
        <div
          v-if="canReality && !readyToWarp"
          class="infotooltiptext"
        >
          <div>함께 획득하는 자원:</div>
          <div>{{ quantifyHybridLarge("퍼크 포인트", ppGained) }}</div>
          <div v-if="shardsGained.neq(0)">
            {{ shardsGainedText }} (분당 {{ format(currentShardsRate, 2) }})
            <br>
            최고: 분당 {{ format(bestShardRate, 2) }} ({{ format(bestShardRateVal, 2) }} RS에서 달성)
          </div>
          <div
            v-for="(celestialInfo, i) in celestialRunText"
            :key="i"
          >
            <span v-if="celestialInfo[0]">
              {{ celestialInfo[1] }}
              <br>
              {{ celestialInfo[2] }}
            </span>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>

</style>
