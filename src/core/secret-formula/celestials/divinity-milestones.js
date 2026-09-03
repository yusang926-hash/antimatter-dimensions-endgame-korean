export const divinityMilestones = {
  firstDivine: {
    divinities: 1,
    get reward() {
      return ` 반물질 ${format(Decimal.pow10(1e150))} 및 ${format(Decimal.pow10(1e225))} 소프트캡이 반물질 ${format(DC.E9E15)}에서 적용되고 신성마다 강해지는 소프트캡으로 대체됩니다
        새로운 은하 생성기 업그레이드를 해금합니다
        모든 은하 생성기 업그레이드 보상을 제곱합니다
        도전과제 207이 신성에 따라 향상되는 조정된 공식을 사용합니다
        신성마다 셀레스티얼 포인트와 파멸 입자 획득량을 제곱합니다
        모든 Pelle 업그레이드를 구매한 상태로 파멸을 시작합니다
        셀레스티얼 물질 소프트캡을 ${formatPercents(0.05)}만큼 낮춥니다
        모든 하드론/암흑 하드론 효과가 상한에 도달하는 시간을 ${formatPercents(0.2)}만큼 줄입니다
        엔드게임 획득량이 ${formatX(10)} 증가합니다
        이중 머신에 ${format(1.1, 1, 1)}제곱을 적용합니다
        역대 최대 은하 수의 log10이 엔트로피 획득량에 배율을 적용합니다`;
    }
  },
  divineDimensions: {
    divinities: 2,
    get reward() {
      return ` 신성 차원을 해금합니다
        신성 업그레이드를 해금합니다
        새로운 은하 생성기 업그레이드를 해금합니다
        아마겟돈 없이도 대기 중인 잔재를 즉시 획득합니다
        모든 하드론/암흑 하드론 효과가 상한에 도달하는 시간을 ${formatPercents(0.2)}만큼 줄입니다
        Alpha 붕괴의 잔재가 상한에 도달하는 시간을 ${formatPercents(0.2)}만큼 줄입니다
        은하 생성기 업그레이드 자동구매기가 최대 수량을 구매합니다`;
    }
  },
  hadronEmpowerment: {
    divinities: 3,
    get reward() {
      return ` 반물질이 Lai'tela의 현실을 ${formatInt(30)}초 이내에 불안정화하는 데 필요한 양을 넘으면 자동으로 불안정화합니다. 이 필요량에는 엔트로피 생성량 강화 효과가 반영되며, ${formatInt(8)}을 온전히 남은 차원 수로 나눈 차수의 근이 적용됩니다
        ${formatInt(8)}개 차원이 모두 비활성화되면 Lai'tela의 현실을 자동으로 강입자화합니다
        하드론과 암흑 하드론의 수가 같아지며, 둘을 합쳐 하드론 효과가 상한에 도달하는 시간을 줄이는 이색 하드론을 만들 수 있습니다
        특이점을 형성해도 더 이상 아무것도 초기화되지 않습니다
        ${formatInt(8)}번째 은하 생성기 업그레이드가 강해집니다
        모든 신성 차원과 신성 에너지 생산량에 ${formatX(77)}을 곱합니다
        암흑 물질 소멸이 더 이상 아무것도 초기화하지 않습니다
        에테리얼 파워 생성량에 ${formatInt(10)}을 곱합니다
        Alpha의 확장팩을 해금합니다`;
    }
  },
  pelleQoL: {
    divinities: 4,
    get reward() {
      return ` 무한/무한 돌파 업그레이드를 구매/충전한 상태로 Pelle를 시작합니다
        Pelle에 진입하면 균열이 자동으로 ${formatPercents(1)}까지 채워집니다
        은하 생성기의 상한을 해제한 뒤 균열이 ${formatX(10)} 더 빠르게 채워집니다
        신성 차원에 ${formatPow(1.05, 2, 2)}을 적용합니다
        Alpha 붕괴의 잔재가 상한에 도달하는 시간을 ${formatPercents(0.5)}만큼 줄입니다
        셀레스티얼 물질 소프트캡을 ${formatPercents(0.2)}만큼 낮춥니다
        이색 하드론의 효과를 향상시킵니다`;
    }
  },
  celestialSurge: {
    divinities: 5,
    get reward() {
      return ` 헵터랙트 효과가 셀레스티얼 물질 오염 강도에도 적용됩니다
        공허 안에서 반물질 차원 배율을 제곱합니다
        은하 생성기의 상한을 해제한 뒤 균열이 추가로 ${formatX(10)} 더 빠르게 채워집니다
        새로운 은하 생성기 업그레이드를 해금합니다
        하드론이 상한에 도달하는 시간을 ${formatPercents(0.75)}만큼 줄입니다
        에테리얼 파워 생성량에 ${formatInt(1000)}을 곱합니다
        Effarig 레벨 ${formatInt(40)}이 글리프 불안정성의 처음 ${formatInt(3)}단계 대신 처음 ${formatInt(5)}단계에 적용됩니다`;
    }
  },
  finalRebirth: {
    divinities: 7,
    get reward() {
      return ` 여섯 번째 글리프 불안정성 시작점이 완화됩니다
        공허 안에서 이번 엔드게임의 실제 경과 시간에 따라 반물질 차원에 거듭제곱을 적용합니다
        은하 생성기의 상한을 해제한 뒤 균열이 추가로 ${formatX(100)} 더 빠르게 채워집니다
        신성 차원에 ${formatPow(1.05, 2, 2)}을 적용합니다
        하드론이 상한에 도달하는 시간을 ${formatPercents(0.5)}만큼 줄입니다
        Alpha 붕괴의 잔재가 상한에 도달하는 시간을 ${formatPercents(0.25)}만큼 줄입니다
        이번 엔드게임의 실제 경과 시간에 따라 엔트로피에 배율을 적용합니다
        이색 하드론이 다시 조금 더 강해집니다`;
    }
  },
  ascendedSurge: {
    divinities: 10,
    get reward() {
      return ` 여섯 번째 불안정성 시작점을 ${formatPercents(0.1)}만큼 늦춥니다
        은하 생성기의 상한을 해제한 뒤 균열이 추가로 ${formatX(1000)} 더 빠르게 채워집니다
        하드론이 상한에 도달하는 시간을 ${formatPercents(0.75)}만큼 줄입니다
        Alpha 붕괴의 잔재가 상한에 도달하는 시간을 ${formatPercents(0.5)}만큼 줄입니다
        게임 속도가 크게 감소된 비율로 에테리얼 파워 생성량에 적용됩니다
        이제 우주 구역을 한꺼번에 승천시킬 수 있습니다
        엔드게임 업그레이드 자동구매기를 해금합니다`;
    }
  },
  universes: {
    divinities: 13,
    get reward() {
      return ` 천이 우주를 해금합니다`;
    }
  }
};
