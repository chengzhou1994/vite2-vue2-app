<template>
  <div id="wrap">
    <div class="row">
      <Carousel />
      <SeriesPlays />
    </div>
  </div>
</template>

<script>
import Carousel from '../components/layouts/Carousel.vue'
import SeriesPlays from '../components/layouts/SeriesPlays.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    SeriesPlays
  }
}
</script>

<style scoped></style>
