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
import { addResizeObserver } from '../utils/utils'

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
  watch: {
    activeIndex (val, oldVal) {
      this.resetItemPosition(oldVal)
      this.$emit('change', val, oldVal)
    },
    autoPlay (val) {
      val ? this.startTimer() : this.pauseTimer()
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
    // 由于updateItems涉及到了DOM的更新，因此需要在DOM更新完之后再去监听this.$el的变化
    this.$nextTick(() => {
      // 每次this.$el发生变化时，就去调用子组件的方法改变位置
      addResizeObserver(this.$el, this.resetItemPosition)
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex
      }
      // 改变indicator的活动位置
      this.startTimer()
    })
  },
  methods: {
  	updateItems () {
  		this.items = this.$children.filter(item => item.$options.name === 'carouselItem')
  	},
    resetItemPosition (oldIndex) {
      console.log(1)
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex)
      })
    },
    startTimer () {
      if (this.interval < 0 || !this.autoPlay) return
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
  	handleMouseEnter () {},
  	handleMouseLeave () {},
  	throttledIndicatorHover (index) {
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

.box {
  text-align: center;
  height: 20vh;
  border-radius: 8px;
  box-shadow: 0 0 4px var(--subtle);

  display: flex;
  justify-content: center;
  align-items: center;
}

.box h3 {
  color: #fff;
  margin: 0;
  font-size: 5vmin;
  text-shadow: 0 0 10px rgba(0,0,0,0.4);
}

.box.small {
  max-width: 550px;
  margin: 1rem auto;
}
</style>
