<template>
  <Transition name="arrow-fade">
    <div v-if="showArrow" ref="arrowContainer" class="arrow-container">
      <div class="arrow"></div>
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const arrowContainer = ref(null);
const showArrow = ref(true);

const onScroll = (event) => {
  showArrow.value = event.target.scrollTop < 100;
};

onMounted(() => {
  if (arrowContainer.value?.parentElement) {
    arrowContainer.value.parentElement.addEventListener("scroll", onScroll);
  }
});

onBeforeUnmount(() => {
  if (arrowContainer.value?.parentElement) {
    arrowContainer.value.parentElement.removeEventListener("scroll", onScroll);
  }
});
</script>

<style>
.arrow-fade-enter-active,
.arrow-fade-leave-active {
  transition: opacity 0.5s ease;
}

.arrow-fade-enter-from,
.arrow-fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss" scoped>
@import "../assets/scss/variables";

@keyframes arrow-bounce {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}

.arrow-container {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99999;

  .arrow {
    width: 2.5rem;
    height: 3.5rem;
    transition: ease-in;
    animation: arrow-bounce 1.5s infinite;
    filter: drop-shadow(0 1.5px 0.5px $color-dark-1);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 2px;
      width: 1.2rem;
      height: 1.2rem;
      border-left: 2px solid #fafafa;
      border-bottom: 2px solid #fafafa;
      transform: rotate(-45deg);
    }
  }
}
</style>
