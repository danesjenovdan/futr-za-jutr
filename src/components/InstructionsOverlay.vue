<template>
  <div v-if="gameStore.paused && !gameStore.gameOver" class="modal-bg">
    <div class="constrain-width">
      <div class="top-bubble">
        <div class="text">Glej naročila in pazi na čas!</div>
      </div>
      <div class="bottom-bubble">
        <div class="text">Izbiraj primerne trajnostne sestavine.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.modal-bg {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba($color-dark-1, 0.75);

  .top-bubble,
  .bottom-bubble {
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .text {
      color: $color-dark-1;
      font-size: 1.4rem;
      line-height: 1;
      transform: rotate(-7deg);
    }
  }

  .top-bubble {
    width: 17.9rem;
    height: 9.7rem;
    margin: 4.4rem 3.9rem 0 auto;
    background: url("../assets/images/backgrounds/navodilo-zgoraj.svg");
    padding-top: 5.4rem;
    padding-left: 1.6rem;
  }

  .bottom-bubble {
    width: 17.5rem;
    height: 9.6rem;
    margin: 10.3rem 3.4rem 0 auto;
    background: url("../assets/images/backgrounds/navodilo-spodaj.svg");
    padding-top: 2.7rem;
    padding-left: 3.4rem;
    padding-right: 2rem;
  }
}
</style>
