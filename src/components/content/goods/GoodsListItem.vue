<template>
  <div class="goods-item" @click="itemClick">
<!--    <img :src="showImage" alt="" @load="imageLoad">-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  computed: {
    showImage() {
      // 对首页商品和详情的推荐商品做一个判断
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    },
    chooseId() {
      // 商品 id 取值判断
      return this.goodsItem.iid || this.goodsItem.item_id;
    }
  },
  methods: {
    imageLoad() {
      // GoodListItem -> HomePage 非父子组件通信 使用事件总线 $bus
      // GoodListItem -> Detail 非父子组件通信 使用事件总线 $bus
      this.$bus.$emit('itemImageLoad');

      // 方式一 路由区分
      // if(this.$route.path.indexOf('/home') !== -1) {
      //   this.$bus.$emit('homeItemImageLoad');
      // } else if(this.$route.path.indexOf('detailItemLoad') !== -1) {
      //   this.$bus.$emit('detailItemImgLoad');
      // }

      // 方式二 离开时取消事件监听
    },
    itemClick() {
      // console.log(123)
      this.$router.push('/detail/' + this.chooseId)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
