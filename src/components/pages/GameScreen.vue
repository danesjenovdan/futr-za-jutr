<template>
  <!--
    <div>
      {{ formattedTimer }}
    </div>
  -->
  <div class="top">
    <TopBar />
  </div>
  <div class="main-area">
    <div>main area</div>
    <div>
      {{ counterStore.counter }}
    </div>
  </div>
  <div class="bottom">
    <BottomBar />
  </div>
</template>

<script setup>
import { useCounterStore } from "../../stores/counter";
import TopBar from "../TopBar.vue";
import BottomBar from "../BottomBar.vue";
// import { computed, watch } from "vue";
// import { useRouter } from "vue-router";
// import { useTimer } from "../../composables/useTimer";

const counterStore = useCounterStore();
// const router = useRouter();

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
@import "../../assets/scss/variables";

.top {
  flex: 0 0 4.4rem;
  background: $color-dark-2;
}

.main-area {
  flex: 1 1 0%;
  background: $color-dark-1;

  color: white;
}

.bottom {
  flex: 0 0 6.4rem;
  background: $color-dark-2;
}
</style>
