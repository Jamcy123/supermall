<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
      <div>
        <i class="bar-item bar-right"></i>
        <span class="cart" @click="addToCart">加入购物车</span>
        <div class="buy">购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {

    }
  }
}
</script>

<style scoped>
 .bottom-bar {
   height: 58px;
   position: relative;
   background-color: #fff;
   left: 0;
   right: 0;
   bottom: 0;
 }
</style>
