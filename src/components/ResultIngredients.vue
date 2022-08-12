<template>
  <div class="ingredients-wrapper constrain-width">
    <div class="title">UPORABLJENE SESTAVINE</div>
    <div class="ingredients">
      <template
        v-for="(ingredient, ingredientName) in ingredients.ingredients"
        :key="ingredientName"
      >
        <template
          v-for="(qualityTitle, qualityName) in qualityNames"
          :key="qualityTitle"
        >
          <template v-if="usedIngredients.has(ingredient[qualityName].name)">
            <ResultIngredient
              :ingredient="ingredient[qualityName]"
              :quality="qualityName"
            />
            <div class="divider"></div>
          </template>
        </template>
      </template>
    </div>
    <div class="title">NEUPORABLJENE SESTAVINE</div>
    <div class="ingredients">
      <template
        v-for="(ingredient, ingredientName) in ingredients.ingredients"
        :key="ingredientName"
      >
        <template
          v-for="(qualityTitle, qualityName) in qualityNames"
          :key="qualityTitle"
        >
          <template v-if="!usedIngredients.has(ingredient[qualityName].name)">
            <ResultIngredient
              :ingredient="ingredient[qualityName]"
              :quality="qualityName"
            />
            <div class="divider"></div>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { qualityNames } from "../helpers/names";
import ingredients from "../assets/ingredients.json";
import ResultIngredient from "./ResultIngredient.vue";

const props = defineProps({
  shareState: {
    type: Object,
    required: true,
  },
});

const usedIngredients = computed(() => {
  const used = new Set();
  props.shareState.foods.forEach((food) => {
    const foodIngredientTypes = ingredients.foods[food.id].ingredients
      .map((i) => i.type)
      .filter((t) => t !== "none");
    for (let i = 0; i < 4; i += 1) {
      const type = foodIngredientTypes[i];
      const quality = food.layers[i];
      used.add(ingredients.ingredients[type][quality].name);
    }
  });
  return used;
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.ingredients-wrapper {
  padding: 0 2rem 1.1rem 2rem;

  .title {
    padding-top: 2rem;
    color: $color-dark-1;
    font-size: 1.8rem;
    font-weight: 800;
    font-style: italic;
    text-align: center;
  }

  .ingredients {
    .divider {
      height: 0.9rem;
      background-color: transparent;
      background-image: url("../assets/images/backgrounds/divider-moder.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
  }
}
</style>
