<script setup lang="ts">
import { useMenuStore } from '@/app/stores/useMenuStore';
import { cn } from '@/lib/utils';
const stateMenu = useMenuStore();
const scrollY = ref(0)
const { breadcrumbs: bc,titlePage } = useBC();

function handleScroll() {
  scrollY.value = window.scrollY
}
if (import.meta.client) {
  window.addEventListener('scroll', handleScroll);
  if (scrollY.value > 60) {
    window.removeEventListener('scroll',handleScroll)
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
  scrollY >= 60 ? 'bg-white/90 backdrop-blur-[5px] sticky': 'bg-white md:bg-transparent'
  )">
    <div class="flex items-center h-[65px] sm:h-[80px] px-2">
      <div class="flex-1">
        <h1 class="text-2xl md:text-3xl capitalize">{{ titlePage ? titlePage.split("?").shift() : "Dashboard" }}</h1>
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