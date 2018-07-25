<template>
	<div class="el-carousel" :class="{ 'el-carousel--card': type === 'card' }" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
		<div class="el-carousel__container" :style="{ height: height }">
			<div class="el-carousel__container--page">123</div>
			<slot></slot>
		</div>
		<ul class="el-carousel__indicators" v-if="indicatorPosition !== 'none'" :class="{ 'el-carousel__indicators--labels': hasLabel, 'el-carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card'}">
			<li class="el-carousel__indicator" :class="{ 'is-active': index === activeIndex }" @mouseenter="thrttledIndicatorHover(index)" @click.stop="handleIndicatorClick(index)" v-for="(item, index) in items" :key="index">
				<button class="el-carousel__button" v-if="hasLabel">
					{{ item.label }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
  	type: {
  		type: String,
  		default: 'card'
  	},
  	height: {
  		type: String,
  		default: '130'
  	}
  },
 	data () {
 	  return {
 		  indicatorPosition: 'outside',
 		  items: [{
 		  	label: '1'
 		  }, {
 		  	label: '2'
 		  }, {
 		  	label: '3'
 		  }],
 		  hasLabel: true,
 		  activeIndex: -1
 	  }
  }
}
</script>

<style lang="scss">
@import '../packages/theme-chalk/index'
</style>
