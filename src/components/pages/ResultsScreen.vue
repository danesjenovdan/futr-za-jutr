<template>
  <div>
    <div>RESULTS</div>
    <div>{{ shareState }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import ingredients from "../../assets/ingredients.json";

const route = useRoute();

function decodeFood(f) {
  const numbers = String(Number.parseInt(f, 36)).padStart(5, "0");
  const [foodNum, ...qualityNums] = numbers;
  const numToFood = (i) => Object.keys(ingredients.foods)[i];
  const numToQuality = (i) => ["best", "medium", "worst"][i];
  return {
    id: numToFood(foodNum),
    layers: qualityNums.map((q) => numToQuality(q)),
  };
}

const shareState = computed(() => {
  const [encodedScore, encodedTime, ...encodedFoods] = route.query.s.split(";");
  return {
    time: Number.parseInt(encodedTime, 36),
    score: Number.parseInt(encodedScore, 36),
    foods: encodedFoods.map((f) => decodeFood(f)),
  };
});
</script>
