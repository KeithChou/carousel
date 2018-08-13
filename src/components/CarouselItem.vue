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
const CARD_SCALE = 0.83
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
		handleItemClick () {
			const parent = this.$parent
			if (parent.type === 'card') {
				const index = parent.items.indexOf(this)
				parent.setActiveItem(index)
			}
		},
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
		calculateTranslate (index, activeIndex, parentWidth) {
			if (this.inStage) {
				return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4
			} else if (index < activeIndex) {
				return -(1 + CARD_SCALE) * parentWidth / 4
			} else {
				return (3 + CARD_SCALE) * parentWidth / 4
			}
		},
		translateItem (index, activeIndex, oldIndex) {
			// 获取到父元素的宽度
			const parentWidth = this.$parent.$el.offsetWidth
			// 拿到indicators的个数，实际上就是外部调用CarouselItem的个数
			const length = this.$parent.items.length
			// 非卡片式轮播，增加transition
			if (this.$parent.type !== 'card' && oldIndex !== undefined) {
				this.animating = index === activeIndex || index === oldIndex
			}
			// 修正轮播的index值
			if (index !== activeIndex && length > 2) {
				index = this.processIndex(index, activeIndex, length)
			}
			if (this.$parent.type === 'card') {
				// 当前activeIndex以及相应的两个
				this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
				this.active = index === activeIndex
				this.translate = this.calculateTranslate(index, activeIndex, parentWidth)
				this.scale = this.active ? 1 : CARD_SCALE
			} else {
				this.active = index === activeIndex
				this.translate = parentWidth * (index - activeIndex)
			}
			this.ready = true
		}
	}
}
</script>

<style lang="scss">
@import '../packages/theme-chalk/carouselItem'
</style>
