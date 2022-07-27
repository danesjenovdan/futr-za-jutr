<template>
  <div class="food-prep-area constrain-width">
    <div class="layers">
      <TransitionGroup name="layer-list">
        <img
          v-for="layer in gameStore.displayedLayers"
          :key="layer.layerImage"
          :src="layer.layerImage"
          :class="{ replaced: layer.replace }"
        />
      </TransitionGroup>
    </div>
    <IngredientSelector />
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
import IngredientSelector from "./IngredientSelector.vue";

const gameStore = useGameStore();
</script>

<style>
.layer-list-enter-active {
  transition: all 0.5s ease;
}

.layer-list-leave-active {
  transition: all 0.2s ease;
}

.layer-list-enter-from {
  opacity: 0;
  transform: translateY(-25%);
}

.layer-list-enter-from.replaced {
  opacity: 0;
  transform: none;
}

.layer-list-leave-to {
  opacity: 0;
}
</style>

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
