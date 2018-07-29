<template>
  <div id="app">
    <carousel>
      <carousel-item v-for="item in 5" :key="item">
        <h3>{{ item }}</h3>
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
