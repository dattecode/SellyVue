<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
