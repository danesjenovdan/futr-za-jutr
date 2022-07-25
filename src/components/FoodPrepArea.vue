<template>
  <div class="food-prep-area">
    <div class="layers">
      <template
        v-for="layer in gameStore.currentFood.layers"
        :key="layer.layerImage"
      >
        <img :src="layer.layerImage" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game";
// import { computed, watch } from "vue";
// import { useRouter } from "vue-router";
// import { useTimer } from "../../composables/useTimer";

const gameStore = useGameStore();

// const { remainingMs } = useTimer(20);

// const formattedTimer = computed(() => {
//   const seconds = remainingMs.value / 1000;
//   const minutes = seconds / 60;
//   const formattedMinutes = String(Math.floor(minutes)).padStart(2, "0");
//   const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
//   return `${formattedMinutes}:${formattedSeconds}`;
// });

// watch(remainingMs, (newValue) => {
//   if (newValue <= 0) {
//     router.push({ name: "results" });
//   }
// });

// counterStore.$subscribe((mutation, state) => {
//   if (state.counter >= 4) {
//     setTimeout(() => {
//       alert("Congratz!");
//       router.push({ name: "results" });
//     }, 250);
//   }
// });
</script>

<style scoped lang="scss">
.food-prep-area {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: white;

  .layers {
    position: relative;
    width: 22rem;
    height: 27.5rem;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
