<script setup>
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../../stores/counter";
import { useTimer } from "../../composables/useTimer";

const router = useRouter();
const counterStore = useCounterStore();
const { remainingMs } = useTimer(20);

const formattedTimer = computed(() => {
  const seconds = remainingMs.value / 1000;
  const minutes = seconds / 60;
  const formattedMinutes = String(Math.floor(minutes)).padStart(2, "0");
  const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
});

function addIngredient() {
  counterStore.counter += 1;
}

watch(remainingMs, (newValue) => {
  if (newValue <= 0) {
    router.push({ name: "results" });
  }
});

counterStore.$subscribe((mutation, state) => {
  if (state.counter >= 4) {
    setTimeout(() => {
      alert("Congratz!");
      router.push({ name: "results" });
    }, 250);
  }
});
</script>

<template>
  <div>
    <h1>GAME SCREEN</h1>
    <div>
      {{ formattedTimer }}
    </div>

    <div>{{ counterStore.counter }}</div>

    <div class="ingredients">
      <img
        v-for="i in counterStore.counter"
        :key="i"
        :src="`/ingredients/tmp${i}.png`"
      />
    </div>

    <div>
      <button @click="addIngredient">dodaj sestavino</button>
    </div>
  </div>
</template>

<style scoped>
.ingredients {
  position: relative;
  width: 250px;
  height: 250px;
}

.ingredients img {
  position: absolute;
}
</style>
