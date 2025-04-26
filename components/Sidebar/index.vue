<script setup lang="ts">
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useMenuStore } from "@/app/stores/useMenuStore";
import { menus } from '@/constants/sidemenu';
import { cn } from '@/lib/utils';
import { onClickOutside } from "@vueuse/core";

const route = useRoute();
const target = ref(null);
const routerPath = route.path;

const menuLevel1 =
  routerPath &&
  routerPath
    .split("/")
    .filter((i) => i !== "")
    .shift();
const segment2 =
  routerPath &&
  routerPath
    .split("/")
    .filter((i) => i !== "")[1]
const menuLevel2 = `/${menuLevel1}/${segment2}`

const controller = useAuthStore()
function handleLogout() {
  controller.logoutUser()
}

const stateMenu = useMenuStore();
onClickOutside(target, (_) => {
  stateMenu.closeMenu();
});
</script>

<template>
  <aside ref="target" :class="cn(
    'h-screen fixed lg:sticky z-20 top-0',
    'w-[320px] sm:w-[270px] transition',
    stateMenu.isOpen ? '-translate-x-0' : '-translate-x-full lg:-translate-x-0'
  )">
    <div class="bg-[#FFF] text-slate-800 px-3 h-full w-full flex flex-col overflow-x-hidden shadow-lg">
      <div class="h-[120px] flex flex-col justify-center px-2">
        <Logo />
      </div>
      <div class="h-full flex-1 text-sm overflow-y-auto">
        <div v-for="(menu, index) in menus" :key="index" class="space-y-4">
          <div class="mt-6">
            <span class="px-3 text-[10px] font-medium text-slate-400 uppercase mb-1 -ml-3 block">{{ menu.header }}</span>
            <div v-for="(menul1, index) in menu.children" :key="index">
              <template v-if="menul1.children?.length && menul1.children?.length > 0">
                <HDisclosure :default-open="menul1.path === menuLevel1" v-slot="{ open }">
                  <HDisclosureButton class="w-full">
                    <SidebarMenuParentItem :level="1" :open="open" :label="menul1.label" :icon="menul1.icon" />
                  </HDisclosureButton>
                  <HDisclosurePanel>
                    <template v-for="(menu2, index2) in menul1.children" :key="index2">
                      <template v-if="menu2.children?.length && menu2.children?.length > 0">
                        <HDisclosure :default-open="menu2.path === menuLevel2" v-slot="{ open }">
                          <HDisclosureButton class="w-full">
                            <SidebarMenuParentItem :level="2" :open="open" :label="menu2.label" :icon="menu2.icon" />
                          </HDisclosureButton>
                          <HDisclosurePanel>
                            <template v-for="(menu3, index3) in menu2.children" :key="index3">
                              <SidebarMenuLinkItem :level="menu3.level" :label="menu3.label" :href="menu3.path" />
                            </template>
                          </HDisclosurePanel>
                        </HDisclosure>
                      </template>
                      <template v-else>
                        <SidebarMenuLinkItem :level="menu2.level" :label="menu2.label" :href="menu2.path" />
                      </template>
                    </template>
                  </HDisclosurePanel>
                </HDisclosure>
              </template>
              <template v-else>
                <SidebarMenuLinkItem :level="1" :label="menul1.label" :icon="menul1.icon" :href="menul1.path" />
              </template>
            </div>
          </div>
        </div>
        <div>
          <button @click="handleLogout" activeClass="activeClassMenu" :class="cn(
            'flex items-center gap-1 w-full text-start group  h-10 px-2 rounded-[8px]',
          )">
            <div class="iconWrapper h-7 w-7 flex items-center justify-center">
              <Icon class="w-5 h-5" name="ri:logout-box-r-fill" />
            </div>
            <span class="flex-1">Logout</span>
          </button>
        </div>
      </div>
      <div class="h-16 flex flex-col justify-center">
        <div class="text-xs font-light text-slate-500">Copyright <a class="font-semibold" href="https://tekita.tech" target="_blank" rel="noopener noreferrer">Tekita.tech</a> {{ new Date().getFullYear() }} - Ver 1.0.1
        </div>
      </div>
    </div>
  </aside>
</template>
