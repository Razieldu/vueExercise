// router.js

import { createRouter, createWebHistory } from "vue-router";
import TitleSearch from "./components/TitleSearch.vue";
import LeftMenu from "./components/LeftMenu.vue";
import Middle from "./components/Middle.vue";
import Top from "./components/Top.vue";
import App from "./App.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App,
    },
  ],
});

export default router; // 確保正確匯出 router 物件
