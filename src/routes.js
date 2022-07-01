import StartScreen from "./components/pages/StartScreen.vue";
import ResultsScreen from "./components/pages/ResultsScreen.vue";
import GameScreen from "./components/pages/GameScreen.vue";

export const routes = [
  {
    name: "root",
    path: "/",
    component: StartScreen,
  },
  {
    name: "game",
    path: "/game",
    component: GameScreen,
  },
  {
    name: "results",
    path: "/results",
    component: ResultsScreen,
  },
];
