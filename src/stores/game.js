import { last, random } from "lodash-es";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { useTimerStore } from "./timer";
import ingredients from "../assets/ingredients.json";

const GAME_TIME_MS = 60 * 1000;
const ORDER_DELAY_MAX_MS = 15 * 1000;
const ORDER_DELAY_SUBTRACT_MS = 2 * 1000;
const ORDER_DELAY_MIN_MS = 15 * 1000;
const ORDER_TIME_MAX_MS = 30 * 1000;
const ORDER_TIME_SUBTRACT_MS = 2 * 1000;
const ORDER_TIME_MIN_MS = 20 * 1000;

function getRemainingTimeForOrder(order, now) {
  const elapsedMs = (now || Date.now()) - order.createdAt;
  return Math.max(0, order.orderTime - elapsedMs);
}

const firstFoodId = "burger";

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
  const foodTemplate = ingredients.foods[foodId];

  const newFood = {
    id: foodId,
    layers: [],
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const ingredient of foodTemplate.ingredients) {
    if (ingredient.type !== "none") {
      break;
    }
    newFood.layers.push({
      type: ingredient.type,
      layerImage: getLayerImage(ingredient, undefined, newFood.layers),
      replace: ingredient.replace,
    });
  }

  return newFood;
}

function createNewOrder(foodId, now, orderTime = ORDER_TIME_MAX_MS) {
  return {
    id: foodId,
    uid: nanoid(),
    createdAt: now || Date.now(),
    orderTime,
    timerSeconds: Math.ceil(orderTime / 1000),
  };
}

export const useGameStore = defineStore("gameStore", {
  state: () => ({
    foodIdSamplePool: [...Object.keys(ingredients.foods)].filter(
      (id) => id !== firstFoodId
    ),
    combinedFoods: [createNewFood(firstFoodId)],
    ingredientSelectorOpen: false,
    ingredientSelection: null,
    orderQueue: [createNewOrder(firstFoodId)],
    score: 0,
    bonusTimeMs: 0,
    orderDelay: ORDER_DELAY_MAX_MS,
    orderTime: ORDER_TIME_MAX_MS,
    currentOrderDone: null,
    currentOrderFailed: null,
    currentOrderTransition: null,
    displays: {
      bonusTime: { created: null, text: "" },
      bonusScore: { created: null, text: "" },
    },
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
      if (state.currentOrderTransition) {
        return [];
      }
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
      if (state.currentFoodDone) {
        return true;
      }
      if (state.currentOrderFailed) {
        return true;
      }
      return false;
    },
  },
  actions: {
    getNextRandomFoodId() {
      const randomIndex = random(this.foodIdSamplePool.length - 1);
      const randomFoodId = this.foodIdSamplePool.splice(randomIndex, 1)[0];
      if (!this.foodIdSamplePool.length) {
        this.foodIdSamplePool.push(...Object.keys(ingredients.foods));
      }
      return randomFoodId;
    },
    tick() {
      // !!!
      // TRY TO NOT UPDATE STATE TOO MUCH (LIKE EVERY TICK) BECAUSE IT MESSES WITH ANIMATIONS
      // !!!
      const now = Date.now();

      // make sure music is playing (browsers sometimes block if no user interation before playing)
      if (window.gameAudio?.music?.paused) {
        window.gameAudio.music.currentTime = 0;
        window.gameAudio.music.play();
      }

      if (this.currentOrderTransition) {
        if (now - this.currentOrderTransition > 250) {
          this.currentOrderTransition = null;
        }
      }

      let failedOrderCleared = false;
      if (this.currentOrderFailed) {
        if (now - this.currentOrderFailed > 2000) {
          this.currentOrderFailed = null;
          failedOrderCleared = true;
        }
      }

      let doneOrderCleared = false;
      if (this.currentOrderDone) {
        if (now - this.currentOrderDone > 2000) {
          this.currentOrderDone = null;
          doneOrderCleared = true;
        }
      }

      Object.keys(this.displays).forEach((key) => {
        const display = this.displays[key];
        if (display.created) {
          if (now - display.created > 2000) {
            display.created = null;
          }
        }
      });

      this.orderQueue.forEach((order) => {
        const remainingMs = getRemainingTimeForOrder(order, now);

        const oldTimerSeconds = order.timerSeconds;
        // ANIM FIX: only update once per second
        order.timerSeconds = Math.ceil(remainingMs / 1000);
        if (order.timerSeconds <= 0 && oldTimerSeconds > 0) {
          if (window.gameAudio?.sounds?.failure) {
            window.gameAudio.sounds.failure.currentTime = 0;
            window.gameAudio.sounds.failure.play();
          }
        }
      });

      // remove all expired items from queue
      for (;;) {
        // ANIM FIX: dont use filter, mutate array instead
        const indexToRemove = this.orderQueue.findIndex((order, i) => {
          const remainingMs = getRemainingTimeForOrder(order, now);
          if (remainingMs <= 0) {
            // first one is the current order
            if (i === 0) {
              this.currentOrderFailed = now;
            }
            return true;
          }
          return false;
        });
        if (indexToRemove === -1) {
          break;
        }
        this.orderQueue.splice(indexToRemove, 1);
      }

      const lastOrder = last(this.orderQueue);
      if (!lastOrder || now - lastOrder.createdAt > this.orderDelay) {
        this.orderDelay = Math.max(
          ORDER_DELAY_MIN_MS,
          this.orderDelay - ORDER_DELAY_SUBTRACT_MS
        );
        this.orderTime = Math.max(
          ORDER_TIME_MIN_MS,
          this.orderTime - ORDER_TIME_SUBTRACT_MS
        );
        const nextFoodId = this.getNextRandomFoodId();
        this.orderQueue.push(createNewOrder(nextFoodId, now, this.orderTime));
      }

      // current food failed, start new one
      if (this.currentOrderFailed === now) {
        this.ingredientSelectorOpen = false;
        this.ingredientSelection = null;
      }

      if (failedOrderCleared || doneOrderCleared) {
        this.currentOrderTransition = now;
        if (failedOrderCleared) {
          this.combinedFoods.pop();
        }
        const nextFood = createNewFood(this.currentOrder.id);
        this.combinedFoods.push(nextFood);
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

      // current food is not completed
      if (!this.currentFoodDone) {
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
            type: ingredient.type,
            layerImage: getLayerImage(
              ingredient,
              this.ingredientSelection,
              this.currentFood.layers
            ),
            quality: this.ingredientSelection,
            replace: ingredient.replace,
          });
          this.ingredientSelection = null;

          if (ingredient.type !== "none") {
            if (window.gameAudio?.sounds?.select) {
              window.gameAudio.sounds.select.currentTime = 0;
              window.gameAudio.sounds.select.play();
            }
          }

          const nextIngredient = foodTemplate.ingredients[i + 1];
          if (ingredient.type !== "none" || nextIngredient?.type !== "none") {
            break;
          }
        }

        if (this.currentFoodDone) {
          const remainingMs = getRemainingTimeForOrder(this.currentOrder, now);
          if (remainingMs) {
            this.bonusTimeMs += remainingMs;
            this.displays.bonusTime.created = now;
            this.displays.bonusTime.text = `+${Math.floor(remainingMs / 1000)}`;

            this.score += 50;
            this.displays.bonusScore.created = now;
            this.displays.bonusScore.text = `+${50}`;

            this.currentOrderDone = now;

            if (window.gameAudio?.sounds?.success) {
              window.gameAudio.sounds.success.currentTime = 0;
              window.gameAudio.sounds.success.play();
            }
          }
          this.orderQueue.shift();
        }
      }
    },
  },
});
