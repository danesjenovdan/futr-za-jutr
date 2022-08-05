<template>
  <div class="food-prep-area">
    <div class="food-prep-bg"></div>
    <div class="layers-container constrain-width">
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
  height: 100%;

  .food-prep-bg {
    position: absolute;
    inset: 0;
    background: rgba(#fff, 0.6);
    clip-path: polygon(0% 78%, 50% 61%, 100% 78%, 100% 100%, 0% 100%);
  }

  .layers-container {
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

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
