<template>
	<div
    class="el-carousel"
    :class="{ 'el-carousel--card': type === 'card' }"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div
      class="el-carousel__container"
      :style="{ height: height }">
      <slot></slot>
    </div>
    <ul
      class="el-carousel__indicators"
      v-if="indicatorPosition !== 'none'"
      :class="{ 'el-carousel__indicators--labels': hasLabel, 'el-carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card' }">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="el-carousel__indicator"
        :class="{ 'is-active': index === activeIndex }"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="el-carousel__button"><span v-if="hasLabel">{{ item.label }}</span></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
  	initialIndex: {
  		type: Number,
  		default: 0
  	},
  	height: String,
  	autoPlay: {
  		type: Boolean,
  		default: true
  	},
  	trigger: {
  		type: String,
  		default: 'hover'
  	},
  	interval: {
  		type: Number,
  		default: 3000
  	},
  	indicatorPosition: String,
  	indicator: {
  		type: Boolean,
  		default: true
  	},
  	type: String
  },
 	data () {
 	  return {
 		  items: [],
 		  activeIndex: -1,
 		  containerWidth: 0,
 		  timer: null,
 		  hover: false
 	  }
  },
  computed: {
  	hasLabel () {
  		return this.items.some(item => item.label.toString().length > 0)
  	}
  },
  mounted () {
  	// 根据子元素的carouselItem来确定indicator的个数
  	this.updateItems()
  },
  methods: {
  	updateItems () {
  		this.items = this.$children.filter(item => item.$options.name === 'carouselItem')
  	},
  	handleMouseEnter () {},
  	handleMouseLeave () {},
  	throttledIndicatorHover () {}
  }
}
</script>

<style lang="scss">
@import '../packages/theme-chalk/index'
</style>
