<template><span></span></template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useElementSize } from "@vueuse/core";

const el = ref(null);
const { width } = useElementSize(el);

onMounted(() => {
  el.value = document.querySelector("#app");
});

watchEffect(() => {
  const root = document.documentElement;
  const remSize = (10 / 360) * width.value;
  console.log(remSize);
  root.style.setProperty("--rem-size", `${remSize}px`);
});
</script>
