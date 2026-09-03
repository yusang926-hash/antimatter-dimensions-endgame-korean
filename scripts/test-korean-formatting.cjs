const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function sourceFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(absolutePath));
    else if (/\.(?:js|vue)$/u.test(entry.name)) files.push(absolutePath);
  }
  return files;
}

function loadFormatRuntime() {
  const file = path.join(root, "src", "core", "format.js");
  const context = {};
  context.window = context;
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context, { filename: file });

  // The quantity helpers only need the formatter output for these regression cases.
  context.format = value => String(value);
  context.formatInt = value => String(value);
  context.formatHybridSmall = value => String(value);
  context.formatHybridLarge = value => String(value);
  return context;
}

function loadTimeRuntime() {
  const file = path.join(root, "src", "core", "time.js");
  const source = fs.readFileSync(file, "utf8")
    .replace("export const DeltaTimeState =", "globalThis.DeltaTimeState =")
    .replace("export const Time =", "globalThis.Time =");
  const context = {
    Decimal: class Decimal {
      constructor(value) {
        this.value = value;
      }
    },
    TimeSpan: class TimeSpan {
      constructor(value) {
        this.value = value;
      }
    },
  };
  vm.runInNewContext(source, context, { filename: file });
  return context.Time;
}

const formatting = loadFormatRuntime();

assert.equal(formatting.quantify("개", 3), "3개");
assert.equal(formatting.quantifyInt("회", 2), "2회");
assert.equal(formatting.quantifyHybridSmall("번 더 활성화", 4), "4번 더 활성화");
assert.equal(formatting.quantifyHybridLarge("개의 특이점", 7), "7개의 특이점");
assert.equal(formatting.quantify("줄", 5), "5줄");
assert.equal(formatting.quantify("초", 1), "1초");

// Resource nouns and intentional English strings must keep their existing behavior.
assert.equal(formatting.quantify("무한 포인트", 5), "5 무한 포인트");
assert.equal(formatting.quantify("초월", 3), "3 초월");
assert.equal(formatting.quantify("Eternity", 2), "2 Eternities");

const Time = loadTimeRuntime();
const localTimestamp = new Date(2026, 7, 12, 3, 4, 5).getTime();
assert.equal(Time.toDateTimeString(localTimestamp), "2026년 8월 12일 03:04:05");
assert.equal(Time.toDateTimeString(NaN), "Invalid Date");

const prologue = fs.readFileSync(path.join(root, "src", "components", "ui-modes", "Prologue.vue"), "utf8");
assert.ok(prologue.includes(">2113년 5월 2일</span>"), "the prologue date must use a numeric Korean month");
assert.ok(prologue.includes(">5년</span>"), "the prologue time jump must begin with the natural Korean form 5년");
assert.ok(!prologue.includes("오월") && !prologue.includes("다섯</span>"),
  "the prologue must not restore the awkward spelled-out date or time jump");

const elementalQuotes = fs.readFileSync(
  path.join(root, "src", "core", "secret-formula", "celestials", "quotes", "elemental.js"), "utf8");
assert.equal(elementalQuotes.match(/5년/gu)?.length, 4,
  "The Elemental intro must use the natural numeric form 5년 in all four five-year lines");
assert.ok(!/오\s?년|다섯 해/u.test(elementalQuotes),
  "The Elemental intro must not restore a spelled-out five-year expression");

const legacyInfinityPowerTerms = sourceFiles(path.join(root, "src"))
  .flatMap(file => {
    const source = fs.readFileSync(file, "utf8");
    return /무한\s*동력/u.test(source) ? [path.relative(root, file)] : [];
  });
assert.deepEqual(legacyInfinityPowerTerms, [],
  `Infinity Power must consistently use 무한력: ${legacyInfinityPowerTerms.join(", ")}`);

console.log("Korean quantity and date formatting regression checks passed.");
