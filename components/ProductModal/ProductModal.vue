<template>
  <v-dialog
    class="product-modal"
    v-model="currentValue"
    :fullscreen="$vuetify.display.smAndDown"
  >
    <slot />
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  'update:value': (_value: boolean) => true,
})

const currentValue = ref(props.value)

watch(
  () => props.value,
  (v) => {
    currentValue.value = props.value
    emit('update:value', v)
  },
)
</script>

<style lang="scss" src="./ProductModal.scss"></style>
