const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.endgame.rebuyables[props.id],
    1e100,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  const { effect } = props;
  if (props.overflowing) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, player.endgame.rebuyables[props.id]).min(DC.NUMMAX).times(Decimal.pow(effect, player.endgame.rebuyables[props.id]).div(DC.NUMMAX).max(2).log2());
  else if (props.isDecimal) props.effect = () => player.disablePostReality ? DC.D1 : Decimal.pow(effect, player.endgame.rebuyables[props.id]);
  else props.effect = () => player.disablePostReality ? 1 : Math.pow(effect, player.endgame.rebuyables[props.id]);
  props.description = () => props.textTemplate.replace("{value}", format(effect, 2, 2));
  props.formatEffect = value => (props.id === 2 || props.id === 3) ? formatX(value, 2, 4) : formatX(value, 2, 2);
  props.formatCost = value => format(value, 2, 0);
  return props;
};


export const endgameUpgrades = [
  rebuyable({
    name: "반물질 개선자",
    id: 1,
    initialCost: 1e40,
    costMult: 60,
    textTemplate: "무한 업그레이드 23의 소프트캡 시작점을 {value}배 늦춥니다",
    effect: 1.2,
    overflowing: true
  }),
  rebuyable({
    name: "무한 개선자",
    id: 2,
    initialCost: 1e42,
    costMult: 300,
    textTemplate: "무한 차원 압축 소프트캡을 {value}배로 감소시킵니다",
    effect: 0.99
  }),
  rebuyable({
    name: "시간 개선자",
    id: 3,
    initialCost: 1e44,
    costMult: 150,
    textTemplate: "시간 차원 압축 소프트캡을 {value}배로 감소시킵니다",
    effect: 0.99
  }),
  rebuyable({
    name: "암흑 개선자",
    id: 4,
    initialCost: 1e48,
    costMult: 480,
    textTemplate: "암흑 물질 하드캡을 {value}배 증가시킵니다",
    effect: 1e25,
    isDecimal: true
  }),
  rebuyable({
    name: "셀레스티얼 개선자",
    id: 5,
    initialCost: 1e56,
    costMult: 120,
    textTemplate: "셀레스티얼 물질 소프트캡 시작점을 {value}배 늦춥니다",
    effect: 2,
    isDecimal: true
  }),
  {
    name: "풍요로운 재탄생",
    id: 6,
    cost: new Decimal(1e45),
    requirement: () => `여섯 번째 은하 생성기 업그레이드를 구매하지 않고 현실 파편을 ${format(DC.E280)}개 보유하세요`,
    hasFailed: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount > 0,
    checkRequirement: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount === 0 && Currency.realityShards.gte(DC.E280) && 
      player.endgames >= 10,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "여섯 번째 은하 생성기 업그레이드 구매",
    description: () =>
      `퍼크 포인트 ${format(1e7)}개, 현실 ${formatInt(1000)}회, 유물 파편 ${format(1e12)}개를 보유하고
      The Nameless Ones의 업그레이드 두 개가 모두 해금된 상태로 시작합니다`
  },
  {
    name: "파국적 시간 측정",
    id: 7,
    cost: new Decimal(1e52),
    requirement: () => `${formatPostBreak("1e666")}년 동안 플레이하세요`,
    checkRequirement: () => Time.totalTimePlayed.totalYears.gt(Decimal.pow(10, 666)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "셀레스티얼 물질을 활성화했다면 셀레스티얼 현실 밖에서 게임 속도가 이번 엔드게임의 최대 게임 속도와 같아집니다"
  },
  {
    name: "엔드게임 보상",
    id: 8,
    cost: new Decimal(1e60),
    requirement: () => `현실 시간 ${formatInt(10)}분 이내에 수동으로 엔드게임하세요`,
    hasFailed: () => Time.thisEndgameRealTime.totalMinutes.gte(10),
    checkRequirement: () => Time.bestEndgameRealTime.totalMinutes.lt(10),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `가장 빠른 엔드게임의 현실 시간보다 ${formatInt(10)}배 느린 속도로 엔드게임을 생성합니다`,
    effect: () => player.disablePostReality ? DC.NUMMAX : new Decimal(player.records.bestEndgame.realTime * 10),
    formatEffect: value => {
      if (new Decimal(value).gte(9999999999)) return "엔드게임 생성 없음";
      let endgames = 1;
      endgames *= ((ExpansionPack.enslavedPack.isBought && !player.disablePostReality)
        ? Math.floor(1 + Math.pow(Math.log10(Math.min(Tesseracts.effectiveCount, 1000) * Math.max(Math.log10(Tesseracts.effectiveCount) - 2, 1) + 1), Math.log10(player.endgames + 1)))
        : 1);
      endgames *= Math.pow(1.33, Alpha.currentStage);
      if (DivinityMilestone.firstDivine.isReached && !player.disablePostReality) endgames *= 10;
      endgames *= DivineDimensions.conversionFormula1.toNumber();
      const timeStr = Time.bestEndgameRealTime.totalMilliseconds.lte(100) && !Alpha.isDestroyed
        ? `${TimeSpan.fromMilliseconds(new Decimal(1000)).toStringShort()} (상한)`
        : (Time.bestEndgameRealTime.totalMilliseconds.lte(33)
           ? `${TimeSpan.fromMilliseconds(new Decimal(330)).toStringShort()} (상한)`
           : `${TimeSpan.fromMilliseconds(new Decimal(value)).toStringShort()}`);
      return `${timeStr}마다 ${quantify("엔드게임", endgames)}`;
    }
  },
  {
    name: "상상의 계몽",
    id: 9,
    cost: new Decimal(1e70),
    requirement: "이상의 제작을 구매하지 않고 허수 업그레이드 네 번째 줄을 완료하세요",
    hasFailed: () => ImaginaryUpgrade(15).isBought,
    checkRequirement: () => !ImaginaryUpgrade(15).isBought && ImaginaryUpgrade(16).isBought && ImaginaryUpgrade(17).isBought &&
      ImaginaryUpgrade(18).isBought && ImaginaryUpgrade(19).isBought && ImaginaryUpgrade(20).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "이상의 제작 구매",
    description: "엔드게임 시 모든 허수 업그레이드를 유지합니다"
  },
  {
    name: "셀레스티얼 혼돈",
    id: 10,
    cost: new Decimal(1e83),
    requirement: () => "Teresa에게 아무것도 붓기 전에 Effarig, The Nameless Ones, V, Ra를 완료하세요",
    hasFailed: () => player.celestials.teresa.pouredAmount.gt(0),
    checkRequirement: () => player.celestials.teresa.pouredAmount.eq(0) &&
      EffarigUnlock.reality.isUnlocked && Enslaved.isCompleted && V.spaceTheorems >= 36 && Ra.totalPetLevel >= 100,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "Teresa에게 리얼리티 머신 붓기",
    description: () => "엔드게임 시 Teresa의 최고 반물질 기록을 유지합니다"
  },
  {
    name: "아홉 단계 무력화",
    id: 11,
    cost: new Decimal(1e50),
    requirement: () => `셀레스티얼 물질 ${format(1e50)}개에 도달하세요`,
    checkRequirement: () => Currency.celestialMatter.value.add(1).log10().gte(50),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () =>
      `무한 도전 8 보상의 하드캡을 ${formatPow(9)}만큼 늦추고,
      모든 셀레스티얼 차원에 ${formatX(9)}를 곱합니다`,
    effect: () => player.disablePostReality ? 1 : 9
  },
  {
    name: "불안정성 약화",
    id: 12,
    cost: new Decimal(1e68),
    requirement: "두 번째 은하 생성기 소프트캡에 도달하세요",
    checkRequirement: () => GalaxyGenerator.galaxies.gte(1e60),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `은하 생성기 불안정성 규모를 ${formatInt(1)}만큼 감소시킵니다`,
    effect: () => player.disablePostReality ? 0 : 1
  },
  {
    name: "장벽 돌파",
    id: 13,
    cost: new Decimal(1e78),
    requirement: () => `글리프 레벨 ${formatInt(76543)}에 도달하세요`,
    checkRequirement: () => player.records.bestEndgame.glyphLevel.gte(76543),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: "세 번째 글리프 레벨 불안정성을 약화합니다"
  },
  {
    name: "별의 보충",
    id: 14,
    cost: new Decimal(1e84),
    requirement: () => `여섯 번째 은하 생성기 업그레이드를 구매하지 않고 은하 ${format(1e40)}개에 도달하세요`,
    hasFailed: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount > 0,
    checkRequirement: () => GalaxyGeneratorUpgrades.RSMult.boughtAmount === 0 && GalaxyGenerator.galaxies.gte(1e40) && 
      player.endgames >= 10,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "여섯 번째 은하 생성기 업그레이드 구매",
    description: () => `두 번째 은하 생성기 불안정성 규모를 ${formatPercents(0.1)}만큼 약화합니다`,
    effect: () => player.disablePostReality ? 1 : 0.9
  },
  {
    name: "반물질 축적",
    id: 15,
    cost: new Decimal(1e150),
    requirement: () => `Pelle 밖에서 반물질 ${format(Decimal.pow(10, 1e33))}개에 도달하세요`,
    hasFailed: () => Pelle.isDoomed,
    checkRequirement: () => Currency.antimatter.value.add(1).log10().gte(1e33) && !Pelle.isDoomed,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `허수 머신에 따라 반물질 지수를 거듭제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1 + (Decimal.pow(Decimal.log10(Decimal.log10(
      player.reality.imaginaryMachines.add(1)).add(1)), 2).min(10).add(Decimal.log10(Decimal.log10(
      player.reality.imaginaryMachines.add(1)).add(1)).sub(Math.sqrt(10)).max(0)).div(200)).toNumber(),
    formatEffect: value => formatPow(value, 2, 4)
  },
  {
    name: "재화 수집",
    id: 16,
    cost: new Decimal(1e55),
    requirement: () => `은하력을 ${format(1e10)} 보유하세요`,
    checkRequirement: () => Currency.galacticPower.gte(1e10),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "엔드게임 마스터리에서 두 번째 재화 경로를 장착할 수 있습니다",
    effect: () => player.disablePostReality ? 1 : 2
  },
  {
    name: "압축 계산",
    id: 17,
    cost: new Decimal(1e65),
    requirement: () => `은하력을 ${format(1e20)} 보유하세요`,
    checkRequirement: () => Currency.galacticPower.gte(1e20),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "엔드게임 마스터리에서 두 번째 압축 경로를 장착할 수 있습니다",
    effect: () => player.disablePostReality ? 1 : 2
  },
  {
    name: "재화 증폭",
    id: 18,
    cost: new Decimal(1e75),
    requirement: () => `은하력을 ${format(1e30)} 보유하세요`,
    hasFailed: () => !EndgameUpgrade(16).isBought,
    checkRequirement: () => Currency.galacticPower.gte(1e30) && EndgameUpgrade(16).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "엔드게임 마스터리에서 세 번째 재화 경로를 장착할 수 있습니다",
    effect: () => player.disablePostReality ? 1 : 3
  },
  {
    name: "차원 팽창",
    id: 19,
    cost: new Decimal(1e85),
    requirement: () => `은하력을 ${format(1e40)} 보유하세요`,
    hasFailed: () => !EndgameUpgrade(17).isBought,
    checkRequirement: () => Currency.galacticPower.gte(1e40) && EndgameUpgrade(17).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "엔드게임 마스터리에서 세 번째 압축 경로를 장착할 수 있습니다",
    effect: () => player.disablePostReality ? 1 : 3
  },
  {
    name: "전능한 풍요",
    id: 20,
    cost: new Decimal(1e95),
    requirement: () => `은하력을 ${format(1e50)} 보유하세요`,
    hasFailed: () => !(EndgameUpgrade(18).isBought && EndgameUpgrade(19).isBought),
    checkRequirement: () => Currency.galacticPower.gte(1e50) && EndgameUpgrade(18).isBought && EndgameUpgrade(19).isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "엔드게임 마스터리에서 네 번째 압축 경로와 재화 경로를 장착할 수 있습니다",
    effect: () => player.disablePostReality ? 1 : 4
  },
  {
    name: "무한한 개선",
    id: 21,
    cost: Decimal.pow(10, 120),
    requirement: "증가한 무한을 구매하세요",
    hasFailed: () => !BreakEternityUpgrade.doubleIPUncap.isBought,
    checkRequirement: () => BreakEternityUpgrade.doubleIPUncap.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "무한 포인트 두 배 업그레이드의 소프트캡을 제거합니다"
  },
  {
    name: "타키온 초월",
    id: 22,
    cost: Decimal.pow(10, 170),
    requirement: "은하 성장을 구매하세요",
    hasFailed: () => !BreakEternityUpgrade.tgThresholdUncap.isBought,
    checkRequirement: () => BreakEternityUpgrade.tgThresholdUncap.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `엔드게임 횟수에 따라 타키온 은하 요구량을 거듭제곱합니다`,
    effect: () => player.disablePostReality ? 1 : 1 / Math.log10(player.endgames + 1),
    formatEffect: value => formatPow(value, 2, 3)
  },
  {
    name: "사차 정량화",
    id: 23,
    cost: Decimal.pow(10, 240),
    requirement: "테서랙트 횡단을 구매하세요",
    hasFailed: () => !BreakEternityUpgrade.tesseractMultiplier.isBought,
    checkRequirement: () => BreakEternityUpgrade.tesseractMultiplier.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "셀레스티얼 포인트가 무료 테서랙트 소프트캡을 늦춥니다",
    effect: () => player.disablePostReality ? 1 : Math.pow(1 + Decimal.log10(Decimal.max(Decimal.log10(player.endgame.celestialPoints.max(1)).div(200), 1)).toNumber(), 2),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "희생 과급기",
    id: 24,
    cost: Decimal.pow(10, 330),
    requirement: () => `희생 보충을 구매하세요`,
    hasFailed: () => !BreakEternityUpgrade.glyphSacrificeUncap.isBought,
    checkRequirement: () => BreakEternityUpgrade.glyphSacrificeUncap.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "셀레스티얼 물질에 따라 모든 글리프 희생 수치가 증가합니다",
    effect: () => player.disablePostReality ? 1 : Decimal.pow(Decimal.max(Decimal.log10(Decimal.log10(player.endgame.celestialMatter.add(1)).add(1)).div(2), 1), 1.5).toNumber(),
    formatEffect: value => formatPow(value, 2, 3)
  },
  {
    name: "패권의 쇄도",
    id: 25,
    cost: Decimal.pow(10, 440),
    requirement: () => `효력 증대를 구매하세요`,
    hasFailed: () => !BreakEternityUpgrade.glyphSlotImprovement.isBought,
    checkRequirement: () => BreakEternityUpgrade.glyphSlotImprovement.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "반물질에 따라 글리프 레벨에 불안정성 적용 후 계산되는 배율이 적용됩니다",
    effect: () => player.disablePostReality ? 1 : Decimal.min(Decimal.pow(Decimal.max(Decimal.log10(Decimal.log10(player.antimatter.add(1)).add(1)).div(100), 1), 0.05), 1.2).toNumber(),
    formatEffect: value => formatX(value, 2, 4)
  },
];
