<script>
import GlyphComponent from "@/components/GlyphComponent";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "RealityModal",
  components: {
    PrimaryButton,
    ModalWrapperChoice,
    GlyphComponent,
  },
  data() {
    return {
      firstReality: false,
      hasSpace: true,
      hasChoice: false,
      hasFilter: false,
      glyphs: [],
      bestLevel: new Decimal(),
      levelDifference: new Decimal(),
      selectedGlyph: undefined,
      canRefresh: false,
      level: new Decimal(),
      simRealities: new Decimal(0),
      realityMachines: new Decimal(),
      shardsGained: new Decimal(0),
      effarigUnlocked: false,
      willAutoPurge: false,
    };
  },
  computed: {
    firstRealityText() {
      return `현실은 도전 기록과 통계 탭의 일반 항목을 제외한 모든 것을 초기화합니다.
        도전과제의 첫 ${formatInt(13)}개 행도 초기화되지만,
        ${timeDisplayNoDecimals(new Decimal(30 * 60000))}마다 도전과제 하나를 자동으로 다시 얻습니다.
        또한 영원 포인트에 따른 리얼리티 머신, 영원 포인트와 복제자 및 팽창된 시간에 따른 레벨의 글리프,
        편의성 업그레이드에 쓸 퍼크 포인트 하나를 얻고 여러 업그레이드를 해금합니다.`;
    },
    canSacrifice() {
      return RealityUpgrade(19).isEffectActive;
    },
    warnText() {
      if (!this.hasChoice) {
        return `현재 현실마다 새 글리프 선택지가 하나만 주어집니다. 이 모달을 닫고 START 퍼크를 구매하면
          여러 글리프 중 하나를 선택할 수 있습니다.`;
      }

      if (this.hasFilter && this.selectedGlyph === undefined) {
        return `글리프를 선택하지 않으면 글리프 필터를 사용해 하나가 자동으로 선택됩니다.`;
      }
      return this.selectedGlyph === undefined
        ? `계속하려면 글리프를 선택해야 합니다.`
        : null;
    },
    gained() {
      const gainedResources = [];
      gainedResources.push(`${quantifyHybridLarge("현실", this.simRealities)}`);
      gainedResources.push(`${quantifyHybridLarge("퍼크 포인트", this.simRealities)}`);
      gainedResources.push(`${quantify("리얼리티 머신", this.realityMachines, 2)}`);
      if (this.effarigUnlocked) {
        gainedResources.push(`${quantify("유물 파편", this.shardsGained, 2)}`);
      }
      return `획득 자원: ${makeEnumeration(gainedResources)}`;
    },
    levelStats() {
      // Bit annoying to read due to needing >, <, and =, with = needing a different format.
      return `현실에서 레벨 ${formatHybridLarge(this.level, 3)} 글리프를 얻습니다. 이는 최고 기록과
        ${this.level.eq(this.bestLevel) ? "같습니다" : `
        ${quantifyHybridLarge("레벨", this.levelDifference)}만큼
        ${this.level.gt(this.bestLevel) ? "높습니다" : "낮습니다"}`}.`;
    },
    confirmationToDisable() {
      return ConfirmationTypes.glyphSelection.isUnlocked() ? "glyphSelection" : undefined;
    },
    canConfirm() {
      return this.firstReality || this.selectedGlyph !== undefined || this.hasFilter;
    }
  },
  created() {
    this.getGlyphs();
    GlyphSelection.realityProps = getRealityProps(false, false);
  },
  methods: {
    update() {
      this.firstReality = player.realities.eq(0);
      this.hasChoice = Perk.firstPerk.isEffectActive;
      this.effarigUnlocked = TeresaUnlocks.effarig.canBeApplied;
      this.hasFilter = EffarigUnlock.glyphFilter.isUnlocked;
      this.level.copyFrom(gainedGlyphLevel().actualLevel);
      this.simRealities.copyFrom(new Decimal(simulatedRealityCount(false)).add(1));
      this.hasSpace = new Decimal(GameCache.glyphInventorySpace.value).gte(this.simRealities);
      const simRMGained = MachineHandler.gainedRealityMachines.times(this.simRealities);
      this.realityMachines.copyFrom(simRMGained.clampMax(MachineHandler.distanceToRMCap));
      this.shardsGained.copyFrom(Effarig.shardsGained.times(simulatedRealityCount(false) + 1));
      this.willAutoPurge = player.reality.autoAutoClean;
      if (this.firstReality) return;
      for (let i = 0; i < this.glyphs.length; ++i) {
        const currentGlyph = this.glyphs[i];
        const newGlyph = GlyphSelection.glyphList(
          GlyphSelection.choiceCount, gainedGlyphLevel(), { isChoosingGlyph: false }
        )[i];
        if (currentGlyph.level.eq(newGlyph.level)) continue;
        currentGlyph.level = newGlyph.level;
        currentGlyph.effects = newGlyph.effects;
      }
      this.bestLevel.copyFrom(player.records.bestReality.glyphLevel);
      this.levelDifference.copyFrom(Decimal.abs(this.bestLevel.sub(this.level)));
    },
    glyphClass(index) {
      return {
        "l-modal-glyph-selection__glyph": true,
        "l-modal-glyph-selection__glyph--selected": this.selectedGlyph === index,
      };
    },
    getGlyphs() {
      this.canRefresh = true;
      this.glyphs = GlyphSelection.upcomingGlyphs;
    },
    select(index) {
      this.selectedGlyph = index;
    },
    confirmModal(sacrifice) {
      if (!this.canConfirm) return;
      if (sacrifice) {
        // Sac isn't passed through confirm so we have to close it manually
        this.emitClose();
      }
      startManualReality(sacrifice, this.selectedGlyph);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="confirmationToDisable"
    :show-confirm="canConfirm"
    @confirm="confirmModal(false)"
  >
    <template #header>
      현실에 도달하려 합니다
    </template>
    <div
      v-if="firstReality"
      class="c-modal-message__text"
    >
      {{ firstRealityText }}
    </div>

    <div class="c-modal-message__text">
      {{ gained }}
    </div>
    <div
      v-if="!firstReality"
      class="l-glyph-selection__row"
    >
      <GlyphComponent
        v-for="(glyph, index) in glyphs"
        :key="index"
        :class="glyphClass(index)"
        :glyph="glyph"
        :is-in-modal="true"
        :ignore-modified-level="true"
        :show-sacrifice="canSacrifice"
        @clicked="select(index)"
      />
    </div>
    <div v-if="!firstReality">
      {{ levelStats }}
      <br>
      <b class="o-warning">
        {{ warnText }}
      </b>
    </div>
    <div v-if="simRealities.gt(1)">
      <br>
      이 글리프를 선택하면 게임이 남은 현실을 시뮬레이션하며,
      <br>
      글리프 필터 설정에 따라 다른 {{ quantifyHybridSmall("글리프", simRealities.sub(1)) }}를
      자동으로 선택합니다.
    </div>
    <div v-if="willAutoPurge">
      <br>
      자동 정리가 현재 활성화되어 있으므로 선택한 글리프가
      <br>
      작동 후 보관함에 나타나지 않을 수 있습니다.
    </div>
    <div
      v-if="!hasSpace"
      class="o-warning"
    >
      <span v-if="simRealities.gt(1)">
        빈 보관함 공간보다 더 많은 현실을 시뮬레이션하므로 일부 글리프가 희생될 수 있습니다.
      </span>
      <span v-else>
        빈 보관함 공간이 없습니다. 선택한 글리프가 자동으로
        {{ canSacrifice ? "희생" : "삭제" }}됩니다!
      </span>
    </div>
    <div v-if="confirmationToDisable">
      <br>
      이 확인이 비활성화되어 있어도 Shift 키를 누른 채 현실 버튼을 클릭하면 모달을 강제로 열 수 있습니다.
    </div>
    <template
      v-if="canSacrifice && canConfirm"
      #extra-buttons
    >
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-message__okay-btn"
        @click="confirmModal(true)"
      >
        희생
      </PrimaryButton>
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.o-warning {
  color: var(--color-infinity);
}
</style>
