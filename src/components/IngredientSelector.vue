<template>
  <Transition name="ingredient-selector">
    <div v-if="gameStore.ingredientSelectorOpen" class="ingredient-selector">
      <div class="shadow-container">
        <div class="clipped-container">
          <div class="constrain-width">
            <div class="ingredients">
              <button
                :class="[
                  'ingredient',
                  {
                    selected:
                      shuffledOptions[0].quality ===
                      gameStore.ingredientSelection,
                  },
                ]"
                @click="selectOption(0)"
              >
                <div class="icon">
                  <img :src="shuffledOptions[0].icon" />
                </div>
                <div class="text">{{ shuffledOptions[0].name }}</div>
              </button>
              <button
                :class="[
                  'ingredient',
                  {
                    selected:
                      shuffledOptions[1].quality ===
                      gameStore.ingredientSelection,
                  },
                ]"
                @click="selectOption(1)"
              >
                <div class="icon">
                  <img :src="shuffledOptions[1].icon" />
                </div>
                <div class="text">{{ shuffledOptions[1].name }}</div>
              </button>
              <button
                :class="[
                  'ingredient',
                  {
                    selected:
                      shuffledOptions[2].quality ===
                      gameStore.ingredientSelection,
                  },
                ]"
                @click="selectOption(2)"
              >
                <div class="icon">
                  <img :src="shuffledOptions[2].icon" />
                </div>
                <div class="text">{{ shuffledOptions[2].name }}</div>
              </button>
            </div>
            <div class="divider">
              <!-- TODO: arrow triangle on selection -->
            </div>
            <div class="description">{{ description }}</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { shuffle } from "lodash-es";
import { computed } from "vue";
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();

const description = computed(() => {
  const options = gameStore.ingredientSelectorOptions;
  const selection = gameStore.ingredientSelection;
  return options[selection]?.description || "Izberi sestavino!";
});

const shuffledOptions = computed(() => {
  return shuffle([
    {
      ...gameStore.ingredientSelectorOptions.best,
      quality: "best",
    },
    {
      ...gameStore.ingredientSelectorOptions.medium,
      quality: "medium",
    },
    {
      ...gameStore.ingredientSelectorOptions.worst,
      quality: "worst",
    },
  ]);
});

function selectOption(index) {
  gameStore.ingredientSelection = shuffledOptions.value[index].quality;
}
</script>

<style>
.ingredient-selector-enter-active {
  transition: all 0.5s ease;
}

.ingredient-selector-leave-active {
  transition: all 0.2s ease;
}

.ingredient-selector-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.ingredient-selector-leave-to {
  opacity: 0;
  transform: translateY(33%);
}
</style>

<style scoped lang="scss">
@import "../assets/scss/variables";

.ingredient-selector {
  position: absolute;
  inset: auto 0 0 0;
  overflow: hidden;

  .shadow-container {
    margin-top: 3rem;
    filter: drop-shadow(0 0 1rem rgba($color-white, 0.25));

    .clipped-container {
      padding: 2.7rem 2.1rem 1.5rem;
      background: $color-dark-1;
      margin-inline: -1px;
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
}
</style>
