<script>
export default {
  name: "TransientUniverseTab"
};
</script>

<template>
  <div class="l-universe-tab-container">
    <div class="universe-text">
      <br>
      <div>
        <b>
          우주는 v2.0 이전에는 내용을 드러내지 않습니다.
        </b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.universe-text {
  font-size: 2rem;
  color: var(--color-antimatter);
}

.l-universe-tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
