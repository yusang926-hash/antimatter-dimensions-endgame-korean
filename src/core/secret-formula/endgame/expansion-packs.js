export const expansionPacks = {
  teresaPack: {
    name: "Teresa의 확장팩",
    id: "teresaPack",
    symbol: "Ϟ",
    get description() {
      return ` Teresa의 용기 상한을 제거합니다.
        이제 Teresa의 용기가 리얼리티 머신 획득량뿐 아니라 리얼리티 머신 상한에도 영향을 줍니다.
        엔드게임 시 퍼크 상점 업그레이드를 유지합니다.
        Teresa 탭에서 충전된 퍼크 업그레이드를 해금합니다.
        리얼리티 머신을 Teresa에게 자동으로 붓습니다.`;
    },
    cost: Decimal.pow(10, 1e30),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  effarigPack: {
    name: "Effarig의 확장팩",
    id: "effarigPack",
    symbol: "Ϙ",
    get description() {
      return ` 유물 파편 획득량에 보유 반물질의 로그값을 곱합니다(현재: ${formatX(player.antimatter.max(10).log10(), 2)}).
        Ra의 Effarig 레벨 ${formatInt(10)} 보상이 개선되어 Effarig 글리프가 항상 효과 ${formatInt(7)}개를 가진 채 생성됩니다.
        글리프 연금술 상한의 기본값이 역대 최고 글리프 레벨의 삼분의 일로 증가합니다(현재: ${formatHybridLarge(player.records.bestEndgame.glyphLevel.div(3), 3)}).
        엔드게임 시 연금술 자원을 유지하며, 현실 글리프를 만들어도 현실 자원이 소모되지 않습니다.
        Effarig의 상점이 완료된 상태로 시작합니다.
        Effarig의 현실 각 단계가 가장 빠른 엔드게임 시간의 십분의 일이 지나면 자동으로 완료됩니다(현재 단계당 ${TimeSpan.fromMilliseconds(new Decimal(player.records.bestEndgame.realTime).div(10)).toStringShort()}).`;
    },
    cost: Decimal.pow(10, 1e50),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  enslavedPack: {
    name: "The Nameless Ones의 확장팩",
    id: "enslavedPack",
    symbol: "\uf0c1",
    get description() {
      return ` 블랙홀 충전에 항상 총 게임 속도의 ${formatPercents(0.99)}만 사용합니다.
        방출할 저장된 시간의 양과 저장된 시간을 방출할 간격을 조정하는 최적화 기능을 해금합니다.
        모든 유효 테서랙트의 효과를 두 배로 만듭니다.
        테서랙트가 엔드게임에 배율을 적용하고 무한 차원 압축 규모를 소폭 감소시킵니다(현재: ${formatX(Math.floor(1 + Math.pow(Math.log10(Math.min(Tesseracts.effectiveCount, 1000) * Math.max(Math.log10(Tesseracts.effectiveCount) - 2, 1) + 1), Math.log10(player.endgames + 1))), 2, 2)}, ${formatX(Math.pow(1 / Math.log10(Tesseracts.effectiveCount + 1), 0.2), 2, 3)}).
        The Nameless Ones를 완료한 상태로 엔드게임을 시작합니다.
        테서랙트 자동구매기를 해금합니다.`;
    },
    cost: Decimal.pow(10, 1e70),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  vPack: {
    name: "V의 확장팩",
    id: "vPack",
    symbol: "⌬",
    get description() {
      return ` V의 현실이 해금된 상태로 시작합니다.
        ${TimeSpan.fromSeconds(new Decimal(60))}마다 V-도전과제 하나를 자동으로 해금하며(어려운 V-도전과제 포함), 셀레스티얼 포인트를 사용해 이 시간을 단축할 수 있습니다.
        획득하는 모든 공간 정리를 두 배로 만듭니다.`;
    },
    cost: Decimal.pow(10, 1e90),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  raPack: {
    name: "Ra의 확장팩",
    id: "raPack",
    symbol: "\uf185",
    get description() {
      return ` 엔드게임 시 Ra를 유지합니다.
        모든 셀레스티얼의 레벨 상한이 최고 반물질 기록의 이중 로그값까지 증가합니다(현재: ${formatHybridLarge(Decimal.max(Decimal.floor(player.records.bestAntimatterExponentOutsideDoom.max(1).log10()), 25), 3)}).
        각 셀레스티얼의 레벨을 올려 획득할 수 있는 새로운 효과를 셀레스티얼마다 ${formatInt(7)}개씩 해금합니다.
        기억과 기억 덩어리 획득량에 ${formatX(10)}를 곱합니다.`;
    },
    cost: Decimal.pow(10, 1e110),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  laitelaPack: {
    name: "Lai'tela의 확장팩",
    id: "laitelaPack",
    symbol: "ᛝ",
    get description() {
      return ` 각각 입력한 시간을 기준으로 일괄 특이점 레벨을 높이거나 낮추는 자동구매기를 해금합니다.
        Lai'tela의 현실에서는 게임 속도가 정상으로 돌아오는 데 걸리는 시간이 절반으로 줄어듭니다.
        소멸 배율이 현재 ${formatInt(8)}번째 암흑 물질 차원에 영향을 준다면 ${formatInt(8)}번째 암흑 물질 차원에 적용되는 소멸 배율을 제곱합니다.
        승천 시 암흑 물질 차원 간격 증가량을 ${formatInt(200)}만큼 감소시킵니다.
        반물질 양의 이중 로그값과 허수 머신 양의 로그값 중 큰 값을 암흑 물질 획득량에 곱합니다(현재: ${formatX(Decimal.max(player.antimatter.max(1e10).log10().log10(), player.reality.imaginaryMachines.max(10).log10()), 2, 2)}).
        특이점 ${formatInt(10)}개를 보유한 채 엔드게임을 시작합니다.
        암흑 에너지 획득량에 특이점 개수 로그값의 제곱을 곱합니다(현재: ${formatX(player.celestials.laitela.singularities.max(10).log10().pow(2), 2, 2)}).
        암흑 물질에 따라 소멸 효과를 거듭제곱합니다(현재: ${formatPow(Decimal.pow((Decimal.log10(Decimal.log10(Currency.darkMatter.value.add(1)).add(1)).add(1)).div(2), 2).add(1), 2, 3)}).
        소멸 자동구매기를 개선합니다.
        Lai'tela의 현실을 강입자화하는 능력을 해금합니다.
        이제 Lai'tela의 현실을 불안정화하는 보상이 암흑 물질 상한에도 영향을 줍니다.
        초당 엔트로피 최대 획득량에 ${formatInt(10)}을 곱합니다.`;
    },
    cost: Decimal.pow(10, 1e130),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  pellePack: {
    name: "Pelle의 확장팩",
    id: "pellePack",
    symbol: "♅",
    get description() {
      return ` 은하 생성기 불안정성 규모를 ${formatInt(1)}만큼 감소시킵니다.
        역대 최고 은하 기록에 따라 처음 세 종류 차원의 배율을 거듭제곱합니다(현재: ${formatPow(Decimal.pow(Decimal.log10(player.records.bestEndgame.galaxies).div(100), 1.5).add(1), 2, 3)}).
        반복 구매 가능한 은하 생성기 업그레이드의 자동구매기를 해금합니다.`;
    },
    cost: Decimal.pow(10, 1e150),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  alphaPack: {
    name: "Alpha의 확장팩",
    id: "alphaPack",
    symbol: "α",
    get description() {
      return ` 하드론을 가속해 반물질 획득량을 기하급수적으로 늘릴 수 있는 대형 강입자 충돌기를 해금합니다.
        시간 팽창과 비슷하게 작동하며 가속기 생산량을 강화하는 공허를 해금합니다.`;
    },
    cost: Decimal.pow(10, 1e200),
    formatCost: value => formatPostBreak(value, 2, 0)
  }
};
