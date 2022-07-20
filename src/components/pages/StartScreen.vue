<template>
  <div class="top">
    <div class="logo">
      <img src="../../assets/images/logo-igra.svg" alt="Futr za jutr" />
    </div>
    <div class="title">
      Znaš sestaviti<br />
      trajnosten obrok?
    </div>
    <div class="buttons">
      <button class="start-button" @click="$router.push({ name: 'game' })">
        ZAČNI!
      </button>
    </div>
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
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2.1rem;
  background-color: $color-dark-1;
  box-shadow: 0 0 12px 0 $color-dark-1;

  .logo {
    margin-bottom: 2.1rem;

    img {
      width: 100%;
    }
  }

  .title {
    margin-bottom: 3.1rem;
    font-style: italic;
    font-size: 2.8rem;
    font-weight: 600;
    line-height: 1.1;
    color: $color-white;
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: center;

    .start-button {
      padding: 1.6rem 5.1rem 0.7rem;
      border: none;
      background-color: transparent;
      background-image: url("../../assets/images/buttons/gumb-zacni.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 2.8rem;
      font-weight: 800;
      font-style: italic;
      line-height: 1;
      color: $color-accent-primary-contrast;
    }
  }
}

.bottom {
  flex: 0 0 23%;
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
