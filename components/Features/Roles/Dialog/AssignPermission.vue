<script setup lang="ts">
import { usePermissionStore } from '@/app/stores/usePermissionStore';
import { useRoleStore } from '@/app/stores/useRoleStore';
import type { groupedPermissions, TGroupCheck } from '@/utils/toAllowedPermissionRoles';
import type { Item } from 'vue3-easy-data-table';

const props = defineProps<{ item: Item }>()

const permissionGroup = ref<groupedPermissions[]>([])
const controller = useRoleStore()
const permissionController = usePermissionStore()
const dialog = ref(false)

function handleOpenDialog() {
  if (dialog.value) {
    permissionGroup.value = toAllowedPermissionRoles(
      permissionController.lists,
      props.item.permissions
    );
  }
}
function handleParentCheck(event: boolean, parent: groupedPermissions) {
  permissionGroup.value = [...permissionGroup.value].map(item => {
    if (item.title === parent.title) {
      item.status = event
      item.group.map(i => {
        i.status = event
        return i
      })
    }
    return item
  })
}
function handleItemCheck(event: boolean, item: TGroupCheck) {
  permissionGroup.value = [...permissionGroup.value].map(parent => {
    parent.group.map(group => {
      if (group.id === item.id) {
        group.status = event
      }
      return group;
    })
    return parent
  })
}

async function handleSaveChanges() {
  const ids: number[] = [];
  [...permissionGroup.value].forEach(item => {
    item.group.forEach(g => {
      if (g.status === true) {
        ids.push(g.id)
      }
    })
  })
  await controller.assignPermission(props.item.id, ids);
  dialog.value = controller.dialog
}
</script>

<template>
  <UiDialog v-model:open="dialog" @update:open="handleOpenDialog">
    <UiDialogTrigger as-child>
      <UiButton size="sm">Assign Permission</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-6xl">
      <UiDialogHeader>
        <UiDialogTitle>Assign Role Permission</UiDialogTitle>
      </UiDialogHeader>
      <div>
        <div class="h-[80dvh] overflow-auto">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="parent in permissionGroup" class="border rounded-lg" :key="parent.title">
              <div class="flex items-center space-x-2 border-b p-2">
                <UiCheckbox @update:checked="(e)=>handleParentCheck(e,parent)" :id="`terms-${parent.title}`"
                  :checked="parent.status" />
                <label :for="`terms-${parent.title}`" class="font-bold cursor-pointer capitalize">
                  {{ parent.title }}
                </label>
              </div>
              <div class="p-2 space-y-2">
                <div v-for="item in parent.group" :key="item.id" class="flex items-start space-x-2">
                  <UiCheckbox @update:checked="(e) => handleItemCheck(e,item)" :id="`item-${parent.title}-${item.id}`"
                    :checked="item.status" />
                  <label :for="`item-${parent.title}-${item.id}`" class="cursor-pointer">
                    <div class="uppercase text-sm">{{ item.method }}</div>
                    <p class="text-xs text-slate-600">{{ item.code }}</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UiDialogFooter class="mt-4 flex justify-end">
          <UiButton type="submit" @click="handleSaveChanges">
            Save
          </UiButton>
        </UiDialogFooter>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>