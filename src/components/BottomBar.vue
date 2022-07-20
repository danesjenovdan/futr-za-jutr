<template>
  <div class="bottom-bar">
    <button class="confirm-button" @click="onButtonClick">
      DODAJ SESTAVINO
    </button>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";

const counterStore = useCounterStore();

function onButtonClick() {
  counterStore.counter += 1;
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .confirm-button {
    padding: 1.1rem 1.3rem;
    border: none;
    background-color: transparent;
    background-image: url("../assets/images/buttons/dodaj-sestavino-gumb.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 1.8rem;
    font-weight: 800;
    font-style: italic;
    line-height: 1;
    color: $color-accent-primary-contrast;
  }
}
</style>
