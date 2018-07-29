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
 		  items: [{
 		  	label: '1'
 		  }, {
 		  	label: '2'
 		  }, {
 		  	label: '3'
 		  }],
 		  activeIndex: -1
 	  }
  },
  computed: {
  	hasLabel () {
  		return this.items.some(item => item.label.toString().length > 0)
  	}
  },
  methods: {
  	handleMouseEnter () {},
  	handleMouseLeave () {},
  	throttledIndicatorHover () {}
  }
}
</script>

<style lang="scss">
@import '../packages/theme-chalk/index'
</style>
