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

function createNewFood(foodId) {
  const nextFoodId =
    foodId && ingredients.foods[foodId] ? foodId : getRandomFoodId();
  const foodTemplate = ingredients.foods[nextFoodId];

  const newFood = {
    id: nextFoodId,
    layers: [],
  };

  for (let i = 0; i < foodTemplate.ingredients.length; i += 1) {
    const nextIngredient = foodTemplate.ingredients[i];

    if (nextIngredient.type !== "none") {
      break;
    }

    const nextLayerImage =
      nextIngredient.layer_image || nextIngredient.layer_images[0];

    newFood.layers.push({
      layerImage: nextLayerImage,
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
    foods: [createNewFood("burger")],
  }),
  getters: {
    currentFood(state) {
      return last(state.foods);
    },
  },
  actions: {
    continueFoodPrep() {
      if (!this.currentFood) {
        return;
      }

      if (this.paused) {
        this.paused = false;
        return;
      }

      const foodTemplate = ingredients.foods[this.currentFood.id];
      const completedLayers = this.currentFood.layers.length;

      if (completedLayers < foodTemplate.ingredients.length) {
        // current food is not completed
        const nextIngredient = foodTemplate.ingredients[completedLayers];
        const nextLayerImage =
          nextIngredient.layer_image || nextIngredient.layer_images[0];

        this.currentFood.layers.push({
          layerImage: nextLayerImage,
        });
      } else if (this.foods.length === 4) {
        // all foods completed
        this.paused = true;
        this.gameOver = true;
      } else {
        // current food completed, start new one
        const nextFood = createNewFood();
        this.foods.push(nextFood);
      }
    },
  },
});
