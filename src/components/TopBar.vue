<template>
  <div class="top-bar">
    <div class="top-content">
      <div class="pill points">
        <img class="icon" src="../assets/images/icons/kovanec.svg" alt="" />
        <div class="text">132</div>
      </div>
      <div class="pill time">
        <img class="icon" src="../assets/images/icons/ura.svg" alt="" />
        <div class="text">{{ formattedTimer }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useGameStore, MAX_TIME_SECONDS } from "../stores/game";
import { useTimer } from "../composables/useTimer";

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

const formattedTimer = computed(() => {
  const seconds = Math.ceil(gameStore.remainingTimeMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds % 60).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
});
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.top-bar {
  display: flex;
  height: 100%;

  .top-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0 1.3rem;

    .pill {
      display: flex;
      background-color: $color-dark-1;
      border-radius: 10em;

      .icon {
        width: 2.5rem;
        height: 2.5rem;
      }

      .text {
        padding: 0.6rem 1.1rem 0.4rem 0.6rem;
        color: $color-white;
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1;
      }
    }
  }
}
</style>
