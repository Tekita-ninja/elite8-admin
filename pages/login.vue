<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>
<template>
  <div class="flex h-full">
    <div class="flex-1 hidden md:block relative">
      <div class="absolute px-5 text-white z-10 left-0 right-0 top-0 bottom-0 flex items-center justify-center">
        <div
          class="max-w-md aspect-square flex flex-col  items-center justify-center mx-auto text-center bg-black/70 backdrop-blur-sm p-5 rounded-xl w-full">
          <h1 class="text-3xl">Hit the Perfect Shot!</h1>
          <div class="w-32 my-4 mx-auto">
            <img class="h-full w-full object-contain" src="/logo-full-white.png" alt="logo">
          </div>
        </div>
      </div>
      <img class="w-full z-0 h-full object-cover grayscale opacity-80" src="/images/auth-bg.png" alt="auth">
    </div>
    <div class="w-full px-5 h-full md:w-[420px] lg:w-[576px] bg-white flex items-center justify-center">
      <FeaturesAuthLogin />
    </div>
  </div>
</template>