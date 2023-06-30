<template>
  <div class=" relative flex mt-mt18 max-h-[624px]  ">
 
    <router-view/> 
    <!-- <Left></Left> -->
    <!-- <LeftMenu></LeftMenu> -->
    <Right/>
  </div>
</template>

<script lang="js">
import Left from "./TitleSearch.vue";
import LeftMenu from "./LeftMenu.vue";
import Right from "./Right.vue";
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
    Left,
    Right,
    LeftMenu
  },
};
</script>
