<script setup lang="ts">
import { useAuthStore } from '@/app/stores/useAuthStore';
import { formLoginSchema } from '@/app/validations/auth';
import { useForm } from 'vee-validate';

const showPassword = ref(false)
const controller = useAuthStore()
const form = useForm({
  validationSchema: formLoginSchema,
})

const onSubmit = form.handleSubmit((values) => {
  controller.loginUser(values)
})

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>
<template>
  <div class="w-full max-w-md mx-auto">
    <div>
      <h2 class="text-2xl font-semibold">Welcome Back!</h2>
      <p class="text-sm text-slate-600">Please login to continue!</p>
    </div>
    <form @submit="onSubmit">
      <div class="space-y-3">
        <UiFormField v-slot="{ componentField }" name="username">
          <UiFormItem>
            <UiFormLabel>Username</UiFormLabel>
            <UiFormControl>
              <div class="relative w-full items-center">
                <UiInput id="username" type="text" placeholder="username..." class="pl-8" v-bind="componentField" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <Icon name="ph:user" />
                </span>
              </div>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="password">
          <UiFormItem>
            <UiFormLabel>Password</UiFormLabel>
            <UiFormControl>
              <div class="relative w-full items-center">
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <Icon name="ph:key-light" />
                </span>
                <UiInput id="password" :type="showPassword ? 'text' : 'password'" placeholder="password" class="pl-8"
                  v-bind="componentField" />
                <button @click="togglePassword" type="button"
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                  <Icon name="ph:eye" />
                </button>
              </div>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
      <UiButton size="lg" type="submit" class="w-full mt-6">
        Login
      </UiButton>
    </form>
  </div>
</template>