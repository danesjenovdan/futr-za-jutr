import { ref, onBeforeUnmount, computed } from "vue";

export const useTimer = (durationSeconds) => {
  const startMs = ref(Date.now());
  const currentMs = ref(Date.now());

  const updateCurrent = () => {
    currentMs.value = Date.now();
  };
  const updateTimeInterval = setInterval(updateCurrent, 16);
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
  });

  const remainingMs = computed(() => {
    const elapsedMs = currentMs.value - startMs.value;
    if (elapsedMs > durationSeconds * 1000) {
      return 0;
    }
    return durationSeconds * 1000 - elapsedMs;
  });

  return {
    remainingMs,
  };
};
