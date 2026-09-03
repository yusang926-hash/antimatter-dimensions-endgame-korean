export const ascensions = {
  ipA: {
    id: 0,
    name: "무한 포인트 배율 승천",
    zeroIndex: new Decimal("1e30000"),
    description: () => `반복 구매 가능한 무한 포인트 배율 업그레이드를 반복 구매 가능한 무한 포인트 거듭제곱 업그레이드로 재구성합니다`,
    onUnlock: () => {
      player.IPMultPurchases = DC.D0;
    }
  },
  epA: {
    id: 1,
    name: "영원 포인트 배율 승천",
    zeroIndex: new Decimal("1e40000"),
    description: () => `반복 구매 가능한 영원 포인트 배율 업그레이드를 반복 구매 가능한 영원 포인트 거듭제곱 업그레이드로 재구성합니다`,
    onUnlock: () => {
      player.epmultUpgrades = DC.D0;
    }
  },
  dbA: {
    id: 2,
    name: "차원 가속 승천",
    zeroIndex: new Decimal("1e60000"),
    description: () => `차원 가속을 모든 반물질 차원의 배율을 거듭제곱하는 차원 쇄도로 재구성합니다`,
    onUnlock: () => {
      player.dimensionBoosts = DC.D0;
    }
  },
  b10mA: {
    id: 3,
    name: "10개 구매 배율 승천",
    zeroIndex: new Decimal("1e100000"),
    description: () => `반물질 차원의 10개 구매 배율을 자릿수 구매 거듭제곱으로 재구성합니다`
  },
  sacA: {
    id: 4,
    name: "차원 희생 승천",
    zeroIndex: new Decimal("1e200000"),
    description: () => `차원 희생 배율을 차원 희생 거듭제곱으로 재구성합니다`
  },
  ocA: {
    id: 5,
    name: "과충전 승천",
    zeroIndex: new Decimal("1e400000"),
    description: () => `과충전을 해금합니다`
  },
  oc2A: {
    id: 6,
    name: "과충전 승천 유형 2",
    zeroIndex: new Decimal("1e2500000"),
    description: () => `과충전 레벨 2를 해금합니다`
  },
  oc3A: {
    id: 7,
    name: "과충전 승천 유형 3",
    zeroIndex: new Decimal("1e6250000"),
    description: () => `과충전 레벨 3을 해금합니다`
  },
  oc4A: {
    id: 8,
    name: "과충전 승천 유형 4",
    zeroIndex: new Decimal("1e25000000"),
    description: () => `과충전 레벨 4를 해금합니다`
  }
};
