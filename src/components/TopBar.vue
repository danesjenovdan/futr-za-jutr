<template>
  <div class="top-bar">
    <div class="top-content constrain-width">
      <div class="pills">
        <div class="pill score">
          <img class="icon" src="../assets/images/icons/kovanec.svg" />
          <div class="text">{{ gameStore.score }}</div>
          <Transition name="bonus">
            <div
              v-if="gameStore.displays.bonusScore.created"
              class="text bonus"
            >
              {{ gameStore.displays.bonusScore.text }}
            </div>
          </Transition>
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
          <Transition name="bonus">
            <div v-if="gameStore.displays.bonusTime.created" class="text bonus">
              {{ gameStore.displays.bonusTime.text }}
            </div>
          </Transition>
        </div>
      </div>
      <div class="orders">
        <TransitionGroup name="order-list">
          <div
            v-for="order in gameStore.orderQueue"
            :key="order.uid"
            :class="['order', { warning: order.timerSeconds <= 5 }]"
          >
            <img class="icon" :src="`/food_icons/${order.id}.png`" />
            <div class="text">{{ formatTimer(order.timerSeconds * 1000) }}</div>
          </div>
        </TransitionGroup>
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

<style>
.bonus-enter-active {
  transition: all 0.5s ease;
}

.bonus-leave-active {
  transition: all 0.2s ease;
}

.bonus-enter-from {
  opacity: 0;
}

.bonus-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.order-list-move,
.order-list-enter-active,
.order-list-leave-active {
  transition: all 0.5s ease;
}

.order-list-enter-from,
.order-list-leave-to {
  opacity: 0;
  transform: translateX(50%);
}

.order-list-leave-active {
  position: absolute;
}
</style>

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
        position: relative;
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

          &.bonus {
            position: absolute;
            inset: 2rem 0 auto auto;
            text-align: right;
            color: $color-success !important;
          }
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

            &.bonus {
              padding-right: 1.5rem;
            }
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
      top: 0;
      right: 0;
      overflow: hidden;
      padding: 0.95rem 0rem 3rem 1rem;

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
