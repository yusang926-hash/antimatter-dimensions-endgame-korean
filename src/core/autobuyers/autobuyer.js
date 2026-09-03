const AUTOBUYER_DISPLAY_NAMES = {
  "Annihilation": "소멸",
  "Infinity": "무한",
  "Black Hole Power": "블랙홀 파워",
  "Bulk Singularity": "대량 특이점",
  "Celestial Infinity": "셀레스티얼 무한",
  "Celestial Dimension Boost": "셀레스티얼 차원 가속",
  "Celestial Dimension": "셀레스티얼 차원",
  "Celestial Eternity": "셀레스티얼 영원",
  "Celestial Galaxy": "셀레스티얼 은하",
  "Celestial Tickspeed": "셀레스티얼 틱스피드",
  "Dark Matter Dimension Ascension": "암흑 물질 차원 승천",
  "Dark Matter Dimensions": "암흑 물질 차원",
  "Dilated Time Multiplier": "팽창된 시간 배율",
  "Tachyon Galaxy Threshold": "타키온 은하 기준치",
  "Tachyon Particle Multiplier": "타키온 입자 배율",
  "Dilation Upgrade": "시간 팽창 업그레이드",
  "Dimension Boost": "차원 가속",
  "Divine Dimension": "신성 차원",
  "Duality Upgrade": "이중성 업그레이드",
  "Endgame": "엔드게임",
  "Endgame Upgrade": "엔드게임 업그레이드",
  "Eternity": "영원",
  "Base Galaxy Multiplier": "기본 은하 배율",
  "Multiplicative Galaxy Multiplier": "곱연산 은하 배율",
  "Antimatter Multiplier": "반물질 배율",
  "Infinity Point Multiplier": "무한 포인트 배율",
  "Eternity Point Multiplier": "영원 포인트 배율",
  "Reality Shard Multiplier": "현실 파편 배율",
  "Remnant Power": "잔재 파워",
  "Galaxy Power": "은하 파워",
  "Galaxy Dilation": "은하 팽창",
  "Galaxy Generator Upgrade": "은하 생성기 업그레이드",
  "Imaginary Upgrade": "허수 업그레이드",
  "Infinity Dimension": "무한 차원",
  "Create and Purge Music Glyphs": "음악 글리프 생성 및 제거",
  "Pelle Dilated Time Multiplier": "Pelle의 팽창된 시간 배율",
  "Tachyon Galaxy Multiplier": "타키온 은하 배율",
  "Tickspeed Power": "틱스피드 파워",
  "Pelle Dilation Upgrade": "Pelle 시간 팽창 업그레이드",
  "Reality": "현실",
  "Reality Upgrade": "현실 업그레이드",
  "Celestial Infinity Point Multiplier": "셀레스티얼 무한 포인트 배율",
  "Replicanti Galaxy": "복제자 은하",
  "Replicanti Chance": "복제자 확률",
  "Replicanti Interval": "복제자 간격",
  "Replicanti Max Galaxies": "복제자 최대 은하",
  "Replicanti Upgrade": "복제자 업그레이드",
  "Dimensional Sacrifice": "차원 희생",
  "Singularity": "특이점",
  "Tesseract": "테서랙트",
  "Tickspeed": "틱스피드",
  "Time Dimension": "시간 차원",
  "Time Theorem": "시간 정리",
  "Antimatter Dimension": "반물질 차원",
};

function autobuyerDisplayName(name) {
  if (AUTOBUYER_DISPLAY_NAMES[name]) return AUTOBUYER_DISPLAY_NAMES[name];
  const ordinal = /^(\d+)(?:st|nd|rd|th)$/u.exec(name);
  if (ordinal) return `제${ordinal[1]}`;
  const blackHolePower = /^Black Hole (\d+) Power$/u.exec(name);
  if (blackHolePower) return `블랙홀 ${blackHolePower[1]} 파워`;
  return name;
}

/**
 * @abstract
 */
export class AutobuyerState {
  constructor(id = null) {
    this._id = id;
  }

  /**
   * @abstract
   */
  get data() { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  get isUnlocked() { throw new NotImplementedError(); }

  get id() { return this._id; }

  get displayName() { return autobuyerDisplayName(this.name); }

  get canTick() {
    const isDisabled = !player.auto.autobuyersOn || !this.constructor.isActive;
    return this.isActive && !isDisabled && (this.isUnlocked || this.isBought);
  }

  get isActive() {
    return this.data.isActive;
  }

  set isActive(value) {
    this.data.isActive = value;
  }

  get bulk() {
    return 1;
  }

  toggle() {
    this.isActive = !this.isActive;
  }

  /**
   * @abstract
   */
  tick() { throw new NotImplementedError(); }

  // eslint-disable-next-line no-empty-function
  reset() { }

  static get entryCount() { return 1; }

  /**
   * @abstract
   * @returns {string}
   */
  static get autobuyerGroupName() { throw new NotImplementedError(); }
  static get isActive() { return true; }
  /** @abstract */
  static set isActive(value) { throw new NotImplementedError(); }

  static createAccessor() {
    const entryCount = this.entryCount;
    /** @type {object[]} */
    const zeroIndexed = Array.range(1, entryCount).map(id => new this(id));
    const oneIndexed = [null, ...zeroIndexed];
    /** @param {number} id */
    const accessor = id => oneIndexed[id];
    Object.defineProperties(accessor, {
      oneIndexed: { get: () => oneIndexed },
      zeroIndexed: { get: () => zeroIndexed },
      entryCount: { get: () => entryCount },
      anyUnlocked: { get: () => zeroIndexed.some(x => x.isUnlocked) },
      allUnlocked: { get: () => zeroIndexed.every(x => x.isUnlocked) },
      allActive: { get: () => zeroIndexed.every(x => x.isActive) },
      groupName: { get: () => this.autobuyerGroupName },
      groupDisplayName: { get: () => autobuyerDisplayName(this.autobuyerGroupName) },
      isActive: {
        get: () => this.isActive,
        set: value => { this.isActive = value; },
      },
    });
    accessor.toggle = () => this.isActive = !this.isActive;
    return accessor;
  }
}


/**
 * @abstract
 */
export class IntervaledAutobuyerState extends AutobuyerState {
  get interval() {
    return this.data.interval;
  }

  get canTick() {
    return super.canTick && this.timeSinceLastTick >= this.interval;
  }

  get timeSinceLastTick() {
    return player.records.realTimePlayed - this.data.lastTick;
  }

  tick() {
    this.data.lastTick = player.records.realTimePlayed;
  }

  /**
   * @abstract
   */
  get resetTickOn() { return undefined; }

  resetTick(prestigeEvent) {
    if (prestigeEvent >= this.resetTickOn) this.data.lastTick = 0;
  }

  // eslint-disable-next-line no-empty-function
  reset() { }
}


/**
 * @abstract
 */
export class UpgradeableAutobuyerState extends IntervaledAutobuyerState {
  /**
  * @abstract
  */
  get baseInterval() { throw new NotImplementedError(); }

  get cost() {
    return this.data.cost;
  }

  get interval() {
    const interval = this.data.interval;
    return BreakInfinityUpgrade.autobuyerSpeed.isBought ? interval / 2 : interval;
  }

  get hasMaxedInterval() {
    return this.data.interval <= 100;
  }

  upgradeInterval(free) {
    if (this.hasMaxedInterval) return;
    if (!free && !Currency.infinityPoints.purchase(this.cost)) return;
    if (!this.data.hasIncreasedAlphaCosts || !Alpha.isRunning) this.data.cost *= 2;
    if (this.data.hasIncreasedAlphaCosts && Alpha.isRunning) this.data.cost *= AlphaUnlocks.autoCrunchChallenge.effects.nerf.effectOrDefault(2);
    this.data.interval = Math.clampMin(this.data.interval * 0.6, 100);
    Achievement(52).tryUnlock();
    Achievement(53).tryUnlock();
    GameUI.update();
  }

  maxIntervalForFree() {
    while (!this.hasMaxedInterval) {
      this.upgradeInterval(true);
    }
  }

  reset() {
    if (EternityMilestone.keepAutobuyers.isReached || PelleUpgrade.keepAutobuyers.canBeApplied) return;
    this.data.interval = this.baseInterval;
    this.data.cost = 1;
  }

  static createAccessor() {
    const accessor = super.createAccessor();
    Object.defineProperty(accessor, "allMaxedInterval", {
      get: () => accessor.zeroIndexed.every(x => x.hasMaxedInterval)
    });
    Object.defineProperty(accessor, "hasInstant", {
      get: () => accessor.zeroIndexed.some(x => x.interval < player.options.updateRate)
    });
    return accessor;
  }
}
