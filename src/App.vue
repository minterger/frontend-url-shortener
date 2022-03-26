<script setup>
import NavbarVue from "./components/Navbar.vue";
</script>

<template>
  <div class="dark:text-slate-50 dark:bg-slate-900 min-h-screen">
    <navbar-vue></navbar-vue>
    <router-view></router-view>
  </div>
</template>
