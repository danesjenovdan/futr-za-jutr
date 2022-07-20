<template>
  <div class="top-bar">
    <div class="top-content">
      <div class="pill points">
        <img class="icon" src="../assets/images/icons/kovanec.svg" alt="" />
        <div class="text">132</div>
      </div>
      <div class="pill time">
        <img class="icon" src="../assets/images/icons/ura.svg" alt="" />
        <div class="text">1:33</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.top-bar {
  display: flex;
  height: 100%;

  .top-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0 1.3rem;

    .pill {
      display: flex;
      background-color: $color-dark-1;
      border-radius: 10em;

      .icon {
        width: 2.5rem;
        height: 2.5rem;
      }

      .text {
        padding: 0.6rem 1.1rem 0.4rem 0.6rem;
        color: $color-white;
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1;
      }
    }
  }
}
</style>
