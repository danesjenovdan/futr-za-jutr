<template>
  <div class="bottom-content constrain-width">
    <div class="title">SESTAVINE</div>
    <div class="ingredients">
      <template
        v-for="(ingredient, ingredientName) in ingredients.ingredients"
        :key="ingredientName"
      >
        <template
          v-for="(qualityTitle, qualityName) in qualityNames"
          :key="qualityTitle"
        >
          <div class="ingredient">
            <div class="header">
              <div :class="['icon', qualityName]">
                <img :src="ingredient[qualityName].icon" />
              </div>
              <div class="info">{{ ingredient[qualityName].name }}</div>
            </div>
            <div class="description">
              {{ ingredient[qualityName].long_description }}
            </div>
          </div>
          <div class="divider"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { qualityNames } from "../helpers/names";
import ingredients from "../assets/ingredients.json";
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.bottom-content {
  padding: 1rem 2rem 1.1rem 2rem;

  .title {
    color: $color-dark-1;
    font-size: 1.8rem;
    font-weight: 800;
    font-style: italic;
    text-align: center;
  }

  .ingredients {
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

    .divider {
      height: 0.9rem;
      background-color: transparent;
      background-image: url("../assets/images/backgrounds/divider-moder.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
  }
}
</style>
