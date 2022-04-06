<template>
  <!-- 类名与外界相同也不要紧，style 有个 scoped 属性会限制作用域 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: { // 是否上拉加载更多
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null, // 保存 scroll 对象
    }
  },
  mounted() { // 挂载后才能获取控件
    // 1. 创建 BSscroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType, // 侦测 0 1 不侦测实时位置 2 惯性部分不侦测 3 滚动都侦测
      pullUpLoad: this.pullUpLoad //
    })

    // 2. 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position);
    })

    // 3. 监听滚动的位置
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    })
  },
  methods: {
    // 点击回到某个位置
    scrollTo(x, y, time = 350) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
}
</script>

<style scoped>

</style>
