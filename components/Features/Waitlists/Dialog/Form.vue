<script setup lang="ts">
// import { useCustomerStore } from '@/app/stores/useCustomerStore';
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import { formWaitlistSchema } from '@/app/validations/waitlist';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item?: Item }>()
const controller = useWaitlistStore()
// const customerController = useCustomerStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: formWaitlistSchema,
  initialValues: {
    queueNumber: 0
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.item) {
    await controller.update(values, props.item.id)
  } else {
    await controller.create(values)
  }
  dialog.value = controller.dialog
})


// async function onPhoneBlur(e: any) {
//   await customerController.getByPhone(e.target.value)
//   form.setFieldValue('name', customerController.detail.name)
// }

async function handleOpen() {
  await controller.getLastNum()
  form.setFieldValue('queueNumber', controller.lastNum + 1)
}
</script>

<template>
  <UiDialog v-model:open="dialog" @update:open="handleOpen">
    <UiDialogTrigger as-child>
      <ButtonsEdit v-if="item" />
      <ButtonsCreate v-else />
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Form Waitlist</UiDialogTitle>
      </UiDialogHeader>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <div
            class="h-12 w-12 border flex items-center justify-center text-xl font-bold rounded-lg bg-black text-white">
            {{ controller.lastNum + 1 }}</div>
          <UiFormField v-slot="{ componentField }" name="phone" :value="item?.phone">
            <UiFormItem>
              <UiFormLabel>Phone</UiFormLabel>
              <UiFormControl>
                <!-- v-on:blur="onPhoneBlur" -->
                <UiInput type="text" placeholder="phone" data-maska-tokens="9:[0-9]:repeated" v-maska
                  data-maska="####-####-####-#" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="name" :value="item?.name">
            <UiFormItem>
              <UiFormLabel>Name</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="name" v-bind="componentField" />
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