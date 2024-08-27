<script setup lang="ts">
import { useRoleStore } from '@/app/stores/useRoleStore';
import { formRoleSchema } from '@/app/validations/role';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item: Item }>()
const controller = useRoleStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: formRoleSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.item) {
    await controller.update(values,props.item.id)
  } else {
    await controller.create(values)
  }
  dialog.value = controller.dialog
})
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <ButtonsEdit v-if="item"/>
      <ButtonsCreate v-else/>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Form Role</UiDialogTitle>
      </UiDialogHeader>
      <form @submit="onSubmit">
        <UiFormField v-slot="{ componentField }" name="name" :value="item?.name" >
          <UiFormItem>
            <UiFormLabel>Name</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="name" v-bind="componentField" />
            </UiFormControl>
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