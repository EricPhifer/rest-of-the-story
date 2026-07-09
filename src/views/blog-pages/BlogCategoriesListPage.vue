<!-- src/views/blog-pages/BlogCategoriesListPage.vue -->
<template>
  <div class="bg-[var(--color-background)] min-h-screen">
    <section class="container mx-auto px-2 md:px-4 py-10">
      <!-- Header -->
      <header class="mb-8 text-left">
        <h1 class="text-xl md:text-2xl font-bold text-[var(--color-text)] pb-2 border-b-4 border-[var(--color-accent)]">
          Blog Categories
        </h1>
        <p class="text-[var(--color-text-muted)] mt-2 max-w-3xl">
          Explore our blog posts by category
        </p>
      </header>

      <!-- Blog Categories -->
      <BlogCategories title="" />
    </section>
  </div>
</template>

<script setup>
import BlogCategories from '@/components/Blogs/BlogCategories.vue'
</script>
