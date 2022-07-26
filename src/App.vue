<template>
  <SizeWatcher />
  <OrientationBanner />
  <div class="page-container">
    <RouterView />
  </div>
</template>

<script setup>
import SizeWatcher from "./components/SizeWatcher.vue";
import OrientationBanner from "./components/OrientationBanner.vue";
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>
