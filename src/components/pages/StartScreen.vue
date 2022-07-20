<template>
  <div class="top">
    <button @click="$router.push({ name: 'game' })">START GAME</button>
  </div>
  <div class="bottom">
    <div class="funding-text">
      Aktivnost je del projekta Our Food. Our Future, ki ga sofinancira Evropska
      unija. Vsebina je izključna odgovornost partnerjev projekta in ne odraža
      nujno stališč EU.
    </div>
    <div class="funding-logos">
      <div class="funding-logos-row">
        <img
          src="../../assets/images/logos/eu-sofinancira.svg"
          alt="Sofinancira Evropska unija"
        />
      </div>
      <div class="funding-logos-row">
        <img
          src="../../assets/images/logos/our-food-our-future.svg"
          alt="Our food our future"
        />
        <img src="../../assets/images/logos/focus.png" alt="Focus" />
        <img src="../../assets/images/logos/dear.png" alt="DEAR" />
        <img
          src="../../assets/images/logos/mzz.svg"
          alt="Ministrstvo za zunanje zadeve"
          class="mzz"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.top {
  flex-basis: 77%;
  background-color: $color-dark-1;
  box-shadow: 0 0 12px 0 $color-dark-1;
}

.bottom {
  padding: 0 2.8rem;

  .funding-text {
    margin: 1.8rem 0;
    font-size: 0.9rem;
    text-align: center;
    color: $color-dark-2;
  }

  .funding-logos {
    .funding-logos-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.8rem;
      margin: 1.8rem 0;
    }

    img {
      height: 2.8rem;

      &.mzz {
        height: 1.4rem;
      }
    }
  }
}
</style>
