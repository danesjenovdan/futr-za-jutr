<template><span></span></template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useElementSize } from "@vueuse/core";

const app = ref(null);
const { width, height } = useElementSize(app);

onMounted(() => {
  app.value = document.querySelector("#app");
});

watchEffect(() => {
  const ratioWidth = (height.value / 16) * 9;
  const minWidth = Math.min(width.value, ratioWidth);
  const remSize = (10 / 360) * minWidth;
  const root = document.documentElement;
  root.style.setProperty("--rem-size", `${remSize}px`);
  root.style.setProperty("--ratio-width", `${ratioWidth}px`);
});
</script>
