<template>
  <div v-if="!portrait" class="orientation-banner">
    Obrni napravo pokonci za najboljšo izkušnjo!
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const portrait = computed(() => width.value < height.value);
</script>

<style scoped lang="scss">
.orientation-banner {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 9999;
  background: orange;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;

  @media (min-width: 992px) and (orientation: landscape) {
    display: none;
  }
}
</style>
