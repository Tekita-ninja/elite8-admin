<script setup lang="ts">
import { useRoleStore } from '@/app/stores/useRoleStore';
import { useUserStore } from '@/app/stores/useUserStore';
import { formAssignRoleSchema } from '@/app/validations/user';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';

const props = defineProps<{ item: Item }>()

const nRoles = ref<any[]>([])
const roleController = useRoleStore()
const controller = useUserStore()
const dialog = ref(false)
function handleOpenDialog() {
  if (dialog.value) {
    nRoles.value = roleController.results.data.map(item => {
      return {
        ...item,
        id: item.id.toString()
      }
    })
  }
}

const form = useForm({
  validationSchema: formAssignRoleSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
  await controller.assignRole(props.item.id, values.roleId)
  dialog.value = controller.dialog
})
</script>

<template>
  <UiDialog v-model:open="dialog" @update:open="handleOpenDialog">
    <UiDialogTrigger as-child>
      <UiButton size="sm">Assign Role</UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-xl">
      <UiDialogHeader>
        <UiDialogTitle>Assign User Role</UiDialogTitle>
      </UiDialogHeader>
      <form class="mt-4" @submit="onSubmit">
        <UiFormField v-slot="{ componentField }" name="roleId" :model-value="`${item?.role?.id || ''}`">
          <UiFormItem>
            <UiFormLabel>Roles</UiFormLabel>
            <UiSelect v-bind="componentField">
              <UiFormControl>
                <UiSelectTrigger>
                  <UiSelectValue placeholder="Select a role" />
                </UiSelectTrigger>
              </UiFormControl>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem v-for="role in nRoles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiDialogFooter class="mt-4 flex justify-end">
          <UiButton type="submit">
            Save
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>