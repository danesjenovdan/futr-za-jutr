<template>
  <div v-if="gameStore.gameOver" class="modal-bg">
    <div class="modal">
      <div>Zmanjkalo ti je časa!</div>
      <div>image</div>
      <div>
        <p>V resničnem življenju pri izbiri hrane ne rabiš hiteti.</p>
        <p>Pomembno je, katere sestavine uporabiš!</p>
      </div>
      <div>
        <button type="button" @click="onResultsClick">POGLEJ REZULTAT</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";

const router = useRouter();
const gameStore = useGameStore();

function onResultsClick() {
  // TODO: add score and stuff to results url
  router.push({ name: "results" });
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.modal-bg {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba($color-dark-1, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 30.6rem;
    padding: 4.2rem 2.8rem 3.5rem 3.8rem;
    background-color: transparent;
    background: url("../assets/images/backgrounds/obvestilo-okvir.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }
}
</style>
