<template>
  <v-carousel
    class="images-slider"
    cycle
    height="400"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item v-for="(photo, idx) in photos" :key="idx">
      <v-sheet height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <v-img class="images-slider__image" :src="photo" />
        </div>
      </v-sheet>
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
