<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in list"
                      :key="index"
                      :product="item"/>
    </scroll>
  </div>
</template>

<script>
import scroll from "components/common/scroll/Scroll";

import cartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    scroll,
    cartListItem
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
