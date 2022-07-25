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
    <IngredientSelector />
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
import IngredientSelector from "./IngredientSelector.vue";

const gameStore = useGameStore();
</script>

<style scoped lang="scss">
.food-prep-area {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  background-image: url("../assets/images/backgrounds/foodprepbg.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom center;

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
