import { createRouter, createWebHistory } from "vue-router";
import TitleSearch from "./components/TitleSearch.vue";
import LeftMenu from "./components/LeftMenu.vue";
import Middle from "./components/Middle.vue";
import Top from "./components/Top.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: LeftMenu,
        middle: Middle,
      },
      name: "Home",
    },
    {
      path: "/titleSearch",
      components: {
        default: TitleSearch,
        middle: Middle,
      },
      name: "Search",
    },
  ],
});

export default router;
