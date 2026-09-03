export const alphaUnlocks = {
  fourthDimboost: {
    id: 0,
    requirement: 1,
    nerfDescription: "차원 가속 배율에 제곱근을 적용합니다",
    buffDescription: "차원 가속 배율을 제곱합니다",
    effects: {
      nerf: 0.5,
      buff: 2
    }
  },
  fifthDimboost: {
    id: 1,
    requirement: 2,
    nerfDescription: "차원 가속 스케일링 시작점을 두 배로 늘립니다",
    buffDescription: () => `기본 차원 가속 스케일링 시작점을 ${formatInt(2)}만큼 낮춥니다`,
    effects: {
      nerf: 2,
      buff: 2
    }
  },
  firstGalaxy: {
    id: 2,
    requirement: 3,
    nerfDescription: () => `모든 은하가 ${formatPercents(1 - Math.clamp(Decimal.log10(Decimal.log10(player.antimatter.add(1)).add(1)).div(20).add(0.5).toNumber(), 0.5, 1), 2)}만큼 약해집니다`,
    buffDescription: "글리프 연금술의 교대 효과가 모든 은하 유형에 적용됩니다",
    effects: {
      nerf: () => Math.clamp(Decimal.log10(Decimal.log10(player.antimatter.add(1)).add(1)).div(20).add(0.5).toNumber(), 0.5, 1)
    }
  },
  infinity: {
    id: 3,
    requirement: 4,
    nerfDescription: "무한 업그레이드 비용을 제곱합니다",
    buffDescription: () => `무한 포인트 획득량에 ${formatPow(1 + (Tesseracts.effectiveCount / 1000), 2, 3)}을 적용합니다(테서랙트 기반)`,
    effects: {
      nerf: 2,
      buff: () => 1 + (Tesseracts.effectiveCount / 1000)
    }
  },
  autoCrunchChallenge: {
    id: 4,
    requirement: 5,
    nerfDescription: () => `빅 크런치 자동구매기의 구매 스케일링이 ${formatX(2.5, 1, 1)}로 증가합니다`,
    buffDescription: "충전된 무한 업그레이드에 Teresa 레벨이 두 배인 것처럼 적용됩니다",
    effects: {
      nerf: 2.5,
      buff: 2
    }
  },
  breakInfinity: {
    id: 5,
    requirement: 6,
    nerfDescription: () => `무한 돌파 업그레이드 비용 ${formatX(1000)}, 돌파 후 틱스피드/반물질 차원 비용 스케일링 시작점 ${formatX(20)}, 무한력 변환율 /${format(Decimal.max(DC.D8.div(Decimal.log10(Decimal.log10(Currency.infinityPoints.value.add(1)).add(1)).pow(2).clampMin(0.001)), 1).toNumber(), 2, 2)}(무한 포인트 기반)이 적용되지만 은하의 위력은 두 배가 됩니다`,
    buffDescription: () => `돌파 후 틱스피드 비용 스케일링을 ${format(0.15, 2, 2)}, 돌파 후 차원 비용 스케일링을 ${format(0.25, 2, 2)}만큼 낮춥니다`,
    effects: {
      nerfA: 1000,
      nerfB: 20,
      nerfC: () => Decimal.max(DC.D8.div(Decimal.log10(Decimal.log10(Currency.infinityPoints.value.add(1)).add(1)).pow(2).clampMin(0.001)), 1).toNumber(),
      buffA: 0.15,
      buffB: 0.25
    }
  },
  powerGalaxies: {
    id: 6,
    requirement: 7,
    nerfDescription: () => `먼 은하 비용 스케일링이 은하 ${formatInt(1)}개부터 시작됩니다`,
    buffDescription: "먼/아주 먼 반물질 은하의 은하 스케일링이 두 배로 늘어납니다",
    effects: {
      nerf: 1,
      buff: 2
    }
  },
  breakUpgrades: {
    id: 7,
    requirement: 8,
    nerfDescription: () => `무한 차원 구매 상한이 ${formatInt(player.records.thisReality.galaxies.toNumber() * (EternityChallenge(1).isRunning ? 2 : 1))}(은하 기반)로 감소합니다`,
    buffDescription: () => `돌파 후 틱스피드 비용 스케일링을 ${format(0.15, 2, 2)}, 돌파 후 차원 비용 스케일링을 ${format(0.25, 2, 2)}만큼 낮춥니다`,
    effects: {
      nerf: () => player.records.thisReality.galaxies.toNumber() * (EternityChallenge(1).isRunning ? 2 : 1),
      buffA: 0.15,
      buffB: 0.25
    }
  },
  infinityChallenges: {
    id: 8,
    requirement: 9,
    nerfDescription: () => `반복 구매 무한 포인트 배율 업그레이드가 ${formatInt(150)}회 구매로 제한됩니다`,
    buffDescription: () => `무한 차원 압축을 ${formatPercents(0.25, 2)}만큼 줄이고 무한 차원을 연속체로 전환합니다`,
    effects: {
      nerf: 150,
      buff: 0.75
    }
  },
  replicanti: {
    id: 9,
    requirement: 10,
    nerfDescription: () => `복제자 간격을 제곱하고 게임 속도의 ${formatPercents(0.1)}만 적용합니다`,
    buffDescription: "복제자 간격에 제곱근을 적용합니다",
    effects: {
      nerf: 2,
      buff: 0.5
    }
  },
  infinityDimensions: {
    id: 10,
    requirement: 11,
    nerfDescription: () => `무한 포인트 획득량에 ${formatPow(Math.clamp(1 - Decimal.log10(player.records.thisInfinity.maxAM.add(1)).sub(72500).div(227500).toNumber(), 0, 1), 2, 3)}을 적용합니다(첫 영원에만 적용)`,
    buffDescription: () => `${formatInt(8)}번째 무한 차원을 ${formatInt(100)}제곱합니다`,
    effects: {
      nerf: () => Math.clamp(1 - Decimal.log10(player.records.thisInfinity.maxAM.add(1)).sub(72500).div(227500).toNumber(), 0, 1),
      buff: 100
    }
  },
  eternity: {
    id: 11,
    requirement: 12,
    nerfDescription: () => `시간 차원 구매당 배율이 ${formatX(2)}로 감소합니다`,
    buffDescription: () => `"${formatInt(8)}번째 시간 차원을 ${format(1e8, 2, 2)}개 넘게 구매해도 배율이 증가하지 않음" 약화를 제거합니다`,
    effects: {
      nerf: 2
    }
  },
  timestudy61: {
    id: 12,
    requirement: 13,
    nerfDescription: () => `모든 시간 정리 비용에 ${formatPow(1.5, 2, 3)}을 적용합니다`,
    buffDescription: () => `영원 포인트 획득량에 ${formatX(Decimal.pow10(Decimal.log10(Currency.infinityPoints.value.add(1)).div(1000)), 2, 2)}을 곱합니다(무한 포인트 기반)`,
    effects: {
      nerf: 1.5,
      buff: () => Decimal.pow10(Decimal.log10(Currency.infinityPoints.value.add(1)).div(1000))
    }
  },
  timeDimension4: {
    id: 13,
    requirement: 14,
    nerfDescription: () => `가장 높은 시간 차원의 배율이 항상 ${formatX(1)}이 됩니다`,
    buffDescription: () => `시간 차원 구매당 배율이 ${formatX(10)}으로 증가합니다`,
    effects: {
      buff: 10
    }
  },
  eternityUpgrades: {
    id: 14,
    requirement: 15,
    nerfDescription: () => `모든 무한 차원에 ${formatPow(0.9, 2, 3)}을 적용합니다`,
    buffDescription: () => `${formatInt(1)}번째 무한 차원을 ${formatInt(100)}제곱합니다`,
    effects: {
      nerf: 0.9,
      buff: 100
    }
  },
  eternityChallengeUnlock: {
    id: 15,
    requirement: 16,
    nerfDescription: () => `영원 도전 안에서 무한 포인트에 ${formatPow(0.75, 2, 3)}을 적용합니다`,
    buffDescription: () => `영원 업그레이드 ${formatInt(1)}의 상한을 제거합니다`,
    effects: {
      nerf: 0.75
    }
  },
  ecCompletion1: {
    id: 16,
    requirement: 17,
    nerfDescription: () => `영원 도전의 무한 포인트 약화가 ${formatPow(0.65, 2, 3)}로 감소합니다`,
    buffDescription: () => `시간 차원 압축을 ${formatPercents(0.25, 2)}만큼 줄이고 시간 차원을 연속체로 전환합니다`,
    effects: {
      nerf: 0.65,
      buff: 0.75
    }
  },
  ecCompletion5: {
    id: 17,
    requirement: 18,
    nerfDescription: () => `영원 도전의 무한 포인트 약화가 ${formatPow(0.55, 2, 3)}로 감소하지만 영원 도전 ${formatInt(1)}의 약화는 제거됩니다`,
    buffDescription: () => `모든 시간 차원 배율에 ${formatPow(5)}을 적용합니다`,
    effects: {
      nerf: 0.55,
      buff: 5
    }
  },
  timestudy181: {
    id: 18,
    requirement: 19,
    nerfDescription: () => `모든 반물질 차원에 ${formatPow(0.9, 2, 3)}을 적용합니다`,
    buffDescription: () => `모든 반물질 차원 배율에 ${formatPow(5)}을 적용합니다`,
    effects: {
      nerf: 0.9,
      buff: 5
    }
  },
  eternityChallenge10: {
    id: 19,
    requirement: 20,
    nerfDescription: () => `영원 포인트 획득량에 ${formatPow(0.9, 2, 3)}을 적용합니다`,
    buffDescription: "무한 획득량을 제곱합니다",
    effects: {
      nerf: 0.9,
      buff: 2
    }
  },
  timestudy192: {
    id: 20,
    requirement: 21,
    nerfDescription: () => `무한 이후 복제자 스케일링이 복제자 ${format(DC.NUMMAX, 2, 2)}개당 ${formatX(1.5, 1, 1)}로 증가합니다`,
    buffDescription: "복제자가 감소된 비율로 암흑 에너지 획득량을 강화합니다",
    effects: {
      nerf: 1.5,
      buff: () => ReplicantiMultipliers.deMult
    }
  },
  eternityChallenge11: {
    id: 21,
    requirement: 22,
    nerfDescription: () => `영원 도전 ${formatInt(11)}을 ${formatX(5)} 일괄 완료해야 합니다`,
    buffDescription: () => `돌파 후 틱스피드 비용 스케일링을 ${format(0.075, 3, 3)}만큼 낮춥니다`,
    effects: {
      buff: 0.075
    }
  },
  ec11Bulk: {
    id: 22,
    requirement: 23,
    nerfDescription: () => `시간 팽창 연구 비용이 시간 정리 ${formatInt(10000)}개가 되지만 네 번째 시간 차원 약화를 제거하고 무료 틱스피드 시작점을 ${format(1.2, 2, 2)}로 낮춥니다`,
    buffDescription: () => `돌파 후 틱스피드 비용 스케일링을 ${format(0.075, 3, 3)}만큼 낮춥니다`,
    effects: {
      nerfA: 10000,
      nerfB: 1.2,
      buff: 0.075
    }
  },
  unlockDilation: {
    id: 23,
    requirement: 24,
    nerfDescription: () => `기본 시간 팽창 페널티가 ${formatPow(0.5, 2, 3)}로 증가합니다`,
    buffDescription: () => `기본 시간 팽창 페널티가 ${formatPow(0.8, 2, 3)}로 감소합니다`,
    effects: {
      nerf: 0.5,
      buff: 0.8
    }
  },
  dilatedEternity: {
    id: 24,
    requirement: 25,
    nerfDescription: () => `기본 시간 팽창 페널티가 ${formatPow(0.42, 2, 3)}로 증가하고 팽창 시간에는 게임 속도의 ${formatPercents(0.01)}만 적용됩니다`,
    buffDescription: () => `타키온 입자 획득량에 ${formatPow(1.4, 2, 3)}을 적용합니다`,
    effects: {
      nerf: 0.42,
      buff: 1.4
    }
  },
  timeTheoremGeneration: {
    id: 25,
    requirement: 26,
    nerfDescription: () => `시간 정리 생성량이 ${formatPercents(Math.clamp(1 - Decimal.log10(Currency.dilatedTime.value.add(1)).div(100).toNumber(), 0, 1), 2)}만큼 약해집니다(팽창 시간 기반)`,
    buffDescription: () => `시간 정리 생성량에 ${formatPow(10)}을 적용합니다`,
    effects: {
      nerf: () => Math.clamp(Decimal.log10(Currency.dilatedTime.value.add(1)).div(100).toNumber(), 0, 1),
      buff: 10
    }
  },
  timeDimension8: {
    id: 26,
    requirement: 27,
    nerfDescription: () => `영원 포인트 획득량에 ${formatPow(Math.clamp(1 - Decimal.log10(player.records.thisEternity.maxIP.add(1)).sub(1.5e6).div(1.875e7).max(0).pow(0.375).toNumber(), 0, 1), 2, 3)}을 적용합니다`,
    buffDescription: () => `${formatInt(8)}번째 시간 차원을 ${formatInt(1000)}제곱합니다`,
    effects: {
      nerf: () => Math.clamp(1 - Decimal.log10(player.records.thisEternity.maxIP.add(1)).sub(1.5e6).div(1.875e7).max(0).pow(0.375).toNumber(), 0, 1),
      buff: 1000
    }
  },
  reality: {
    id: 27,
    requirement: 28,
    nerfDescription: "없음",
    buffDescription: "거의 모든 하드캡을 제거합니다"
  }
};
