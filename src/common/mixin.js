import { deBounce } from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null // 全局事件监听的保存
    }
  },
  mounted() {
    // 监听 item 中的图片加载完成
    const refresh = deBounce(this.$refs.scroll.refresh, 300);

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    };
    this.$bus.$on('itemImageLoad', this.itemImgListener);

  }
}
