export const normalAchievements = [
  {
    id: 11,
    name: "시작해봅시다!",
    description: "제1 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    reward: "제1 반물질 차원에 적용되는 도전과제 배율을 제곱한다.",
    effect: () => Achievements.power,
    progress: () => Achievement(11).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10(), 0, 1)
  },
  {
    id: 12,
    name: "100개면 많지",
    description: "제2 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제2 반물질 차원에 반물질 지수만큼 배율을 적용한다.`; },
    effect: () => Currency.antimatter.value.add(1).log10(),
    progress: () => Achievement(12).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(2), 0, 1)
  },
  {
    id: 13,
    name: "하프라이프 3 출시",
    description: "제3 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제3 이상의 반물질 차원이 ${formatPercents(0.3)} 강해진다.`; },
    effect: 1.3,
    progress: () => Achievement(13).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(4), 0, 1)
  },
  {
    id: 14,
    name: "레포디: 레프트 포 디멘션",
    description: "제4 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제4 반물질 차원에 ${formatInt(4)}배 배율을 적용한다.`; },
    effect: 4,
    progress: () => Achievement(14).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(6), 0, 1)
  },
  {
    id: 15,
    name: "5차원 반물질 펀치",
    description: "제5 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제5 이상의 반물질 차원이 두 배 강해진다.`; },
    effect: 2,
    progress: () => Achievement(15).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(2).min(0.5).add(player.antimatter.max(1).log10().div(18).min(0.5)), 0, 1)
  },
  {
    id: 16,
    name: "잘 알아두세요. 9는 없어요!",
    get description() {
      return Enslaved.isRunning
        ? "제6 반물질 차원을 구매한다(어차피 아무것도 되지 못한다)."
        : "제6 반물질 차원을 구매한다.";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제6 반물질 차원에 ${formatInt(9)}배 배율을 적용한다.`; },
    effect: 9,
    progress: () => Achievement(16).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(4).min(0.5).add(player.antimatter.max(1).log10().div(26).min(0.5)), 0, 1)
  },
  {
    id: 17,
    name: "운은 실력이 아니야",
    description: "제7 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제7 반물질 차원에 ${formatInt(7)}배 배율을 적용한다.`; },
    effect: 7,
    progress: () => Achievement(17).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(6).min(0.5).add(player.antimatter.max(1).log10().div(36).min(0.5)), 0, 1)
  },
  {
    id: 18,
    name: "90도 돌리면 무한",
    get description() {
      return Enslaved.isRunning
        ? "제8 반물질 차원을 구매한다(익숙해지지는 마라)."
        : "제8 반물질 차원을 구매한다.";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `모든 반물질 차원에 90도를 곱한다.`; },
    effect: 1.57,
    progress: () => Achievement(18).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(8).min(0.5).add(player.antimatter.max(1).log10().div(48).min(0.5)), 0, 1)
  },
  {
    id: 21,
    name: "무한으로!",
    description: "무한에 도달한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(100)}개로 시작하게 된다.`; },
    effect: 100,
    progress: () => Achievement(21).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 22,
    name: "가짜 뉴스!",
    get description() { return `${formatInt(50)}가지 뉴스를 본다.`; },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    progress: () => Achievement(22).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(NewsHandler.uniqueTickersSeen).div(50), 0, 1)
  },
  {
    id: 23,
    name: "9차원은 거짓이야",
    get description() { return `정확히 ${formatInt(99)}개의 제8 반물질 차원을 가진다.`; },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() { return `제8 반물질 차원이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1,
    progress: () => Achievement(23).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimension(8).amount.div(99), 0, 1)
  },
  {
    id: 24,
    name: "반물질 아포칼립스",
    get description() { return `${format(DC.E80)} 반물질에 도달한다.`; },
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(80),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(24).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(80), 0, 1)
  },
  {
    id: 25,
    name: "최대 가속!",
    get description() { return `${formatInt(10)}개의 차원 가속을 구매한다.`; },
    checkRequirement: () => DimBoost.purchasedBoosts.gte(10),
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    progress: () => Achievement(25).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.purchasedBoosts.div(18).min(0.5).add(player.antimatter.max(1).log10().div(318).min(0.5)), 0, 1)
  },
  {
    id: 26,
    name: "벽을 넘어서",
    description: "반물질 은하를 구매한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE,
    progress: () => Achievement(26).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(129), 0, 1)
  },
  {
    id: 27,
    name: "쌍둥이 은하",
    get description() { return `${formatInt(2)}개의 반물질 은하를 구매한다.`; },
    checkRequirement: () => player.galaxies.gte(2),
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    progress: () => Achievement(27).isUnlocked ? DC.D1 : Decimal.clamp(player.galaxies.div(2).min(0.5).add(player.antimatter.max(1).log10().div(438).min(0.5)), 0, 1)
  },
  {
    id: 28,
    name: "뭐하새요데체?",
    get description() {
      return `제1 반물질 차원을 ${format(DC.E150)}개 넘게 보유한 상태에서 한 개만 구매한다.`;
    },
    checkRequirement: () => AntimatterDimension(1).amount.add(1).log10().gte(150),
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1,
    progress: () => Achievement(28).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimension(1).amount.add(1).log10().div(150), 0, 1)
  },
  {
    id: 31,
    name: "패치노트에 넣는 걸 까먹었어",
    get description() { return `아무 반물질 차원의 배율을 ${formatX(DC.E31)} 이상으로 만든다.`; },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.add(1).log10().gte(31)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.05)} 강해진다.`; },
    effect: 1.05,
    progress: () => Achievement(31).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimensions.all.map(x => x.multiplier).reduce(Decimal.maxReducer).add(1).log10().div(31), 0, 1)
  },
  {
    id: 32,
    name: "오 신이시여..",
    get description() { return `일반 도전 8 밖에서 ${formatX(600)} 이상의 차원 희생 배율에 도달한다.`; },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return `차원 희생이 강해진다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })}`;
    },
    effect: 0.1,
    progress: () => Achievement(32).isUnlocked ? DC.D1 : (NormalChallenge(8).isOnlyActiveChallenge ? DC.DM1 : Decimal.clamp(Sacrifice.totalBoost.div(600), 0, 1))
  },
  {
    id: 33,
    name: "무한으로 즐기는 무한",
    get description() { return `무한에 ${formatInt(10)}번 도달한다.`; },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    progress: () => Achievement(33).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinities.value.div(10), 0, 1)
  },
  {
    id: 34,
    name: "그게 뭐죠, 먹는 건가요?",
    description: "제8 반물질 차원을 보유하지 않은 상태에서 무한에 도달한다.",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1-7 반물질 차원이 ${formatPercents(0.02)} 강해진다.`; },
    effect: 1.02,
    progress: () => Achievement(34).isUnlocked ? DC.D1 : (AntimatterDimension(8).totalAmount.neq(0) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 35,
    name: "무서워서 잘 수가 없네",
    get description() {
      return PlayerProgress.realityUnlocked()
        ? `현실 시간으로 ${formatInt(2)}시간 넘게 오프라인 상태를 유지한다.`
        : `${formatInt(2)}시간 넘게 오프라인 상태를 유지한다.`;
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 7200000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE,
    progress: () => Achievement(35).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Date.now() - player.lastUpdate).div(7200000), 0, 1)
  },
  {
    id: 36,
    name: "폐소공포증",
    get description() {
      return `${formatInt(1)}개의 반물질 은하만을 가지고 무한에 도달한다.`;
    },
    checkRequirement: () => player.galaxies.eq(1),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `초기 틱스피드 배율을 ${format(1.02, 2, 2)}배로 만든다.`; },
    effect: 1 / 1.02,
    progress: () => Achievement(36).isUnlocked ? DC.D1 : (player.galaxies.neq(1) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 37,
    name: "빠르다 빨라!",
    get description() { return `${formatInt(2)}시간 이내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours.toNumber() <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(5000)}개로 시작하게 된다.`; },
    effect: () => player.disablePostReality ? 100 : 5000,
    progress: () => Achievement(37).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalHours.gt(2) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 38,
    name: "나 무교야!",
    get description() {
      return `차원 희생 없이 반물질 은하를 구매한다.
        (무한에 도달하면 반물질 은하가 초기화된다.)`;
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE,
    progress: () => Achievement(38).isUnlocked ? DC.D1 : (!player.requirementChecks.infinity.noSacrifice ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(129), 0, 1))
  },
  {
    id: 41,
    name: "무과금 게임",
    get description() { return `무한 업그레이드를 ${formatInt(16)}개 구매한다.`; },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return `새로운 무한 업그레이드 두 개(무한 포인트 ${formatX(2)} 배율 및 오프라인 무한 포인트 생산)를 해금한다.`;
    },
    progress: () => Achievement(41).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.infinityUpgrades.size).div(16), 0, 1)
  },
  {
    id: 42,
    name: "누구보다 빠르게 남들과는 다르게",
    get description() {
      return `초당 반물질 생산량이 보유량보다 ${format(DC.E63)}배 높게 만든다.`;
    },
    checkRequirement: () =>
      Currency.antimatter.value.add(1).log10().gte(63) &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(42).isUnlocked ? DC.D1 : (Currency.antimatter.productionPerSecond.lte(Currency.antimatter.value) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(63), 0, 1))
  },
  {
    id: 43,
    name: "밥상 뒤엎기",
    description:
      "제8 반물질 차원의 배율을 가장 높게, 제7 반물질 차원의 배율을 두 번째로 높게 만드는 식으로 " +
      "차원 순서대로 배율을 정렬한다.",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `각 반물질 차원이 차원 단계에 비례하여 강해진다
      (제8 차원은 ${formatPercents(0.08)}, 제7 차원은 ${formatPercents(0.07)} 등).`;
    },
    progress: () => {
      let done = 0;
      const rmultipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < rmultipliers.length - 1; i++) {
        if (rmultipliers[i].lt(rmultipliers[i + 1])) done++;
      }
      return Achievement(43).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(done).div(7), 0, 1);
    }
  },
  {
    id: 44,
    name: "30초 경과!",
    get description() {
      return `초당 반물질 생산량이 현재 반물질보다 많은 상태를
      ${formatInt(30)}초 연속으로 유지한다.`;
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => {
      //This is a rough estimate that should work but we'll see
      let sec = 0;
      if (AchievementTimers.marathon1.check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 1)) sec++;
      else sec = 0;
      return Achievement(44).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(sec).div(30), 0, 1);
    }
  },
  {
    id: 45,
    name: "감자보다 빠르다!",
    get description() { return `초당 틱스피드를 ${format(DC.E29)} 이상으로 만든다.`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-26),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `초기 틱스피드를 ${formatX(1.02, 0, 2)}로 만든다.`; },
    effect: 0.98,
    progress: () => Achievement(45).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(29), 0, 1)
  },
  {
    id: 46,
    name: "다차원적",
    get description() { return `제8 반물질 차원을 제외하고 나머지 반물질 차원들의 개수를 ${format(DC.E12)} 이상으로 만든다.`; },
    checkRequirement: () => AntimatterDimension(7).amount.add(1).log10().gte(12),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(46).isUnlocked ? DC.D1 : Decimal.clamp(AntimatterDimension(7).amount.add(1).log10().div(12), 0, 1)
  },
  {
    id: 47,
    name: "데어데블",
    get description() { return `일반 도전 ${formatInt(3)}개를 완료한다.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(47).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(NormalChallenges.all.countWhere(c => c.isCompleted)).div(3), 0, 1)
  },
  {
    id: 48,
    name: "일반 도전 (였던 것)",
    get description() { return `${formatInt(12)}개의 일반 도전을 모두 완료한다.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() { return `모든 반물질 차원이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1,
    progress: () => Achievement(48).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(NormalChallenges.all.countWhere(c => c.isCompleted)).div(12), 0, 1)
  },
  {
    id: 51,
    name: "한계 돌파!",
    description: "무한을 돌파한다.",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(51).isUnlocked ? DC.D1 : Decimal.clamp(Decimal.log2(1500).sub(new Decimal(player.auto.bigCrunch.interval).div(100).log2()).div(Decimal.log2(1500)), 0, 1)
  },
  {
    id: 52,
    name: "자동화의 시대",
    description: "반물질 차원과 틱스피드 자동구매기의 간격을 모두 가장 짧게 한다.",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(52).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed).filter(a => a.isUnlocked && a.hasMaxedInterval).length).div(9), 0, 1)
  },
  {
    id: 53,
    name: "뭐 하세요?",
    description: "모든 일반 자동구매기의 간격을 가장 짧게 한다.",
    // The upgradeable autobuyers are dimensions, tickspeed, dimension boost,
    // galaxy, and big crunch (the ones you get from normal challenges).
    // We don't count autobuyers which can be upgraded via e.g. perks as upgradeable.
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    progress: () => Achievement(53).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Autobuyers.upgradeable.filter(a => a.isUnlocked && a.hasMaxedInterval).length).div(12), 0, 1)
  },
  {
    id: 54,
    name: "겁나 빨라!",
    get description() { return `${formatInt(10)}분 내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes.toNumber() <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e5)}개로 시작하게 된다.`; },
    effect: () => player.disablePostReality ? 100 : 5e5,
    progress: () => Achievement(54).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalMinutes.gt(10) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 55,
    name: "생각보다 짧은 무한",
    get description() { return `${formatInt(1)}분 내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes.toNumber() <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e10)}개로 시작하게 된다.`; },
    effect: () => player.disablePostReality ? 100 : 5e10,
    progress: () => Achievement(55).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalMinutes.gt(1) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 56,
    name: "대학살",
    get description() {
      return `일반 도전 2를 ${formatInt(3)}분 내로 완료한다.`;
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes.toNumber() <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한을 시작할 때 처음 ${formatInt(3)}분간 모든 반물질 차원이 강해진다.`;
    },
    effect: () => Decimal.max(new Decimal(6).div(Time.thisInfinity.totalMinutes.plus(3)), 1).toNumber(),
    effectCondition: () => Time.thisInfinity.totalMinutes.lt(3),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(56).isUnlocked ? DC.D1 : ((!NormalChallenge(2).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalMinutes.gt(3)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 57,
    name: "신내림",
    get description() {
      return `일반 도전 8을 ${formatInt(3)}분 내로 완료한다.`;
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes.toNumber() <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `차원 희생이 강해진다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })}`;
    },
    effect: 0.1,
    progress: () => Achievement(57).isUnlocked ? DC.D1 : ((!NormalChallenge(8).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalMinutes.gt(3)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 58,
    name: "이 정도면 괜찮겠지",
    get description() { return `틱스피드 자동구매기 도전을 ${formatInt(3)}분 이내에 완료한다.`; },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes.toNumber() <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `${formatInt(10)}개의 반물질 차원을 구매할 때마다 배율 +${formatPercents(0.01)}.`;
    },
    effect: 1.01,
    progress: () => Achievement(58).isUnlocked ? DC.D1 : ((!NormalChallenge(9).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalMinutes.gt(3)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 61,
    name: "3대 500",
    get description() {
      return `모든 반물질 차원 자동구매기의 대량 구매 개수를
        ${formatInt(Autobuyer.antimatterDimension.bulkCap)}개로 만든다.`;
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "차원 자동구매기의 대량 구매 한도가 사라진다.",
    progress: () => Achievement(61).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Autobuyer.antimatterDimension.zeroIndexed.filter(x => x.hasMaxedBulk).length).div(8), 0, 1)
  },
  {
    id: 62,
    name: "아.. 그.. 저.. 아직 계시네요..?",
    get description() { return `분당 ${format(DC.E8)} 무한 포인트에 도달한다.`; },
    checkRequirement: () => Player.bestRunIPPM.add(1).log10().gte(8),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    progress: () => Achievement(62).isUnlocked ? DC.D1 : Decimal.clamp(Player.bestRunIPPM.add(1).log10().div(8), 0, 1)
  },
  {
    id: 63,
    name: "새로운 시작",
    description: "무한력을 생산한다.",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 무한 차원의 배율이 두 배가 된다.`; },
    effect: 2,
    progress: () => Achievement(63).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(8), 0, 1)
  },
  {
    id: 64,
    name: "평화주의자",
    description: "일반 도전에서 차원 가속 또는 반물질 은하 없이 무한에 도달한다.",
    checkRequirement: () => player.galaxies.eq(0) && DimBoost.purchasedBoosts.eq(0) && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1-4 반물질 차원이 ${formatPercents(0.25)} 강해진다.`; },
    effect: 1.25,
    progress: () => Achievement(64).isUnlocked ? DC.D1 : ((player.galaxies.neq(0) || DimBoost.purchasedBoosts.neq(0) || !NormalChallenge.isRunning) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 65,
    name: "이딴 게 챌린지?",
    get description() { return `최단 일반 도전 기록의 총합을 ${formatInt(3)}분 미만으로 만든다.`; },
    checkRequirement: () => Time.challengeSum.totalMinutes.lt(3),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return `도전 중에는 무한 시작 후 처음 ${formatInt(3)}분간 모든 반물질 차원이 강해진다.`;
    },
    effect: () => (Player.isInAnyChallenge && !player.disablePostReality ? Decimal.max(DC.D4.div(Time.thisInfinity.totalMinutes.plus(1)), 1) : DC.D1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes.lt(3) && !player.disablePostReality,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(65).isUnlocked ? DC.D1 : Decimal.clamp(DC.D3.div(Time.challengeSum.totalMinutes), 0, 1)
  },
  {
    id: 66,
    name: "감자의 제곱보다 빠르다!",
    get description() { return `초당 ${format(DC.E58)}틱 이상으로 만든다.`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-55),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `초기 틱스피드를 ${formatX(1.02, 0, 2)}로 만든다.`; },
    effect: 0.98,
    progress: () => Achievement(66).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(58), 0, 1)
  },
  {
    id: 67,
    name: "무야호",
    description: "무한 도전을 완료한다.",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(67).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.add(1).log10().div(4000).min(0.5).add(!InfinityChallenge.current ? 0 : player.antimatter.max(1).log10().div(InfinityChallenge.current.goal.log10().times(2)).min(0.5)), 0, 1)
  },
  {
    id: 68,
    name: "도전과제 따려고 다시 한 거 맞죠?",
    get description() {
      return `일반 도전 3을 ${formatInt(10)}초 내로 완료한다.`;
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.5)} 강해진다.`; },
    effect: 1.5,
    progress: () => Achievement(68).isUnlocked ? DC.D1 : ((!NormalChallenge(3).isOnlyActiveChallenge || Time.thisInfinityRealTime.totalSeconds.gt(10)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 71,
    name: "에러 909: 차원을 찾을 수 없음",
    description:
      `제2 반물질 차원 자동구매기 도전에서 차원 가속이나 반물질 은하 없이
      제1 반물질 차원 하나만으로 무한에 도달한다.`,
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts.eq(0) &&
      player.galaxies.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1 반물질 차원이 ${formatInt(3)}배 강해진다.`; },
    effect: 3,
    progress: () => Achievement(71).isUnlocked ? DC.D1 : ((!NormalChallenge(2).isOnlyActiveChallenge || AntimatterDimension(1).amount.neq(1) || DimBoost.purchasedBoosts.neq(0) || player.galaxies.neq(0)) ? DC.D0 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 72,
    name: "장비를 정지합니다",
    get description() {
      return `모든 반물질 차원의 배율을 ${formatX(DC.NUMMAX, 1)} 넘게 만든다.`;
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.tier > 8 || x.multiplier.gte(DC.NUMMAX)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 반물질 차원들이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1,
    progress: () => Achievement(72).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(AntimatterDimensions.all.filter(x => x.multiplier.gte(DC.NUMMAX)).length).div(8), 0, 1)
  },
  {
    id: 73,
    name: "이 도전과제는 존재하지 않습니다",
    get description() { return `${formatPostBreak(DC.D9_9999E9999, 4)} 반물질에 도달한다.`; },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "보유 중인 반물질에 비례하여 반물질 차원이 강해진다.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1).clampMax(Decimal.pow(10, 1e30)).pow(
      Decimal.max(Decimal.pow(2, Decimal.log10(Decimal.log10(Currency.antimatter.value.pow(0.00002).plus(1)).div(1e30))), 1)),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(73).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(10000), 0, 1)
  },
  {
    id: 74,
    name: "1분 1초가 아까워",
    get description() { return `최단 일반 도전 기록의 총합을 ${formatInt(5)}초 미만으로 만든다.`; },
    checkRequirement: () => Time.challengeSum.totalSeconds.lt(5),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return `도전에서 모든 반물질 차원이 ${formatPercents(0.4)} 강해진다.`; },
    effect: () => player.disablePostReality ? 1 : 1.4,
    effectCondition: () => Player.isInAnyChallenge && !player.disablePostReality,
    progress: () => Achievement(74).isUnlocked ? DC.D1 : Decimal.clamp(DC.D5.div(Time.challengeSum.totalSeconds), 0, 1)
  },
  {
    id: 75,
    name: "차원이 다른 차원",
    description: "제4 무한 차원을 해금한다.",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "도전과제의 배율이 무한 차원에도 적용된다.",
    effect: () => Achievements.power,
    progress: () => Achievement(75).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(10500), 0, 1)
  },
  {
    id: 76,
    name: "차원마다 한 시간씩",
    get description() { return `${formatInt(8)}시간 동안 플레이한다.`; },
    checkRequirement: () => Time.totalTimePlayed.totalHours.gte(8),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "플레이한 시간에 따라 반물질 차원에 아주 작은 배율이 적용된다.",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.max(Decimal.pow(Time.totalTimePlayed.totalDays.times(12), 0.05), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(76).isUnlocked ? DC.D1 : Decimal.clamp(Time.totalTimePlayed.totalHours.div(8), 0, 1)
  },
  {
    id: 77,
    name: "백만은 좀 많은데",
    get description() { return `${format(1e6)} 무한력에 도달한다.`; },
    checkRequirement: () => Currency.infinityPower.value.add(1).log10().gte(6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `무한 포인트에 따라 모든 무한 차원이 강해진다.`;
    },
    effect: () => Currency.infinityPoints.value.add(1).log10().clampMin(1),
    progress: () => Achievement(77).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPower.value.add(1).log10().div(6), 0, 1)
  },
  {
    id: 78,
    name: "눈 깜짝할 새",
    get description() { return `${formatInt(250)}ms 내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds.toNumber() <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한을 ${format(5e25)} 반물질을 보유한 상태로 시작한다.`;
    },
    effect: () => player.disablePostReality ? 100 : 5e25,
    progress: () => Achievement(78).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalMilliseconds.gt(250) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 81,
    name: "저 게임 디자인 5년 배웠어요",
    get description() { return `무한 도전 5를 ${formatInt(15)}초 이내에 완료한다.`; },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `복제자를 ${formatInt(3)}배 빠르게 획득한다.`;
    },
    effect: () => player.disablePostReality ? 1 : 3,
    progress: () => Achievement(81).isUnlocked ? DC.D1 : ((!InfinityChallenge(5).isRunning || Time.thisInfinityRealTime.totalSeconds.gt(15)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(16500), 0, 1))
  },
  {
    id: 82,
    name: "나 도전 아니다",
    get description() { return `${formatInt(8)}개의 무한 도전을 모두 완료한다.`; },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(82).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(InfinityChallenges.all.countWhere(c => c.isCompleted)).div(8), 0, 1)
  },
  {
    id: 83,
    name: "갤럭시 S50, 50개?!",
    get description() { return `${formatInt(50)}개의 반물질 은하를 구매한다.`; },
    checkRequirement: () => player.galaxies.gte(50),
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `틱스피드가 반물질 은하의 개수마다 ${formatPercents(0.05)}씩 빨라진다.`; },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`,
    progress: () => Achievement(83).isUnlocked ? DC.D1 : Decimal.clamp(player.galaxies.div(50), 0, 1)
  },
  {
    id: 84,
    name: "좀 나눠줘?",
    get description() { return `${formatPostBreak("1e35000")} 반물질에 도달한다.`; },
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(35000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "보유하고 있는 반물질에 비례해 반물질 차원이 강해진다",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1).clampMax(Decimal.pow(10, 1e30)).pow(
      Decimal.max(Decimal.pow(2, Decimal.log10(Decimal.log10(Currency.antimatter.value.pow(0.00002).plus(1)).div(1e30))), 1)),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(84).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(35000), 0, 1)
  },
  {
    id: 85,
    name: "이 IP는 이제 제 겁니다.",
    get description() { return `한 번의 빅 크런치로 ${format(DC.E150)} 이상의 무한 포인트를 획득한다.`; },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(150),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트를 ${formatX(4)} 더 얻는다.`; },
    effect: () => player.disablePostReality ? 1 : 4,
    progress: () => Achievement(85).isUnlocked ? DC.D1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(150), 0, 1)
  },
  {
    id: 86,
    name: "버거도 접고 폰도 접고 시간도 접냐?",
    get description() { return `틱스피드 업그레이드의 증가량을 ${formatX(1000)} 이상으로 만든다.`; },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 은하가 ${formatPercents(0.01)} 강해진다.`; },
    effect: 1.01,
    progress: () => Achievement(86).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.multiplier.recip().div(1000), 0, 1)
  },
  {
    id: 87,
    name: "더블 밀리언 달성",
    get description() { return `무한에 ${format(DC.D2E6)}번 도달한다.`; },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `${formatInt(5)}초보다 긴 무한에서
      무한 횟수를 ${formatX(250)} 더 획득한다.`;
    },
    effect: () => player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 23) ? 1 : 250,
    effectCondition: () => Time.thisInfinity.totalSeconds.gt(5) &&
      (!player.disablePostReality || (Alpha.isRunning && Alpha.currentStage >= 23)),
    progress: () => Achievement(87).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinities.value.div(2e6), 0, 1)
  },
  {
    id: 88,
    name: "무한 희생",
    get description() {
      return `한 번의 차원 희생으로 ${formatX(DC.NUMMAX, 1, 0)} 배율을 얻는다.`;
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() {
      return `차원 희생이 강해진다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true })}`;
    },
    effect: 0.1,
    progress: () => Achievement(88).isUnlocked ? DC.D1 : Decimal.clamp(Sacrifice.nextBoost.log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 91,
    name: "속도의 한계를 보여줄게",
    get description() {
      return `${formatInt(2)}초 내로 빅 크런치를 하여 ${format(DC.E200)}개의 무한 포인트를 획득한다.`;
    },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(200) && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한 시작 후 처음 ${formatInt(5)}초간
      모든 반물질 차원이 크게 강해진다.`;
    },
    effect: () => player.disablePostReality ? DC.D1 : Decimal.max((DC.D5.sub(Time.thisInfinity.totalSeconds)).times(60), 1),
    effectCondition: () => Time.thisInfinity.totalSeconds.lt(5) && !player.disablePostReality,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(91).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalSeconds.gt(2) ? DC.DM1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(200), 0, 1))
  },
  {
    id: 92,
    name: "정지가 안돼",
    get description() {
      return `${formatInt(20)}초 내로 빅 크런치를 하여 ${format(DC.E250)}개의 무한 포인트를 획득한다.`;
    },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(250) && Time.thisInfinityRealTime.totalSeconds.toNumber() <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한 시작 후 처음 ${formatInt(60)}초간
      모든 반물질 차원이 크게 강해진다.`;
    },
    effect: () => player.disablePostReality ? DC.D1 : Decimal.max((DC.D1.sub(Time.thisInfinity.totalMinutes)).times(100), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes.lt(1) && !player.disablePostReality,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(92).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalSeconds.gt(20) ? DC.DM1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(250), 0, 1))
  },
  {
    id: 93,
    name: "우리 할머니도 그것보다 더 빨리 뛰겠다",
    get description() { return `한 번의 빅 크런치로 ${format(DC.E300)}개의 무한 포인트를 획득한다.`; },
    checkRequirement: () => gainedInfinityPoints().add(1).log10().gte(300),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트를 ${formatX(4)} 더 얻는다.`; },
    effect: () => player.disablePostReality ? 1 : 4,
    progress: () => Achievement(93).isUnlocked ? DC.D1 : Decimal.clamp(gainedInfinityPoints().add(1).log10().div(300), 0, 1)
  },
  {
    id: 94,
    name: "4와 3분의 1의 무한",
    get description() { return `${format(DC.E260)} 무한력에 도달한다.`; },
    checkRequirement: () => Currency.infinityPower.value.add(1).log10().gte(260),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "무한력을 두 배로 얻는다.",
    effect: 2,
    progress: () => Achievement(94).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPower.value.add(1).log10().div(260), 0, 1)
  },
  {
    id: 95,
    name: "안전한거 맞겠지?",
    get description() { return `${formatInt(1)}시간 안에 복제자 ${format(DC.NUMMAX, 1, 0)}개를 획득한다.`; },
    get reward() { return `무한에 도달해도 복제자와 복제자 은하 ${formatInt(1)}개를 잃지 않는다.`; },
    checkRequirement: () =>
      (Replicanti.amount.eq(DC.NUMMAX) || player.replicanti.galaxies.gt(0)) &&
      Time.thisInfinityRealTime.totalHours.toNumber() <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER,
    progress: () => Achievement(95).isUnlocked ? DC.D1 : (Time.thisInfinityRealTime.totalHours.gt(1) ? DC.DM1 : Decimal.clamp(Replicanti.amount.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 96,
    name: "상대성 이론",
    description: "영원에 도달한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(96).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 97,
    name: "레고 밟으면서 줄넘기 쌩쌩이",
    get description() { return `무한 도전 기록의 총합을 ${format(6.66, 2, 2)}초 미만으로 만든다.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds.lt(6.66),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(97).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(6.66).div(Time.infinityChallengeSum.totalSeconds), 0, 1)
  },
  {
    id: 98,
    name: "무한으로부터 0도",
    description: "제8 무한 차원을 해금한다.",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(98).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(1).log10().div(60000), 0, 1)
  },
  {
    id: 101,
    name: "아무도 8같은 건 신경 쓸 틈이 없겠죠",
    description: "제1-7 반물질 차원을 구매하지 않고 영원에 도달한다.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(101).isUnlocked ? DC.D1 : (!player.requirementChecks.eternity.onlyAD8 ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 102,
    name: "이 마일스톤까지 영원이 걸렸어",
    description: "모든 영원 마일스톤을 달성한다.",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `영원 횟수를 ${formatX(2)} 더 획득한다.`; },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(102).isUnlocked ? DC.D1 : Decimal.clamp(Currency.eternities.value.div(1000), 0, 1)
  },
  {
    id: 103,
    name: "Oㅣ 도JㅓN과제는 존재하ㅈ1 않습LIㄷㅏ II",
    get description() { return `${formatPostBreak(DC.D9_99999E999, 5, 0)} 무한 포인트에 도달한다.`; },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `무한 포인트 획득 공식이 개선된다. log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(307.8, 1)}`;
    },
    effect: () => player.disablePostReality ? 308 : 307.8,
    progress: () => Achievement(103).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(1000), 0, 1)
  },
  {
    id: 104,
    name: "그건 영원이라 할 수 없지",
    get description() { return `${formatInt(30)}초 이내에 영원에 도달한다.`; },
    checkRequirement: () => Time.thisEternity.totalSeconds.lte(30),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `영원을 무한 포인트 ${format(5e25)}개로 시작한다.`; },
    effect: () => player.disablePostReality ? 0 : 5e25,
    progress: () => Achievement(104).isUnlocked ? DC.D1 : (Time.thisEternity.totalSeconds.gt(30) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 105,
    name: "무한한 시간",
    get description() { return `시간 차원으로 얻은 틱스피드 업그레이드를 ${formatInt(308)}개 보유한다.`; },
    checkRequirement: () => player.totalTickGained.gte(308),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "틱스피드에 따라 시간 차원에 배율이 적용된다.",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(105).isUnlocked ? DC.D1 : Decimal.clamp(player.totalTickGained.div(308), 0, 1)
  },
  {
    id: 106,
    name: "떼거리",
    get description() { return `${formatInt(15)}초 안에 복제자 은하 ${formatInt(10)}개를 획득한다.`; },
    checkRequirement: () => Replicanti.galaxies.total.gte(10) && Time.thisInfinity.totalSeconds.lte(15),
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER,
    progress: () => Achievement(106).isUnlocked ? DC.D1 : (Time.thisInfinity.totalSeconds.gt(15) ? DC.DM1 : Decimal.clamp(Replicanti.galaxies.total.div(10), 0, 1))
  },
  {
    id: 107,
    name: "이거 공략이 정말 필요해?",
    get description() { return `무한 횟수가 ${formatInt(10)}회 미만인 상태로 영원에 도달한다.`; },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(107).isUnlocked ? DC.D1 : (Currency.infinities.gte(10) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 108,
    name: "9도 살 수 있었는데",
    get description() { return `복제자를 정확히 ${formatInt(9)}개 보유한 상태로 영원에 도달한다.`; },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(107).isUnlocked ? DC.D1 : (Replicanti.amount.round().neq(9) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 111,
    name: "친구야, 네가 무한을 좋아한다고 들었어...",
    get description() {
      return `최근 ${formatInt(10)}회의 모든 무한에서 획득한 무한 포인트를 바로 이전 기록보다
      최소 ${format(DC.NUMMAX, 1, 0)}배 높게 만든다.`;
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0].gte(Number.MAX_VALUE))) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(DC.NUMMAX))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "차원 가속이나 반물질 은하를 구매해도 반물질이 초기화되지 않는다.",
    progress: () => {
      let infinf = 0;
      const rinfinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < rinfinities.length - 1; i++) {
        if (rinfinities[i].gte(rinfinities[i + 1].times(DC.NUMMAX))) infinf++;
      }
      return Achievement(111).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(infinf).div(9), 0, 1);
    }
  },
  {
    id: 112,
    name: "다시는 안 해",
    get description() { return `무한 도전 기록의 총합을 ${formatInt(750)}ms 미만으로 만든다.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds.lt(750),
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    progress: () => Achievement(112).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(750).div(Time.infinityChallengeSum.totalMilliseconds), 0, 1)
  },
  {
    id: 113,
    name: "영원이 새로운 무한이다",
    get description() { return `${formatInt(250)}ms 이내에 영원에 도달한다.`; },
    checkRequirement: () => Time.thisEternity.totalMilliseconds.lte(250),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `영원 횟수를 ${formatX(3)} 더 획득한다.`; },
    effect: () => player.disablePostReality ? 1 : 3,
    progress: () => Achievement(113).isUnlocked ? DC.D1 : (Time.thisEternity.totalMilliseconds.gt(250) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 114,
    name: "넌 실수야",
    description: "영원 도전에 실패한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "희미해지는 성취감.",
    effect: () => "성취감(희미해지는 중)",
    progress: () => {
      if (Achievement(114).isUnlocked) return DC.D1;
      if (!EternityChallenge(4).isRunning || !EternityChallenge(12).isRunning) return DC.DM1;
      if (EternityChallenge(4).isRunning) return Decimal.clamp(Currency.infinities.value.div(EternityChallenge(4)._config.restriction(EternityChallenge(4).completions).add(1)), 0, 1);
      return Decimal.clamp(Time.thisEternity.totalSeconds.div(EternityChallenge(12)._config.restriction(EternityChallenge(12).completions)), 0, 1);
    }
  },
  {
    id: 115,
    name: "영원 7번을 했어야 했는데",
    description: "영원 도전 안에서 무한 도전을 시작한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    progress: () => Achievement(115).isUnlocked ? DC.D1 : (!EternityChallenge.current ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(2000), 0, 1))
  },
  {
    id: 116,
    name: "정말 무한에 도달해야 해?",
    get description() { return `무한 횟수가 ${formatInt(1)}회뿐인 상태로 영원에 도달한다.`; },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "무한 횟수에 따라 무한 포인트에 배율이 적용된다.",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (시간 연구 31 적용 후: ${mult})`
        : mult;
    },
    progress: () => Achievement(116).isUnlocked ? DC.D1 : (Currency.infinities.gte(1) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 117,
    name: "코스트코에서 차원 가속도 파네!",
    get description() { return `차원 가속 ${formatInt(750)}개를 한 번에 대량 구매한다.`; },
    checkRequirement: ([bulk]) => bulk.gte(750),
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() {
      return `차원 가속이 반물질 차원에 주는 배율이 ${formatPercents(0.01)} 증가한다.`;
    },
    effect: () => player.disablePostReality ? 1 : 1.01,
    progress: () => Achievement(117).isUnlocked ? DC.D1 : Decimal.clamp(DimBoost.maxBuyableDimBoostsAfterCap.div(750), 0, 1)
  },
  {
    id: 118,
    name: "9000을 넘었다!",
    get description() { return `차원 희생의 총 배율을 ${formatPostBreak(DC.E9000)}으로 만든다.`; },
    checkRequirement: () => Sacrifice.totalBoost.add(1).log10().gte(9000),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `차원 희생이 반물질 차원을 초기화하지 않으며,
      자동구매기를 켜면 매 틱마다 작동한다.`,
    progress: () => Achievement(118).isUnlocked ? DC.D1 : Decimal.clamp(Sacrifice.totalBoost.add(1).log10().div(9000), 0, 1)
  },
  {
    id: 121,
    name: "무한한 무한 포인트를 얻을 수 있나?",
    get description() { return `무한 포인트 ${formatPostBreak("1e30008")}개에 도달한다.`; },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(30008),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(121).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(30008), 0, 1)
  },
  {
    id: 122,
    name: "넌 이미 죽어 있다.",
    description: "제2-8 반물질 차원을 구매하지 않고 영원에 도달한다.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    progress: () => Achievement(122).isUnlocked ? DC.D1 : (!player.requirementChecks.eternity.onlyAD1 ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 123,
    name: "업데이트까지 영원 5번 남았다",
    get description() { return `서로 다른 영원 도전 단계를 ${formatInt(50)}번 완료한다.`; },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    progress: () => Achievement(123).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EternityChallenges.completions).div(50), 0, 1)
  },
  {
    id: 124,
    name: "오래가는 관계",
    get description() {
      return `한 번의 무한에서 초당 무한력 생산량이 현재 무한력보다 많은 상태를
      ${formatInt(60)}초 연속으로 유지한다.`;
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => {
      //This is a rough estimate that should work but we'll see
      let isec = 0;
      if (AchievementTimers.marathon2.check(!EternityChallenge(7).isRunning && InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value), 1)) isec++;
      else isec = 0;
      return Achievement(124).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(isec).div(60), 0, 1);
    }
  },
  {
    id: 125,
    name: "등짝을 보자",
    get description() {
      return `이번 영원에서 무한 횟수와 제1 반물질 차원을 하나도 보유하지 않고
      무한 포인트 ${format(DC.E90)}개에 도달한다.`;
    },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(90) &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "이번 무한에서 보낸 시간에 따라 무한 포인트에 배율이 적용된다.",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds.times(10).plus(1);
      return player.disablePostReality ? DC.D1 : DC.D2.pow(Decimal.ln(thisInfinity).times(Decimal.min(Decimal.pow(thisInfinity, 0.11), 500)));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(125).isUnlocked ? DC.D1 : ((!player.requirementChecks.eternity.noAD1 || !Currency.infinities.eq(0)) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(90), 0, 1))
  },
  {
    id: 126,
    name: "대중음악",
    get description() { return `복제자 은하를 반물질 은하보다 ${formatInt(180)}배 많이 보유한다.`; },
    checkRequirement: () => Replicanti.galaxies.total.gte(player.galaxies.times(180)) && player.galaxies.gt(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `복제자 은하가 복제자를 ${formatInt(1)}개로 초기화하는 대신
      ${format(DC.NUMMAX, 1, 0)}으로 나눈다.`;
    },
    progress: () => Achievement(126).isUnlocked ? DC.D1 : (player.galaxies.lte(0) ? DC.DM1 : Decimal.clamp(Replicanti.galaxies.total.div(player.galaxies.times(180)), 0, 1))
  },
  {
    id: 127,
    name: "하지만 프레스티지 층이 하나 더 필요했는데...",
    get description() { return `영원 포인트 ${format(DC.NUMMAX, 1, 0)}개에 도달한다.`; },
    checkRequirement: () => Currency.eternityPoints.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(127).isUnlocked ? DC.D1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 128,
    name: "널 없애려면 뭘 해야 하지",
    get description() { return `시간 연구 없이 무한 포인트 ${formatPostBreak("1e22000")}개에 도달한다.`; },
    checkRequirement: () => Currency.infinityPoints.value.add(1).log10().gte(22000) && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "보유한 시간 연구 수에 따라 시간 차원에 배율이 적용된다.",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`,
    progress: () => Achievement(128).isUnlocked ? DC.D1 : (player.timestudy.studies.length !== 0 ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(22000), 0, 1))
  },
  {
    id: 131,
    name: "윤리적 소비는 없다",
    get description() { return `저장된 무한 횟수 ${format(DC.E9, 3)}회를 획득한다.`; },
    checkRequirement: () => Currency.infinitiesBanked.gte(DC.E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() {
      return `무한 횟수를 ${formatX(2)} 더 획득하고,
      영원 달성 후 무한 횟수의 ${formatPercents(0.05)}를 저장된 무한 횟수로 영구 보존한다.`;
    },
    effects: {
      infinitiesGain: () => player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 23) ? 1 : 2,
      bankedInfinitiesGain: () => player.disablePostReality && !(Alpha.isRunning && Alpha.currentStage >= 23)
        ? DC.D0 : Currency.infinities.value.times(0.05).floor()
    },
    progress: () => Achievement(131).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinitiesBanked.value.div(1e9), 0, 1)
  },
  {
    id: 132,
    name: "특별한 눈송이",
    get description() {
      return `이번 영원에서 복제자 은하를 하나도 획득하지 않고
        반물질 은하 ${formatInt(569)}개를 보유한다.`;
    },
    checkRequirement: () => player.galaxies.gte(569) && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "반물질 은하에 따라 타키온 입자와 팽창된 시간 획득량에 배율이 적용된다.",
    effect: () => player.disablePostReality ? 1 : Decimal.max(Decimal.pow(player.galaxies, 0.04), 1).times(1.22).toNumber(),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(132).isUnlocked ? DC.D1 : (!player.requirementChecks.eternity.noRG ? DC.DM1 : Decimal.clamp(player.galaxies.div(569), 0, 1))
  },
  {
    id: 133,
    name: "이 무한이라는 건 원래 마음에 안 들었어",
    get description() {
      return `무한 차원과 ${formatX(2)} 무한 포인트 배율을 구매하지 않고
      무한 포인트 ${formatPostBreak(DC.E200000)}개에 도달한다.`;
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount.eq(0)) &&
      player.IPMultPurchases.eq(0) &&
      Currency.infinityPoints.value.add(1).log10().gte(200000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "모든 무한 도전이 해금되고 완료된 상태로 영원을 시작한다.",
    progress: () => Achievement(133).isUnlocked ? DC.D1 : ((!Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount.eq(0)) || player.IPMultPurchases.neq(0)) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(200000), 0, 1))
  },
  {
    id: 134,
    name: "언제쯤 충분할까?",
    get description() { return `복제자 ${formatPostBreak("1e15000")}개에 도달한다.`; },
    checkRequirement: () => Replicanti.amount.add(1).log10().gte(15000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `복제자가 ${format(replicantiCap(), 1)}개 미만일 때 ${formatInt(2)}배 빠르게 획득한다.`;
    },
    progress: () => Achievement(134).isUnlocked ? DC.D1 : Decimal.clamp(Replicanti.amount.add(1).log10().div(15000), 0, 1)
  },
  {
    id: 135,
    name: "감자^286078보다 빠르게",
    get description() { return `초당 ${formatPostBreak("1e8296262")}틱을 넘긴다.`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-8296262),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(135).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(8296262), 0, 1)
  },
  {
    id: 136,
    name: "말했잖아, 시간은 상대적이라고",
    description: "시간을 팽창시킨다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    progress: () => Achievement(136).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EternityChallenge(11).completions).div(20).min(0.25).add(new Decimal(EternityChallenge(12).completions).div(20).min(0.25)).add(player.timestudy.maxTheorem.div(51600).min(0.25)).add(player.timestudy.theorem.div(20000).min(0.25)), 0, 1)
  },
  {
    id: 137,
    name: "이제 팽창으로 생각하는군!",
    get description() {
      return `시간 팽창 중 ${formatInt(1)}분 이내에
      반물질 ${formatPostBreak("1e260000")}개를 획득한다.`;
    },
    checkRequirement: () =>
      Currency.antimatter.value.add(1).log10().gte(260000) &&
      Time.thisEternity.totalMinutes.lte(1) &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `시간 팽창 중 팽창된 시간과 시간 정리를 ${formatX(2)} 획득한다.`; },
    effect: () => player.disablePostReality ? 1 : (player.dilation.active ? 2 : 1),
    progress: () => Achievement(137).isUnlocked ? DC.D1 : ((!player.dilation.active || Time.thisEternity.totalMinutes.gt(1)) ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(260000), 0, 1))
  },
  {
    id: 138,
    name: "이게 널 없애기 위해 해야 하는 일이야.",
    get description() {
      return `시간 팽창 중 시간 연구 없이 무한 포인트 ${formatPostBreak("1e26000")}개에 도달한다.`;
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.value.add(1).log10().gte(26000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "액티브 및 방치 경로의 시간 연구 131과 133에서 불리한 효과를 제거한다.",
    progress: () => Achievement(138).isUnlocked ? DC.D1 : ((!player.dilation.active || player.timestudy.studies.length !== 0) ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(26000), 0, 1))
  },
  {
    id: 141,
    name: "현실로 돌아와",
    description: "새로운 현실에 도달한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `무한 포인트 획득량이 ${formatX(4)} 증가하고, 반물질 차원 ${formatInt(10)}개 구매 배율이
      +${format(0.1, 0, 1)} 증가한다.`;
    },
    effects: {
      ipGain: () => player.disablePostReality ? 1 : 4,
      buyTenMult: () => player.disablePostReality ? 0 : 0.1
    },
    progress: () => Achievement(141).isUnlocked ? DC.D1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1)
  },
  {
    id: 142,
    name: "이게 어떻게 작동하지?",
    description: "오토메이터를 해금한다.",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() { return `차원 가속이 ${formatPercents(0.5)} 강해진다.`; },
    effect: () => player.disablePostReality ? 1 : 1.5,
    progress: () => Achievement(142).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(AutomatorPoints.totalPoints).div(100), 0, 1)
  },
  {
    id: 143,
    name: "친구야, 네가 재탕을 좋아한다고 들었어...",
    get description() {
      return `최근 ${formatInt(10)}회의 모든 영원에서 획득한 영원 포인트를 바로 이전 기록보다
      최소 ${format(DC.NUMMAX, 1, 0)}배 높게 만든다.`;
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0].gte(Number.MAX_VALUE))) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(DC.NUMMAX))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "은하가 더 이상 차원 가속을 초기화하지 않는다.",
    progress: () => {
      let infete = 0;
      const reternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < reternities.length - 1; i++) {
        if (reternities[i].gte(reternities[i + 1].times(DC.NUMMAX))) infete++;
      }
      return Achievement(143).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(infete).div(9), 0, 1);
    }
  },
  {
    id: 144,
    name: "이거 인터스텔라 패러디인가?",
    description: "블랙홀을 해금한다.",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
    progress: () => Achievement(144).isUnlocked ? DC.D1 : Decimal.clamp(Currency.realityMachines.value.div(100), 0, 1)
  },
  {
    id: 145,
    name: "이 둘의 순서가 맞는 거 확실해?",
    description: "두 블랙홀 중 하나의 간격을 지속 시간보다 짧게 만든다.",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `블랙홀의 간격이 ${formatPercents(0.1)} 짧아진다.`; },
    effect: () => player.disablePostReality ? 1 : 0.9,
    progress: () => Achievement(145).isUnlocked ? DC.D1 : Decimal.clamp(Decimal.max(new Decimal(BlackHole(1).duration).div(new Decimal(BlackHole(1).interval).max(0.000001)), new Decimal(BlackHole(2).duration).div(new Decimal(BlackHole(2).interval).max(0.000001))), 0, 1)
  },
  {
    id: 146,
    name: "살아가는 퍼크",
    description: "모든 퍼크를 구매한다.",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() { return `글리프 희귀도 +${formatPercents(0.01)}.`; },
    effect: () => player.disablePostReality ? 0 : 1,
    progress: () => Achievement(146).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.reality.perks.size).div(Perks.all.length), 0, 1)
  },
  {
    id: 147,
    name: "현실의 달인",
    description: "모든 현실 업그레이드를 구매한다.",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "현실의 셀레스티얼 Teresa를 해금한다.",
    progress: () => Achievement(147).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(RealityUpgrades.all.filter(u => u.isBought || u.boughtAmount > 0).length).div(RealityUpgrades.all.length), 0, 1)
  },
  {
    id: 148,
    name: "로열 플러시",
    description: "각 기본 글리프 종류를 하나씩 장착하고 현실에 도달한다.",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "장착한 서로 다른 글리프 종류 수만큼 획득할 글리프 레벨이 증가한다.",
    effect: () => player.disablePostReality ? 0 : (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`,
    progress: () => Achievement(148).isUnlocked ? DC.D1 : (!BASIC_GLYPH_TYPES.every(type => Glyphs.activeList.some(g => g.type === type)) ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 151,
    name: "정말 없어도 됐잖아",
    get description() {
      return `이번 무한에서 제8 반물질 차원을 구매하지 않고
      반물질 은하 ${formatInt(800)}개를 획득한다.`;
    },
    checkRequirement: () => player.galaxies.gte(800) && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "도전과제의 셀레스티얼 V를 해금한다.",
    progress: () => Achievement(151).isUnlocked ? DC.D1 : (!player.requirementChecks.infinity.noAD8 ? DC.DM1 : Decimal.clamp(player.galaxies.div(800), 0, 1))
  },
  {
    id: 152,
    name: "글리프 좀 더 없나?",
    get description() { return `보관함에 글리프 ${formatInt(100)}개를 보유한다.`; },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    progress: () => Achievement(152).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Glyphs.inventoryList.length).div(100), 0, 1)
  },
  {
    id: 153,
    name: "차라리 \"현실은정말상관없어\"",
    description: "반물질을 생산하지 않고 현실에 도달한다.",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    progress: () => Achievement(153).isUnlocked ? DC.D1 : (!player.requirementChecks.reality.noAM ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 154,
    name: "나는 속도다",
    get description() { return `게임 시간 ${formatInt(5)}초 이내에 현실에 도달한다.`; },
    checkRequirement: () => Time.thisReality.totalSeconds.lte(5),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `현실마다 ${formatPercents(EndgameMastery(41).isBought ? 1 : 0.1)} 확률로
      현실 횟수와 퍼크 포인트를 ${formatX(2)} 획득한다.`; },
    effect: () => player.disablePostReality ? 0 : (EndgameMastery(41).isBought ? 1 : 0.1),
    progress: () => Achievement(154).isUnlocked ? DC.D1 : (Time.thisReality.totalSeconds.gt(5) ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 155,
    name: "도전과제 #15983",
    get description() { return `${formatFloat(13.7, 1)}십억 년 동안 플레이한다.`; },
    checkRequirement: () => Time.totalTimePlayed.totalYears.gt(13.7e9),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `블랙홀 지속 시간이 ${formatPercents(0.1)} 길어진다.`; },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(155).isUnlocked ? DC.D1 : Decimal.clamp(Time.totalTimePlayed.totalYears.div(13.7e9), 0, 1)
  },
  {
    id: 156,
    name: "대학 중퇴",
    description: "시간 정리를 구매하지 않고 현실에 도달한다.",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `생성되는 시간 정리를 ${formatX(2.5, 0, 1)} 획득하고 맥도날드™️ 무료 쿠폰을 받는다.`; },
    effect: () => player.disablePostReality ? 1 : 2.5,
    progress: () => Achievement(156).isUnlocked ? DC.D1 : (!player.requirementChecks.reality.noPurchasedTT ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 157,
    name: "효과가 굉장했다!",
    get description() { return `효과가 ${formatInt(4)}개인 글리프를 획득한다.`; },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    progress: () => Achievement(157).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Glyphs.activeList.concat(Glyphs.inventoryList).map(glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0).filter(effect => effect.isGenerated).length).max()).div(4), 0, 1)
  },
  {
    id: 158,
    name: "야, 너 블랙홀 안에라도 있냐?",
    description: "두 블랙홀을 모두 영구화한다.",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `블랙홀의 성능이 ${formatPercents(0.1)} 증가한다.`; },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(158).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(BlackHoles.list.filter(b => b.isPermanent).length).div(2), 0, 1)
  },
  {
    id: 161,
    name: "꼬마야, 바로 그게 틀렸어",
    get description() { return `시간 팽창 중 반물질 ${formatPostBreak(DC.E1E8)}개를 획득한다.`; },
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(100000000) && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(161).isUnlocked ? DC.D1 : (!player.dilation.active ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(100000000), 0, 1))
  },
  {
    id: 162,
    name: "게임을 다시 설치하고 서버에 재접속했다",
    description: "모든 시간 연구를 동시에 보유한다.",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(162).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.timestudy.studies.length).div(58), 0, 1)
  },
  {
    id: 163,
    name: "사실 엄청 쉬워! 불편할 것도 없고!",
    get description() {
      return `이번 현실에서 모든 영원 도전을 ${formatInt(5)}회 완료하고,
      게임 시간 기록을 ${formatInt(1)}초 미만으로 만든다.`;
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds.lte(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(163).isUnlocked ? DC.D1 : (Time.thisReality.totalSeconds.gt(1) ? DC.DM1 : Decimal.clamp(new Decimal(EternityChallenges.completions).div(60), 0, 1))
  },
  {
    id: 164,
    name: "무한 두 배",
    get description() { return `무한 횟수 ${format(DC.NUMMAX, 1)}회에 도달한다.`; },
    checkRequirement: () => Currency.infinitiesTotal.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `무한 횟수를 ×${formatInt(1024)} 더 획득한다.`; },
    effect: () => player.disablePostReality ? 1 : 1024,
    progress: () => Achievement(164).isUnlocked ? DC.D1 : Decimal.clamp(Currency.infinitiesTotal.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 165,
    name: "완벽한 균형",
    get description() { return `모든 글리프 레벨 요소의 가중치가 같은 레벨 ${formatInt(5000)} 글리프를 획득한다.`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel.gte(5000) &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "글리프 레벨 요소의 최적 자동 조정을 해금한다.",
    progress: () => Achievement(165).isUnlocked ? DC.D1 : (!["repl", "dt", "eternities"].every(i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep) ? DC.DM1 : Decimal.clamp(gainedGlyphLevel().actualLevel.div(5000), 0, 1))
  },
  {
    id: 166,
    name: "좋아좋아.",
    get description() { return `레벨 끝자리가 ${formatInt(6969)}인 글리프를 획득한다.`; },
    checkRequirement: () => Decimal.modulo(gainedGlyphLevel().actualLevel, 10000).eq(6969),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `글리프 레벨 +${formatInt(69)}.`; },
    effect: () => player.disablePostReality ? 0 : 69,
    progress: () => Achievement(166).isUnlocked ? DC.D1 : (gainedGlyphLevel().actualLevel.lte(6969) ? Decimal.clamp(gainedGlyphLevel().actualLevel.div(6969), 0, 1) : Decimal.clamp(Decimal.mod(gainedGlyphLevel().actualLevel.sub(6969), 10000).div(10000), 0, 1))
  },
  {
    id: 167,
    name: "레이어 씨? 죄송하지만 명단에 없네요",
    get description() { return `리얼리티 머신 ${format(DC.NUMMAX, 1, 0)}개에 도달한다.`; },
    checkRequirement: () => Currency.realityMachines.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "현재 리얼리티 머신에 따라 리얼리티 머신을 더 많이 획득한다.",
    effect: () => player.disablePostReality ? DC.D1 : Decimal.clampMin(1, Currency.realityMachines.value.add(1).log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(167).isUnlocked ? DC.D1 : Decimal.clamp(Currency.realityMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 168,
    name: "와, 절반 왔네",
    get description() { return `Ra의 셀레스티얼 기억 레벨 합계 ${formatInt(50)}을 달성한다.`; },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `기억을 ${formatPercents(0.1)} 더 획득한다.`; },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(168).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Ra.totalPetLevel).div(50), 0, 1)
  },
  {
    id: 171,
    name: "신께서 기뻐하신다",
    description: "희생할 수 있는 모든 글리프 종류를 한 번 이상 희생한다.",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s.gt(0)),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() { return `글리프 희생이 ${formatX(2)} 강해진다.`; },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(171).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Object.values(player.reality.glyphs.sac).filter(s => s.gt(0)).length).div(7), 0, 1)
  },
  {
    id: 172,
    name: "은하수를 여행하는 현실을 위한 안내서",
    get description() {
      return `충전된 무한 업그레이드나 장착한 글리프 없이, 삼중 연구도 구매하지 않은 채
      리얼리티 머신 ${format(DC.NUMMAX, 1)}개를 획득하고 현실에 도달한다.`;
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(DC.NUMMAX) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    progress: () => Achievement(172).isUnlocked ? DC.D1 : ((player.celestials.ra.charged.size !== 0 || Glyphs.activeWithoutCompanion.length !== 0 || !player.requirementChecks.reality.noTriads) ? DC.DM1 : Decimal.clamp(Currency.realityMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 173,
    name: "Oㅣ 도JㅓN과제는 존재하ㅈ1 않습LIㄷㅏ III",
    get description() { return `리얼리티 머신 ${formatPostBreak(DC.D9_99999E999, 5, 0)}개에 도달한다.`; },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(173).isUnlocked ? DC.D1 : Decimal.clamp(Currency.realityMachines.value.add(1).log10().div(1000), 0, 1)
  },
  {
    id: 174,
    name: "이거 이미 두 개 있지 않아?",
    description: "특이점을 획득한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    progress: () => Achievement(174).isUnlocked ? DC.D1 : Decimal.clamp(Currency.darkEnergy.value.div(200), 0, 1)
  },
  {
    id: 175,
    name: "최초의 반역사가",
    get description() { return `모든 연금술 자원을 ${formatInt(25000)}개씩 획득한다.`; },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= 25000),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() {
      return `시너지 효과가 ${formatPercents(1)}를 넘을 수 있고 모멘텀이 ${formatX(10)} 빠르게 증가한다.`;
    },
    effect: () => player.disablePostReality ? 1 : 10,
    progress: () => Achievement(175).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(AlchemyResources.all.filter(x => x.amount >= 25000).length).div(21), 0, 1)
  },
  {
    id: 176,
    name: "엄마가 3까지 셌다",
    description: "암흑 물질 차원을 소멸시킨다.",
    progress: () => Achievement(176).isUnlocked ? DC.D1 : Decimal.clamp((ImaginaryUpgrade(19).isBought ? new Decimal(2/3) : (player.requirementChecks.reality.maxStudies > 8 ? DC.D0 : Tickspeed.continuumValue.div(11.55e6).min(1/3)).add(Currency.imaginaryMachines.value.div(8.4e10).min(1/3))).add(Currency.darkMatter.value.add(1).log10().div(180).min(1/3)), 0, 1)
  },
  {
    id: 177,
    name: "이 마일에는 셀레스티얼 하나가 걸렸다",
    description: "첫 여섯 줄의 모든 특이점 마일스톤을 한 번 이상 완료한다.",
    checkRequirement: () => SingularityMilestone.tesseractMultFromSingularities.completions.gt(0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
    progress: () => Achievement(177).isUnlocked ? DC.D1 : Decimal.clamp(Currency.singularities.value.add(1).log10().div(Decimal.log10(4e44)), 0, 1)
  },
  {
    id: 178,
    name: "세계의 파괴자",
    get description() { return `반물질 은하 ${formatInt(100000)}개를 획득한다.`; },
    checkRequirement: () => player.galaxies.gte(100000),
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `모든 은하가 ${formatPercents(0.01)} 강해진다.`; },
    effect: () => player.disablePostReality ? 1 : 1.01,
    progress: () => Achievement(178).isUnlocked ? DC.D1 : Decimal.clamp(player.galaxies.div(100000), 0, 1)
  },
  {
    id: 181,
    displayId: 666,
    name: "영원한 반물질 차원",
    description: "현실을 파멸시킨다.",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    progress: () => Achievement(181).isUnlocked ? DC.D1 : Decimal.clamp((ImaginaryUpgrade(25).isBought ? new Decimal(0.5) : Currency.imaginaryMachines.value.div(6.4e15).min(0.25).add((!Laitela.isRunning || Laitela.maxAllowedDimension !== 0 || Glyphs.activeWithoutCompanion.length > 1) ? DC.D0 : Currency.eternityPoints.value.add(1).log10().div(16000).min(0.25))).add(new Decimal(Achievements.prePelleRows.countWhere(r => r.every(a => a.isUnlocked))).div(68).min(0.25)).add(new Decimal(AlchemyResources.all.filter(x => x.amount >= 25000).length).div(84).min(0.25)), 0, 1)
  },
  {
    id: 182,
    name: "한 번 더",
    description: "모든 반물질 차원 자동구매기를 영구적으로 되찾는다.",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(182).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp((PelleUpgrade.antimatterDimAutobuyers1.canBeApplied ? new Decimal(0.5) : DC.D0).add(PelleUpgrade.antimatterDimAutobuyers2.canBeApplied ? new Decimal(0.5) : DC.D0), 0, 1))
  },
  {
    id: 183,
    name: "데자 붐",
    description: "파멸 중 무한 도전 5를 완료한다.",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    // Weirdly specific reward? Yes, its V's ST bonus because we forgot to disable it
    // when balancing Pelle and only realised too late.
    get reward() { return `모든 반물질 차원의 배율을 ${formatPow(1.1012920825630384, 0, 3)}로 제곱한다.`; },
    effect: () => player.disablePostReality ? 1 : 1.1012920825630384,
    progress: () => Achievement(183).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(36000).min(0.5).add(!InfinityChallenge(5).isRunning ? DC.D0 : player.antimatter.max(1).log10().div(33000).min(0.5)), 0, 1))
  },
  {
    id: 184,
    name: "넌 아웃이야!",
    description: "세 번째 Pelle 스트라이크를 마주한다.",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    progress: () => Achievement(184).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 185,
    name: "87년 전",
    description: "네 번째 Pelle 스트라이크를 마주한다.",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    progress: () => Achievement(185).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.timestudy.maxTheorem.div(115), 0, 1))
  },
  {
    id: 186,
    displayId: 181,
    name: "건강하지 못한 집착",
    description: `파멸 중 시간 연구 181을 구매한다.`,
    progress: () => Achievement(186).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp((TimeStudy(171).isBought ? new Decimal(0.5) : player.timestudy.maxTheorem.div(186).min(0.5)).add(!TimeStudy(171).isBought ? DC.D0 : player.timestudy.theorem.div(400).min(0.5)), 0, 1))
  },
  {
    id: 187,
    name: "팽창된 시간 편",
    description: "파멸 중 시간 팽창을 해금한다.",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    // We forgot to disable a singularity milestone while balancing Pelle; now it's disabled
    // and this upgrade has the same effect as it used to.
    get reward() {
      return `반복 구매 가능한 팽창된 시간 배율 업그레이드의
      구매당 배율을 ${formatX(1.35, 0, 2)} 증가시킨다.`;
    },
    effect: () => player.disablePostReality ? 1 : 1.35,
    progress: () => Achievement(187).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(new Decimal(EternityChallenge(11).completions).div(20).min(0.25).add(new Decimal(EternityChallenge(12).completions).div(20).min(0.25)).add(player.timestudy.maxTheorem.div(51600).min(0.25)).add(player.timestudy.theorem.div(20000).min(0.25)), 0, 1))
  },
  {
    id: 188,
    name: "끝...",
    description: "파멸한 현실에서 탈출한다.",
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(9e15) && Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(188).isUnlocked ? DC.D1 : (!Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.antimatter.add(1).log10().div(9e15), 0, 1))
  },
  {
    id: 191,
    name: "...일단은",
    description: "2회차에서 제1 차원을 구매한다.",
    checkRequirement: () => PlayerProgress.endgameUnlocked() && AntimatterDimension(1).amount.gte(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(191).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add(player.antimatter.max(1).log10().div(2).min(0.5)), 0, 1)
  },
  {
    id: 192,
    name: "운명",
    description: "2회차에서 현실을 파멸시킨다.",
    checkRequirement: () => PlayerProgress.endgameUnlocked() && Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    progress: () => Achievement(192).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add((ImaginaryUpgrade(25).isBought ? new Decimal(0.5) : Currency.imaginaryMachines.value.div(6.4e15).min(0.25).add((!Laitela.isRunning || Laitela.maxAllowedDimension !== 0 || Glyphs.activeWithoutCompanion.length > 1) ? DC.D0 : Currency.eternityPoints.value.add(1).log10().div(16000).min(0.25))).add(new Decimal(Achievements.prePelleRows.countWhere(r => r.every(a => a.isUnlocked))).div(68).min(0.25)).add(new Decimal(AlchemyResources.all.filter(x => x.amount >= 25000).length).div(84).min(0.25)).div(2)), 0, 1)
  },
  {
    id: 193,
    name: "멈출 수 없어",
    description: "2회차에서 파멸을 완료한다.",
    checkRequirement: () => PlayerProgress.endgameUnlocked() && Currency.antimatter.value.add(1).log10().gte(9e15) && Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `은하가 ${formatPercents(0.1)} 강해진다.`;
    },
    effect: () => player.disablePostReality ? 1 : 1.1,
    progress: () => Achievement(193).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add(!Pelle.isDoomed ? DC.D0 : player.antimatter.max(1).log10().div(18e15).min(0.5)), 0, 1)
  },
  {
    id: 194,
    name: "시간은. 상대적이다.",
    description: "영원을 돌파한다.",
    checkRequirement: () => player.break2,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(194).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(2).min(0.5).add(player.antimatter.max(1).log10().div(18e15).min(0.5)), 0, 1)
  },
  {
    id: 195,
    name: "시스템 오류",
    description: "한 시간 이내에 엔드게임에 도달한다.",
    checkRequirement: () => player.records.bestEndgame.realTime < 3600000,
    checkEvent: GAME_EVENT.ENDGAME_RESET_AFTER,
    progress: () => Achievement(195).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(3600000).div(player.records.bestEndgame.realTime), 0, 1)
  },
  {
    id: 196,
    name: "마침내",
    description: "Pelle에서 모든 도전과제를 되찾는다.",
    checkRequirement: () => PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length >= 33,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `Effarig 글리프와 현실 글리프를 각각 최대 ${formatInt(2)}개 장착할 수 있다.`;
    },
    progress: () => Achievement(196).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length).div(33), 0, 1)
  },
  {
    id: 197,
    name: "잠깐. 그건 불법이야.",
    get description() { return `레벨 ${formatInt(25001)} 이상의 현실 글리프를 보유한다.` },
    checkRequirement: () => Glyphs.inventoryList.filter(g => g.type === 'reality' && g.level.gte(25001)).length > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(197).isUnlocked ? DC.D1 : Decimal.clamp(player.records.totalAntimatter.add(1).log10().add(1).log10().div(100).min(0.5).add(new Decimal(player.records.bestReality.glyphLevel).div(150006).min(0.5)), 0, 1)
  },
  {
    id: 198,
    name: "...영겁 위에 영겁을 쌓고 또 쌓아...",
    get description() { return `셀레스티얼 물질을 끈 채 게임 속도 ${format(DC.NUMMAX, 1)}에 도달한다.` },
    checkRequirement: () => getGameSpeedupForDisplay().gte(DC.NUMMAX) && player.endgame.celestialMatterMultiplier.isActive === false,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(198).isUnlocked ? DC.D1 : (player.endgame.celestialMatterMultiplier.isActive ? DC.DM1 : Decimal.clamp(getGameSpeedupForDisplay().max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 201,
    name: "더 새로운 시작",
    description: "은하력 생산을 시작한다.",
    checkRequirement: () => GalacticPower.isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(201).isUnlocked ? DC.D1 : Decimal.clamp(Currency.singularities.value.add(1).log10().div(300), 0, 1)
  },
  {
    id: 202,
    name: "게임을 다시 설치하고 서버에 재접속했다... 또",
    description: "모든 엔드게임 마스터리를 동시에 보유한다.",
    checkRequirement: () => player.endgameMasteries.masteries.length >= 39,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(202).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgameMasteries.masteries.length).div(39), 0, 1)
  },
  {
    id: 203,
    name: "팽창한 감자보다 빠르게",
    get description() { return `초당 ${formatPostBreak("ee29")}틱을 넘긴다.`; },
    checkRequirement: () => Tickspeed.current.log10().lte(-1e29),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(203).isUnlocked ? DC.D1 : Decimal.clamp(Tickspeed.current.log10().sub(3).neg().div(1e29), 0, 1)
  },
  {
    id: 204,
    name: "하드 리셋",
    description: "모든 Pelle 약화를 비활성화한다.",
    checkRequirement: () => PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length >= 33 &&
      PelleDestructionUpgrade.all.filter(u => u.canBeApplied).length >= 50 &&
      PelleRealityUpgrade.all.filter(u => u.canBeApplied).length >= 20 &&
      PelleImaginaryUpgrade.all.filter(u => u.canBeApplied).length >= 19 &&
      PelleCelestialUpgrade.all.filter(u => u.canBeApplied).length >= 21 &&
      PellePerkUpgrade.all.filter(u => u.canBeApplied).length >= 29 &&
      PelleAlchemyUpgrade.all.filter(u => u.canBeApplied).length >= 21,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `스트라이크 비활성화를 해금한다.`;
    },
    progress: () => Achievement(204).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleAchievementUpgrade.all.filter(u => u.canBeApplied).length).div(231).min(1/7).add(new Decimal(PelleDestructionUpgrade.all.filter(u => u.canBeApplied).length).div(350).min(1/7)).add(new Decimal(PelleRealityUpgrade.all.filter(u => u.canBeApplied).length).div(140).min(1/7)).add(new Decimal(PelleImaginaryUpgrade.all.filter(u => u.canBeApplied).length).div(133).min(1/7)).add(new Decimal(PelleCelestialUpgrade.all.filter(u => u.canBeApplied).length).div(147).min(1/7)).add(new Decimal(PellePerkUpgrade.all.filter(u => u.canBeApplied).length).div(203).min(1/7)).add(new Decimal(PelleAlchemyUpgrade.all.filter(u => u.canBeApplied).length).div(147).min(1/7)), 0, 1)
  },
  {
    id: 205,
    name: "별을 바라봐",
    description: "에테리얼에 진입한다.",
    checkRequirement: () => Ethereal.isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(205).isUnlocked ? DC.D1 : Decimal.clamp(Currency.galacticPower.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 206,
    name: "어둠을 완전히 지배하다",
    description: "제8 암흑 물질 차원을 구매한다.",
    checkRequirement: () => ImaginaryUpgrade(29).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `은하 생성기 불안정성을 ${formatInt(2)}만큼 감소시킨다.`;
    },
    effect: () => player.disablePostReality ? 0 : 2,
    progress: () => Achievement(206).isUnlocked ? DC.D1 : Decimal.clamp((GalacticPowers.galacticAscension.isUnlocked ? Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(player.dilation.totalTachyonGalaxies.max(1)).times(GalacticPower.freeGalaxies.max(1)) : Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies).add(GalacticPower.freeGalaxies)).add(1).log10().div(150).min(0.5).add(Currency.imaginaryMachines.value.add(1).log10().div(400).min(0.5)), 0, 1)
  },
  {
    id: 207,
    name: "사라졌다...",
    description: "Pelle를 파괴한다.",
    checkRequirement: () => PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length >= 5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `셀레스티얼 포인트 획득량을 증가시킨다.`;
    },
    progress: () => Achievement(207).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length).div(5), 0, 1)
  },
  {
    id: 208,
    name: "...하지만 잊히지 않았다",
    get description() { return `허수 머신 ${format(DC.NUMMAX, 1, 0)}개에 도달한다.` },
    checkRequirement: () => Currency.imaginaryMachines.value.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `약화되지 않은 셀레스티얼 물질에 따라 셀레스티얼 물질 변환 지수에 작은 배율이 적용된다.`;
    },
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.log10(Currency.unnerfedCelestialMatter.value.add(1).log10().add(1)).add(1), 0.1).toNumber(),
    formatEffect: value => `${formatX(value, 2, 3)}`,
    progress: () => Achievement(208).isUnlocked ? DC.D1 : Decimal.clamp(Currency.imaginaryMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 211,
    name: "실수?",
    get description() { return `Alpha의 현실에 진입한다.` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(211).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(PelleStrikeUpgrade.all.filter(u => u.canBeApplied).length).div(10).min(0.5).add(Currency.imaginaryMachines.value.add(1).log10().div(Decimal.log10(DC.NUMMAX).times(2)).min(0.5)), 0, 1)
  },
  {
    id: 212,
    name: "어둠의 크런치",
    get description() { return `Alpha의 현실에서 무한에 도달한다.` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `Alpha 붕괴가 ${formatX(1.1, 1, 1)} 빠르게 증가한다`;
    },
    effect: 1.1,
    progress: () => Achievement(212).isUnlocked ? DC.D1 : (!Alpha.isRunning ? DC.DM1 : Decimal.clamp(player.antimatter.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 213,
    name: "절대 멈추지 않아",
    get description() { return `Alpha의 현실에서 영원에 도달한다.` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() {
      return `이중성 머신에 따라 Alpha 붕괴 속도가 증가한다.`;
    },
    effect: () => Decimal.max(Decimal.ln(Decimal.ln(Currency.dualMachines.value.add(1)).add(1)), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`,
    progress: () => Achievement(213).isUnlocked ? DC.D1 : (!Alpha.isRunning ? DC.DM1 : Decimal.clamp(Currency.infinityPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1))
  },
  {
    id: 214,
    name: "절대로 충분하지 않을 거야.",
    get description() { return `복제자 ${formatPostBreak("e1e10")}개에 도달한다.` },
    checkRequirement: () => player.replicanti.amount.gte("e1e10"),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(214).isUnlocked ? DC.D1 : Decimal.clamp(Replicanti.amount.add(1).log10().div(1e10), 0, 1)
  },
  {
    id: 215,
    name: "정의역 오류",
    get description() { return `셀레스티얼 포인트 ${format(DC.NUMMAX, 1, 0)}개에 도달한다.` },
    checkRequirement: () => Currency.celestialPoints.value.gte(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(215).isUnlocked ? DC.D1 : Decimal.clamp(Currency.celestialPoints.value.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 216,
    name: "Oㅣ 도JㅓN과제는 존재하ㅈ1 않습LIㄷㅏ IV",
    get description() { return `허수 머신 ${formatPostBreak(DC.D9_99999E999, 5, 0)}개에 도달한다.` },
    checkRequirement: () => player.reality.imaginaryMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `허수 머신에 따라 에테리얼 파워에 작은 배율이 적용된다.`;
    },
    effect: () => player.disablePostReality ? DC.D1 : Decimal.pow(Decimal.log10(player.reality.imaginaryMachines.add(1)).div(1000), 5).times(1000),
    formatEffect: value => `${formatX(value, 3)}`,
    progress: () => Achievement(216).isUnlocked ? DC.D1 : Decimal.clamp(Currency.imaginaryMachines.value.add(1).log10().div(1000), 0, 1)
  },
  {
    id: 217,
    name: "왜 우리는 아직도 여기에...",
    get description() { return `엔드게임 ${format(1e12, 2, 2)}회에 도달한다.` },
    checkRequirement: () => player.endgames >= 1e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `엔드게임을 리얼리티 머신 ${format(1e24, 2, 2)}개가 채워진 상태로 시작한다.`;
    },
    effect: () => player.disablePostReality ? DC.D0 : Decimal.pow10(24),
    progress: () => Achievement(217).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.endgames).div(1e12), 0, 1)
  },
  {
    id: 218,
    name: "...그저 고통받기 위해?",
    get description() { return `The Nameless Ones의 현실에서 반물질 ${formatPostBreak("ee50")}개에 도달한다.` },
    checkRequirement: () => Currency.antimatter.value.gte("ee50") && Enslaved.isRunning,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `엔드게임에서도 V 진행도를 유지한다.`;
    },
    progress: () => Achievement(218).isUnlocked ? DC.D1 : (!Enslaved.isRunning ? DC.DM1 : Decimal.clamp(player.antimatter.add(1).log10().add(1).log10().div(50), 0, 1))
  },
  {
    id: 221,
    name: "빛",
    get description() { return `Alpha를 물리친다.` },
    checkRequirement: () => Alpha.isRunning,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `셀레스티얼 차원 확장을 해금한다.`;
    },
    progress: () => Achievement(221).isUnlocked ? DC.D1 : (!Alpha.isRunning ? DC.DM1 : Decimal.clamp(Currency.eternityPoints.value.add(1).log10().div(4000), 0, 1))
  },
  {
    id: 222,
    name: "시간은 절대적이다",
    get description () { return `타키온 입자와 팽창된 시간을 모두 ${format("1e5000", 2)} 넘게 보유하고, 타키온 입자를 더 많이 보유한다.` },
    checkRequirement: () => Currency.tachyonParticles.value.gt(Currency.dilatedTime.value) && Currency.dilatedTime.value.gt("1e5000"),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `모멘텀이 ${formatX(10)} 빠르게 증가한다.`;
    },
    effect: () => player.disablePostReality ? 1 : 10,
    progress: () => Achievement(222).isUnlocked ? DC.D1 : Decimal.clamp(Currency.dilatedTime.value.add(1).log10().div(10000).min(0.5).add(Currency.dilatedTime.value.lte("1e5000") ? DC.D0 : Currency.tachyonParticles.value.add(1).log10().div(Currency.dilatedTime.value.add(1).log10().times(2)).min(0.5)), 0, 1)
  },
  {
    id: 223,
    name: "힘! 무한한 힘!",
    get description() { return `무한 차원 구매 상한을 ${format(DC.NUMMAX, 1, 0)} 넘게 만든다.` },
    checkRequirement: () => InfinityDimensions.totalDimCap.gt(DC.NUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `충전 업그레이드를 비활성화하는 도전을 종료할 때 해당 세트의 모든 업그레이드를 충전할 수 있다면 자동으로 다시 충전한다.`;
    },
    progress: () => Achievement(223).isUnlocked ? DC.D1 : Decimal.clamp(InfinityDimensions.totalDimCap.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 224,
    name: "우주의 파괴자",
    get description() { return `Pelle 밖에서 반물질 ${formatPostBreak(Decimal.pow10(1e100), 2)}개에 도달한다.` },
    checkRequirement: () => Currency.antimatter.value.gte(Decimal.pow10(1e100)) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `셀레스티얼 물질 변환 지수가 두 배가 된다.`;
    },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(224).isUnlocked ? DC.D1 : (Pelle.isDoomed ? DC.DM1 : Decimal.clamp(player.antimatter.add(1).log10().add(1).log10().div(100), 0, 1))
  },
  {
    id: 225,
    name: "299792458m/s",
    description: "셀레스티얼 물질의 상한을 제거한다.",
    checkRequirement: () => player.endgame.celDimExpansion.isBroken,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `셀레스티얼 물질 소프트캡의 규모를 ${formatPercents(0.05)} 감소시킨다.`;
    },
    effect: () => player.disablePostReality ? 1 : 0.95,
    progress: () => Achievement(225).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.celDimExpansion.celestialInfinityPoints.div(10000), 0, 1)
  },
  {
    id: 226,
    name: "삼만 도",
    description: "별을 해금한다.",
    checkRequirement: () => player.endgame.ethereal.isExtended,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(226).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.ethereal.power.add(1).log10().div(25), 0, 1)
  },
  {
    id: 227,
    name: "이건 어떻게 작동하는 거야???",
    description: "펜터랙트를 획득한다.",
    checkRequirement: () => player.endgame.hypercubes.penteracts >= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `Effarig의 두 번째 상점을 해금한다.`;
    },
    progress: () => Achievement(227).isUnlocked ? DC.D1 : Decimal.clamp((DualityUpgrade(25).isBought ? new Decimal(0.75) : new Decimal(player.celestials.laitela.hadrons.dark).div(128).min(0.25).add(Hadrons.timeFactor.div(2000).min(0.25)).add(Currency.dualMachines.value.add(1).log10().div(80).min(0.25))).add(Currency.eternityPoints.value.add(1).log10().add(1).log10().div(420).min(0.25)), 0, 1)
  },
  {
    id: 228,
    name: "우리가 얼마나 멀리 왔는지 봐",
    get description() { return `반물질 ${formatPostBreak(DC.ENUMMAX, 2)}개에 도달한다.` },
    checkRequirement: () => player.antimatter.gte(DC.ENUMMAX),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `신성을 해금한다.`;
    },
    progress: () => Achievement(228).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.add(1).log10().add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 231,
    name: "그랜드마스터리",
    get description() { return `엔드게임 스킬을 ${formatInt(1000)}개 구매한다.` },
    checkRequirement: () => EndgameSkills.totalPurchased() >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `구매한 엔드게임 스킬에 따라 반물질 차원 배율을 팽창시키며, Pelle에서는 더 강해진다.`;
    },
    effect: () => player.disablePostReality ? 1 : 1 + ((Math.min(EndgameSkills.totalPurchased(), 2000) + (Math.max(Math.log2(EndgameSkills.totalPurchased() / 2000), 0) * 1000)) / (Pelle.isDoomed ? 20000 : 100000)),
    formatEffect: value => `${formatPow(value, 2, 3)}`,
    progress: () => Achievement(231).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EndgameSkills.totalPurchased()).div(1000), 0, 1)
  },
  {
    id: 232,
    name: "평화의 천년",
    get description() { return `무료 테서랙트 ${formatInt(1000)}개를 획득한다.` },
    checkRequirement: () => new Decimal(Tesseracts.extra * Tesseracts.totalMult).gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `펜터랙트에 따라 영원 포인트에 작은 지수가 적용된다.`;
    },
    effect: () => player.disablePostReality ? 1 : Decimal.log10(Penteracts.effectiveCount + 1).div(10).add(1).toNumber(),
    formatEffect: value => `${formatPow(value, 2, 3)}`,
    progress: () => Achievement(232).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Tesseracts.extra * Tesseracts.totalMult).div(1000), 0, 1)
  },
  {
    id: 233,
    name: "한 시대의 끝",
    description: "모든 영원 돌파 업그레이드를 구매한다.",
    checkRequirement: () => BreakEternityUpgrade.all.filter(u => u.isCapped).length === 10 &&
      BreakEternityUpgrade.all.filter(u => u.isBought).length === 5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `Pelle 안에서만 반물질 지수를 ${format(1.4, 2, 1)}로 제곱한다.`;
    },
    effect: () => player.disablePostReality || !Pelle.isDoomed ? 1 : 1.4,
    progress: () => Achievement(233).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(BreakEternityUpgrade.all.filter(u => u.isCapped).length + BreakEternityUpgrade.all.filter(u => u.isBought).length).div(15), 0, 1)
  },
  {
    id: 234,
    name: "셀레스티얼 시간 편",
    description: "셀레스티얼 영원을 실행한다.",
    checkRequirement: () => player.endgame.celDimExpansion.celestialEternities.gt(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(234).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.celDimExpansion.celestialInfinityPoints.add(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 235,
    name: "끝나지 않는 어둠",
    get description() { return `Lai'tela의 현실을 ${formatInt(50)}번 강입자화한다.` },
    checkRequirement: () => Laitela.hadronizes >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `강입자 효과가 상한에 도달하는 시간이 절반으로 줄어든다.`;
    },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(235).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Laitela.hadronizes).div(50), 0, 1)
  },
  {
    id: 236,
    name: "초신성",
    get description() { return `Ra의 셀레스티얼 기억 레벨 합계 ${formatInt(500)}을 달성한다.` },
    checkRequirement: () => Ra.totalPetLevel >= 500,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `기억을 ${formatX(500)} 더 획득한다.`; },
    effect: () => player.disablePostReality ? 1 : 500,
    progress: () => Achievement(236).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Ra.totalPetLevel).div(500), 0, 1)
  },
  {
    id: 237,
    name: "평형",
    description: "첫 두 개의 재기 업그레이드를 구매한다.",
    checkRequirement: () => ResurgenceUpgrade.ipSurge.isBought && ResurgenceUpgrade.epSurge.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(237).isUnlocked ? DC.D1 : Decimal.clamp(Currency.divineEnergy.value.div(1e6), 0, 1)
  },
  {
    id: 238,
    name: "창조의 시대",
    description: "강입자 연속체를 해금한다.",
    checkRequirement: () => DivinityMilestone.hadronEmpowerment.isReached,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(238).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(player.celestials.pelle.divinities).div(3), 0, 1)
  },
  {
    id: 241,
    name: "CERN",
    description: "대형 강입자 충돌기를 해금한다.",
    checkRequirement: () => ExpansionPack.alphaPack.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(241).isUnlocked ? DC.D1 : Decimal.clamp(player.antimatter.max(10).log10().log10().div(200), 0, 1)
  },
  {
    id: 242,
    name: "무한 마하 III",
    description: "신성 별을 응축한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CONDENSE_RESET_BEFORE,
    progress: () => Achievement(242).isUnlocked ? DC.D1 : Decimal.clamp(Currency.divineMatter.value.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 243,
    name: "여정의 끝",
    description: "셀레스티얼 영원 플러스를 해금한다.",
    checkRequirement: () => Currency.celestialEternityPoints.gte(DC.E1000),
    checkEvent: GAME_EVENT.CELESTIAL_ETERNITY_RESET_BEFORE,
    progress: () => Achievement(243).isUnlocked ? DC.D1 : Decimal.clamp(Currency.celestialEternityPoints.value.max(1).log10().div(1000), 0, 1)
  },
  {
    id: 244,
    name: "극초신성",
    description: "모든 별 종류를 해금한다.",
    checkRequirement: () => EtherealStars.gray.isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(244).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(EtherealStars.all.filter(s => s.isUnlocked).length).div(9), 0, 1)
  },
  {
    id: 245,
    name: "알레프 널",
    description: "공허를 무효화한다.",
    checkRequirement: () => player.endgame.largeHadronCollider.void.nullified,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(245).isUnlocked ? DC.D1 : Decimal.clamp(Currency.nullMatter.value.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 246,
    name: "과잉기억증",
    get description() { return `Ra의 셀레스티얼 기억 레벨 합계 ${formatInt(1000)}을 달성한다.` },
    checkRequirement: () => Ra.totalPetLevel >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `엔드게임에서도 글리프 희생을 유지한다.`;
    },
    progress: () => Achievement(246).isUnlocked ? DC.D1 : Decimal.clamp(new Decimal(Ra.totalPetLevel).div(1000), 0, 1)
  },
  {
    id: 247,
    name: "핵붕괴",
    description: "초신성을 일으킨다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SUPERNOVA_RESET_BEFORE,
    get reward() {
      return `하드론과 Alpha 붕괴의 잔재가 상한에 도달하는 시간을 ${formatPercents(0.5)}만큼 줄인다.`;
    },
    effect: () => player.disablePostReality ? 1 : 2,
    progress: () => Achievement(247).isUnlocked ? DC.D1 : Decimal.clamp(Currency.divineStars.value.max(1).log10().div(Decimal.log10(DC.NUMMAX)), 0, 1)
  },
  {
    id: 248,
    name: "현실의 한계",
    get description() { return `셀레스티얼 영원 포인트 ${formatPostBreak(DC.E4000, 2)}개에 도달한다.` },
    checkRequirement: () => player.endgame.celDimExpansion.celestialEternityPoints.gte(DC.E4000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    progress: () => Achievement(248).isUnlocked ? DC.D1 : Decimal.clamp(player.endgame.celDimExpansion.celestialEternityPoints.add(1).log10().div(4000), 0, 1)
  },
];
