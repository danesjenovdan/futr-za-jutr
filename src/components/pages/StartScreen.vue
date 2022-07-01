<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "../HelloWorld.vue";
</script>

<template>
  <img alt="Vue logo" src="../../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <button @click="$router.push({ name: 'results' })">RESULTS PAGE</button>
</template>
