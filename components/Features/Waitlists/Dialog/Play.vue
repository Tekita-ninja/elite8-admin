<!-- <script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import type { Item } from 'vue3-easy-data-table';
defineProps<{ item: Item }>()
const controller = useWaitlistStore()
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton size="sm" variant="default">
        <Icon name="solar:play-bold" class="mr-1" /> Play
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          You will play the customer name <b>{{ item?.name }}</b>
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogAction @click="controller.play({
          queueId: item.id
        })" class="bg-destructive">Continue
        </UiAlertDialogAction>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template> -->


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
  initialValues: {
    queueId: props.item.id
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  await controller.play(values)
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