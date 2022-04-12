<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail';
// import {deBounce} from "common/utils";
import {itemListenerMixin} from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin], // 混入
  data() {
    return {
      iid: null,
      topImages: [], // 轮播图
      goods: {}, // 商品基本信息
      shop: {}, // 店铺
      detailInfo: {},
      paramInfo: {}, // 参数
      commentInfo: {}, // 评论
      recommends: [], // 推荐
    }
  },
  created() {
    // 1. 保存传入的 iid
    this.iid = this.$route.params.iid;

    // 2. 根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 1. 保存轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4. 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5. 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 6. 获取评论信息
      if(data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3. 请求商品推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    })
  },
  mounted() { // 用了混入
  //   // 监听 item 中的图片加载完成
  //   const refresh = deBounce(this.$refs.scroll,refresh, 50);
  //
  //   // 对监听的事件进行保存
  //   this.itemImgListener = () => {
  //     refresh();
  //   };
  //   this.$bus.$on('itemImageLoad', this.itemImgListener);
  // },
  // destroyed() { // detail 没有 keep-alive 所以这里不用 deactivated
  //   // 取消事件监听
  //   this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  methods: {
    imageLoad() {
      // 图片加载完后刷新 scroll
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  /* 给一个固定的高度 */
  .content {
    height: calc(100% - 44px);
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*left: 0;*/
  }
</style>
