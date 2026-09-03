export const endgameMilestones = {
  riftFill: {
    endgames: 1,
    reward: () => {
      return `엔드게임마다 균열 충전이 ${formatPercents(0.05)} 빨라지며, 엔드게임 ${formatInt(9)}회 이후 ${formatPercents(Alpha.isDestroyed ? 0.9 : 0.45)}에서 상한에 도달합니다 ` +
        (player.disablePostReality ? "(파괴됨)" : (player.endgames >= 1
         ? (player.endgames >= 9 ? "(상한: " : "(현재: ") + `+${formatPercents(Math.min(0.45, player.endgames * 0.05) + (Alpha.isDestroyed ? 0.45 : 0))})`
         : "(아직 이 마일스톤에 도달하지 않았습니다)"));
    }
  },
  galGenAnimation: {
    endgames: 2,
    reward: () => {
      return `엔드게임 ${formatInt(2)}회마다 은하 생성기 애니메이션이 ${formatX(1.2, 0, 1)} 빨라지며, 엔드게임 ${formatInt(40)}회 이후 상한에 도달합니다 ` +
        (player.disablePostReality ? "(파괴됨)" : (player.endgames >= 2
         ? (player.endgames >= 40 && !Alpha.isDestroyed ? "(상한: " : "(현재: ") + (Alpha.isDestroyed ? "즉시)" : `${formatX(Math.pow(1.2, Math.floor(Math.min(Currency.endgames.value, 40) / 2)), 2, 2)})`)
         : "(아직 이 마일스톤에 도달하지 않았습니다)"));
    }
  },
  vReduction: {
    endgames: 3,
    reward: () => {
      return `V의 현실 해금에 필요한 현실 횟수를 ${formatInt(100)}회로 감소시킵니다`;
    }
  },
  fasterGalaxies: {
    endgames: 5,
    reward: "새로운 은하 생성기 업그레이드를 해금합니다"
  },
  achievementKeep: {
    endgames: 7,
    reward: "엔드게임 시 도전과제를 유지합니다"
  },
  startRa: {
    endgames: 10,
    reward: () => {
      return `Ra의 모든 레벨 ${formatInt(1)} 보상을 보유한 채 엔드게임을 시작합니다`;
    }
  },
  celestialEarlyUnlock: {
    endgames: 15,
    reward: () => {
      return `처음 ${formatInt(6)}명의 셀레스티얼이 해금된 상태로 엔드게임을 시작합니다`;
    }
  },
  keepPerks: {
    endgames: 25,
    reward: "엔드게임 시 퍼크 트리를 유지합니다"
  },
  gameSpeedUncap: {
    endgames: 35,
    reward: () => {
      return `${format(1e300, 2, 2)} 게임 속도 하드캡을 제거합니다`;
    }
  },
  bhAutos: {
    endgames: 50,
    reward: "두 블랙홀이 모두 영구화된 상태로 시작합니다"
  },
  startSac: {
    endgames: 100,
    reward: () => {
      return `모든 종류의 글리프 희생 수치가 ${format(1e100, 2, 2)}인 상태로 시작합니다`;
    }
  },
  moreFasterGalaxies: {
    endgames: 200,
    reward: () => {
      return "엔드게임이 Pelle에서 은하 생산량을 강화합니다 " +
        (player.disablePostReality ? "(파괴됨)" : (player.endgames >= 200
         ? `(현재: ${formatX(Decimal.pow(10, Math.min(Currency.endgames.value / 200, 50)).times(Decimal.pow(10, Math.max((Math.log10(Currency.endgames.value + 1) - 4) * 50, 0))), 2, 2)})`
         : "(아직 이 마일스톤에 도달하지 않았습니다)"));
    }
  },
  autobuyerEndgame: {
    endgames: 400,
    reward: "엔드게임 자동구매기를 해금합니다"
  },
  endgameAntimatter: {
    endgames: 1000,
    reward: () => {
      return "엔드게임 횟수에 따라 반물질 생산량을 거듭제곱하며, Pelle에서는 더 강해집니다 " +
        (player.disablePostReality ? "(파괴됨)" : (player.endgames >= 1000
         ? `(현재: ${formatPow(Pelle.isDoomed ? 1 + (Math.log10(Math.min(Currency.endgames.value, 1e6) * Math.max(Math.log2(Currency.endgames.value + 1) - Math.log2(5e5), 1) + 1) / 80) : 1 + (Math.log10(Math.min(Currency.endgames.value, 1e6) * Math.max(Math.log2(Currency.endgames.value + 1) - Math.log2(5e5), 1) + 1) / 200), 2, 3)})`
         : "(아직 이 마일스톤에 도달하지 않았습니다)"));
    }
  },
  instabilityReduction: {
    endgames: 1000000,
    reward: () => {
      return "엔드게임 횟수에 따라 은하 생성기 불안정성 규모가 감소합니다 " +
        (player.disablePostReality ? "(파괴됨)" : (player.endgames >= 1000000
         ? `(현재: ${formatPow(Math.pow(1 / Math.log10(Currency.endgames.value + 1), 0.1), 2, 3)})`
         : "(아직 이 마일스톤에 도달하지 않았습니다)"));
    }
  }
};
