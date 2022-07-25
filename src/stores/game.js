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

function getLayerImage(ingredient) {
  return ingredient.layer_image || ingredient.layer_images[0];
}

function createNewFood(foodId) {
  const nextFoodId =
    foodId && ingredients.foods[foodId] ? foodId : getRandomFoodId();
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
  }),
  getters: {
    currentFood(state) {
      return last(state.foods);
    },
    continueButtonText(state) {
      if (state.ingredientSelectorOpen) {
        return "POTRDI IZBIRO";
      }
      return "DODAJ SESTAVINO";
    },
  },
  actions: {
    continueFoodPrep() {
      if (!this.currentFood) {
        return;
      }

      if (this.paused) {
        this.paused = false;
      }

      const foodTemplate = ingredients.foods[this.currentFood.id];
      const numCompletedLayers = this.currentFood.layers.length;
      const numIngredients = foodTemplate.ingredients.length;

      // current food is not completed
      if (numCompletedLayers < numIngredients) {
        const nextIngredient = foodTemplate.ingredients[numCompletedLayers];
        this.currentFood.layers.push({
          layerImage: getLayerImage(nextIngredient),
        });
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
