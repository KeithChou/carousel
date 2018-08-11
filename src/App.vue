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

<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
   background-color: #d3dce6;
}
</style>
