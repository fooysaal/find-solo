<!-- pages/auth/verifyEmail.vue -->
<template>
    <div
        class="mt-10 overflow-hidden grid max-w-[980px] max-h-[600px] h-[100vh] mx-auto items-center ">
      <div
          class="bg-register-pattern bg-contain relative w-full p-6 md:p-12 md:pb-4 flex h-[100%] items-center justify-center flex-col text-center rounded-md overflow-hidden">
        <div
            class=" bg-gradient-to-tl from-blue-700 to-violet-800 absolute top-0 left-0 w-full h-full z-0 opacity-80"></div>
  
        <div v-if="status === 'success'"
             class="flex flex-col gap-4 grow items-center justify-center relative z-2 text-white">
          <h2 class="text-xl md:text-2xl font-bold">
            Your Email has been verified.
          </h2>
          <p class="text-sm md:text-md">Log in and enjoy the experience.</p>
          <Button
              class="border-white text-white text-sm md:text-md min-w-[130px] justify-center h-[48px]" outlined>
            Sign in
          </Button>
        </div>
        <div v-else-if="status === 'loading' || status === 'idle'"
             class="flex flex-col gap-4 grow items-center justify-center relative z-2 text-white">
          <ProgressSpinner class="spinner" strokeWidth="3" aria-label="Loading"/>
        </div>
        <div v-else-if="status === 'error'"
             class="flex flex-col gap-4 grow items-center justify-center relative z-2 text-white">
          <h2 class="text-xl md:text-2xl font-bold">
            {{ error }}
          </h2>
        </div>
        <p class="grow-0 text-[12px] mt-4 relative z-2 text-white ">Need Help?
          <NuxtLink>support@suppport.com</NuxtLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import useVerifyEmail from "~/composables/auth/useVerifyEmail";
  const {verifyEmail, error, status} = useVerifyEmail();
  
  definePageMeta({
    layout: 'identity'
  })
  
  useHead({
    title: 'Email Verified',
    meta: [
      {
        name: 'description',
        content: status.value === 'success' ? 'Email verified successfully' : 'Email verification failed'
      }
    ]
  })
  
  onMounted(async () => {
    await verifyEmail();
  });
  
  </script>
  
  <style scoped lang="css">
  .spinner * {
    stroke: white !important;
  }
  </style>