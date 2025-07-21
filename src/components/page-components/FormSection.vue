<!-- src/components/FormSection.vue -->
<script setup>
import { ref } from 'vue'
import { PortableText } from '@portabletext/vue'

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
  <section class="form-section my-12 p-16 ">
    <div class="mb-6 text-center">
      <h2 class="text-3xl font-bold">{{ block.formTitle }}</h2>
      <div 
        v-if="block.formDescription" 
        class="prose mx-auto mt-2"
      >
        <PortableText :value="block.formDescription" />
      </div>
    </div>

   <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <template v-for="(field, index) in block.fields" :key="index">
      <!-- Make textareas span full width -->
      <div :class="field.type === 'textarea' ? 'md:col-span-2' : ''">
        <label
          :for="field.name"
          class="block font-bold mb-1"
        >
          {{ field.label }}
          <span
            v-if="!field.required"
            class="text-sm ml-1"
          >
            (Optional)
          </span>
        </label>

        <!-- Text / Email -->
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
          rows="5"
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
          <option
            v-for="(option, i) in field.options"
            :key="i"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </template>

    <!-- Submit Button -->
    <div class="md:col-span-2 flex justify-end mt-2">
      <button
        type="submit"
        class="bg-[var(--color-secondary-dark)] text-white px-6 py-2 rounded hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary-dark)] transition-colors duration-200"
      >
        Submit
      </button>
    </div>
  </form>

  </section>
</template>
