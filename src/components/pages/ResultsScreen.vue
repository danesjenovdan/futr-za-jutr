<template>
  <div class="scroll-container">
    <div class="top">
      <div class="top-content constrain-width">
        <img
          src="../../assets/images/logo-igra.svg"
          alt="Futr za jutr"
          class="logo"
        />
        <div class="final-score">
          <div class="stars">
            <div v-for="i in 3" :key="i" class="star">
              <img
                v-if="i > stars"
                src="../../assets/images/icons/zvezda-prazna.svg"
              />
              <img v-else src="../../assets/images/icons/zvezda.svg" />
            </div>
          </div>
          <div class="score">
            {{ shareState.score - negativeScore }}
          </div>
        </div>
        <div class="summary-box">
          <div class="title">Pripravljene jedi</div>
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
          <div class="title">Uporabljene sestavine</div>
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
        <div class="buttons">
          <button
            type="button"
            class="retry-button"
            @click="$router.push({ name: 'game', query: { reset: 'true' } })"
          >
            Želim se ponovno preizkusiti!
          </button>
          <button type="button" class="share-button" @click="share">
            DELI REZULTAT
          </button>
        </div>
      </div>
    </div>
    <div class="jagged-divider">
      <div class="shadow-container">
        <div class="clipped-container"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-content constrain-width">
        <div class="title">SESTAVINE</div>
        <div class="ingredients">
          <template
            v-for="(ingredient, ingredientName) in ingredients.ingredients"
            :key="ingredientName"
          >
            <template
              v-for="(qualityTitle, qualityName) in qualityNames"
              :key="qualityTitle"
            >
              <div class="ingredient">
                <div class="header">
                  <div :class="['icon', qualityName]">
                    <img :src="ingredient[qualityName].icon" />
                  </div>
                  <div class="info">{{ ingredient[qualityName].name }}</div>
                </div>
                <div class="description">
                  {{ ingredient[qualityName].long_description }}
                </div>
              </div>
              <div class="divider"></div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
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
  best: "trajnostna",
  medium: "sprejemljiva",
  worst: "netrajnostna",
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

const stars = computed(() => {
  const sum =
    qualityCounts.value.best +
    qualityCounts.value.medium +
    qualityCounts.value.worst;
  const bestPercent = qualityCounts.value.best / sum;
  if (bestPercent >= 0.75) {
    return 3;
  }
  if (bestPercent >= 0.5) {
    return 2;
  }
  if (bestPercent >= 0.25) {
    return 1;
  }
  return 0;
});

// share
const clipboardWorks = ref(true);

const resultIngredientsString = computed(() => {
  const best =
    // eslint-disable-next-line no-nested-ternary
    qualityCounts.value.best === 1
      ? `je bila ${qualityCounts.value.best} trajnostna`
      : // eslint-disable-next-line no-nested-ternary
      qualityCounts.value.best === 2
      ? `sta bili ${qualityCounts.value.best} trajnostni`
      : qualityCounts.value.best < 5
      ? `so bile ${qualityCounts.value.best} trajnostne`
      : `je bilo ${qualityCounts.value.best} trajnostnih`;
  const medium =
    // eslint-disable-next-line no-nested-ternary
    qualityCounts.value.medium === 1
      ? `${qualityCounts.value.medium} sprejemljiva`
      : // eslint-disable-next-line no-nested-ternary
      qualityCounts.value.medium === 2
      ? `${qualityCounts.value.medium} sprejemljivi`
      : qualityCounts.value.medium < 5
      ? `${qualityCounts.value.medium} sprejemljive`
      : `${qualityCounts.value.medium} sprejemljivih`;
  const worst =
    // eslint-disable-next-line no-nested-ternary
    qualityCounts.value.worst === 1
      ? `${qualityCounts.value.worst} netrajnostna sestavina`
      : // eslint-disable-next-line no-nested-ternary
      qualityCounts.value.worst === 2
      ? `${qualityCounts.value.worst} netrajnostni sestavini`
      : qualityCounts.value.worst < 5
      ? `${qualityCounts.value.worst} netrajnostne sestavine`
      : `${qualityCounts.value.worst} netrajnostnih sestavin`;

  return `${best}, ${medium} in ${worst}`;
});

const resultString = computed(() =>
  `
Znaš sestaviti trajnosten obrok? 🥗

Meni je v ${shareState.value.time} sekundah uspelo pripraviti ${
    shareState.value.foods.length
  } jedi in pri tem doseči ${
    shareState.value.score - negativeScore.value
  } točk. 🏆

V mojih jedeh ${resultIngredientsString.value}. 👨‍🍳

Preizkusi se tudi ti! 👇
https://futr.lb.djnd.si/
  `.trim()
);
const alertString = computed(() =>
  `
Tvoj rezultat smo skopirali v odložišče. Objavi ga na svojem najljubšem kanalu in k pripravi jedi povabi tudi prijatelje in prijateljice!

${resultString.value}
  `.trim()
);

const errorAlertString = `Ups, nekaj je šlo narobe pri kopiranju v odložišče. Rezultat imaš spodaj, skopiraj in deli ga!`;

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    clipboardWorks.value = false;
    // eslint-disable-next-line no-alert
    alert(errorAlertString);
  }
  document.body.removeChild(textArea);
};
const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => {
      // eslint-disable-next-line no-alert
      alert(alertString.value);
    },
    () => {
      clipboardWorks.value = false;
      // eslint-disable-next-line no-alert
      alert(errorAlertString);
    }
  );
};
const share = () => {
  copyTextToClipboard(resultString.value);
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.scroll-container {
  height: 100%;
  overflow-y: auto;
  background-color: $color-dark-1;
}

.top {
  background-color: $color-dark-1;

  .top-content {
    padding: 1.1rem 1.6rem 1rem 1.6rem;

    .logo {
      display: block;
      height: 3rem;
      margin: 0 auto 1rem auto;
    }

    .summary-box {
      margin: 1rem 0;
      padding: 2.4rem 1.8rem 2.2rem 1.3rem;
      background-color: transparent;
      background-image: url("../../assets/images/backgrounds/rezultat-okvir.svg");
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

    .final-score {
      margin: 1rem 0;
      padding: 5.4rem 0 2rem 0;
      background-color: transparent;
      background-image: url("../../assets/images/backgrounds/tvoj-rezultat-okvir.svg");
      background-repeat: no-repeat;
      background-size: 100% auto;

      .stars {
        display: flex;
        justify-content: center;
        gap: 1rem;

        .star {
          width: 4rem;
          height: 4rem;

          &:nth-of-type(2) {
            margin-top: -0.4rem;
          }
        }
      }

      .score {
        margin-top: 0.8rem;
        color: $color-white;
        font-size: 4rem;
        font-weight: 800;
        line-height: 1;
        text-align: center;
        @include text-stroke($color-black, 0.05em);
      }
    }

    .buttons {
      display: flex;
      justify-content: space-around;

      .retry-button {
        width: 13rem;
        display: flex;
        align-items: center;
        padding: 1.4rem 1.8rem;
        border: none;
        background-color: transparent;
        background-image: url("../../assets/images/buttons/poskusi-ponovno.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 1.25rem;
        font-weight: 600;
        font-style: italic;
        line-height: 1;
        color: $color-subtle;
      }

      .share-button {
        display: flex;
        padding: 1.4rem 3.2rem 1.4rem 1.8rem;
        border: none;
        background-color: transparent;
        background-image: url("../../assets/images/buttons/deli-rezultat-gumb.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 2rem;
        font-weight: 800;
        font-style: italic;
        line-height: 1;
        color: $color-accent-primary-contrast;
      }
    }
  }
}

.jagged-divider {
  overflow: hidden;
  background: $color-light;

  .shadow-container {
    filter: drop-shadow(0 0 0.75rem $color-dark-1);

    .clipped-container {
      padding: 2rem 0;
      background: $color-dark-1;
      margin-inline: -1px;
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 2.4rem,
        80% 1rem,
        60% 1.6rem,
        40% 1rem,
        20% 2.2rem,
        0% 2rem
      );
    }
  }
}

.bottom {
  background: $color-light;

  .bottom-content {
    padding: 1rem 2rem 1.1rem 2rem;

    .title {
      color: $color-dark-1;
      font-size: 1.8rem;
      font-weight: 800;
      font-style: italic;
      text-align: center;
    }

    .ingredients {
      .ingredient {
        margin: 2.4rem 0;

        .header {
          display: flex;

          .icon {
            width: 9.4rem;
            height: 9.6rem;
            margin-right: 1.7rem;
            padding: 1.3rem 1.2rem;
            background-color: transparent;
            background-image: url("../../assets/images/backgrounds/okvir-zlat.svg");
            background-repeat: no-repeat;
            background-size: 100% 100%;

            &.best {
              background-image: url("../../assets/images/backgrounds/okvir-zelen.svg");
            }

            &.worst {
              background-image: url("../../assets/images/backgrounds/okvir-rdec.svg");
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .info {
            color: $color-dark-1;
            font-size: 1.5rem;
            font-weight: 600;
            font-style: italic;
          }
        }

        .description {
          margin-top: 2rem;
          color: $color-dark-1;
          font-size: 1.2rem;
          font-weight: 300;
        }
      }

      .divider {
        height: 0.9rem;
        background-color: transparent;
        background-image: url("../../assets/images/backgrounds/divider-moder.svg");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }
    }
  }
}
</style>
