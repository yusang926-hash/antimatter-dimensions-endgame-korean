const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const Decimal = require("break_eternity.js");

const root = path.resolve(__dirname, "..");
function loadSource(relativePath, name, { globals, startMarker = `export class ${name}`, endMarker }) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8").replace(/\r\n/gu, "\n");
  const start = source.indexOf(startMarker);
  const end = endMarker ? source.indexOf(endMarker, start) : source.length;
  assert.ok(start >= 0 && end > start, `${name} must be extractable from ${relativePath}`);
  const executable = source.slice(start, end).replace(/^export /u, "");
  // Evaluate the actual source with only the dependencies exercised by these tests.
  // eslint-disable-next-line no-new-func
  return Function(...Object.keys(globals), `${executable}\nreturn ${name};`)(...Object.values(globals));
}

class IntervaledAutobuyerState {
  reset() {
    this.baseResetCount = (this.baseResetCount || 0) + 1;
  }
}

const crunchModes = { AMOUNT: "crunch-amount", TIME: "crunch-time", X_HIGHEST: "crunch-highest" };
const eternityModes = { AMOUNT: "eternity-amount", TIME: "eternity-time", X_HIGHEST: "eternity-highest" };
const upgrades = { betterCelCrunchAuto: { isBought: false }, betterCelEternityAuto: { isBought: false } };
const autoPlayer = {
  auto: {
    celestialCrunch: {},
    celestialEternity: { amount: new Decimal(10), time: 5, xHighest: new Decimal(3) }
  },
  records: { thisCelestialReality: { maxCEP: new Decimal(4) } }
};
let eternityGain = new Decimal(10);
const eternityTime = { totalSeconds: new Decimal(6) };
const autoGlobals = {
  IntervaledAutobuyerState,
  player: autoPlayer,
  CelestialEternityUpgrade: upgrades,
  AUTO_CELESTIAL_CRUNCH_MODE: crunchModes,
  AUTO_CELESTIAL_ETERNITY_MODE: eternityModes,
  gainedCelestialEternityPoints: () => eternityGain,
  Time: { thisCelestialEternityRealTime: eternityTime }
};

// Reset the parent timer in both cases, but retain a selected mode once its upgrade is owned.
let eternityAuto;
for (const [file, name, modes, upgradeKey] of [
  ["celestial-crunch", "CelestialCrunchAutobuyerState", crunchModes, "betterCelCrunchAuto"],
  ["celestial-eternity", "CelestialEternityAutobuyerState", eternityModes, "betterCelEternityAuto"]
]) {
  const Auto = loadSource(`src/core/autobuyers/${file}-autobuyer.js`, name, { globals: autoGlobals });
  const auto = new Auto();
  auto.mode = modes.TIME;
  auto.reset();
  assert.equal(auto.mode, modes.AMOUNT, `${name}: unupgraded reset must restore amount mode`);
  assert.equal(auto.baseResetCount, 1);
  upgrades[upgradeKey].isBought = true;
  auto.mode = modes.TIME;
  auto.reset();
  assert.equal(auto.mode, modes.TIME, `${name}: upgraded reset must preserve time mode`);
  assert.equal(auto.baseResetCount, 2, `${name}: preserving the mode must still reset the parent timer`);
  if (file === "celestial-eternity") eternityAuto = auto;
}

// Deliberately use distinct mode constants so a Crunch/Eternity enum mix-up cannot pass unnoticed.
eternityAuto.mode = eternityModes.AMOUNT;
assert.equal(eternityAuto.willEternity, true, "amount mode must trigger at its exact target");
eternityGain = new Decimal(9);
assert.equal(eternityAuto.willEternity, false);
eternityAuto.mode = eternityModes.TIME;
assert.equal(eternityAuto.willEternity, true);
eternityTime.totalSeconds = new Decimal(5);
assert.equal(eternityAuto.willEternity, false, "time mode must retain its strict comparison");
eternityAuto.mode = eternityModes.X_HIGHEST;
eternityGain = new Decimal(12);
assert.equal(eternityAuto.willEternity, true);
eternityGain = new Decimal(11);
assert.equal(eternityAuto.willEternity, false);

const celestialNames = ["teresa", "effarig", "enslaved", "v", "ra", "laitela", "alpha"];
const runPlayer = { celestials: Object.fromEntries(celestialNames.map(name => [name, { run: true }])) };
let tabChanges = 0;
let automatorRechecks = 0;
const clearGlobals = {
  player: runPlayer,
  Alpha: { isRunning: true, currentStage: 27 },
  Effarig: { isRunning: true, currentStage: "endgame" },
  EFFARIG_STAGES: { ENDGAME: "endgame" },
  Enslaved: { get isRunning() { return runPlayer.celestials.enslaved.run; } },
  Tabs: { current: { isHidden: true, _currentSubtab: { isHidden: false } } },
  Tab: { celestials: { enslaved: { show: () => { tabChanges++; } } } },
  AutomatorData: { recalculateErrors: () => { automatorRechecks++; } }
};
const clearRuns = loadSource("src/core/reality.js", "clearCelestialRuns", {
  globals: clearGlobals,
  startMarker: "export function clearCelestialRuns(",
  endMarker: "\nexport function isInCelestialReality("
});
const activeRuns = Object.fromEntries(celestialNames.map(name => [name, true]));
assert.deepEqual(clearRuns(true), activeRuns, "preserving runs must still return their saved state");
assert.ok(celestialNames.every(name => runPlayer.celestials[name].run));
assert.equal(tabChanges + automatorRechecks, 0, "preserving runs must not cause exit side effects");
const savedRuns = clearRuns();
assert.deepEqual(savedRuns, activeRuns);
assert.ok(celestialNames.every(name => !runPlayer.celestials[name].run),
  "an ordinary clear must exit even Alpha stage 27 and Effarig Endgame runs");
assert.equal(tabChanges, 1, "leaving Nameless on a hidden tab must select its visible tab");
assert.equal(automatorRechecks, 1, "leaving Nameless must revalidate Automator scripts");
clearRuns(false);
assert.equal(tabChanges + automatorRechecks, 2, "clearing inactive runs must not repeat exit side effects");
assert.deepEqual(savedRuns, activeRuns, "the saved state must remain independent of subsequent clearing");

class RebuyableMechanicState {
  constructor(config) {
    this.config = config;
    this.id = config.id;
  }

  get cost() {
    return this.config.cost;
  }
}

const perkPlayer = { celestials: { teresa: { perkShop: Array(7).fill(0), charged: new Set() } } };
const teresa = { chargesLeft: 1 };
const PerkUpgrade = loadSource("src/core/celestials/teresa.js", "PerkShopUpgradeState", {
  globals: { RebuyableMechanicState, Decimal, player: perkPlayer, Teresa: teresa },
  startMarker: "class PerkShopUpgradeState",
  endMarker: "\nexport function tryChargeAllPerkUpgrades("
});
for (const [id, threshold] of [[0, 20], [1, 20], [2, 14], [3, 6], [4, 0]]) {
  const perk = new PerkUpgrade({ id, cost: 99, costCap: () => 100 });
  if (threshold > 0) {
    perk.boughtAmount = threshold - 1;
    assert.equal(perk.canCharge, false, `perk ${id} must not charge below its purchase threshold`);
  }
  perk.boughtAmount = threshold;
  assert.equal(perk.canCharge, true, `perk ${id} must charge at its purchase threshold`);
  perkPlayer.celestials.teresa.charged.add(id);
  assert.equal(perk.canCharge, false, "an already charged perk cannot consume another charge");
  perkPlayer.celestials.teresa.charged.delete(id);
  teresa.chargesLeft = 0;
  assert.equal(perk.canCharge, false, "charging requires a remaining charge");
  teresa.chargesLeft = 1;
}
for (const id of [5, 6]) {
  const perk = new PerkUpgrade({ id, cost: 99, costCap: () => 100 });
  perk.boughtAmount = 1e100;
  assert.equal(perk.canCharge, false, `perk ${id} must remain unchargeable`);
}
for (const id of [0, 6]) {
  const perk = new PerkUpgrade({ id, cost: 99, costCap: () => 100 });
  assert.equal(perk.isCapped, false);
  perk.config.cost = 100;
  assert.equal(perk.isCapped, true, `perk ${id} must cap at its cost limit`);
  perk.config.cost = 101;
  assert.equal(perk.isCapped, true, `perk ${id} must remain capped after its cost exceeds the limit`);
}

const hadronEmpowerment = { isReached: false };
let energyResets = 0;
let singularities = new Decimal(0);
const events = [];
const darkEnergy = {
  value: new Decimal(0),
  gte(value) { return this.value.gte(value); },
  reset() {
    energyResets++;
    this.value = new Decimal(0);
  }
};
const singularityGlobals = {
  Decimal,
  player: { celestials: { laitela: { singularityCapIncreases: new Decimal(0) } } },
  DivinityMilestone: { hadronEmpowerment },
  Currency: { darkEnergy, singularities: { add: value => { singularities = singularities.add(value); } } },
  SingularityMilestone: { autoCondense: { effectValue: new Decimal(2) } },
  Pelle: { isDoomed: false },
  PelleDestructionUpgrade: { singularityMilestones: { canBeApplied: false } },
  EventHub: { dispatch: event => events.push(event) },
  GAME_EVENT: { SINGULARITY_RESET_BEFORE: "before", SINGULARITY_RESET_AFTER: "after" }
};
const singularity = loadSource("src/core/celestials/laitela/singularity.js", "Singularity", {
  globals: singularityGlobals,
  startMarker: "export const Singularity =",
  endMarker: "\nEventHub.logic.on("
});
// The gain formula is unrelated to this patch; retain the actual cap, eligibility, and perform implementation.
Object.defineProperty(singularity, "singularitiesGained", { value: new Decimal(7) });
const SingularityAuto = loadSource("src/core/autobuyers/singularity-autobuyer.js", "SingularityAutobuyerState", {
  globals: { ...singularityGlobals, AutobuyerState: class {}, Singularity: singularity }
});
const singularityAuto = new SingularityAuto();
assert.equal(singularity.capIsReached, false);
singularityAuto.tick();
assert.equal(singularities.toNumber(), 0, "ordinary auto-condense must wait for dark energy");
darkEnergy.value = new Decimal(200);
assert.equal(singularity.capIsReached, true);
singularityAuto.tick();
assert.equal(singularities.toNumber(), 0, "ordinary auto-condense must observe its delay multiplier");
darkEnergy.value = new Decimal(400);
singularityAuto.tick();
assert.equal(singularities.toNumber(), 7);
assert.equal(energyResets, 1);
hadronEmpowerment.isReached = true;
assert.equal(singularity.capIsReached, true, "Hadron empowerment must allow condensing with zero dark energy");
singularityAuto.tick();
assert.equal(singularities.toNumber(), 14, "Hadron auto-condense must bypass the energy threshold");
assert.equal(energyResets, 1, "Hadron condensing must preserve dark energy");
assert.deepEqual(events, ["before", "after", "before", "after"]);
singularityGlobals.Pelle.isDoomed = true;
singularityAuto.tick();
assert.equal(singularities.toNumber(), 14, "Hadron empowerment must still respect Pelle restrictions");

process.stdout.write("Endgame v1.2 patch regression checks passed\n");
