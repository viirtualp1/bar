<template>
  <div class="app">
    <products-page />
  </div>
</template>

<script setup lang="ts">
import ProductsPage from '@/components/ProductsPage/ProductsPage.vue'

useSeoMeta({
  title: 'Три волчонка',
})
</script>
