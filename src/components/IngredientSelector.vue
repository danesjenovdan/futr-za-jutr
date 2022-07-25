<template>
  <div v-if="gameStore.ingredientSelectorOpen" class="ingredient-selector">
    <div class="clipped-container">
      <div class="ingredients">
        <button
          :class="[
            'ingredient',
            { selected: gameStore.ingredientSelection === 'best' },
          ]"
          @click="gameStore.ingredientSelection = 'best'"
        >
          <div class="icon">
            <img :src="gameStore.ingredientSelectorOptions.best.icon" />
          </div>
          <div class="text">
            {{ gameStore.ingredientSelectorOptions.best.name }}
          </div>
        </button>
        <button
          :class="[
            'ingredient',
            { selected: gameStore.ingredientSelection === 'medium' },
          ]"
          @click="gameStore.ingredientSelection = 'medium'"
        >
          <div class="icon">
            <img :src="gameStore.ingredientSelectorOptions.medium.icon" />
          </div>
          <div class="text">
            {{ gameStore.ingredientSelectorOptions.medium.name }}
          </div>
        </button>
        <button
          :class="[
            'ingredient',
            { selected: gameStore.ingredientSelection === 'worst' },
          ]"
          @click="gameStore.ingredientSelection = 'worst'"
        >
          <div class="icon">
            <img :src="gameStore.ingredientSelectorOptions.worst.icon" />
          </div>
          <div class="text">
            {{ gameStore.ingredientSelectorOptions.worst.name }}
          </div>
        </button>
      </div>
      <div class="divider">
        <!-- TODO: arrow triangle on selection -->
      </div>
      <div class="description">Izberi sestavino!</div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.ingredient-selector {
  position: absolute;
  inset: auto 0 0 0;
  filter: drop-shadow(0 0 1rem rgba($color-white, 0.25));

  .clipped-container {
    padding: 2.7rem 2.1rem 1.5rem;
    background: $color-dark-1;
    clip-path: polygon(0% 0%, 100% 1.4rem, 100% 100%, 0% 100%);

    .ingredients {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .ingredient {
        flex: 0 0 0%;
        border: none;
        background: transparent;
        padding: 0;

        .icon {
          width: 9.4rem;
          height: 9.6rem;
          padding: 1.3rem 1.2rem;
          background-color: transparent;
          background-image: url("../assets/images/backgrounds/okvir-moder.svg");
          background-repeat: no-repeat;
          background-size: 100% 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        &.selected {
          .icon {
            background-image: url("../assets/images/backgrounds/okvir-zelen.svg");
          }
        }

        .text {
          margin: 0.7rem 0;
          color: $color-subtle;
          font-size: 1.2rem;
          font-weight: 600;
          font-style: italic;
          line-height: 1.2;
          text-align: center;
        }
      }
    }

    .divider {
      height: 0.9rem;
      margin-bottom: 1.5rem;
      background-color: transparent;
      background-image: url("../assets/images/backgrounds/divider.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: bottom center;
    }

    .description {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 2.4em;
      color: $color-white;
      font-weight: 300;
      line-height: 1.2;
      text-align: center;
    }
  }
}
</style>
