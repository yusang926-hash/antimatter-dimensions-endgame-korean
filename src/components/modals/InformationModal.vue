<script>
import InformationModalButton from "@/components/modals/InformationModalButton";
import ModalCloseButton from "@/components/modals/ModalCloseButton";

export default {
  name: "InformationModal",
  components: {
    ModalCloseButton,
    InformationModalButton
  },
};
</script>

<template>
  <div class="l-information-modal c-information-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-h2p-header">
      <div class="c-h2p-title">
        게임 정보
      </div>
    </div>
    <div class="c-info-body">
      <strong>한국어판 기준 버전: Endgame Update v1.2.0</strong>
      <br>
      <br>
      Antimatter Dimensions는 핀란드 개발자 Hevipelle이 만든 방치형 증분 게임입니다. 2016년 개인 프로젝트로
      시작했으며, 이후 많은 개발자와 테스터가 참여해 확장되었습니다. 2024년에는 미국 개발자 Supersonic Seven이
      원작을 완료한 뒤 추가 콘텐츠와 더 깊은 이야기를 담은 모드를 만들기로 했습니다.
      Antimatter Dimensions: Endgame의 첫 공개 버전은 2025년에 Supersonic Seven이 출시했으며,
      이후 가능한 때마다 게임을 업데이트하고 있습니다.
      <br>
      <br>
      게임을 진행할수록 새로운 플레이 요소와 여러 초기화 단계가 펼쳐집니다. "게임 방법" 버튼에서
      진행에 유용한 정보를 확인할 수 있습니다.
      <br>
      <br>
      이 버전은 SameMa가 번역하고 유지보수하는 비공식·비상업 한국어 팬 번역이며, 원작·Endgame 제작진 및
      ADKorean과 공식 제휴된 배포판이 아닙니다. 기존 한국어 번역 일부는 Seonjisoup621(Jihuu621)의 ADKorean에서
      재사용하고 용어를 참고했습니다.
    </div>
    <div class="l-socials">
      <InformationModalButton
        name="원작 저장소"
        icon="fa-brands fa-github"
        link="https://github.com/IvarK/AntimatterDimensionsSourceCode"
      />
      <InformationModalButton
        name="엔드게임 저장소"
        icon="fa-brands fa-github"
        link="https://github.com/Supersonic-Seven/AntimatterDimensionsEndgameUpdate"
      />
      <InformationModalButton
        name="한국어 패치 저장소"
        icon="fa-brands fa-github"
        link="https://github.com/gyeol0710/antimatter-dimensions-endgame-korean"
      />
      <InformationModalButton
        name="ADKorean 저장소"
        icon="fa-brands fa-github"
        link="https://github.com/Jihuu621/ADKorean"
      />
      <InformationModalButton
        name="r/AntimatterDimensions"
        icon="fa-brands fa-reddit-alien"
        link="https://www.reddit.com/r/AntimatterDimensions/"
      />
      <InformationModalButton
        name="r/EndgameAntimatterDims"
        icon="fa-brands fa-reddit-alien"
        link="https://www.reddit.com/r/EndgameAntimatterDims/"
      />
      <InformationModalButton
        name="Antimatter Dimensions Discord 서버"
        icon="fa-brands fa-discord"
        link="https://discord.gg/ST9NaXa"
      />
      <InformationModalButton
        name="Antimatter Dimensions: Endgame Discord 서버"
        icon="fa-brands fa-discord"
        link="https://discord.gg/yuxrGFcJXc"
      />
      <InformationModalButton
        name="Google Play의 Antimatter Dimensions"
        icon="fa-brands fa-google-play"
        link="https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions"
      />
      <InformationModalButton
        name="Steam의 Antimatter Dimensions"
        icon="fa-brands fa-steam"
        link="https://store.steampowered.com/app/1399720/Antimatter_Dimensions/"
      />
      <InformationModalButton
        name="제작진"
        icon="fa-solid fa-users"
        show-modal="credits"
      />
      <InformationModalButton
        name="게임 변경 내역"
        icon="fa-solid fa-file-lines"
        show-modal="changelog"
      />
    </div>
  </div>
</template>

<style scoped>
.l-information-modal {
  display: flex;
  flex-direction: column;
  /* stylelint-disable-next-line unit-allowed-list */
  width: calc(100vw - 50vh);
  justify-content: space-around;
}

.c-information-modal {
  margin: 0.5rem;
}

.c-info-body {
  text-align: left;
  font-size: 2rem;
  margin: 1rem;
  padding: 0.5rem;
}

.t-s12 .c-info-body {
  font-size: 1.3rem;
  margin: 0;
}

.l-socials {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 7.5rem;
}

.t-s12 .l-socials {
  width: 100%;
  align-self: center;
}
</style>
