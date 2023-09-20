<template>
  <v-carousel
    class="images-slider"
    cycle
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item v-for="(photo, idx) in photos" :key="idx">
      <v-img class="images-slider__image" :src="photo" cover />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
defineProps({
  photos: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
</script>

<style lang="scss" src="./ImagesSlider.scss"></style>
