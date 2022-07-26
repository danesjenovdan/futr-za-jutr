import { last, sample } from "lodash-es";
import { defineStore } from "pinia";
import ingredients from "../assets/ingredients.json";

export const MAX_TIME_SECONDS = 90;
const SCORING_INGREDIENTS = Object.keys(ingredients.ingredients);

console.log(SCORING_INGREDIENTS);

function getRandomFoodId() {
  const keys = Object.keys(ingredients.foods);
  return sample(keys);
}

function getLayerImage(ingredient, quality) {
  if (ingredient.layer_image) {
    return ingredient.layer_image;
  }
  const key = quality || "best";
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
      layerImage: getLayerImage(ingredient),
      replace: ingredient.replace,
    });
  }

  return newFood;
}

export const useGameStore = defineStore("gameStore", {
  state: () => ({
    maxTimeSeconds: MAX_TIME_SECONDS,
    remainingTimeMs: MAX_TIME_SECONDS * 1000,
    paused: true,
    gameOver: false,
    foods: [createNewFood("pie")],
    ingredientSelectorOpen: false,
    ingredientSelection: null,
  }),
  getters: {
    currentFood(state) {
      return last(state.foods);
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
      if (state.paused && !state.gameOver) {
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
    continueFoodPrep() {
      if (!this.currentFood || this.continueButtonDisabled) {
        return;
      }

      if (this.paused) {
        this.paused = false;
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
            layerImage: getLayerImage(ingredient, this.ingredientSelection),
            quality: this.ingredientSelection,
            replace: ingredient.replace,
          });
          this.ingredientSelection = null;

          const nextIngredient = foodTemplate.ingredients[i + 1];
          if (ingredient.type !== "none" || nextIngredient?.type !== "none") {
            break;
          }
        }

        return;
      }

      // all foods completed
      if (this.foods.length === 4) {
        this.paused = true;
        this.gameOver = true;
        return;
      }

      // current food completed, start new one
      const nextFood = createNewFood();
      this.foods.push(nextFood);
    },
  },
});
