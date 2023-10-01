<template>
  <div class="app">
    <products-page />
  </div>
</template>

<script setup lang="ts">
import ProductsPage from '~/components/Product/ProductsPage/ProductsPage.vue'

useSeoMeta({
  title: 'Три волчонка',
})
</script>
