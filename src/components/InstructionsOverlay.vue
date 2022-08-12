<template>
  <div v-if="!timerStore.started && !gameStore.gameOver" class="modal-bg">
    <div class="top-bubble">
      <div class="text">
        Vsaka jed ima omejen čas za pripravo. Pazi, da ti ne poteče!
      </div>
    </div>
    <div class="constrain-width">
      <div class="middle-box">
        V času, ki ga imaš na voljo, pripravi čim več jedi in s tem zberi čim
        več točk, pri tem pa pazi na sestavine, saj te za vsako netrajnostno
        izbiro na koncu igre čaka kazen!
      </div>
      <div class="bottom-bubble">
        <div class="text">Izbiraj primerne trajnostne sestavine.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimerStore } from "../stores/timer";
import { useGameStore } from "../stores/game";

const timerStore = useTimerStore();
const gameStore = useGameStore();
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.modal-bg {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba($color-dark-1, 0.75);

  .top-bubble,
  .bottom-bubble {
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .text {
      color: $color-dark-1;
      font-size: 1.4rem;
      line-height: 1;
      transform: rotate(-7deg);
    }
  }

  .top-bubble {
    width: 20.8rem;
    height: 9.7rem;
    margin: 4.4rem 3.9rem 0 auto;
    background: url("../assets/images/backgrounds/navodilo-zgoraj.svg");
    padding-top: 4.8rem;
    padding-left: 2.1rem;
  }

  .middle-box {
    width: 30rem;
    margin: 7rem auto 0;
    background: url("../assets/images/backgrounds/rezultat-okvir.svg");
    padding: 2rem 2rem;
    font-size: 2rem;
    font-style: italic;
    line-height: 1.2;
    text-align: center;
  }

  .bottom-bubble {
    width: 17.5rem;
    height: 9.6rem;
    margin: 4rem auto 0 4rem;
    background: url("../assets/images/backgrounds/navodilo-zgoraj.svg");
    padding-top: 4.8rem;
    padding-left: 2.6rem;
    padding-right: 2rem;
  }
}
</style>
