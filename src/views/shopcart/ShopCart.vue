<template>
  <div class="shop-cart">
    <!-- 导航栏 -->
    <nav-bar  class="nav-bar">
      <template v-slot:center>
        <div>购物车({{ length }})</div>
      </template>
    </nav-bar>
    <!-- 列表 -->
    <cart-list :list="list"/>
    <!-- 底部汇总 -->
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";

import cartList from "./childcomps/CartList";

import { mapGetters } from "vuex";

export default {
  name: "ShopCart",
  components: {
    navBar,
    cartList
  },
  computed: {
    // cartLength() {
    //   return this.$store.state.cartList.length;
    // },

    // 两种写法
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    })
  },
}
</script>

<style scoped>
  .shop-cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
  }
</style>
