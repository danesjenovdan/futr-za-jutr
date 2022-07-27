import { last, sample } from "lodash-es";
import { defineStore } from "pinia";
import { useTimerStore } from "./timer";
import ingredients from "../assets/ingredients.json";

const ORDER_TIME_MS = 30 * 1000;
const GAME_TIME_MS = 90 * 1000;
const ORDER_DELAY_MAX_MS = 20 * 1000;
const ORDER_DELAY_SUBTRACT_MS = 2 * 1000;
const ORDER_DELAY_MIN_MS = 5 * 1000;

function getRandomFoodId() {
  const keys = Object.keys(ingredients.foods);
  return sample(keys);
}

function getLayerImage(ingredient, quality, layers) {
  if (ingredient.layer_image) {
    return ingredient.layer_image;
  }
  let key = quality;
  if (ingredient.layer_image_from_index != null) {
    key = layers[ingredient.layer_image_from_index]?.quality;
  }
  if (!key) {
    key = "best";
  }
  return ingredient.layer_images[key];
}

function createNewFood(foodId) {
  let nextFoodId = foodId;
  if (!nextFoodId || !ingredients.foods[nextFoodId]) {
    nextFoodId = getRandomFoodId();
  }
  const foodTemplate = ingredients.foods[nextFoodId];

  const newFood = {
    id: nextFoodId,
    layers: [],
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const ingredient of foodTemplate.ingredients) {
    if (ingredient.type !== "none") {
      break;
    }
    newFood.layers.push({
      layerImage: getLayerImage(ingredient, undefined, newFood.layers),
      replace: ingredient.replace,
    });
  }

  return newFood;
}

function createNewOrder(foodId, now) {
  let nextFoodId = foodId;
  if (!nextFoodId || !ingredients.foods[nextFoodId]) {
    nextFoodId = getRandomFoodId();
  }

  return {
    id: nextFoodId,
    createdAt: now || Date.now(),
    remainingTimeMs: ORDER_TIME_MS,
  };
}

export const useGameStore = defineStore("gameStore", {
  state: () => ({
    combinedFoods: [createNewFood("pie")],
    ingredientSelectorOpen: false,
    ingredientSelection: null,
    orderQueue: [createNewOrder("pie")],
    score: 0,
    bonusTimeMs: 0,
    orderDelay: ORDER_DELAY_MAX_MS,
  }),
  getters: {
    remainingTimeMs(state) {
      const timerStore = useTimerStore();
      return Math.max(
        0,
        GAME_TIME_MS + state.bonusTimeMs - timerStore.elapsedMs
      );
    },
    gameOver(state) {
      return state.remainingTimeMs <= 0;
    },
    currentFood(state) {
      return last(state.combinedFoods);
    },
    currentOrder(state) {
      return state.orderQueue[0];
    },
    currentIngredientType(state) {
      const foodTemplate = ingredients.foods[state.currentFood.id];
      const numDone = state.currentFood.layers.length;
      const ingredient = foodTemplate.ingredients[numDone];
      return ingredient?.type;
    },
    currentFoodDone(state) {
      const foodTemplate = ingredients.foods[state.currentFood.id];
      const numDone = state.currentFood.layers.length;
      const numIngredients = foodTemplate.ingredients.length;
      return numDone >= numIngredients;
    },
    displayedLayers(state) {
      const lastLayer = last(state.currentFood.layers);
      if (lastLayer?.replace) {
        return [lastLayer];
      }
      return state.currentFood.layers;
    },
    ingredientSelectorOptions(state) {
      return ingredients.ingredients[state.currentIngredientType];
    },
    continueButtonText(state) {
      const timerStore = useTimerStore();
      if (!timerStore.started) {
        return "ZAČNI IGRO";
      }
      if (state.ingredientSelectorOpen) {
        return "POTRDI IZBIRO";
      }
      if (state.currentFoodDone) {
        return "NASLEDNJA JED";
      }
      if (state.currentIngredientType === "none") {
        return "ZAKLJUČI JED";
      }
      return "DODAJ SESTAVINO";
    },
    continueButtonDisabled(state) {
      if (state.ingredientSelectorOpen && !state.ingredientSelection) {
        return true;
      }
      return false;
    },
  },
  actions: {
    tick() {
      const now = Date.now();

      // update remaining time on all orders
      this.orderQueue.forEach((order) => {
        const elapsedMs = now - order.createdAt;
        order.remainingTimeMs = Math.max(0, ORDER_TIME_MS - elapsedMs);
      });

      // remove all expired items from queue
      this.orderQueue = this.orderQueue.filter((order, i) => {
        // first one is the current order
        if (i === 0) {
          return true;
        }
        return order.remainingTimeMs > 0;
      });

      const lastOrder = last(this.orderQueue);
      if (now - lastOrder.createdAt > this.orderDelay) {
        this.orderQueue.push(createNewOrder(undefined, now));
        this.orderDelay = Math.max(
          ORDER_DELAY_MIN_MS,
          this.orderDelay - ORDER_DELAY_SUBTRACT_MS
        );
      }
    },
    continueFoodPrep() {
      const timerStore = useTimerStore();
      const now = Date.now();

      if (!this.currentFood || this.continueButtonDisabled) {
        return;
      }

      if (!timerStore.started) {
        timerStore.start();
        this.currentOrder.createdAt = now;
        if (this.ingredientSelectorOptions) {
          this.ingredientSelectorOpen = true;
          return;
        }
      }

      const foodTemplate = ingredients.foods[this.currentFood.id];
      const numDone = this.currentFood.layers.length;
      const numIngredients = foodTemplate.ingredients.length;

      // current food is not completed
      if (numDone < numIngredients) {
        // open ingredient selector
        if (!this.ingredientSelectorOpen && this.ingredientSelectorOptions) {
          this.ingredientSelectorOpen = true;
          return;
        }

        // confirm ingredient selection
        this.ingredientSelectorOpen = false;

        for (let i = numDone; i < foodTemplate.ingredients.length; i += 1) {
          const ingredient = foodTemplate.ingredients[i];
          this.currentFood.layers.push({
            layerImage: getLayerImage(
              ingredient,
              this.ingredientSelection,
              this.currentFood.layers
            ),
            quality: this.ingredientSelection,
            replace: ingredient.replace,
          });
          this.ingredientSelection = null;

          const nextIngredient = foodTemplate.ingredients[i + 1];
          if (ingredient.type !== "none" || nextIngredient?.type !== "none") {
            break;
          }
        }

        if (this.currentFood.layers.length >= numIngredients) {
          if (this.currentOrder.remainingTimeMs) {
            this.bonusTimeMs += this.currentOrder.remainingTimeMs;
            this.score += 50;
          }
          this.orderQueue.shift();

          // if queue is empty immediately add a new order
          if (!this.currentOrder) {
            this.orderQueue.push(createNewOrder(undefined, now));
            this.orderDelay = Math.max(
              ORDER_DELAY_MIN_MS,
              this.orderDelay - ORDER_DELAY_SUBTRACT_MS
            );
          }
        }

        return;
      }

      // current food completed, start new one
      const nextFood = createNewFood(this.currentOrder.id);
      this.combinedFoods.push(nextFood);
    },
  },
});
