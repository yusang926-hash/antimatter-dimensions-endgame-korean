//Time for spaghetti code
export function endgameMigration(player) {
  player.dimensionBoosts = new Decimal(player.dimensionBoosts);
  player.galaxies = new Decimal(player.galaxies);
  player.celestials.laitela.darkEnergy = new Decimal(player.celestials.laitela.darkEnergy);
  player.celestials.laitela.singularities = new Decimal(player.celestials.laitela.singularities);
  player.celestials.effarig.relicShards = new Decimal(player.celestials.effarig.relicShards);
  player.reality.glyphs.sac.power = new Decimal(player.reality.glyphs.sac.power);
  player.reality.glyphs.sac.infinity = new Decimal(player.reality.glyphs.sac.infinity);
  player.reality.glyphs.sac.time = new Decimal(player.reality.glyphs.sac.time);
  player.reality.glyphs.sac.replication = new Decimal(player.reality.glyphs.sac.replication);
  player.reality.glyphs.sac.dilation = new Decimal(player.reality.glyphs.sac.dilation);
  player.reality.glyphs.sac.effarig = new Decimal(player.reality.glyphs.sac.effarig);
  player.reality.glyphs.sac.reality = new Decimal(player.reality.glyphs.sac.reality);
  player.reality.imaginaryMachines = new Decimal(player.reality.imaginaryMachines);
  player.reality.iMCap = new Decimal(player.reality.iMCap);
  if (player.celestials.laitela.dimensions.length !== 8) {
    player.celestials.laitela.dimensions = Array.range(0, 8).map(() =>
      ({
        amount: new Decimal(0),
        intervalUpgrades: new Decimal(0),
        powerDMUpgrades: new Decimal(0),
        powerDEUpgrades: new Decimal(0),
        timeSinceLastUpdate: 0,
        ascensionCount: new Decimal(0)
      }));
    if (ImaginaryUpgrade(15).isBought) DarkMatterDimension(1).amount = new Decimal(1);
    if (ImaginaryUpgrade(16).isBought) DarkMatterDimension(2).amount = new Decimal(1);
    if (ImaginaryUpgrade(17).isBought) DarkMatterDimension(3).amount = new Decimal(1);
    if (ImaginaryUpgrade(18).isBought) DarkMatterDimension(4).amount = new Decimal(1);
    if (ImaginaryUpgrade(26).isBought) {
      ImaginaryUpgrade(26).isBought = false;
      Currency.imaginaryMachines.add(1e50);
    }
    if (ImaginaryUpgrade(27).isBought) {
      ImaginaryUpgrade(27).isBought = false;
      Currency.imaginaryMachines.add(1e100);
    }
    if (ImaginaryUpgrade(28).isBought) {
      ImaginaryUpgrade(28).isBought = false;
      Currency.imaginaryMachines.add(1e150);
    }
    if (ImaginaryUpgrade(29).isBought) {
      ImaginaryUpgrade(29).isBought = false;
      Currency.imaginaryMachines.add(1e200);
    }
  }
  player.records.bestEndgame.time = new Decimal(player.records.bestEndgame.time).eq(0)
        ? new Decimal(999999999999)
        : new Decimal(player.records.bestEndgame.time);
  player.records.bestEndgame.realTime = player.records.bestEndgame.realTime === 0
        ? 999999999999
        : player.records.bestEndgame.realTime;
  if (!GalacticPower.isUnlocked && player.endgame.galacticPower.gt(0)) player.endgame.galacticPower = new Decimal(0);
  if (player.celestials.teresa.perkShop.length !== 7) player.celestials.teresa.perkShop = Array.repeat(0, 7);
  if (player.endgame.celestialPoints.lt(0)) player.endgame.celestialPoints = new Decimal(0);
  if (player.endgame.doomedParticles.lt(0)) player.endgame.doomedParticles = new Decimal(0);
  if (!(player.celestials.v.runRecords[0] instanceof Decimal)) {
    player.celestials.v.runRecords = [DC.E1.neg(), DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0, DC.D0];
  }
  if (player.endgameMasteries.preferredPaths[1] === 0) player.endgameMasteries.preferredPaths = [[], []];
  if (Achievement(201).isUnlocked) {
    Achievement(201).lock();
    Achievement(211).unlock();
  }
  if (Achievement(202).isUnlocked) {
    Achievement(202).lock();
    Achievement(212).unlock();
  }
  if (Achievement(203).isUnlocked) {
    Achievement(203).lock();
    Achievement(213).unlock();
  }
  if (Achievement(204).isUnlocked) {
    Achievement(204).lock();
    Achievement(221).unlock();
  }
  if (Achievement(205).isUnlocked) {
    Achievement(205).lock();
    Achievement(215).unlock();
  }
  if (Achievement(206).isUnlocked) {
    Achievement(206).lock();
    Achievement(216).unlock();
  }
  if (Achievement(207).isUnlocked) {
    Achievement(207).lock();
    Achievement(224).unlock();
  }
  if (Achievement(208).isUnlocked) {
    Achievement(208).lock();
  }
  if (Achievement(195).isUnlocked) {
    Achievement(195).lock();
    Achievement(204).unlock();
  }
  if (Achievement(196).isUnlocked) {
    Achievement(196).lock();
    Achievement(206).unlock();
  }
  if (Achievement(197).isUnlocked) {
    Achievement(197).lock();
    Achievement(207).unlock();
  }
  if (Achievement(198).isUnlocked) {
    Achievement(198).lock();
    Achievement(208).unlock();
  }
  if (Achievement(194).isUnlocked) {
    Achievement(194).lock();
    Achievement(196).unlock();
  }
  player.records.bestCelestialInfinity.time = new Decimal(player.records.bestCelestialInfinity.time).eq(0)
        ? new Decimal(999999999999)
        : new Decimal(player.records.bestCelestialInfinity.time);
  player.records.bestCelestialInfinity.realTime = player.records.bestCelestialInfinity.realTime === 0
        ? 999999999999
        : player.records.bestCelestialInfinity.realTime;
  player.records.bestCelestialEternity.time = new Decimal(player.records.bestCelestialEternity.time).eq(0)
        ? new Decimal(999999999999)
        : new Decimal(player.records.bestCelestialEternity.time);
  player.records.bestCelestialEternity.realTime = player.records.bestCelestialEternity.realTime === 0
        ? 999999999999
        : player.records.bestCelestialEternity.realTime;
  player.auto.galaxyGenerator ??= { all: [], isActive: true };
  const galaxyGenerator = player.auto.galaxyGenerator;
  galaxyGenerator.all ??= [];
  while (galaxyGenerator.all.length < 10) {
    galaxyGenerator.all.push({ isActive: false, lastTick: 0 });
  }
  galaxyGenerator.isActive ??= true;
  let s1 = player.reality.glyphs.active;
  for (let g1 = 0; g1 < s1.length; g1++) {
    if (s1[g1].level) s1[g1].level = new Decimal(s1[g1].level);
  }
  player.reality.glyphs.active = s1;
  let s2 = player.reality.glyphs.inventory;
  for (let g2 = 0; g2 < s2.length; g2++) {
    if (s2[g2].level) s2[g2].level = new Decimal(s2[g2].level);
  }
  player.reality.glyphs.inventory = s2;
  let s3 = player.reality.glyphs.sets;
  for (let a3 = 0; a3 < s3.length; a3++) {
    if (s3[a3].glyphs) {
      for (let g3 = 0; g3 < s3[a3].glyphs.length; g3++) {
        if (s3[a3].glyphs[g3].level) s3[a3].glyphs[g3].level = new Decimal(s3[a3].glyphs[g3].level);
      }
    }
  }
  player.reality.glyphs.sets = s3;
  let s4 = player.celestials.teresa.bestAMSet;
  for (let g4 = 0; g4 < s4.length; g4++) {
    if (s4[g4].level) s4[g4].level = new Decimal(s4[g4].level);
  }
  player.celestials.teresa.bestAMSet = s4;
  let s5 = player.celestials.v.runGlyphs;
  for (let a5 = 0; a5 < s5.length; a5++) {
    if (s5[a5]) {
      for (let g5 = 0; g5 < s5[a5].length; g5++) {
        if (s5[a5][g5].level) s5[a5][g5].level = new Decimal(s5[a5][g5].level);
      }
    }
  }
  player.celestials.v.runGlyphs = s5;
  let s6 = player.records.bestReality.RMSet;
  for (let g6 = 0; g6 < s6.length; g6++) {
    if (s6[g6].level) s6[g6].level = new Decimal(s6[g6].level);
  }
  player.records.bestReality.RMSet = s6;
  let s7 = player.records.bestReality.RMminSet;
  for (let g7 = 0; g7 < s7.length; g7++) {
    if (s7[g7].level) s7[g7].level = new Decimal(s7[g7].level);
  }
  player.records.bestReality.RMminSet = s7;
  let s8 = player.records.bestReality.glyphLevelSet;
  for (let g8 = 0; g8 < s8.length; g8++) {
    if (s8[g8].level) s8[g8].level = new Decimal(s8[g8].level);
  }
  player.records.bestReality.glyphLevelSet = s8;
  let s9 = player.records.bestReality.bestEPSet;
  for (let g9 = 0; g9 < s9.length; g9++) {
    if (s9[g9].level) s9[g9].level = new Decimal(s9[g9].level);
  }
  player.records.bestReality.bestEPSet = s9;
  let s10 = player.records.bestReality.speedSet;
  for (let g10 = 0; g10 < s10.length; g10++) {
    if (s10[g10].level) s10[g10].level = new Decimal(s10[g10].level);
  }
  player.records.bestReality.speedSet = s10;
  let s11 = player.records.bestReality.iMCapSet;
  for (let g11 = 0; g11 < s11.length; g11++) {
    if (s11[g11].level) s11[g11].level = new Decimal(s11[g11].level);
  }
  player.records.bestReality.iMCapSet = s11;
  let s12 = player.records.bestReality.laitelaSet;
  for (let g12 = 0; g12 < s12.length; g12++) {
    if (s12[g12].level) s12[g12].level = new Decimal(s12[g12].level);
  }
  player.records.bestReality.laitelaSet = s12;
}

export function endgameMigration106(player) {
  // Deepmerge adds the new jMCap default before patches run, so a saved legacy dmCap is the authoritative value.
  const legacyDMCap = player.reality.dmCap;
  if (legacyDMCap === undefined) {
    player.reality.jMCap = new Decimal(player.reality.jMCap ?? 0);
  } else {
    player.reality.jMCap = new Decimal(legacyDMCap);
    delete player.reality.dmCap;
  }

  // Achievements 237 and 238 moved to 244 and 248. Move their bits so the newly assigned IDs remain locked.
  const oldRow = player.achievementBits[22] ?? 0;
  player.achievementBits[23] ??= 0;
  if ((oldRow & (1 << 6)) !== 0) {
    player.achievementBits[22] &= ~(1 << 6);
    player.achievementBits[23] |= 1 << 3;
  }
  if ((oldRow & (1 << 7)) !== 0) {
    player.achievementBits[22] &= ~(1 << 7);
    player.achievementBits[23] |= 1 << 7;
  }

  // Version 1.2 records projected iM as an eighth field. Old or partially migrated records need a stable tuple shape.
  for (const run of player.records.recentRealities) {
    while (run.length < 8) run.push(DC.D0);
    run[7] = new Decimal(run[7] ?? 0);
  }

  // Remove quote-array corruption without repeatedly rebuilding valid short arrays on every historical migration.
  const quoteArrays = [
    player.celestials.teresa.quotes,
    player.celestials.effarig.quotes,
    player.celestials.enslaved.quotes,
    player.celestials.v.quotes,
    player.celestials.ra.quotes,
    player.celestials.laitela.quotes,
    player.celestials.pelle.quotes,
    player.celestials.alpha.quotes,
    player.expanse.elemental.quotes
  ];
  for (const quotes of quoteArrays) {
    if (quotes.length < 100) continue;
    const cleaned = Array.range(0, 100).filter(id => quotes.includes(id));
    quotes.splice(0, quotes.length, ...cleaned);
  }

  // Temporary balance cap from the v1.2 release migration.
  if (player.endgame.celDimExpansion.celestialEternityPoints.gt(DC.E4000)) {
    player.endgame.celDimExpansion.celestialEternityPoints = DC.E4000;
  }
}
