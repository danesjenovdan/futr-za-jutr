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
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTimerStore } from "../../stores/timer";
import { useGameStore } from "../../stores/game";
import TopBar from "../TopBar.vue";
import BottomBar from "../BottomBar.vue";
import FoodPrepArea from "../FoodPrepArea.vue";
import InstructionsOverlay from "../InstructionsOverlay.vue";
import GameOverModal from "../GameOverModal.vue";
import ImagePreloader from "../ImagePreloader.vue";

const router = useRouter();
const route = useRoute();
const timerStore = useTimerStore();
const gameStore = useGameStore();

watch(
  () => gameStore.gameOver,
  (value) => value && timerStore.stop()
);

watch(
  () => gameStore.remainingTimeMs,
  () => gameStore.tick()
);

onMounted(() => {
  if (route.query.reset) {
    timerStore.$reset();
    gameStore.$reset();
    router.replace({ name: "game" });
  }
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
