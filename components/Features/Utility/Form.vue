<script setup lang="ts">
import { useUtilityStore } from '@/app/stores/useUtilityStore';
import { formUtilitySchema } from '@/app/validations/utility';
import { useForm } from 'vee-validate';

const controller = useUtilityStore()

const form = useForm({
  validationSchema: formUtilitySchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
})

await controller.get()
</script>
<template>
  <div>
    <div class="grid md:grid-cols-2">
      <div class="w-32 h-32">
        <img src="/logo-sm.png" class="h-full w-full object-cover" alt="logo">
      </div>
      <div class="w-32 h-32">
        <img src="/logo-full-white.png" class="h-full w-full object-cover" alt="logo">
      </div>
    </div>
    <form @submit="onSubmit">
      <div class="space-y-3">
        <UiFormField v-slot="{ componentField }" name="appName" :value="controller.data.appName">
          <UiFormItem>
            <UiFormLabel>App Name</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="mainWhatsApp" :value="controller.data.mainWhatsApp">
          <UiFormItem>
            <UiFormLabel>Whatsapp</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="mainEmail" :value="controller.data.mainEmail">
          <UiFormItem>
            <UiFormLabel>Email</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
    </form>
  </div>
</template>