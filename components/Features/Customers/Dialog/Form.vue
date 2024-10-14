<script setup lang="ts">
import { useCustomerStore } from '@/app/stores/useCustomerStore';
import { formCustomerSchema } from '@/app/validations/customer';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item?: Item }>()
const controller = useCustomerStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: formCustomerSchema,
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
      <ButtonsEdit v-if="item" />
      <ButtonsCreate v-else />
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Form Customer</UiDialogTitle>
      </UiDialogHeader>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <UiFormField v-slot="{ componentField }" name="name" :value="item?.name">
            <UiFormItem>
              <UiFormLabel>Name</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="name" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="phone" :value="item?.phone">
            <UiFormItem>
              <UiFormLabel>Phone</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="phone" v-bind="componentField" />
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