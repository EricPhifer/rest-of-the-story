<!-- src/components/FormSection.vue -->
<script setup>
import { ref } from 'vue'
import PortableText from '@portabletext/vue'

const props = defineProps({
  block: Object
})

const formData = ref({})

function handleInput(name, value) {
  formData.value[name] = value
}

function handleSubmit() {
  console.log('Submitting form data:', formData.value)
  // Replace with actual POST logic if needed
}
</script>

<template>
  <section class="my-12 px-4 max-w-4xl mx-auto">
    <div class="mb-6 text-center">
      <h2 class="text-3xl font-bold">{{ block.formTitle }}</h2>
      <div v-if="block.formDescription" class="prose mx-auto mt-2">
        <PortableText :value="block.formDescription" />
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div v-for="(field, index) in block.fields" :key="index">
        <label :for="field.name" class="block font-medium mb-1">{{ field.label }}</label>

        <!-- Input Fields -->
        <input
          v-if="field.type === 'text' || field.type === 'email'"
          :type="field.type"
          :id="field.name"
          :name="field.name"
          :required="field.required"
          @input="e => handleInput(field.name, e.target.value)"
          class="w-full border border-gray-300 px-3 py-2 rounded"
        />

        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="field.name"
          :name="field.name"
          :required="field.required"
          @input="e => handleInput(field.name, e.target.value)"
          class="w-full border border-gray-300 px-3 py-2 rounded"
        ></textarea>

        <!-- Select -->
        <select
          v-else-if="field.type === 'select'"
          :id="field.name"
          :name="field.name"
          :required="field.required"
          @change="e => handleInput(field.name, e.target.value)"
          class="w-full border border-gray-300 px-3 py-2 rounded"
        >
          <option disabled value="">Please select</option>
          <option v-for="(option, i) in field.options" :key="i" :value="option">{{ option }}</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  </section>
</template>
