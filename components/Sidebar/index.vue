<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { cn } from '@/lib/utils';
import { menus } from '@/constants/sidemenu';
import { useMenuStore } from "@/app/stores/useMenuStore";

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


const stateMenu = useMenuStore();
onClickOutside(target, (_) => {
  stateMenu.closeMenu();
});
</script>

<template>
  <aside ref="target" :class="cn(
    'h-screen fixed lg:sticky z-20 top-0 md:p-2',
    'w-[300px] sm:w-[250px] transition',
  stateMenu.isOpen ? '-translate-x-0' :'-translate-x-full lg:-translate-x-0'
  )">
    <div class="bg-white h-full w-full flex flex-col md:rounded-xl overflow-x-hidden shadow-lg">
      <div class="h-16 flex flex-col justify-center px-2">
        <Logo />
      </div>
      <div class="h-full flex-1 text-sm overflow-y-auto space-y-4">
        <div v-for="(menu, index) in menus" :key="index">
          <span class="px-3 text-[10px] font-medium text-slate-500 uppercase">{{ menu.header }}</span>
          <div v-for="(menul1, index) in menu.children" :key="index">
            <template v-if="menul1.children?.length && menul1.children?.length > 0">
              <HDisclosure :default-open="menul1.path === menuLevel1" v-slot="{ open }">
                <HDisclosureButton class="w-full">
                  <SidebarMenuParentItem :level="1" :open="open" :label="menul1.label" :icon="menul1.icon" />
                </HDisclosureButton>
                <HDisclosurePanel>
                  <template v-for="(menu2,index2) in menul1.children" :key="index2">
                    <template v-if="menu2.children?.length && menu2.children?.length > 0">
                      <HDisclosure :default-open="menu2.path === menuLevel2" v-slot="{ open }">
                        <HDisclosureButton class="w-full">
                          <SidebarMenuParentItem :level="2" :open="open" :label="menu2.label" :icon="menu2.icon" />
                        </HDisclosureButton>
                        <HDisclosurePanel>
                          <template v-for="(menu3,index3) in menu2.children" :key="index3">
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
      <div class="h-16 p-2 flex flex-col justify-center bg-slate-100/50">
        <div class="text-xs font-semibold">Tekita.tech</div>
        <div class="text-xs text-slate-500">Version 1.0.1</div>
      </div>
    </div>
  </aside>
</template>
