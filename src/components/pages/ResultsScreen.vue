<template>
  <div class="top">
    <div class="top-content constrain-width">
      <img
        src="../../assets/images/logo-igra.svg"
        alt="Futr za jutr"
        class="logo"
      />
      <div class="summary-box">
        <div class="title">PRIPRAVLJENI OBROKI</div>
        <div class="counts-with-icon">
          <div
            v-for="foodName in foodNames"
            :key="foodName"
            class="count-with-icon"
          >
            <img :src="`/food_icons/${foodName}.png`" />
            <div class="count">{{ foodCounts[foodName] }} x</div>
          </div>
        </div>
        <div class="pills">
          <div class="pill">
            <img class="icon" src="../../assets/images/icons/kovanec.svg" />
            <div class="text">+{{ shareState.score }}</div>
          </div>
        </div>
      </div>
      <div class="summary-box">
        <div class="title">UPORABLJENE SESTAVINE</div>
        <div class="counts-with-icon">
          <div
            v-for="(qualityTitle, qualityName) in qualityNames"
            :key="qualityName"
            class="count-with-icon"
          >
            <img :src="`/quality_icons/${qualityName}.png`" />
            <div class="count">{{ qualityCounts[qualityName] }} x</div>
            <div class="description">{{ qualityTitle }}</div>
          </div>
        </div>
        <div class="pills">
          <div class="pill">
            <img class="icon" src="../../assets/images/icons/kovanec.svg" />
            <div class="text red">-{{ negativeScore }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
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

const negativeScore = computed(() => {
  const layers = shareState.value.foods.flatMap((f) => f.layers);
  const mediumCount = layers.filter((l) => l === "medium").length;
  const worstCount = layers.filter((l) => l === "worst").length;
  return mediumCount * 5 + worstCount * 10;
});

const foodNames = Object.keys(ingredients.foods);
const qualityNames = {
  best: "trajnostne",
  medium: "srednje",
  worst: "netrajnostne",
};

const foodCounts = computed(() => {
  const foods = shareState.value.foods.map((f) => f.id);
  const counts = {};
  foodNames.forEach((foodName) => {
    counts[foodName] = foods.filter((f) => f === foodName).length;
  });
  return counts;
});

const qualityCounts = computed(() => {
  const counts = {};
  const layers = shareState.value.foods.flatMap((f) => f.layers);
  Object.keys(qualityNames).forEach((qualityName) => {
    counts[qualityName] = layers.filter((l) => l === qualityName).length;
  });
  return counts;
});
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.top {
  background-color: $color-dark-1;

  .top-content {
    padding: 1.1rem 1.6rem;

    .logo {
      display: block;
      height: 3rem;
      margin: 0 auto 1rem auto;
    }

    .summary-box {
      margin: 1rem 0;
      padding: 2.4rem 1.8rem 2.2rem 1.3rem;
      background-color: transparent;
      background: url("../../assets/images/backgrounds/rezultat-okvir.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .title {
        color: $color-dark-1;
        font-size: 1.5rem;
        font-weight: 800;
        font-style: italic;
        line-height: 1;
        text-align: center;
      }

      .counts-with-icon {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 1.5rem 0 2rem;

        .count-with-icon {
          position: relative;

          img {
            width: 5rem;
            height: 5rem;
          }

          .count {
            position: absolute;
            inset: auto 0 0 0;
            color: $color-warning-bg;
            font-size: 2rem;
            font-weight: 800;
            font-style: italic;
            line-height: 1;
            text-align: center;
            @include text-stroke($color-black, 0.075em);
          }

          .description {
            position: relative;
            bottom: -1.2em;
            margin: 0 -2em;
            font-size: 1.2rem;
            font-weight: 600;
            font-style: italic;
            line-height: 1;
            text-align: center;
          }
        }
      }

      .pills {
        display: flex;
        justify-content: center;

        .pill {
          display: flex;
          background-color: $color-dark-3;
          border-radius: 10em;
          box-shadow: inset 0 0 1.1rem rgba($color-black, 0.6);

          .icon {
            width: 2.8rem;
            height: 2.8rem;
          }

          .text {
            padding: 0.4rem 1.1rem 0.4rem 0.6rem;
            color: $color-white;
            font-size: 2rem;
            font-weight: 800;
            line-height: 1;
            @include text-stroke($color-black, 0.075em);

            &.red {
              @include text-stroke($color-warning-fg, 0.075em);
            }
          }
        }
      }
    }
  }
}
</style>
