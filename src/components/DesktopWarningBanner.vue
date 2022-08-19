<template>
  <div class="desktop-warning-banner">
    Za najboljšo izkušnjo priporočamo, da igro odpreš na mobilni napravi.
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/variables";

.desktop-warning-banner {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 9999;
  display: none;
  width: 18rem;
  color: $color-dark-1;
  font-size: 1.2rem;
  line-height: 1.2;
  font-style: italic;
  text-align: center;
  background: url("../assets/images/backgrounds/rezultat-okvir.svg");
  padding: 3rem 2rem;

  @media (min-width: 992px) {
    display: block;
  }
}
</style>
