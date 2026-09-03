export const ra = {
  pets: {
    teresa: {
      id: "teresa",
      name: "Teresa",
      color: "#8596ea",
      chunkGain: "영원 포인트",
      memoryGain: "현재 리얼리티 머신",
      requiredUnlock: () => undefined,
      rawMemoryChunksPerSecond: () => Decimal.pow(Currency.eternityPoints.value.add(1).pLog10().div(5e3), 3.5).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.teresaXP.effectOrDefault(1)
    },
    effarig: {
      id: "effarig",
      name: "Effarig",
      color: "#ea8585",
      chunkGain: "획득 유물 파편",
      memoryGain: "최고 글리프 레벨",
      requiredUnlock: () => Ra.unlocks.effarigUnlock,
      rawMemoryChunksPerSecond: () => Decimal.pow(Effarig.shardsGained, 0.175).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.effarigXP.effectOrDefault(1)
    },
    enslaved: {
      id: "enslaved",
      name: "The Nameless Ones",
      color: "#f1aa7f",
      chunkGain: "시간 조각",
      memoryGain: "총 플레이 시간",
      requiredUnlock: () => Ra.unlocks.enslavedUnlock,
      rawMemoryChunksPerSecond: () => Decimal.pow(Currency.timeShards.value.add(1).pLog10().div(5e4), ResurgenceUpgrade.memSurge.isBought ? 3.5 : 2.5).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.enslavedXP.effectOrDefault(1)
    },
    v: {
      id: "v",
      name: "V",
      color: "#ead584",
      chunkGain: "무한력",
      memoryGain: "총 기억 레벨",
      requiredUnlock: () => Ra.unlocks.vUnlock,
      rawMemoryChunksPerSecond: () => Decimal.pow(Currency.infinityPower.value.add(1).pLog10().div(1e6), ResurgenceUpgrade.memSurge.isBought ? 3.5 : 1.875).times(4),
      memoryProductionMultiplier: () => Ra.unlocks.vXP.effectOrDefault(1)
    }
  },
  unlocks: {
    autoTP: {
      id: 0,
      reward: "시간 팽창이 활성화되면 타키온 입자를 즉시 획득합니다",
      pet: "teresa",
      level: 1,
      displayIcon: `<span class="fas fa-atom"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raTeresa1.canBeApplied
    },
    chargedInfinityUpgrades: {
      id: 1,
      reward: () => `충전된 무한 업그레이드를 해금합니다. ${formatInt(2)}레벨마다
        충전할 수 있는 무한 업그레이드의 최대치가 하나 증가합니다`,
      effect: () => player.disablePostReality ? 0 : Math.min(12, Math.floor(Ra.pets.teresa.level / 2)),
      pet: "teresa",
      level: 2,
      displayIcon: `<span class="fas fa-infinity"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raTeresa2.canBeApplied
    },
    teresaXP: {
      id: 2,
      reward: "리얼리티 머신에 따라 모든 기억 조각이 더 많은 기억을 생산합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Decimal.pow(Currency.realityMachines.value.add(1).pLog10().div(100), 0.5).toNumber(),
      pet: "teresa",
      level: 5,
      displayIcon: `Ϟ`
    },
    alteredGlyphs: {
      id: 3,
      reward: "글리프 희생량에 따라 글리프에 새로운 효과를 부여하는 변형 글리프를 해금합니다",
      pet: "teresa",
      level: 10,
      displayIcon: `<span class="fas fa-bolt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raTeresa3.canBeApplied
    },
    effarigUnlock: {
      id: 4,
      reward: "Effarig의 기억을 해금합니다",
      pet: "teresa",
      level: 8,
      displayIcon: `Ϙ`
    },
    perkShopIncrease: {
      id: 5,
      reward: "Teresa의 퍼크 포인트 상점 구매 상한이 증가합니다",
      pet: "teresa",
      level: 15,
      displayIcon: `<span class="fas fa-project-diagram"></span>`
    },
    unlockDilationStartingTP: {
      id: 6,
      reward: `셀레스티얼 현실 밖에서는 시간 팽창에서 총 반물질의 제곱근에 도달한 것처럼 타키온 입자를
        획득합니다. 타키온 입자 획득 배율은 시간 팽창 밖에서도 소급 적용됩니다`,
      effect: () => player.records.totalEndgameAntimatter.pow(0.5),
      pet: "teresa",
      level: 25,
      displayIcon: `<i class="far fa-dot-circle"></i>`
    },
    extraGlyphChoicesAndRelicShardRarityAlwaysMax: {
      id: 7,
      reward: () => `글리프 선택지가 ${formatX(2)} 증가하고 유물 파편의 글리프 희귀도 보너스가
        항상 최대치가 됩니다`,
      effect: 2,
      pet: "effarig",
      level: 1,
      displayIcon: `<i class="fas fa-grip-horizontal"></i>`
    },
    unlockGlyphAlchemy: {
      id: 8,
      reward: `글리프를 정제하여 늘릴 수 있는 연금술 자원을 추가하는 글리프 연금술을 해금합니다.
        Effarig 레벨에 따라 자원을 더 해금하며, 새로운 현실 탭에서 이용할 수 있습니다.`,
      pet: "effarig",
      level: 2,
      displayIcon: `<span class="fas fa-vial"></span>`
    },
    effarigXP: {
      id: 9,
      reward: "최고 글리프 레벨에 따라 모든 기억 조각이 더 많은 기억을 생산합니다",
      effect: () => player.disablePostReality ? 1 : player.records.bestReality.glyphLevel.div(7000).add(1).toNumber(),
      pet: "effarig",
      level: 5,
      displayIcon: `<span class="fas fa-clone"></span>`
    },
    glyphEffectCount: {
      id: 10,
      reward: () => `글리프가 항상 ${formatInt(4)}개의 효과를 가지며 Effarig 글리프는 이제 최대 ${formatInt(7)}개의 효과를 가집니다`,
      pet: "effarig",
      level: 10,
      displayIcon: `<span class="fas fa-braille"></span>`
    },
    enslavedUnlock: {
      id: 11,
      reward: "The Nameless Ones의 기억을 해금합니다",
      pet: "effarig",
      level: 8,
      displayIcon: `<span class="c-ra-pet-milestones-effarig-link">\uf0c1</span>`
    },
    relicShardGlyphLevelBoost: {
      id: 12,
      reward: "획득한 유물 파편에 따라 글리프 레벨이 증가합니다",
      effect: () => player.disablePostReality ? 0 : 100 * Decimal.pow(Decimal.log10(Decimal.max(Effarig.shardsGained, 1)), 2).toNumber(),
      pet: "effarig",
      level: 15,
      displayIcon: `<span class="fas fa-fire"></span>`
    },
    maxGlyphRarityAndShardSacrificeBoost: {
      id: 13,
      reward: () => `글리프가 항상 ${formatPercents(1)} 희귀도로 생성되고
        유물 파편에 따라 글리프 희생 획득량에 거듭제곱을 적용합니다`,
      effect: () => 1 + Effarig.maxRarityBoost / 100,
      pet: "effarig",
      level: 25,
      displayIcon: `<i class="fas fa-ankh"></i>`
    },
    blackHolePowerAutobuyers: {
      id: 14,
      reward: "블랙홀 위력 업그레이드 자동구매기를 해금합니다",
      pet: "enslaved",
      level: 1,
      displayIcon: `<span class="fas fa-circle"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless1.canBeApplied
    },
    improvedStoredTime: {
      id: 15,
      reward: "저장한 게임 시간이 증폭되고 The Nameless Ones의 레벨에 따라 더 많은 실제 시간을 저장할 수 있습니다",
      effects: {
        gameTimeAmplification: () => player.disablePostReality ? 1 : Decimal.pow(20, Decimal.clampMax(Ra.pets.enslaved.level, Ra.levelCap)),
        realTimeCap: () => player.disablePostReality ? 0 : 1000 * 3600 * Ra.pets.enslaved.level,
      },
      pet: "enslaved",
      level: 2,
      displayIcon: `<span class="fas fa-history"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless2.canBeApplied
    },
    enslavedXP: {
      id: 16,
      reward: "총 플레이 시간에 따라 모든 기억 조각이 더 많은 기억을 생산합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Decimal.log10(player.records.totalTimePlayed).div(200).toNumber(),
      pet: "enslaved",
      level: 5,
      displayIcon: `<span class="fas fa-stopwatch"></span>`
    },
    autoPulseTime: {
      id: 17,
      reward: () => `이제 블랙홀 충전에 게임 속도의 ${formatPercents(0.99)}만 사용하고 저장한 게임 시간의
        ${formatPercents(0.01)}를 ${formatInt(5)}틱마다 자동으로 방출할 수 있습니다.`,
      pet: "enslaved",
      level: 10,
      displayIcon: `<span class="fas fa-expand-arrows-alt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless3.canBeApplied
    },
    vUnlock: {
      id: 18,
      reward: "V의 기억을 해금합니다",
      pet: "enslaved",
      level: 8,
      displayIcon: `⌬`
    },
    peakGamespeedDT: {
      id: 19,
      reward: "각 현실의 최고 게임 속도에 따라 팽창 시간을 더 획득합니다",
      effect: () => player.disablePostReality ? 1 : Decimal.max(Decimal.pow(Decimal.log10(player.celestials.ra.peakGamespeed).sub(90), 3), 1).toNumber(),
      pet: "enslaved",
      level: 15,
      displayIcon: `<span class="fas fa-tachometer-alt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raNameless4.canBeApplied
    },
    allGamespeedGlyphs: {
      id: 20,
      reward: `모든 기본 글리프가 시간 글리프의 게임 속도 증가 효과를 얻고
        시간 글리프에는 추가 효과가 생깁니다`,
      pet: "enslaved",
      level: 25,
      displayIcon: `<span class="fas fa-clock"></span>`,
      onUnlock: () => {
        const allGlyphs = player.reality.glyphs.active.concat(player.reality.glyphs.inventory);
        for (const glyph of allGlyphs) {
          Glyphs.applyGamespeed(glyph);
        }
      }
    },
    instantECAndRealityUpgradeAutobuyers: {
      id: 21,
      reward: "반복 구매 현실 업그레이드를 자동으로 구매하고 영원 도전 자동 완료가 즉시 이루어집니다",
      pet: "v",
      level: 1,
      displayIcon: `<span class="fas fa-sync-alt"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV1.canBeApplied
    },
    autoUnlockDilation: {
      id: 22,
      reward: () => `셀레스티얼 현실 밖에서는 시간 정리 ${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)}개에
        시간 팽창이 무료로 자동 해금됩니다`,
      pet: "v",
      level: 2,
      displayIcon: `<span class="fas fa-fast-forward"></span>`
    },
    vXP: {
      id: 23,
      reward: "총 셀레스티얼 레벨에 따라 모든 기억 조각이 더 많은 기억을 생산합니다.",
      effect: () => player.disablePostReality ? 1 : 1 + Ra.totalPetLevel / 50,
      pet: "v",
      level: 5,
      displayIcon: `<span class="fas fa-book"></span>`
    },
    unlockHardV: {
      id: 24,
      reward: () => `어려운 V-도전과제를 해금하고 ${formatInt(6)}레벨마다 삼원 연구를 하나 해금합니다.
        삼원 연구는 시간 연구 페이지 맨 아래에 있습니다`,
      effect: () => player.disablePostReality ? 0 : Math.min(Math.floor(Ra.pets.v.level / 6), 4),
      pet: "v",
      level: 6,
      displayIcon: `<span class="fas fa-trophy"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV2.canBeApplied
    },
    continuousTTBoost: {
      id: 25,
      reward: "시간 정리가 모든 종류의 지속적인 비차원 생산을 강화합니다",
      effects: {
        ttGen: () => player.disablePostReality ? 1 : Math.pow(10, 5 * Ra.theoremBoostFactor()),
        eternity: () => player.disablePostReality ? 1 : Math.pow(10, 2 * Ra.theoremBoostFactor()),
        infinity: () => player.disablePostReality ? 1 : Math.pow(10, 15 * Ra.theoremBoostFactor()),
        replicanti: () => player.disablePostReality ? 1 : Math.pow(10, 20 * Ra.theoremBoostFactor()),
        dilatedTime: () => player.disablePostReality ? 1 : Math.pow(10, 3 * Ra.theoremBoostFactor()),
        memories: () => player.disablePostReality ? 1 : 1 + Ra.theoremBoostFactor() / 50,
        memoryChunks: () => player.disablePostReality ? 1 : 1 + Ra.theoremBoostFactor() / 50,
        autoPrestige: () => player.disablePostReality ? 1 : 1 + 2.4 * Ra.theoremBoostFactor()
      },
      pet: "v",
      level: 10,
      displayIcon: `<span class="fas fa-university"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV3.canBeApplied
    },
    achievementTTMult: {
      id: 26,
      reward: "도전과제 배율이 시간 정리 생성량에 적용됩니다",
      effect: () => player.disablePostReality ? 1 : Achievements.power,
      pet: "v",
      level: 15,
      displayIcon: `<span class="fas fa-graduation-cap"></span>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV4.canBeApplied
    },
    achievementPower: {
      id: 27,
      reward: () => `도전과제 배율에 ${formatPow(1.5, 1, 1)}을 적용합니다`,
      effect: () => player.disablePostReality ? 1 : 1.5,
      pet: "v",
      level: 25,
      displayIcon: `<i class="fab fa-buffer"></i>`,
      disabledByPelle: () => !PelleCelestialUpgrade.raV5.canBeApplied
    },
    eternityPointPower: {
      id: 28,
      reward: "Teresa 레벨에 따라 영원 포인트에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.teresa.level) / 100,
      pet: "teresa",
      level: 30,
      displayIcon: `<span class="fas fa-angle-up"></span>`,
      disabledByPelle: false
    },
    realityMachineCap: {
      id: 29,
      reward: "Teresa 레벨에 따라 리얼리티 머신 상한에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.teresa.level) / 100,
      pet: "teresa",
      level: 40,
      displayIcon: `<span class="fas fa-arrow-turn-up"></span>`,
      disabledByPelle: false
    },
    celestialDimensionConversionPower: {
      id: 30,
      reward: "Teresa 레벨에 따라 셀레스티얼 차원 변환 지수가 증가합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.teresa.level) / 200,
      pet: "teresa",
      level: 50,
      displayIcon: `<span class="fas fa-star"></span>`,
      disabledByPelle: false
    },
    chargeBoost: {
      id: 31,
      reward: "충전된 무한 업그레이드에 Teresa 레벨이 두 배인 것처럼 적용됩니다",
      effect: () => player.disablePostReality ? 1 : 2,
      pet: "teresa",
      level: 65,
      displayIcon: `<span class="fas fa-bolt"></span>`,
      disabledByPelle: false
    },
    sacrificePower: {
      id: 32,
      reward: "모든 글리프의 차원 희생 획득량을 제곱합니다",
      effect: () => player.disablePostReality ? 1 : 2,
      pet: "teresa",
      level: 80,
      displayIcon: `Ω`,
      disabledByPelle: false
    },
    imaginaryMachines: {
      id: 33,
      reward: "총 글리프 희생량에 따라 허수 머신에 거듭제곱을 적용합니다",
      effect: () => {
        const sacrificeSum = new Decimal(player.reality.glyphs.sac.power).add(player.reality.glyphs.sac.infinity).add(
          player.reality.glyphs.sac.time).add(player.reality.glyphs.sac.replication).add(player.reality.glyphs.sac.dilation).add(
          player.reality.glyphs.sac.effarig).add(player.reality.glyphs.sac.reality);
        return player.disablePostReality ? 1 : 1 + Decimal.log10(Decimal.log10(sacrificeSum.add(1)).add(1)).div(20).toNumber();
      },
      pet: "teresa",
      level: 100,
      displayIcon: `<span class="fas fa-gear"></span>`,
      disabledByPelle: false
    },
    celestialDimensionPower: {
      id: 34,
      reward: "엔드게임 횟수와 Teresa 레벨이 셀레스티얼 차원에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : Math.pow(Math.clamp(Ra.pets.teresa.level * Math.log10(player.endgames + 1) / 2000, 1, 1.5) * Math.pow(Math.max(Ra.pets.teresa.level * Math.log10(player.endgames + 1) / 3000, 1), 0.1), 5),
      pet: "teresa",
      level: 125,
      displayIcon: `<span class="fas fa-award"></span>`,
      disabledByPelle: false
    },
    relicShardBoost: {
      id: 35,
      reward: "Effarig 레벨에 따라 유물 파편 획득량이 강화됩니다",
      effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(10, Math.floor(Ra.pets.effarig.level)),
      pet: "effarig",
      level: 30,
      displayIcon: `<span class="fas fa-flask"></span>`,
      disabledByPelle: false
    },
    instabilityDelay: {
      id: 36,
      reward: "유물 파편이 글리프 불안정성의 처음 세 단계를 늦춥니다",
      effect: () => player.disablePostReality ? 0 : Decimal.log10(player.celestials.effarig.relicShards.add(1)).times(10).toNumber(),
      pet: "effarig",
      level: 40,
      displayIcon: `<span class="fas fa-arrow-right"></span>`,
      disabledByPelle: false
    },
    rarityBuff: {
      id: 37,
      reward: "Effarig 레벨에 따라 글리프 최대 희귀도가 증가합니다",
      effect: () => player.disablePostReality ? 0 : Math.floor(Ra.pets.effarig.level) / 2,
      pet: "effarig",
      level: 50,
      displayIcon: `<span class="fas fa-dice"></span>`,
      disabledByPelle: false
    },
    glyphLevelBuff: {
      id: 38,
      reward: "Effarig 레벨에 따라 불안정성 이후에 적용되는 작은 글리프 레벨 배율을 얻습니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.effarig.level) / 1000,
      pet: "effarig",
      level: 65,
      displayIcon: `<span class="fas fa-chart-line"></span>`,
      disabledByPelle: false
    },
    alchemyCapIncrease: {
      id: 39,
      reward: "Effarig 레벨이 글리프 연금술 상한에 배율을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.effarig.level) / 100,
      pet: "effarig",
      level: 80,
      displayIcon: `<span class="fas fa-flask-vial"></span>`,
      disabledByPelle: false
    },
    realityGlyphRarity: {
      id: 40,
      reward: "Effarig 레벨이 현실 글리프 희귀도를 증가시킵니다",
      effect: () => player.disablePostReality ? 0 : Math.floor(Ra.pets.effarig.level) / 5,
      pet: "effarig",
      level: 100,
      displayIcon: `Ϟ`,
      disabledByPelle: false
    },
    glyphSlot: {
      id: 41,
      reward: "글리프 슬롯을 하나 더 얻습니다",
      effect: 1,
      pet: "effarig",
      level: 125,
      displayIcon: `<span class="fas fa-plus"></span>`,
      disabledByPelle: false
    },
    gameSpeedImprovement: {
      id: 42,
      reward: "The Nameless Ones의 레벨에 따라 게임 속도에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.pow(Math.floor(Ra.pets.enslaved.level) / 100, 2),
      pet: "enslaved",
      level: 30,
      displayIcon: `<span class="fas fa-hourglass"></span>`,
      disabledByPelle: false
    },
    tickspeedPower: {
      id: 43,
      reward: "The Nameless Ones의 레벨에 따라 틱스피드에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.enslaved.level) / 100,
      pet: "enslaved",
      level: 40,
      displayIcon: `<span class="fas fa-power-off"></span>`,
      disabledByPelle: false
    },
    gameSpeedTesseractBoost: {
      id: 44,
      reward: "테서랙트가 게임 속도를 강화합니다",
      effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(10, Tesseracts.effectiveCount),
      pet: "enslaved",
      level: 50,
      displayIcon: `<span class="fas fa-forward"></span>`,
      disabledByPelle: false
    },
    gameSpeedTachyonMult: {
      id: 45,
      reward: "이번 엔드게임의 최고 게임 속도가 타키온 입자 획득량에 배율을 적용합니다",
      effect: () => player.disablePostReality ? DC.D1 : player.records.thisEndgame.peakGameSpeed,
      pet: "enslaved",
      level: 65,
      displayIcon: `<span class="fas fa-atom"></span>`,
      disabledByPelle: false
    },
    eternityGenBuff: {
      id: 46,
      reward: "The Nameless Ones의 레벨이 영원 생성량을 강화합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.enslaved.level) / 100,
      pet: "enslaved",
      level: 80,
      displayIcon: `∆`,
      disabledByPelle: false
    },
    imaginaryMachineEternityPower: {
      id: 47,
      reward: "영원 횟수에 따라 허수 머신에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Decimal.log10(Decimal.log10(player.eternities.add(1)).add(1)).div(20).toNumber(),
      pet: "enslaved",
      level: 100,
      displayIcon: `<span class="fas fa-lightbulb"></span>`,
      disabledByPelle: false
    },
    freeTesseractIncrease: {
      id: 48,
      reward: "The Nameless Ones의 레벨이 무료 테서랙트 소프트캡 시작점을 증가시킵니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.enslaved.level) / 250,
      pet: "enslaved",
      level: 125,
      displayIcon: `<span class="fas fa-cubes"></span>`,
      disabledByPelle: false
    },
    achievementMultPower: {
      id: 49,
      reward: "V 레벨에 따라 도전과제 배율에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 100,
      pet: "v",
      level: 30,
      displayIcon: `<span class="fas fa-medal"></span>`,
      disabledByPelle: false
    },
    allDimPowTT: {
      id: 50,
      reward: "시간 정리가 처음 세 종류의 차원에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : Math.pow(1 + Decimal.log10(Decimal.log10(Currency.timeTheorems.value.add(1)).add(1)).div(10).toNumber(), 5),
      pet: "v",
      level: 40,
      displayIcon: `<span class="fas fa-brain"></span>`,
      disabledByPelle: false
    },
    triadBuff: {
      id: 51,
      reward: "V 레벨에 따라 삼원 연구가 더 강해집니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 200,
      pet: "v",
      level: 50,
      displayIcon: `<span class="fas fa-3"></span>`,
      disabledByPelle: false
    },
    spaceTheoremIPowConversion: {
      id: 52,
      reward: "공간 정리가 무한력 변환율을 강화합니다",
      effect: () => player.disablePostReality ? 1 : Math.pow(V.spaceTheorems + 1, 0.05),
      pet: "v",
      level: 65,
      displayIcon: `<span class="fas fa-ranking-star"></span>`,
      disabledByPelle: false
    },
    spaceTheoremBoost: {
      id: 53,
      reward: "V 레벨이 공간 정리를 강화합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 200,
      pet: "v",
      level: 80,
      displayIcon: `<span class="fas fa-star"></span>`,
      disabledByPelle: false
    },
    spaceTheoremAchPower: {
      id: 54,
      reward: "공간 정리가 도전과제 배율에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.log10(V.spaceTheorems + 1),
      pet: "v",
      level: 100,
      displayIcon: `<span class="fas fa-award"></span>`,
      disabledByPelle: false
    },
    infinityDimPower: {
      id: 55,
      reward: "V 레벨에 따라 무한 차원에 거듭제곱을 적용합니다",
      effect: () => player.disablePostReality ? 1 : 1 + Math.floor(Ra.pets.v.level) / 40,
      pet: "v",
      level: 125,
      displayIcon: `<span class="fas fa-infinity"></span>`,
      disabledByPelle: false
    },
  }
};
