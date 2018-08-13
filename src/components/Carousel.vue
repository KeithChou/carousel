<template>
	<div
    class="el-carousel"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div
      class="el-carousel__container"
      :style="{ height: height }">
      <transition name="carousel-arrow-left">
        <button
          type="button"
          v-if="arrow !== 'never'"
          v-show="arrow === 'always' || 'hover' && hover"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="el-carousel__arrow el-carousel__arrow--left">
          <i class="left"></i>
        </button>
      </transition>
      <transition name="carousel-arrow-right">
        <button
          type="button"
          v-if="arrow !== 'never'"
          v-show="arrow === 'always' || 'hover' && hover"
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="el-carousel__arrow el-carousel__arrow--right">
          <i class="right"></i>
        </button>
      </transition>
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
        @mouseenter="handleIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="el-carousel__button"><span v-if="hasLabel">{{ item.label }}</span></button>
      </li>
    </ul>
  </div>
</template>

<script>
import { addResizeObserver, removeResizeObserver } from '../utils/utils'
import { throttle } from 'throttle-debounce'

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
    arrow: {
      type: String,
      default: 'hover'
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
  watch: {
    activeIndex (val, oldVal) {
      this.resetItemPosition(oldVal)
    },
    autoPlay (val) {
      val ? this.startTimer() : this.pauseTimer()
    },
    items (val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex)
    }
  },
  computed: {
  	hasLabel () {
  		return this.items.some(item => item.label.toString().length > 0)
  	}
  },
  created () {
    this.handleIndicatorHover = throttle(300, this.handleIndicatorHover)
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index)
    })
  },
  mounted () {
    // 根据子元素的CarouselItem实例来确定indicator的个数
    this.updateItems()
    // 由于updateItems涉及到了DOM的更新，因此需要在DOM更新完之后再去监听this.$el的变化
    this.$nextTick(() => {
      // 每次this.$el发生变化时（大小、出现或隐藏），就去调用子组件的方法改变位置
      addResizeObserver(this.$el, this.resetItemPosition)
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
      this.activeIndex = this.initialIndex
      }
      // 改变indicator的活动位置
      this.startTimer()
    })
  },
  beforeDestroy () {
    if (this.$el) removeResizeObserver(this.$el, this.resetItemPosition)
  },
  methods: {
  	updateItems () {
  		this.items = this.$children.filter(item => item.$options.name === 'CarouselItem')
  	},
    resetItemPosition (oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex)
      })
    },
    startTimer () {
      if (this.interval < 0 || !this.autoPlay) return
      // 使用定时器时一定要记得clearTimeout
      this.timer = window.setInterval(this.playSlides, this.interval)
    },
    pauseTimer () {
      clearInterval(this.timer)
    },
    playSlides () {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++
      } else {
        this.activeIndex = 0
      }
    },
  	handleMouseEnter () {
      this.hover = true
      this.pauseTimer()
    },
  	handleMouseLeave () {
      this.hover = false
      this.startTimer()
    },
    setActiveItem (index) {
      index = Number(index)
      if (isNaN(index) || index !== Math.floor(index)) {
        return
      }
      const length = this.items.length
      const oldIndex = this.activeIndex
      if (index < 0) {
        this.activeIndex = length - 1
      } else if (index >= length) {
        this.activeIndex = 0
      } else {
        this.activeIndex = index
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex)
      }
    },
  	handleIndicatorHover (index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index
      }
    },
    handleIndicatorClick (index) {
      if (index !== this.activeIndex) {
        this.activeIndex = index
      }
    }
  }
}
</script>

<style lang="scss">
@import '../packages/theme-chalk/index';
</style>
