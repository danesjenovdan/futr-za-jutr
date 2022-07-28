<template>
  <div v-if="gameStore.gameOver" class="modal-bg">
    <div class="modal">
      <div class="title">Zmanjkalo ti je časa!</div>
      <div class="image">
        <img src="../assets/images/konec-igre.png" />
      </div>
      <div class="text">
        <p>V resničnem življenju ti pri izbiri hrane ni treba hiteti.</p>
        <p>
          Zato za pripravo jedi izbiraj zdrave, trajnostne in okolju prijazne
          sestavine!
        </p>
      </div>
      <div>
        <button type="button" class="result-button" @click="onResultsClick">
          PREVERI SVOJ REZULTAT
          <i class="arrow"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import { useTimerStore } from "../stores/timer";
import ingredients from "../assets/ingredients.json";

const router = useRouter();
const gameStore = useGameStore();
const timerStore = useTimerStore();

const foodToNum = (x) => Object.keys(ingredients.foods).indexOf(x);
const qualityToNum = (x) => ["best", "medium", "worst"].indexOf(x);
const layersToNums = (layers) =>
  layers
    .filter((l) => l.type !== "none" && l.quality)
    .map((l) => qualityToNum(l.quality))
    .join("");

function encodeFood(food) {
  const foodNum = foodToNum(food.id);
  const qualityNums = layersToNums(food.layers);
  return Number.parseInt(`${foodNum}${qualityNums}`, 10).toString(36);
}

function onResultsClick() {
  const completedFoods = [...gameStore.combinedFoods];
  if (!gameStore.currentFoodDone) {
    completedFoods.pop();
  }

  const shareState = [
    gameStore.score.toString(36),
    Math.floor(timerStore.elapsedMs / 1000).toString(36),
    ...completedFoods.map((food) => encodeFood(food)),
  ].join(";");

  router.push({
    name: "results",
    query: { s: shareState },
  });
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.modal-bg {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba($color-dark-1, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 30.6rem;
    padding: 4.2rem 2.8rem 3.5rem 3.8rem;
    background-color: transparent;
    background: url("../assets/images/backgrounds/obvestilo-okvir.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;

    .title {
      // TODO: white with border and shadow
      font-size: 2.5rem;
      font-weight: 900;
      text-align: center;
      text-transform: uppercase;
    }

    .image {
      padding: 0 4rem;
      margin: 2.6rem 0 3rem;

      img {
        display: block;
        max-width: 100%;
      }
    }

    .text {
      padding: 0 1rem 0 0rem;
      color: $color-dark-1;
      font-size: 1.8rem;
      line-height: 1.2;
      font-style: italic;
      text-align: center;

      p {
        margin-bottom: 1em;
      }
    }

    .result-button {
      display: flex;
      margin-inline: auto;
      padding: 1.1rem 1.3rem;
      border: none;
      background-color: transparent;
      background-image: url("../assets/images/buttons/dodaj-sestavino-gumb.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 1.8rem;
      font-weight: 800;
      font-style: italic;
      line-height: 1;
      color: $color-accent-primary-contrast;

      .arrow {
        width: 1em;
        height: 1em;
        margin-left: 0.5em;
        background-color: transparent;
        background-image: url("../assets/images/icons/puscica-desno.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
