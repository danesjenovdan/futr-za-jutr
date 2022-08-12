<template>
  <div class="ingredient">
    <div class="header">
      <div :class="['icon', quality]">
        <img :src="props.ingredient.icon" />
      </div>
      <div class="info">{{ props.ingredient.name }}</div>
    </div>
    <div class="description">
      {{ props.ingredient.long_description }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.ingredient {
  margin: 2.4rem 0;

  .header {
    display: flex;

    .icon {
      width: 9.4rem;
      height: 9.6rem;
      margin-right: 1.7rem;
      padding: 1.3rem 1.2rem;
      background-color: transparent;
      background-image: url("../assets/images/backgrounds/okvir-zlat.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      &.best {
        background-image: url("../assets/images/backgrounds/okvir-zelen.svg");
      }

      &.worst {
        background-image: url("../assets/images/backgrounds/okvir-rdec.svg");
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .info {
      color: $color-dark-1;
      font-size: 1.5rem;
      font-weight: 600;
      font-style: italic;
    }
  }

  .description {
    margin-top: 2rem;
    color: $color-dark-1;
    font-size: 1.2rem;
    font-weight: 300;
  }
}
</style>
