<template>
  <div class="top-bar">
    <div class="top-content constrain-width">
      <div class="pills">
        <div class="pill score">
          <img class="icon" src="../assets/images/icons/kovanec.svg" />
          <div class="text">{{ gameStore.score }}</div>
        </div>
        <div
          :class="[
            'pill',
            'time',
            { warning: gameStore.remainingTimeMs <= 5000 },
          ]"
        >
          <img class="icon" src="../assets/images/icons/ura.svg" />
          <div class="text">{{ formatTimer(gameStore.remainingTimeMs) }}</div>
        </div>
      </div>
      <div class="orders">
        <template v-for="order in gameStore.orderQueue" :key="order.createdAt">
          <div :class="['order', { warning: order.remainingTimeMs <= 5000 }]">
            <img class="icon" :src="`/food_icons/${order.id}.png`" />
            <div class="text">{{ formatTimer(order.remainingTimeMs) }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();

function formatTimer(remainingMs) {
  const seconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds % 60).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.top-bar {
  display: flex;
  height: 100%;
  padding: 0 1.3rem;

  .top-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .pills {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .pill {
        display: flex;
        background-color: $color-dark-1;
        border-radius: 10em;
        box-shadow: inset 0 0 1.1rem rgba($color-black, 0.6);

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

        &.score {
          .text {
            min-width: 4rem;
            text-align: right;
          }
        }

        &.time {
          .text {
            min-width: 5.1rem;
          }
        }

        &.warning {
          background-color: $color-warning-bg;

          .text {
            color: $color-warning-fg;
          }
        }
      }
    }

    .orders {
      position: absolute;
      top: 0.95rem;
      right: 0;

      .order {
        display: flex;
        margin-bottom: 0.6rem;
        background-color: $color-white;
        border-radius: 10em 0 0 10em;
        box-shadow: inset 0 0 1.1rem rgba($color-black, 0.6);

        .icon {
          width: 2.5rem;
          height: 2.5rem;
          transform: translateX(-5%) scale(1.33);
        }

        .text {
          min-width: 5.2rem;
          padding: 0.6rem 1.1rem 0.4rem 0.6rem;
          color: $color-dark-1;
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
        }

        &.warning {
          background-color: $color-warning-bg;

          .text {
            color: $color-warning-fg;
          }
        }
      }
    }
  }
}
</style>
