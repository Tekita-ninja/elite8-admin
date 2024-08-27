<script setup lang="ts">
import { useAuthStore } from '@/app/stores/useAuthStore';
const controller = useAuthStore()
function handleLogout() {
  controller.logoutUser()
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiAvatar class="cursor-pointer p-1 w-8 h-8 md:h-10 md:w-10 border bg-white">
        <UiAvatarImage src="/logo-sm.png" alt="user" />
        <UiAvatarFallback class="font-semibold">SA</UiAvatarFallback>
      </UiAvatar>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-56 mr-2">
      <UiDropdownMenuLabel>My Account</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem>
          <span>Profile</span>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>
          <span>Settings</span>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>
          <span>Credentials</span>
        </UiDropdownMenuItem>
      </UiDropdownMenuGroup>
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