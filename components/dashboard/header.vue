<!-- components/dashboard/header.vue -->
<template>
    <header>
      <nav class="flex items-center justify-between shadow-md p-4">
        <div class="flex items-center gap-4">
          <CommonLogo class="h-[40px]" />
          <h1 class="text-white text-xl">Dashboard</h1>
        </div>
        <div class="flex items-center gap-4">
          <Button size="small" class="text-sm">Profile</Button>
          <Button size="small" class="text-sm">Logout</Button>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped lang="scss">
  
  </style>