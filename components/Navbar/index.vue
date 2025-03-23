<script setup lang="ts">
import { useMenuStore } from '@/app/stores/useMenuStore';
import { useProfileStore } from '@/app/stores/useProfileStore';
import { cn } from '@/lib/utils';
const profile = useProfileStore()
const stateMenu = useMenuStore();
const scrollY = ref(0)
const { breadcrumbs: bc } = useBC();

function handleScroll() {
  scrollY.value = window.scrollY
}
if (import.meta.client) {
  window.addEventListener('scroll', handleScroll);
  if (scrollY.value > 60) {
    window.removeEventListener('scroll', handleScroll)
  }
}

const handleTriggerMenu = () => {
  if (!stateMenu.isOpen) {
    stateMenu.openMenu();
  } else {
    stateMenu.closeMenu();
  }
};
</script>
<template>
  <nav :class="cn(
    'z-20 top-0 transition duration-300',
    scrollY >= 60 ? 'bg-white/90 backdrop-blur-[5px] sticky' : 'bg-white md:bg-transparent'
  )">
    <div class="flex items-center h-[65px] sm:h-[120px] px-2">
      <div class="flex-1 flex flex-col">
        <div class="flex items-end md:items-center gap-x-1 md:h-[60px]">
          <NuxtLink v-if="bc.length <= 0" href="/"
            class="h-7 w-7 bg-main-green text-black flex items-center justify-center rounded-md">
            <Icon name="ri:home-6-line" class="w-5 h-5" />
          </NuxtLink>
          <NuxtLink v-else href="/" class="h-7 w-7 bg-blue-50 text-black flex items-center justify-center rounded-sm">
            <Icon name="ri:home-6-line" class="w-6 h-6" />
          </NuxtLink>
          <Icon v-if="bc.length >= 1" class="w-6 h-6 text-gray-500" name="majesticons:chevron-right-line" />
          <div>
            <NuxtLink class="bg-main-green text-black text-xs px-2 py-2 rounded-md capitalize font-semibold"
              v-for="b in bc" :key="b" :href="b.path">
              {{ b.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="h-[60px] hidden md:flex flex-col justify-center">
          <NuxtLink v-if="bc.length >= 1" class="flex items-center" href="/">
            <Icon class="w-6 h-6 text-gray-500" name="majesticons:chevron-left-line" />
            <p class="text-sm font-semibold text-black/80">Back To Dashboard</p>
          </NuxtLink>
          <div v-else class="mt-3">
            <h2 class="text-xl md:text-2xl text-main/90 font-extrabold capitalize">Hello, {{ profile.profile?.username
              }}
            </h2>
            <p class="text-black/60 text-sm">Role: {{ profile.profile?.username }}</p>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <NavbarProfileDropdown />
        <div class="lg:hidden">
          <button v-if="!stateMenu.isOpen" @click="handleTriggerMenu"
            class="h-8 w-8 flex items-center justify-center border rounded-full bg-white">
            <Icon class="w-5 h-5" name="ic:round-menu" />
          </button>
          <button v-else class="h-8 w-8 flex items-center justify-center border rounded-full bg-white">
            <Icon class="w-5 h-5" name="ic:outline-close" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>