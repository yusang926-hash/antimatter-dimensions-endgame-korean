<script>
import AnnihilationButton from "./AnnihilationButton";
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import DarkMatterDimensionGroup from "./DarkMatterDimensionGroup";
import HadronsPane from "./HadronsPane";
import LaitelaAutobuyerPane from "./LaitelaAutobuyerPane";
import LaitelaRunButton from "./LaitelaRunButton";
import PrimaryButton from "@/components/PrimaryButton";
import SingularityMilestonePane from "./SingularityMilestonePane";
import SingularityPane from "./SingularityPane";

export default {
  name: "LaitelaTab",
  components: {
    LaitelaRunButton,
    SingularityPane,
    SingularityMilestonePane,
    DarkMatterDimensionGroup,
    AnnihilationButton,
    LaitelaAutobuyerPane,
    CelestialQuoteHistory,
    HadronsPane,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      darkMatter: new Decimal(0),
      darkMatterGain: new Decimal(0),
      isDMCapped: false,
      maxDarkMatter: new Decimal(0),
      darkEnergy: new Decimal(0),
      matterExtraPurchasePercentage: new Decimal(0),
      autobuyersUnlocked: false,
      singularityPanelVisible: false,
      singularitiesUnlocked: false,
      singularityCap: new Decimal(0),
      singularityWaitTime: "",
      showAnnihilation: false,
      endgameUnlocked: false,
      darkMatterCap: new Decimal(0),
      softcap1: new Decimal(0),
      softcap2: new Decimal(0),
      softcapOmega: new Decimal(0),
      hadronsUnlocked: false,
      isUncapped: false,
    };
  },
  computed: {
    styleObject() {
      return {
        color: this.isDMCapped ? "var(--color-bad)" : "",
      };
    }
  },
  methods: {
    update() {
      this.isDoomed = (Pelle.isDoomed && !PelleDestructionUpgrade.continuumBuff.canBeApplied);
      this.darkMatter.copyFrom(Currency.darkMatter);
      this.isDMCapped = this.darkMatter.eq(Laitela.darkMatterCap);
      this.maxDarkMatter.copyFrom(Currency.darkMatter.max);
      this.darkEnergy.copyFrom(player.celestials.laitela.darkEnergy);
      this.matterExtraPurchasePercentage.copyFrom(Laitela.matterExtraPurchaseFactor.gte(11)
        ? Laitela.matterExtraPurchaseFactor
        : Laitela.matterExtraPurchaseFactor.sub(1));
      this.autobuyersUnlocked = SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.autoCondense.canBeApplied ||
        Laitela.darkMatterMult.gt(1);
      this.singularityPanelVisible = Currency.singularities.gt(0);
      this.singularitiesUnlocked = Singularity.capIsReached || this.singularityPanelVisible;
      this.singularityCap.copyFrom(Singularity.cap);
      this.singularityWaitTime = TimeSpan.fromSeconds(new Decimal((this.singularityCap.sub(this.darkEnergy)).div(
        Currency.darkEnergy.productionPerSecond))).toStringShort();
      this.showAnnihilation = Laitela.annihilationUnlocked;
      this.endgameUnlocked = PlayerProgress.endgameUnlocked();
      this.darkMatterCap.copyFrom(Laitela.darkMatterCap);
      this.softcap1.copyFrom(Laitela.darkMatterSoftcap1);
      this.softcap2.copyFrom(Laitela.darkMatterSoftcap2);
      this.softcapOmega.copyFrom(Laitela.darkMatterOmegaSoftcap);
      this.hadronsUnlocked = DualityUpgrade(15).isBought;
      this.isUncapped = Alpha.isDestroyed;

      const d1 = DarkMatterDimension(1);
      this.darkMatterGain = d1.amount.times(d1.powerDM).divide(d1.interval).times(1000);
    },
    maxAll() {
      Laitela.maxAllDMDimensions(8);
    },
    showLaitelaHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter(tab => tab.alias === "Lai'tela")[0];
      Modal.h2p.show();
    },
    formatContinuumPercentage() {
      return Laitela.matterExtraPurchaseFactor.gte(11)
        ? formatX(this.matterExtraPurchasePercentage, 2, 2)
        : formatDecimalPercents(this.matterExtraPurchasePercentage, 2);
    }
  }
};
</script>

<template>
  <div class="l-laitela-celestial-tab">
    <CelestialQuoteHistory celestial="laitela" />
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="showLaitelaHowTo()"
      >
        Lai'tela 정보 보기
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        모든 암흑 물질 차원 최대 구매
      </PrimaryButton>
    </div>
    <div class="o-laitela-matter-amount">
      암흑 물질을
      <span :style="styleObject">{{ format(darkMatter, 2) }}</span>
      보유하고 있습니다<span v-if="isDMCapped"> (상한 도달)</span>.
      <span v-if="!isDMCapped">(평균: {{ format(darkMatterGain, 2, 2) }}/초)</span>
    </div>
    <div class="o-laitela-matter-amount">
      역대 암흑 물질 최대치는
      <span :style="styleObject">{{ format(maxDarkMatter, 2) }}</span><span v-if="!isDoomed">,
        연속체 구매 횟수를 {{ formatContinuumPercentage() }} 늘립니다</span>.
    </div>
    <div class="o-laitela-matter-amount">
      암흑 물질 차원은 실제 시간 저장의 영향을 받지 않습니다.
    </div>
    <div
      v-if="maxDarkMatter.gte(softcap1)"
      class="o-laitela-matter-amount"
    >
      암흑 물질은 {{ format(softcap1, 2) }}부터 점감합니다.
    </div>
    <div
      v-if="maxDarkMatter.gte(softcap2)"
      class="o-laitela-matter-amount"
    >
      암흑 물질은 {{ format(softcap2, 2) }}부터 추가로 점감합니다.
    </div>
    <div
      v-if="endgameUnlocked"
      class="o-laitela-matter-amount"
    >
      암흑 물질은 <span v-if="isUncapped">강하게 점감하며</span><span v-if="!isUncapped">최대치가 정해져 있으며</span>
      그 기준은 {{ format(darkMatterCap, 2) }}입니다.
    </div>
    <div
      v-if="maxDarkMatter.gte(softcapOmega)"
      class="o-laitela-matter-amount"
    >
      암흑 물질은 {{ format(softcapOmega, 2) }}부터 추가로 강하게 점감합니다.
    </div>
    <h2
      v-if="!singularitiesUnlocked"
      class="c-laitela-singularity-container"
    >
      {{ singularityWaitTime }} 후 특이점을 해금합니다.
      (암흑 에너지 {{ format(darkEnergy, 2, 2) }}/{{ format(singularityCap, 2) }})
    </h2>
    <SingularityPane v-if="singularitiesUnlocked" />
    <HadronsPane v-if="hadronsUnlocked" />
    <LaitelaAutobuyerPane v-if="autobuyersUnlocked" />
    <div class="l-laitela-mechanics-container">
      <LaitelaRunButton />
      <div>
        <DarkMatterDimensionGroup />
        <AnnihilationButton v-if="showAnnihilation" />
      </div>
      <SingularityMilestonePane v-if="singularityPanelVisible" />
    </div>
  </div>
</template>
