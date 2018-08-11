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
	name: 'CarouselItem',
	props: {
		name: String,
		label: {
			type: [String, Number],
			default: ''
		}
	},
	created () {
		this.$parent && this.$parent.updateItems()
	},
	destroyed () {
		this.$parent && this.$parent.updateItems()
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
		handleItemClick () {},
		processIndex (index, activeIndex, length) {
			/**
			 * 处理两个边界，基于parentWidth * (index - activeIndex)公式
			 * 一： 活动index等于0 && 索引等于len - 1时，重置index = -1，改变translate的距离
			 * 二：活动index等于len - 1 && 所以等于0，重置一下index = len，改变translate的距离
			 */
			if (activeIndex === 0 && index === length - 1) {
				return -1
			} else if (activeIndex === length - 1 && index === 0) {
				return length
			}
			return index
		},
		translateItem (index, activeIndex, oldIndex) {
			const parentWidth = this.$parent.$el.offsetWidth
			const length = this.$parent.items.length
			if (this.$parent.type !== 'card' && oldIndex !== undefined) {
				this.animating = index === activeIndex || index === oldIndex
			}
			if (index !== activeIndex && length > 2) {
				index = this.processIndex(index, activeIndex, length)
			}
			this.active = index === activeIndex
			this.translate = parentWidth * (index - activeIndex)
			this.ready = true
		}
	}
}
</script>

<style lang="scss">
@import '../packages/theme-chalk/carouselItem'
</style>
