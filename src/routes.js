import StartScreen from "./components/pages/StartScreen.vue";
import ResultsScreen from "./components/pages/ResultsScreen.vue";

export const routes = [
  {
    name: "root",
    path: "/",
    component: StartScreen,
  },
  {
    name: "results",
    path: "/results",
    component: ResultsScreen,
  },
];
