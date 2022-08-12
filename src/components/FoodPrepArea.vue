<template>
  <div class="food-prep-area">
    <div class="food-prep-bg"></div>
    <div
      :class="[
        'layers-container',
        'constrain-width',
        {
          hidden: gameStore.currentOrderTransition,
          'slide-out': gameStore.currentOrderDone,
        },
      ]"
    >
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
      <div class="current-order-display">
        <div class="order-name">
          <img :src="`/food_icons/${gameStore.currentFood.id}.png`" />
          {{ currentFoodName }}
        </div>
        <div
          v-if="!gameStore.currentOrderFailed && !gameStore.currentFoodDone"
          class="order-time"
        >
          {{ formatTimer(gameStore.currentOrder.timerSeconds * 1000) }}
        </div>
        <div v-if="gameStore.currentOrderFailed" class="failure-text bounce-in">
          Čas je potekel!
        </div>
      </div>
    </div>
    <IngredientSelector />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "../stores/game";
import { formatTimer } from "../helpers/formatTimer";
import IngredientSelector from "./IngredientSelector.vue";

const gameStore = useGameStore();

const foodNames = {
  burger: "BURGER",
  pie: "PITA",
  salad: "SOLATA",
  soup: "JUHA",
  taco: "TACO",
};

const currentFoodName = computed(() => {
  return foodNames[gameStore.currentFood.id];
});
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

@keyframes slide-out {
  from {
    transform: none;
  }

  to {
    transform: translateX(100vw);
  }
}

.bounce-in {
  animation-duration: 1s;
  animation-name: bounce-in;
}

.slide-out {
  animation-delay: 1s;
  animation-duration: 1s;
  animation-name: slide-out;
  animation-fill-mode: forwards;
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

    &.hidden {
      visibility: hidden;
    }

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

    .current-order-display {
      position: absolute;
      inset: 0;
      padding-top: 8rem;

      .order-name {
        margin-bottom: 1rem;
        color: $color-white;
        font-size: 3rem;
        font-weight: 800;
        line-height: 1;
        text-align: center;
        @include text-stroke($color-black, 0.05em);

        img {
          height: 1em;
          transform: translateX(-5%) translateY(-5%) scale(1.33);
        }
      }

      .order-time {
        color: $color-white;
        font-size: 5rem;
        font-weight: 800;
        line-height: 1;
        text-align: center;
        @include text-stroke($color-black, 0.05em);
      }

      .failure-text {
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
