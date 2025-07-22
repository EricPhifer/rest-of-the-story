<!-- src/components/FormSection.vue -->
<script setup>
import { reactive } from 'vue'
import { PortableText } from '@portabletext/vue'

const props = defineProps({
  block: Object
})

const formData = reactive({})
const errors = reactive({})

function handleInput(name, value) {
  formData[name] = value
  errors[name] = '' // Clear error when user inputs
}

async function handleSubmit() {
  let hasErrors = false
  errorsClear()

  for (const field of props.block.fields) {
    if (field.required && !formData[field.name]) {
      errors[field.name] = `${field.label} is required.`
      hasErrors = true
    }
  }

  if (!hasErrors) {
    try {
      const res = await fetch('/.netlify/functions/sendFormEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert('Thank you! Your message was sent.')
        Object.keys(formData).forEach(key => formData[key] = '')
      } else {
        console.error(await res.text())
        alert('There was a problem submitting the form.')
      }
    } catch (err) {
      console.error(err)
      alert('There was a network error.')
    }
  }
}


function errorsClear() {
  for (const key in errors) {
    errors[key] = ''
  }
}
</script>

<template>
  <section class="form-section my-4 p-6 sm:my-12 sm:p-16">
    <div class="max-w-5xl mx-auto mb-6 text-center">
      <h2 class="text-3xl font-bold">
        {{ block.formTitle }}
      </h2>
      <div v-if="block.formDescription" class="prose mx-auto mt-2">
        <PortableText :value="block.formDescription" />
      </div>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      role="form"
      :aria-labelledby="block.formTitle"
    >
      <!-- Honeypot for spam prevention -->
      <input
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
        class="hidden"
        @input="e => handleInput('website', e.target.value)"
      />
      <template v-for="(field, index) in block.fields" :key="index">
        <div
          :class="[
            'flex flex-col',
            field.type === 'textarea' ? 'md:col-span-2' : 'md:col-span-1',
          ]"
        >
          <label
            :for="field.name"
            class="block font-bold mb-1"
          >
            {{ field.label }}
            <span
              v-if="!field.required"
              class="text-sm text-[var(--color-white)] ml-1"
            >
              (Optional)
            </span>
          </label>

          <!-- Input -->
          <input
            v-if="field.type === 'text' || field.type === 'email'"
            :type="field.type"
            :id="field.name"
            :name="field.name"
            :required="field.required"
            :aria-required="field.required ? 'true' : 'false'"
            :autocomplete="field.type === 'email' ? 'email' : 'on'"
            @input="e => handleInput(field.name, e.target.value)"
            class="w-full border border-gray-300 px-3 py-2 rounded"
          />

          <!-- Textarea -->
          <textarea
            v-else-if="field.type === 'textarea'"
            :id="field.name"
            :name="field.name"
            :required="field.required"
            :aria-required="field.required ? 'true' : 'false'"
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
            :aria-required="field.required ? 'true' : 'false'"
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

          <!-- Error Message -->
          <span
            v-if="errors[field.name]"
            class="text-sm text-red-600 mt-1"
            role="alert"
          >
            {{ errors[field.name] }}
          </span>
        </div>
      </template>

      <!-- Submit Button -->
      <div class="md:col-span-2 flex justify-end mt-4">
        <button
          type="submit"
          class="w-full sm:w-1/2 md:w-1/3 bg-[var(--color-secondary-dark)] text-white px-8 py-4 rounded hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary-dark)] transition-colors duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  </section>
</template>
