<script setup>
import HelloWorld from "../HelloWorld.vue";
</script>

<template>
  <img alt="Vue logo" src="../../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <button @click="$router.push({ name: 'game' })">START GAME</button>
</template>
