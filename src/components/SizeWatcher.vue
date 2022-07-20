<template><span></span></template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useElementSize } from "@vueuse/core";

const el = ref(null);
const { width, height } = useElementSize(el);

onMounted(() => {
  el.value = document.querySelector("#app");
});

watchEffect(() => {
  const size = Math.max(width.value, height.value);
  const remSize = (10 / 640) * size;
  console.log(remSize);
  const root = document.documentElement;
  root.style.setProperty("--rem-size", `${remSize}px`);
});
</script>
