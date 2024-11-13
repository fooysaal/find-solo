<!-- components/form/login.vue -->

<template>
    <div class="flex flex-col items-start justify-center w-full">
      <CommonLogo class="h-[40px]"  />
      <h2 class="font-bold text-xl md:text-2xl my-4">
        Login user
      </h2>
      <form
          @submit.prevent="handleSubmitLogin"
          class="flex gap-4 flex-wrap w-full">
  
        <div class="w-full">
          <label class="text-sm block">Email address:</label>
          <InputText
              @blur="validateEmail"
              v-model="data.email.value"
              :invalid="!!data.email.error"
              size="small" class="w-full" type="email" name="email" placeholder="Email address" />
        </div>
  
        <div class="w-full">
          <label class="text-sm block">Password:</label>
          <InputText
              @blur="validatePassword"
              v-model="data.password.value"
              :invalid="!!data.password.error"
              size="small" class="w-full" type="password" name="password" placeholder="Password" />
        </div>
  
        <div class="error-message">
          <p class="text-[12px] text-red-500" v-if="!!data.email.error">{{data.email.error}}</p>
          <p class="text-[12px] text-red-500" v-if="!!data.password.error">{{data.password.error}}</p>
          <p class="text-[12px] text-red-500" v-if="status === 'error'">
            {{error}}
          </p>
        </div>
  
        <Button
            type="submit"
            :loading="status === 'loading'"
            :disabled="status === 'loading' || !isFormValid"
            class="text-sm md:text-md w-full justify-center h-[48px]">Login</Button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import useLogin from "~/composables/auth/useLogin";
  
  const { data , status, error, login , isFormValid, validatePassword, validateEmail } = useLogin()
  
  async function handleSubmitLogin() {
      await login()
      if(status.value === 'success') {
        navigateTo('/dashboard', { replace: true })
      }
  }
  
  </script>
  
  <style scoped lang="css">
  
  </style>
  