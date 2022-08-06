<template>
  <div class="food-prep-area">
    <div class="food-prep-bg"></div>
    <div class="layers-container constrain-width">
      <div
        :class="[
          'shine',
          {
            'bounce-in': gameStore.currentFoodDone,
            show: gameStore.currentFoodDone,
          },
        ]"
      >
        <img src="../assets/images/hrana-shine-small.png" />
      </div>
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
      <div
        :class="[
          'announcement',
          {
            'bounce-in': gameStore.currentOrderFailed,
            show: gameStore.currentOrderFailed,
          },
        ]"
      >
        <div class="text">Čas je potekel!</div>
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

@keyframes bounce-in {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bounce-in {
  animation-duration: 1s;
  animation-name: bounce-in;
}
</style>

<style scoped lang="scss">
@import "../assets/scss/variables";

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

    .shine {
      position: absolute;
      inset: 0;
      padding-top: 8rem;
      opacity: 0;

      &.show {
        opacity: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
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

    .announcement {
      position: absolute;
      inset: 0;
      padding-top: 12rem;
      opacity: 0;

      &.show {
        opacity: 1;
      }

      .text {
        color: $color-white;
        font-size: 3rem;
        font-weight: 800;
        line-height: 1;
        text-align: center;
        @include text-stroke($color-black, 0.05em);
      }
    }
  }
}
</style>
