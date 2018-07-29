<template>
  <div id="app">
    <carousel>
      <carousel-item>
        <div class="rascal">呵呵就能大了？</div>
      </carousel-item>
    </carousel>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import CarouselItem from './components/CarouselItem.vue'
export default {
  name: 'App',
  components: {
    Carousel,
    CarouselItem
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
