import { ref, onBeforeUnmount, computed } from "vue";

export const useTimer = (durationSeconds, { autoStart = true } = {}) => {
  const startMs = ref(Date.now());
  const currentMs = ref(Date.now());

  const updateCurrent = () => {
    currentMs.value = Date.now();
  };

  let updateTimeInterval = autoStart ? setInterval(updateCurrent, 16) : null;

  const start = () => {
    if (!updateTimeInterval) {
      startMs.value = Date.now();
      currentMs.value = Date.now();
      updateTimeInterval = setInterval(updateCurrent, 16);
    }
  };

  const stop = () => {
    clearInterval(updateTimeInterval);
    updateTimeInterval = null;
  };

  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
    updateTimeInterval = null;
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
    start,
    stop,
  };
};
