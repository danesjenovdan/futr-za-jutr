<template>
  <div class="food-prep-area">
    <div class="layers">
      <template
        v-for="layer in gameStore.currentFood.layers"
        :key="layer.layerImage"
      >
        <img :src="layer.layerImage" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();
</script>

<style scoped lang="scss">
.food-prep-area {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: white;

  .layers {
    position: relative;
    width: 22rem;
    height: 27.5rem;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
