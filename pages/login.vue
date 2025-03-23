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
          class="max-w-md aspect-square flex flex-col items-center justify-center mx-auto text-center bg-white backdrop-blur-sm rounded-xl w-full overflow-hidden">
          <div class="w-full h-full mx-auto">
            <img class="h-full w-full object-cover" src="/images/auth-bg.png" alt="logo">
          </div>
        </div>
      </div>
    </div>
    <div class="w-full px-5 h-full md:w-[420px] lg:w-[576px] bg-white flex items-center justify-center">
      <FeaturesAuthLogin />
    </div>
  </div>
</template>