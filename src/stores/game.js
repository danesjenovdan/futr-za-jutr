import { last, sample } from "lodash-es";
import { defineStore } from "pinia";
import ingredients from "../assets/ingredients.json";

function getRandomFoodId() {
  const keys = Object.keys(ingredients.foods);
  return sample(keys);
}

export const useGameStore = defineStore("gameStore", {
  state: () => ({
    paused: false,
    gameOver: false,
    foods: [
      {
        id: "burger",
        layers: [
          {
            layerImage: ingredients.foods.burger.ingredients[0].layer_image,
          },
        ],
      },
    ],
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

      // console.log(this.currentFood);
      // console.log(ingredients.foods);

      const food = ingredients.foods[this.currentFood.id];
      const completedLayers = this.currentFood.layers.length;

      if (completedLayers < food.ingredients.length) {
        const nextIngredient = food.ingredients[completedLayers];
        const nextLayerImage =
          nextIngredient.layer_image || nextIngredient.layer_images[0];

        this.currentFood.layers.push({
          layerImage: nextLayerImage,
        });
      } else if (this.foods.length === 2) {
        // alert("CONGRATZ, TODO: open modal here");
        // this.router.push({ name: "results" });
        this.gameOver = true;
      } else {
        // console.log(this.foods);

        const nextFoodId = getRandomFoodId();

        this.foods.push({
          id: nextFoodId,
          layers: [],
        });
      }
    },
  },
});
