<template>
  <v-btn class="close-button" size="x-small" icon @click="close">
    <v-icon size="x-small">mdi-close</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
const emit = defineEmits({
  close: () => true,
})

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./CloseButton.scss"></style>
