<script setup lang="ts">
import { useAuthStore } from '@/app/stores/useAuthStore';
import { useProfileStore } from '@/app/stores/useProfileStore';
const controller = useAuthStore()
const profile = useProfileStore()
function handleLogout() {
  controller.logoutUser()
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiAvatar class="cursor-pointer p-1 w-8 h-8 md:h-10 md:w-10 border bg-white">
        <UiAvatarFallback class="font-semibold text-black uppercase text-lg">
          {{ profile.profile?.username.slice(0,2) }}
        </UiAvatarFallback>
      </UiAvatar>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-56 mr-2">
      <UiDropdownMenuLabel>
        <div>
          <p class="capitalize">{{ profile.profile?.username }}</p>
          <p class="text-[10px]">Role: {{ profile.profile?.role  }}</p>
        </div>
      </UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem @click="handleLogout">
        <span>Logout</span>
        <UiDropdownMenuShortcut>
          <Icon class="w-5 h-5" name="ph:power-bold" />
        </UiDropdownMenuShortcut>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>