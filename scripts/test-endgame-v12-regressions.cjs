const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");

function sourceFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(absolutePath));
    else if (/\.(?:js|vue)$/u.test(entry.name)) files.push(absolutePath);
  }
  return files;
}

function mappedTupleWidth(source, marker) {
  const markerIndex = source.indexOf(marker);
  assert.notEqual(markerIndex, -1, `missing recentRealities initializer: ${marker}`);
  const tupleStart = source.indexOf("[", markerIndex + marker.length);
  const tupleEnd = source.indexOf("]", tupleStart);
  assert.ok(tupleStart !== -1 && tupleEnd > tupleStart, `invalid recentRealities initializer: ${marker}`);
  return source.slice(tupleStart + 1, tupleEnd).split(",").length;
}

// Every static GAME_EVENT reference must resolve to the central event registry. Undefined event keys silently skip
// GameMechanicState listener registration, so this catches both dispatch-only and achievement-listener regressions.
const eventHub = read("src/core/event-hub.js");
const eventObject = /window[.]GAME_EVENT\s*=\s*\{([\s\S]*?)\n\};/u.exec(eventHub)?.[1];
assert.ok(eventObject, "GAME_EVENT registry must remain statically inspectable");
const definedEvents = new Set([...eventObject.matchAll(/^\s*([A-Z][A-Z0-9_]+):\s*"\1",?$/gmu)]
  .map(match => match[1]));
const usedEvents = new Set();
for (const file of sourceFiles(path.join(root, "src"))) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/\bGAME_EVENT[.]([A-Z][A-Z0-9_]+)/gu)) usedEvents.add(match[1]);
}
const missingEvents = [...usedEvents].filter(event => !definedEvents.has(event)).sort();
assert.deepEqual(missingEvents, [], `GAME_EVENT references missing from event-hub.js: ${missingEvents.join(", ")}`);

// Distant Replicanti Galaxy scaling must use its own variables. The v1.2 release accidentally referenced remote
// variables before their declarations, throwing as soon as distant scaling became active.
const replicanti = read("src/core/replicanti.js");
const distantStart = replicanti.lastIndexOf("if (count.gt(distantReplicatedGalaxyStart))");
const remoteStart = replicanti.indexOf("if (count.gt(remoteReplicatedGalaxyStart))", distantStart);
assert.ok(distantStart !== -1 && remoteStart > distantStart, "Replicanti distant/remote scaling blocks must exist");
const distantBlock = replicanti.slice(distantStart, remoteStart);
assert.match(distantBlock, /logDistantScaling/u, "distant scaling must use logDistantScaling");
assert.match(distantBlock, /numDistant/u, "distant scaling must use numDistant");
assert.doesNotMatch(distantBlock, /logRemoteScaling|numRemote/u,
  "distant scaling must not reference remote-scaling variables before declaration");

// Keep the v1.2 release record-update expressions intact. This suite exists to catch accidental localization edits,
// not to silently replace upstream gameplay behavior with an independent balance or timing fix.
const eternity = read("src/core/eternity.js");
assert.match(eternity,
  /Math[.]clamp\(player[.]records[.]thisEternity[.]realTime,\s*1,\s*player[.]records[.]bestEternity[.]realTime\)/u,
  "Eternity best real time must retain the v1.2 release expression");
for (const [relativePath, bestRecord, currentRecord] of [
  ["src/core/big-crunch.js", "bestInfinity", "thisInfinity"],
  ["src/core/dimensions/celestial-dimension.js", "bestCelestialInfinity", "thisCelestialInfinity"],
  ["src/core/dimensions/celestial-dimension.js", "bestCelestialEternity", "thisCelestialEternity"],
  ["src/core/dimensions/divine-dimension.js", "bestCondense", "thisCondense"],
  ["src/core/dimensions/divine-dimension.js", "bestSupernova", "thisSupernova"]
]) {
  const normalized = read(relativePath).replace(/\s+/gu, " ");
  const expected = `Math.clamp(player.records.${bestRecord}.realTime, 1, ` +
    `player.records.${currentRecord}.realTime)`;
  assert.ok(normalized.includes(expected),
    `${relativePath} must retain the v1.2 ${bestRecord}.realTime update`);
}
assert.match(read("src/core/endgame.js"),
  /bestEndgame[.]realTime\s*=\s*Math[.]max\(player[.]records[.]thisEndgame[.]realTime,\s*1\)/u,
  "Endgame best real time must preserve the completed run while flooring it to 1 ms");

// Player initialization, Endgame reset, and migration must agree on the v106 eight-field Reality record tuple.
const playerSource = read("src/core/player.js");
const endgameSource = read("src/core/endgame.js");
assert.equal(mappedTupleWidth(playerSource, "recentRealities: Array.range(0, 10).map(() =>"), 8,
  "new player Reality records must have eight fields");
assert.equal(mappedTupleWidth(endgameSource, "player.records.recentRealities = Array.range(0, 10).map(() =>"), 8,
  "Endgame reset Reality records must have eight fields");
assert.match(playerSource, /\bversion:\s*106,/u, "new saves must use player schema version 106");
assert.match(playerSource, /\bflux:\s*\{[\s\S]*?isUnlocked:\s*false,[\s\S]*?maxUnlockedFlux:\s*2/u,
  "new saves must initialize the Flux state");

const migrationSource = read("src/core/storage/endgame-migrations.js");
const migrationsRegistry = read("src/core/storage/migrations.js");
assert.match(migrationsRegistry, /106:\s*player\s*=>\s*\{\s*endgameMigration106\(player\);\s*\}/u,
  "schema 106 must invoke the dedicated v106 migration exactly once");
assert.match(migrationsRegistry, /"Hypernova":\s*237,/u,
  "legacy achievement-name saves must first map Hypernova to its historical ID");
assert.match(migrationsRegistry, /"Limits of Reality":\s*238,/u,
  "legacy achievement-name saves must first map Limits of Reality to its historical ID");

// Exercise the actual v106 migration body with minimal Decimal/global stubs. This validates value preservation and
// bit movement without booting the browser game or duplicating the implementation in the test.
const migrationMarker = "export function endgameMigration106(player) {";
const migrationStart = migrationSource.indexOf(migrationMarker);
assert.notEqual(migrationStart, -1, "endgameMigration106 must be exported");
const migrationExecutable = migrationSource.slice(migrationStart).replace("export function", "function");

class TestDecimal {
  constructor(value) {
    this.value = value instanceof TestDecimal ? value.value : Number(value);
  }

  gt(other) {
    return this.value > (other instanceof TestDecimal ? other.value : Number(other));
  }
}

const testDC = {
  D0: new TestDecimal(0),
  E4000: new TestDecimal(Number.POSITIVE_INFINITY)
};
const testArray = {
  range: (start, end) => Array.from({ length: end - start }, (_, index) => start + index)
};
// eslint-disable-next-line no-new-func
const migrate106 = Function(
  "Decimal",
  "DC",
  "Array",
  `${migrationExecutable}\nreturn endgameMigration106;`
)(TestDecimal, testDC, testArray);

function migrationPlayer({ withDmCap = true } = {}) {
  const quoteHolder = () => ({ quotes: [] });
  const reality = { jMCap: new TestDecimal(42) };
  if (withDmCap) reality.dmCap = 17;
  return {
    reality,
    achievementBits: Array.from({ length: 24 }, (_, row) =>
      (row === 22 ? (1 << 1) | (1 << 6) | (1 << 7) : 0)),
    records: { recentRealities: [[1, 2, 3, 4, "", 6, 7]] },
    celestials: {
      teresa: quoteHolder(),
      effarig: quoteHolder(),
      enslaved: quoteHolder(),
      v: quoteHolder(),
      ra: quoteHolder(),
      laitela: quoteHolder(),
      pelle: quoteHolder(),
      alpha: quoteHolder(),
      slabdrill: quoteHolder()
    },
    expanse: { elemental: quoteHolder() },
    endgame: { celDimExpansion: { celestialEternityPoints: new TestDecimal(0) } }
  };
}

const legacyPlayer = migrationPlayer();
legacyPlayer.celestials.teresa.quotes = Array.from({ length: 105 }, (_, id) => id);
legacyPlayer.celestials.slabdrill.quotes = Array.from({ length: 105 }, (_, id) => id);
migrate106(legacyPlayer);
assert.equal(legacyPlayer.reality.dmCap, undefined, "v106 migration must remove the legacy dmCap field");
assert.equal(legacyPlayer.reality.jMCap.value, 17, "v106 migration must preserve dmCap as jMCap");
assert.equal(legacyPlayer.achievementBits[22], 1 << 1,
  "v106 migration must clear only the old Achievement 237/238 bits");
assert.equal(legacyPlayer.achievementBits[23], (1 << 3) | (1 << 7),
  "v106 migration must move Achievement 237/238 ownership to 244/248");
assert.equal(legacyPlayer.records.recentRealities[0].length, 8,
  "v106 migration must append the projected iM cap field");
assert.ok(legacyPlayer.records.recentRealities[0][7] instanceof TestDecimal,
  "v106 migration must normalize the projected iM cap field to Decimal");
assert.deepEqual(legacyPlayer.celestials.teresa.quotes, Array.from({ length: 100 }, (_, id) => id),
  "v106 migration must clean corrupted quote arrays once");
assert.equal(legacyPlayer.celestials.slabdrill.quotes.length, 105,
  "v106 migration must leave removed Slabdrill quote display data untouched");

// Running the dedicated patch twice should preserve every moved value and the normalized record shape.
migrate106(legacyPlayer);
assert.equal(legacyPlayer.reality.jMCap.value, 17, "v106 migration must be idempotent for jMCap");
assert.equal(legacyPlayer.achievementBits[22], 1 << 1, "v106 migration must be idempotent for old bits");
assert.equal(legacyPlayer.achievementBits[23], (1 << 3) | (1 << 7),
  "v106 migration must be idempotent for moved bits");
assert.equal(legacyPlayer.records.recentRealities[0].length, 8,
  "v106 migration must be idempotent for Reality record tuples");

const alreadyMigratedPlayer = migrationPlayer({ withDmCap: false });
migrate106(alreadyMigratedPlayer);
assert.equal(alreadyMigratedPlayer.reality.jMCap.value, 42,
  "v106 migration must not zero an existing jMCap when dmCap is absent");

const galaxyMigrationStart = migrationSource.indexOf("  player.auto.galaxyGenerator ??=");
const galaxyMigrationRemainder = migrationSource.slice(galaxyMigrationStart);
const galaxyMigrationEndMarker = /\n {2}(?:const|let) s1 = player[.]reality[.]glyphs[.]active;/u
  .exec(galaxyMigrationRemainder);
const galaxyMigrationEnd = galaxyMigrationEndMarker
  ? galaxyMigrationStart + galaxyMigrationEndMarker.index
  : -1;
assert.ok(galaxyMigrationStart !== -1 && galaxyMigrationEnd > galaxyMigrationStart,
  "Galaxy Generator autobuyer migration must be isolated and additive");
const galaxyMigrationBody = migrationSource.slice(galaxyMigrationStart, galaxyMigrationEnd);
assert.doesNotMatch(galaxyMigrationBody, /player[.]auto[.]galaxyGenerator\s*=\s*\{/u,
  "migration must not replace the Galaxy Generator autobuyer object");
const existingGeneratorItem = { isActive: true, lastTick: 12345 };
const generatorPlayer = {
  auto: { galaxyGenerator: { isActive: false, all: [existingGeneratorItem] } }
};
// eslint-disable-next-line no-new-func
Function("player", galaxyMigrationBody)(generatorPlayer);
assert.equal(generatorPlayer.auto.galaxyGenerator.isActive, false,
  "migration must preserve the Galaxy Generator group toggle");
assert.equal(generatorPlayer.auto.galaxyGenerator.all[0], existingGeneratorItem,
  "migration must preserve existing Galaxy Generator item settings");
assert.equal(generatorPlayer.auto.galaxyGenerator.all.length, 10,
  "migration must add only missing Galaxy Generator autobuyer entries");

// Flux timing and offline simulation intentionally follow the latest upstream v1.2 implementation. These checks
// prevent localization work from reintroducing the independent Flux/hibernation refactor which was removed.
const gameSource = read("src/game.js");
const fluxIndex = gameSource.indexOf("if (player.flux.fluxTime > 0)");
const pauseIndex = gameSource.indexOf("if (Speedrun.isPausedAtStart() || GameEnd.creditsEverClosed)", fluxIndex);
const backupIndex = gameSource.indexOf("player.backupTimer += realDiff", pauseIndex);
const hibernationIndex = gameSource.indexOf("if (player.options.hibernationCatchup", backupIndex);
const realTimeMechanicsIndex = gameSource.indexOf("if (realTimeMechanics(realDiff))", hibernationIndex);
assert.ok(
  fluxIndex !== -1 && fluxIndex < pauseIndex && pauseIndex < backupIndex &&
    backupIndex < hibernationIndex && hibernationIndex < realTimeMechanicsIndex,
  "gameLoop must retain the v1.2 Flux, pause, backup, and hibernation ordering"
);
assert.match(gameSource.slice(fluxIndex, pauseIndex), /player[.]flux[.]fluxTime\s*=\s*Math[.]max/u,
  "gameLoop must retain direct v1.2 Flux consumption");
const hibernationBlockEnd = gameSource.indexOf("\n  }", hibernationIndex) + 4;
assert.match(gameSource.slice(hibernationIndex, hibernationBlockEnd), /realTimeMechanics\(realDiff\)/u,
  "hibernation catch-up must retain the v1.2 real-time mechanics call");
assert.doesNotMatch(gameSource,
  /getFluxAdjustedRealTime|consumeFluxTime|skipFlux|wallClockDiff/u,
  "localization must not add an independent Flux/offline timing implementation");

const simulationStart = gameSource.indexOf("export function simulateTime(");
const simulationSource = gameSource.slice(simulationStart);
assert.match(simulationSource, /getOfflineEPGain\(seconds \* 1000\)/u,
  "offline EP must retain the v1.2 duration source");
assert.match(simulationSource, /bestIPMsWithoutMaxAll[.]times\(seconds \* 1000 \/ 2\)/u,
  "offline IP must retain the v1.2 duration source");
assert.match(simulationSource, /let remainingRealSeconds = seconds;/u,
  "offline ticks must retain the v1.2 remaining-time source");
assert.match(simulationSource, /gameLoop\(1000 \* diff\);/u,
  "ordinary offline ticks must retain the v1.2 gameLoop call");
assert.match(simulationSource, /gameLoop\(1000 \* realTickTime, \{ blackHoleSpeedup \}\);/u,
  "Black Hole offline ticks must retain the v1.2 gameLoop call");

process.stdout.write("Endgame v1.2 regression checks passed\n");
