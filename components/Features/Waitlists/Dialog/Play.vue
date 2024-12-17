<script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import { formPlaySchema, formWaitlistSchema } from '@/app/validations/waitlist';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item: Item }>()
const controller = useWaitlistStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: formPlaySchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  await controller.play({
    queueId: props.item.id,
    tableNumber: values.tableNumber
  })
  dialog.value = controller.dialog
})
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <UiButton size="sm" variant="default">
        <Icon name="ci:check-all" class="mr-1" /> Done
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-sm">
      <UiDialogHeader>
        <UiDialogTitle>Form Table</UiDialogTitle>
      </UiDialogHeader>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <UiFormField v-slot="{ componentField }" name="tableNumber">
            <UiFormItem>
              <UiFormLabel>Table Number</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="Table Number" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </div>
        <UiDialogFooter class="mt-4 flex justify-end">
          <UiButton type="submit">
            Submit
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>