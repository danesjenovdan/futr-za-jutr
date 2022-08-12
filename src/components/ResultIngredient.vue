<template>
  <div class="ingredient">
    <div class="header">
      <div :class="['icon', props.quality]">
        <img :src="props.ingredient.icon" />
        <img :src="`/quality_icons/${props.quality}.png`" class="quality" />
      </div>
      <div class="info">
        <div class="name">
          {{ props.ingredient.name }}
          <span class="score">{{
            props.quality === "worst"
              ? "-10"
              : props.quality === "medium"
              ? "-5"
              : ""
          }}</span>
        </div>
        <div class="pros-cons">
          <div v-for="pro in pros" :key="pro" class="pro">
            <img src="../assets/images/icons/smile_blue.png" /> {{ pro }}
          </div>
          <div v-for="con in cons" :key="con" class="con">
            <img src="../assets/images/icons/sad_red.png" /> {{ con }}
          </div>
        </div>
      </div>
      <button :class="['toggle-description', { open }]" @click="open = !open">
        &nbsp;
      </button>
    </div>
    <div v-if="open" class="description">
      {{ props.ingredient.long_description }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

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

const open = ref(false);

const pros = computed(() => {
  const prosAndCons = props.ingredient?.pros_and_cons || [];
  const strings = prosAndCons
    .filter((s) => s.startsWith("(+)"))
    .map((s) => s.replace("(+)", ""))
    .filter(Boolean);
  return strings;
});

const cons = computed(() => {
  const prosAndCons = props.ingredient?.pros_and_cons || [];
  const strings = prosAndCons
    .filter((s) => s.startsWith("(-)"))
    .map((s) => s.replace("(-)", ""))
    .filter(Boolean);
  return strings;
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.ingredient {
  margin: 2.4rem 0;

  .header {
    position: relative;
    display: flex;

    .icon {
      flex: 0 0 auto;
      position: relative;
      width: 6.8rem;
      height: 6.9rem;
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

      img.quality {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 3.1rem;
        height: 3.1rem;
        object-fit: contain;
        transform: translate(30%, 20%);
      }
    }

    .info {
      .name {
        margin-bottom: 0.5rem;
        color: $color-dark-1;
        font-size: 1.5rem;
        font-weight: 600;
        font-style: italic;

        .score {
          margin-left: 0.5rem;
          font-style: normal;
          font-weight: 800;
          color: $color-white;
          @include text-stroke($color-warning-fg, 0.075em);
        }
      }

      .pros-cons {
        .pro,
        .con {
          color: $color-warning-fg;
          font-size: 1.2rem;
          font-weight: 600;
          font-style: italic;

          img {
            width: 1.2rem;
            height: 1.2rem;
          }
        }

        .pro {
          color: $color-dark-1;
        }
      }
    }

    .toggle-description {
      position: absolute;
      top: 0;
      right: 0;
      width: 1.8rem;
      height: 1.8rem;
      padding: 0;
      border: none;
      background-color: transparent;
      background-image: url("../assets/images/icons/plus.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      &.open {
        background-image: url("../assets/images/icons/minus.svg");
      }
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
