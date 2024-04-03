<script setup>
import CustomButton from '@/components/CustomButton.vue';
import useUserCompose from '@/composables/useUserCompose.js'
const { card, updateCard } = useUserCompose()
</script>
<template>
  <div class="xl:border-l-4 flex flex-col p-4 gap-3 ">
    <div class="hidden xl:block">
      <h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Settings</h1>
    </div>
    <div class="xl:mt-10">
      <form action="" class="flex gap-3">
        <input v-model="card" placeholder="enter your default card number here" id="card" name="card" type="number"
          autocomplete="card" required=""
          class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" />

        <CustomButton text="update" :action="updateCard"></CustomButton>
      </form>
    </div>
  </div>
</template>