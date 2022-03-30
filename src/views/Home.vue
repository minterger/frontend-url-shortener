<script setup>
import ShortenForm from "../components/ShortenForm.vue";
</script>

<template>
  <div class="w-full m-3 sm:w-11/12 lg:w-9/12 max-w-7xl px-3">
    <header
      class="my-12 flex flex-col-reverse sm:flex-row justify-center sm:justify-evenly items-center"
    >
      <div class="text-center sm:text-left max-w-lg">
        <h2 class="text-4xl mt-4 sm:mt-0 sm:text-5xl font-semibold">
          Shorten your links here
        </h2>
        <p class="mt-4 sm:mt-2">
          We save memory by not shortening repeated links, repeated links are
          shared between users
        </p>
      </div>
      <img alt="home svg" src="../assets/header-home.svg" />
    </header>

    <main class="flex gap-3 flex-col">
      <div class="w-full">
        <shorten-form></shorten-form>
      </div>
      <div
        id="about"
        class="my-12 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center"
      >
        <img src="../assets/web_developer.svg" alt="" />
        <div class="text-center sm:text-left max-w-lg">
          <h2 class="text-4xl mt-4 sm:mt-0 sm:text-5xl font-semibold">
            About us
          </h2>
          <p class="mt-4 sm:mt-2">
            This website helps you go to your favorite sites by making them a
            shorter and easier to save link, this website was developed to save
            you trouble and is free from misleading advertising
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
