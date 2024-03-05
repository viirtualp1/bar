<template>
  <div class="product-filters">
    <template v-if="drink">
      <v-btn
        v-for="(filter, idx) in drinkFilters"
        :key="idx"
        rounded
        @click="updateFilter(filter.value)"
        :variant="getButtonVariant(filter.value)"
      >
        {{ filter.text }}
      </v-btn>
    </template>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits({
  'update:filter': (_v: string) => true,
})

const props = defineProps({
  currentFilter: {
    type: String,
    default: '',
  },
  drink: {
    type: Boolean,
    default: false,
  },
})

const drinkFilters = computed(() => [
  { text: 'Все', value: 'all' },
  { text: 'Фильтрованное', value: 'filtered' },
  { text: 'Нефильтрованное', value: 'not-filtered' },
  { text: 'Светлое', value: 'light' },
  { text: 'Темное', value: 'dark' },
])

function updateFilter(filter: string) {
  emit('update:filter', filter)
}

function getButtonVariant(filter: string) {
  return props.currentFilter === filter ? 'elevated' : 'outlined'
}
</script>

<style lang="scss" src="ProductFilters.scss"></style>
