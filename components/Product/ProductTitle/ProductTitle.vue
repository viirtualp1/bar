<template>
  <v-card-title class="product-title">
    <div class="product-title__text">
      <slot />
    </div>

    <close-button @close="close" />
  </v-card-title>
</template>

<script setup lang="ts">
const emit = defineEmits({
  close: () => true,
})

function close() {
  emit('close')
}
</script>

<style lang="scss" src="ProductTitle.scss"></style>
