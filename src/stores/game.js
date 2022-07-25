import { last, sample } from "lodash-es";
import { defineStore } from "pinia";
import ingredients from "../assets/ingredients.json";

export const MAX_TIME_SECONDS = 120;
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
    ingredientSelectorOptions(state) {
      const foodTemplate = ingredients.foods[state.currentFood.id];
      const numCompletedLayers = state.currentFood.layers.length;
      const ingredientType = foodTemplate.ingredients[numCompletedLayers].type;
      if (!ingredients.ingredients[ingredientType]) {
        return null;
      }
      return ingredients.ingredients[ingredientType];
    },
    continueButtonText(state) {
      if (state.ingredientSelectorOpen) {
        return "POTRDI IZBIRO";
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
      const numCompletedLayers = this.currentFood.layers.length;
      const numIngredients = foodTemplate.ingredients.length;

      // current food is not completed
      if (numCompletedLayers < numIngredients) {
        // open ingredient selector
        if (!this.ingredientSelectorOpen && this.ingredientSelectorOptions) {
          this.ingredientSelectorOpen = true;
          return;
        }

        // confirm ingredient selection
        const nextIngredient = foodTemplate.ingredients[numCompletedLayers];
        this.currentFood.layers.push({
          layerImage: getLayerImage(nextIngredient, this.ingredientSelection),
          quality: this.ingredientSelection,
        });
        this.ingredientSelectorOpen = false;
        this.ingredientSelection = null;
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
