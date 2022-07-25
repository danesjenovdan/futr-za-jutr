<template>
  <div class="top">
    <TopBar />
  </div>
  <div class="main-area">
    <FoodPrepArea />
  </div>
  <div class="bottom">
    <BottomBar />
  </div>
  <GameOverModal />
</template>

<script setup>
import TopBar from "../TopBar.vue";
import BottomBar from "../BottomBar.vue";
import FoodPrepArea from "../FoodPrepArea.vue";
import GameOverModal from "../GameOverModal.vue";
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.top {
  flex: 0 0 4.4rem;
  background: $color-dark-2;
}

.main-area {
  flex: 1 1 0%;
  background: $color-dark-1;
}

.bottom {
  flex: 0 0 6.4rem;
  background: $color-dark-2;
}
</style>
