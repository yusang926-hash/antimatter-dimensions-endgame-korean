const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const parser = require("@babel/parser");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function parseModule(relativePath) {
  return parser.parse(read(relativePath), {
    sourceType: "module",
    plugins: ["nullishCoalescingOperator", "objectRestSpread", "optionalChaining"]
  });
}

function propertyName(node) {
  if (node?.type === "Identifier") return node.name;
  if (node?.type === "StringLiteral" || node?.type === "NumericLiteral") return node.value;
  return undefined;
}

function walk(node, visitor) {
  if (!node || typeof node !== "object") return;
  visitor(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => walk(child, visitor));
    else if (value?.type) walk(value, visitor);
  }
}

function sourceFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(filePath));
    else if (/[.](?:js|vue|json)$/u.test(entry.name)) files.push(filePath);
  }
  return files;
}

const expectedPossessiveNames = new Map([
  ["src/core/celestials/teresa.js", "Teresa의"],
  ["src/core/celestials/effarig.js", "Effarig의"],
  ["src/core/celestials/enslaved.js", "The Nameless Ones의"],
  ["src/core/celestials/V.js", "V의"],
  ["src/core/celestials/ra/ra.js", "Ra의"],
  ["src/core/celestials/laitela/laitela.js", "Lai'tela의"],
  ["src/core/celestials/pelle/pelle.js", "Pelle의"],
  ["src/core/celestials/alpha.js", "Alpha의"],
  ["src/core/elemental.js", "The Elemental의"]
]);

const expectedDisplayNames = new Map([
  ["src/core/celestials/teresa.js", "Teresa"],
  ["src/core/celestials/effarig.js", "Effarig"],
  ["src/core/celestials/enslaved.js", "The Nameless Ones"],
  ["src/core/celestials/V.js", "V"],
  ["src/core/celestials/ra/ra.js", "Ra"],
  ["src/core/celestials/laitela/laitela.js", "Lai'tela"],
  ["src/core/celestials/pelle/pelle.js", "Pelle"],
  ["src/core/celestials/alpha.js", "Alpha"],
  ["src/core/elemental.js", "The Elemental"]
]);

for (const [relativePath, expected] of expectedDisplayNames) {
  const displayNameMembers = [];
  walk(parseModule(relativePath), node => {
    if ((node.type === "ObjectProperty" || node.type === "ObjectMethod") &&
        propertyName(node.key) === "displayName") {
      displayNameMembers.push(node);
    }
  });
  assert.equal(displayNameMembers.length, 1, `${relativePath} must define exactly one displayName`);
  const [member] = displayNameMembers;
  if (member.type === "ObjectProperty") {
    assert.equal(member.value.type, "StringLiteral", `${relativePath} displayName must be a string literal`);
    assert.equal(member.value.value, expected, `${relativePath} displayName must be exactly ${expected}`);
  } else {
    assert.equal(member.kind, "get", `${relativePath} dynamic displayName must remain a getter`);
    const returnStatements = member.body.body.filter(statement => statement.type === "ReturnStatement");
    assert.equal(returnStatements.length, 1, `${relativePath} displayName getter must have exactly one return`);
    const displayStrings = [];
    walk(returnStatements[0].argument, node => {
      if (node.type === "StringLiteral") displayStrings.push(node.value);
    });
    assert.deepStrictEqual(
      displayStrings,
      [expected, expected],
      `${relativePath} dynamic displayName must use only the exact canonical name ${expected}`
    );
  }
}

for (const [relativePath, expected] of expectedPossessiveNames) {
  assert.ok(
    read(relativePath).includes(`possessiveName: "${expected}"`),
    `${relativePath} must use the Korean possessive form ${expected}`
  );
}

const expectedQuoteFiles = new Map([
  ["alpha.js", "alphaQuotes"],
  ["effarig.js", "effarigQuotes"],
  ["elemental.js", "elementalQuotes"],
  ["enslaved.js", "enslavedQuotes"],
  ["laitela.js", "laitelaQuotes"],
  ["pelle.js", "pelleQuotes"],
  ["ra.js", "raQuotes"],
  ["teresa.js", "teresaQuotes"],
  ["v.js", "vQuotes"]
]);
const quoteDirectory = path.join(root, "src", "core", "secret-formula", "celestials", "quotes");
const actualQuoteFiles = fs.readdirSync(quoteDirectory)
  .filter(file => file.endsWith(".js") && file !== "index.js")
  .sort();
assert.deepStrictEqual(
  actualQuoteFiles,
  [...expectedQuoteFiles.keys()].sort(),
  "the nine Celestial quote data filenames must remain stable"
);

for (const [fileName, expectedExport] of expectedQuoteFiles) {
  const relativePath = path.join("src", "core", "secret-formula", "celestials", "quotes", fileName);
  const quoteExports = [];
  for (const statement of parseModule(relativePath).program.body) {
    if (statement.type !== "ExportNamedDeclaration" || statement.declaration?.type !== "VariableDeclaration") {
      continue;
    }
    for (const declaration of statement.declaration.declarations) {
      if (declaration.init?.type === "ObjectExpression") quoteExports.push(declaration.id.name);
    }
  }
  assert.deepStrictEqual(
    quoteExports,
    [expectedExport],
    `${relativePath} must export exactly ${expectedExport}`
  );
}

function migrationPatch(version) {
  const relativePath = "src/core/storage/migrations.js";
  const source = read(relativePath);
  const matches = [];
  walk(parseModule(relativePath), node => {
    if (node.type === "ObjectProperty" && propertyName(node.key) === version &&
        node.value.type === "ArrowFunctionExpression") {
      matches.push(node.value);
    }
  });
  assert.equal(matches.length, 1, `${relativePath} must define exactly one ${version} migration patch`);
  const [patchNode] = matches;
  return vm.runInNewContext(`(${source.slice(patchNode.start, patchNode.end)})`, Object.create(null), {
    filename: relativePath
  });
}

const petNameMigration = migrationPatch(105.1);
for (const [legacyName, canonicalName] of [
  ["테레사", "Teresa"],
  ["에파리그", "Effarig"],
  ["이름없는 자들", "The Nameless Ones"],
  ["이름 없는 자들", "The Nameless Ones"]
]) {
  const player = { celestials: { ra: { petWithRemembrance: legacyName, untouched: true } } };
  petNameMigration(player);
  assert.equal(player.celestials.ra.petWithRemembrance, canonicalName,
    `migration 105.1 must convert ${legacyName} to ${canonicalName}`);
  petNameMigration(player);
  assert.equal(player.celestials.ra.petWithRemembrance, canonicalName,
    `migration 105.1 must be idempotent after converting ${legacyName}`);
  assert.equal(player.celestials.ra.untouched, true, "migration 105.1 must not replace the Ra pet state");
}

for (const preservedName of ["Teresa", "Effarig", "The Nameless Ones", "V", "", "unknown-pet", null]) {
  const player = { celestials: { ra: { petWithRemembrance: preservedName } } };
  petNameMigration(player);
  assert.equal(player.celestials.ra.petWithRemembrance, preservedName,
    `migration 105.1 must preserve ${String(preservedName)}`);
  petNameMigration(player);
  assert.equal(player.celestials.ra.petWithRemembrance, preservedName,
    `migration 105.1 must be idempotent for ${String(preservedName)}`);
}

const effarigRefinementMigration = migrationPatch(105.2);
for (const [initialValues, expectedEffarig] of [
  [{ 에파리그: 42, power: 7 }, 42],
  [{ 에파리그: 42, effarig: 50, power: 7 }, 50],
  [{ 에파리그: 50, effarig: 42, power: 7 }, 50],
  [{ effarig: 42, power: 7 }, 42]
]) {
  const player = {
    celestials: {
      ra: {
        petWithRemembrance: "",
        highestRefinementValue: { ...initialValues }
      }
    }
  };
  effarigRefinementMigration(player);
  assert.equal(player.celestials.ra.highestRefinementValue.effarig, expectedEffarig,
    "migration 105.2 must preserve the highest Effarig refinement value");
  assert.ok(!Object.hasOwn(player.celestials.ra.highestRefinementValue, "에파리그"),
    "migration 105.2 must remove the legacy Korean Effarig refinement key");
  assert.equal(player.celestials.ra.highestRefinementValue.power, 7,
    "migration 105.2 must preserve unrelated refinement values");
  effarigRefinementMigration(player);
  assert.equal(player.celestials.ra.highestRefinementValue.effarig, expectedEffarig,
    "migration 105.2 must be idempotent for Effarig refinement values");
}

const alchemyKeyMigration = migrationPatch(105.3);
const legacyAlchemyKeyPlayer = {
  celestials: {
    ra: {
      highestRefinementValue: {
        power: 7,
        infinity: 8,
        time: 9,
        replication: 10,
        dilation: 11,
        effarig: 12,
        힘: null,
        무한: 20,
        시간: "NaN",
        복제: 5,
        팽창: 30,
        에파리그: 40,
        sentinel: 99
      },
      untouched: true
    }
  },
  eternityPoints: "NaN",
  untouched: true
};
alchemyKeyMigration(legacyAlchemyKeyPlayer);
assert.deepStrictEqual(
  { ...legacyAlchemyKeyPlayer.celestials.ra.highestRefinementValue },
  { power: 7, infinity: 20, time: 9, replication: 10, dilation: 30, effarig: 40, sentinel: 99 },
  "migration 105.3 must restore canonical refinement keys without propagating NaN"
);
assert.equal(legacyAlchemyKeyPlayer.eternityPoints, "NaN",
  "migration 105.3 must not guess replacements for already-corrupted unrelated currencies");
assert.equal(legacyAlchemyKeyPlayer.untouched, true, "migration 105.3 must preserve unrelated player state");
assert.equal(legacyAlchemyKeyPlayer.celestials.ra.untouched, true,
  "migration 105.3 must preserve unrelated Ra state");
alchemyKeyMigration(legacyAlchemyKeyPlayer);
assert.deepStrictEqual(
  { ...legacyAlchemyKeyPlayer.celestials.ra.highestRefinementValue },
  { power: 7, infinity: 20, time: 9, replication: 10, dilation: 30, effarig: 40, sentinel: 99 },
  "migration 105.3 must be idempotent"
);

const playerVersionProperties = [];
walk(parseModule("src/core/player.js"), node => {
  const assignsDefaultPlayer = node.type === "AssignmentExpression" &&
    node.left.type === "MemberExpression" && !node.left.computed &&
    node.left.object.type === "Identifier" && node.left.object.name === "window" &&
    node.left.property.type === "Identifier" && node.left.property.name === "player" &&
    node.right.type === "ObjectExpression";
  if (!assignsDefaultPlayer) return;
  playerVersionProperties.push(...node.right.properties.filter(property => propertyName(property.key) === "version"));
});
assert.equal(playerVersionProperties.length, 1, "the default player must define exactly one save version");
assert.equal(playerVersionProperties[0].value.type, "NumericLiteral", "the default player version must be numeric");
assert.equal(playerVersionProperties[0].value.value, 106,
  "the default player version must include v106 after the alchemy localization repair migrations");

const legacyNameFiles = new Set([
  "src/core/storage/migrations.js",
  "src/components/tabs/past-prestige-runs/PastPrestigeRunsContainer.vue"
]);
let visibleSource = sourceFiles(path.join(root, "src"))
  .filter(filePath => !legacyNameFiles.has(path.relative(root, filePath).replaceAll("\\", "/")))
  .map(filePath => fs.readFileSync(filePath, "utf8"))
  .join("\n");

for (const oldName of [
  "테레사", "에파리그", "이름없는 자들", "이름 없는 자들", "이름없는 자", "이름 없는 자",
  "라이텔라", "펠레", "엘리멘탈"
]) {
  assert.ok(!visibleSource.includes(oldName), `legacy Celestial transliteration remains: ${oldName}`);
}

visibleSource = visibleSource
  .replaceAll("알파벳", "")
  .replaceAll("알파 센타우리", "")
  .replaceAll('text="알파 밝게 표시:"', "");
assert.ok(!visibleSource.includes("알파"), "legacy Alpha transliteration remains outside allowed non-name words");

const sourceWithoutUnrelatedRaga = visibleSource.replaceAll("라가 - 777년", "");
assert.ok(
  !/(?<![가-힣])라(?:의|를|가|와|에게| 안| <i>| 레벨| 업그레이드|, 잊힌| \(다섯 번째|"|')/u
    .test(sourceWithoutUnrelatedRaga),
  "legacy Ra transliteration remains in a known Celestial-name context"
);
assert.ok(
  !/(?:^|\n|`)라는 (?:다섯 번째|이전 네|다음 셀레스티얼|기억)/u.test(sourceWithoutUnrelatedRaga),
  "legacy Ra topic form remains"
);

for (const badParticle of ["The Nameless Ones이", "The Nameless Ones은", "The Nameless Ones을"]) {
  assert.ok(!visibleSource.includes(badParticle), `unnatural particle remains: ${badParticle}`);
}

const pastRuns = read("src/components/tabs/past-prestige-runs/PastPrestigeRunsContainer.vue");
for (const [legacyName, canonicalName] of [
  ["테레사", "Teresa"],
  ["에파리그", "Effarig"],
  ["이름없는 자들", "The Nameless Ones"],
  ["이름 없는 자들", "The Nameless Ones"],
  ["라", "Ra"],
  ["라이텔라", "Lai'tela"]
]) {
  assert.ok(pastRuns.includes(`${legacyName}: "${canonicalName}"`) ||
    pastRuns.includes(`"${legacyName}": "${canonicalName}"`),
  `past prestige runs must display legacy ${legacyName} records as ${canonicalName}`);
}

const h2p = read("src/core/secret-formula/h2p.js");
assert.ok(!h2p.includes('alias: "Glyph Alchemy"'), "Glyph Alchemy must not remain as a visible English H2P alias");
assert.ok(!h2p.includes('alias: "Advanced Glyph Mechanics"'),
  "Advanced Glyph Mechanics must not remain as a visible English H2P alias");
const laitelaAliases = [];
walk(parseModule("src/core/secret-formula/h2p.js"), node => {
  if (node.type === "ObjectProperty" && propertyName(node.key) === "alias" &&
      node.value.type === "StringLiteral" && node.value.value === "Lai'tela") {
    laitelaAliases.push(node.value.value);
  }
});
assert.deepStrictEqual(laitelaAliases, ["Lai'tela"], "Lai'tela H2P alias must exist exactly once with exact casing");
assert.ok(
  read("src/components/tabs/celestial-laitela/LaitelaTab.vue").includes('tab.alias === "Lai\'tela"'),
  "Lai'tela H2P lookup must use its stable alias"
);
assert.ok(
  read("src/components/tabs/alchemy/AlchemyTab.vue").includes('tab.tab === "reality/alchemy"'),
  "Glyph Alchemy H2P lookup must use its stable tab route"
);
assert.ok(
  read("src/components/tabs/glyphs/sidebar/GlyphFilterPanel.vue")
    .includes('tab.tab === "celestials/glyphfilter"'),
  "Advanced Glyph Mechanics H2P lookup must use its stable tab route"
);

console.log("celestial display names and H2P aliases passed");
