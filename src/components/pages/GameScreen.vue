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
  <InstructionsOverlay />
  <GameOverModal />
  <ImagePreloader />
</template>

<script setup>
import { onMounted, onUnmounted, watch } from "vue";
import { useGameStore, MAX_TIME_SECONDS } from "../../stores/game";
import { useTimer } from "../../composables/useTimer";
import TopBar from "../TopBar.vue";
import BottomBar from "../BottomBar.vue";
import FoodPrepArea from "../FoodPrepArea.vue";
import InstructionsOverlay from "../InstructionsOverlay.vue";
import GameOverModal from "../GameOverModal.vue";
import ImagePreloader from "../ImagePreloader.vue";

const gameStore = useGameStore();

const { remainingMs, start, stop } = useTimer(MAX_TIME_SECONDS, {
  autoStart: false,
});

watch(remainingMs, (newValue) => {
  gameStore.remainingTimeMs = newValue;
  if (newValue <= 0) {
    gameStore.paused = true;
    gameStore.gameOver = true;
  }
});

watch(
  () => gameStore.paused,
  (newValue) => {
    if (!newValue) {
      start();
    } else {
      stop();
    }
  }
);

onMounted(() => {
  //
});

onUnmounted(() => {
  //
});
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
  position: relative;
  z-index: 600;
  flex: 0 0 6.4rem;
  background: $color-dark-2;
}
</style>
