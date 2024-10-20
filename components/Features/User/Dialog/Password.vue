<script setup lang="ts">
import { useUserStore } from '@/app/stores/useUserStore';
import { formUserPasswordSchema } from '@/app/validations/user';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item?: Item }>()
const controller = useUserStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: formUserPasswordSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.item) {
    await controller.update(values,props.item.id)
  }
  dialog.value = controller.dialog
})
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <UiButton size="sm">
        Change Password
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Change Admin Password</UiDialogTitle>
      </UiDialogHeader>
      <div class="p-2 border bg-slate-100 rounded-lg">
        <div class="font-semibold text-sm">Name: {{ item?.name }}</div>
      </div>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <UiFormField v-slot="{ componentField }" name="password" :value="item?.password">
            <UiFormItem>
              <UiFormLabel>New Password</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="password" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </div>
        <UiDialogFooter class="mt-4 flex justify-end">
          <UiButton type="submit">
            Save
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>