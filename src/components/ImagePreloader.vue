<template><span></span></template>

<script setup>
import { onMounted } from "vue";
import ingredients from "../assets/ingredients.json";
import sounds from "../assets/sounds.json";

function findDeepKeys(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }
  return Object.keys(obj).flatMap((k) => {
    if (typeof obj[k] === "object") {
      return findDeepKeys(obj[k], key);
    }
    return [];
  });
}

function gatherImages() {
  const icons = new Set([
    ...findDeepKeys(ingredients.ingredients, "icon"),
    ...findDeepKeys(ingredients.foods, "icon"),
    ...findDeepKeys(ingredients.foods, "layer_image"),
    ...findDeepKeys(ingredients.foods, "best"),
    ...findDeepKeys(ingredients.foods, "medium"),
    ...findDeepKeys(ingredients.foods, "worst"),
  ]);
  return Array.from(icons);
}

function loadImage(image, count) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      count.loaded += 1;
      resolve();
    };
    img.onerror = () => {
      count.errored += 1;
      resolve();
    };
    img.src = image;
  });
}

onMounted(async () => {
  // eslint-disable-next-line no-console
  console.log("[image preload] mounted");

  const images = gatherImages();
  const all = images.length;

  // eslint-disable-next-line no-console
  console.log(`[image preload] gathered ${all} images`);

  const count = {
    loaded: 0,
    errored: 0,
  };

  await Promise.all(images.map((image) => loadImage(image, count)));

  // eslint-disable-next-line no-console
  console.log(`[image preload] done (preloaded ${count.loaded}/${all} images)`);

  window.gameAudio = window.gameAudio || {};
  if (!window.gameAudio.music) {
    window.gameAudio.music = new Audio(sounds.music);
    window.gameAudio.music.loop = true;
    window.gameAudio.music.volume = 0.25;
    window.gameAudio.music.currentTime = 0;
    window.gameAudio.music.play();
    // eslint-disable-next-line no-console
    console.log(`[audio load] music done`);
  }
  if (!window.gameAudio.sounds) {
    window.gameAudio.sounds = {};
    Object.entries(sounds.sounds).forEach(([key, value]) => {
      window.gameAudio.sounds[key] = new Audio(value);
      window.gameAudio.sounds[key].volume = 0.33;
    });
    // eslint-disable-next-line no-console
    console.log(`[audio load] sounds done`);
  }
});
</script>
