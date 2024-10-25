<script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import { formUpdateWaitlistSchema } from '@/app/validations/waitlist';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item: Item }>()
const controller = useWaitlistStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: formUpdateWaitlistSchema,
  initialValues: {
    status: "WAITING",
    queueNumber: 0
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  await controller.update(values, props.item.id)
  dialog.value = controller.dialog
})

async function handleOpen() {
  form.setFieldValue('numOfCall', 0)
  form.setFieldValue('queueNumber', props.item.queueNumber)
  form.setFieldValue('status', "WAITING")
}
</script>

<template>
  <UiDialog v-model:open="dialog" @update:open="handleOpen">
    <UiDialogTrigger as-child>
      <UiButton size="sm">
        <Icon name="mingcute:back-2-line" class="mr-1" /> Rollback
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Roleback Queue</UiDialogTitle>
      </UiDialogHeader>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <div class="p-3 bg-black text-white border rounded-lg">
            <div class="flex text-xs font-semibold">
              <div class="w-24">Name</div>
              <div class="mx-2">:</div>
              <div class="flex-1">{{ item?.name }}</div>
            </div>
            <div class="flex text-xs font-semibold">
              <div class="w-24">Phone</div>
              <div class="mx-2">:</div>
              <div class="flex-1">{{ item?.phoneNumber }}</div>
            </div>
            <div class="flex text-xs font-semibold">
              <div class="w-24">Num Of Call</div>
              <div class="mx-2">:</div>
              <div class="flex-1">{{ item?.numOfCall }} x</div>
            </div>
            <div class="flex text-xs font-semibold">
              <div class="w-24">Current Status</div>
              <div class="mx-2">:</div>
              <div class="flex-1">{{ item?.status }}</div>
            </div>
          </div>
          <!-- <UiFormField v-slot="{ componentField }" name="customerId" :model-value="'WAITING'">
            <UiFormItem>
              <UiFormLabel>Select Status</UiFormLabel>
              <UiSelect v-bind="componentField">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue placeholder="Select a fruit" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectLabel>status</UiSelectLabel>
                    <UiSelectItem value="WAITING">WAITING</UiSelectItem>
                    <UiSelectItem value="PLAYING">PLAYING</UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </UiFormItem>
          </UiFormField> -->
          <!-- <pre>{{ controller?.results?.meta.total }}</pre> -->
          <!-- :value="controller?.results?.meta?.total + 1 || 1" -->
          <!-- <UiFormField v-slot="{ componentField }" name="queueNumber">
            <UiFormItem>
              <UiFormLabel>Queue Number</UiFormLabel>
              <UiFormControl>
                <UiInput type="number" placeholder="queueNumber" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField> -->
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