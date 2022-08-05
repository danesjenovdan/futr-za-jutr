import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import App from "./App.vue";

import "./assets/css/bootstrap-reboot.min.css";
import "./assets/scss/main.scss";

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

router.beforeEach((to) => {
  if (to.name === "game") {
    if (window.gameAudio?.music?.paused) {
      window.gameAudio.music.currentTime = 0;
      window.gameAudio.music.play();
    }
  } else if (window.gameAudio?.music) {
    window.gameAudio.music.pause();
  }
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
