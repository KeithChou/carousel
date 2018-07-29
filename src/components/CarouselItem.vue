<template>
<div
	class="el-carousel__item"
	v-show="ready"
	@click="handleItemClick"
	:class="{
		'is-active': active,
		'el-carousel__item--card': $parent.type === 'card',
		'is-in-stage': inStage,
		'is-hover': hover,
		'is-animating': animating }"
	:style="{
		'msTransform': `translateX(${ translate }px) scale(${ scale })`,
		'webkitTransform': `translateX(${ translate }px) scale(${ scale })`,
		'transform': `translateX(${ translate }px) scale(${ scale })`}">
	<div class="el-carousel__mask" v-if="$parent.type === 'card'" v-show="!active"></div>
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'carouselItem',
	props: {
		name: String,
		label: {
			type: [String, Number],
			default: ''
		}
	},
	data () {
		return {
			hover: false,
			translate: 0,
			scale: 1,
			active: false,
			ready: false,
			inStage: false,
			animating: false
		}
	},
	methods: {
		handleItemClick () {}
	}
}
</script>

<style lang="scss">

</style>
