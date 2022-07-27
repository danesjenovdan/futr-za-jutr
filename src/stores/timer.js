import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useTimerStore = defineStore("timerStore", () => {
  const timerId = ref(null);
  const startMs = ref(null);
  const currentMs = ref(null);
  const started = computed(() => startMs.value != null);
  const elapsedMs = computed(() => currentMs.value - startMs.value);

  const updateCurrent = () => {
    currentMs.value = Date.now();
  };

  const start = () => {
    if (!timerId.value) {
      startMs.value = Date.now();
      currentMs.value = Date.now();
      timerId.value = setInterval(updateCurrent, 16);
    }
  };

  const stop = () => {
    clearInterval(timerId.value);
    timerId.value = null;
  };

  return {
    started,
    start,
    stop,
    elapsedMs,
  };
});
