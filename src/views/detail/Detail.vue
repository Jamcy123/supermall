<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail';
import {deBounce} from "common/utils";
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
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
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
      themeTopYs: [], // 标题内容对应的 y 值
      getThemeTopY: null, // 防抖
      currentIndex: 0, // 记录当前滚动到第几个主题
      isShowBackTop: false, // 是否显示回到 BackTop
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

    // 4. 给 getThemeTopY 赋值 (对给 this.themeTopYs 赋值的操作进行防抖)
    this.getThemeTopY = deBounce(() => {
      this.themeTopYs = []; // 先清空，不然不止 4 个值
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Infinity);
    }, 100);
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
    // 图片加载完后调用
    imageLoad() {
      // 图片加载完后刷新 scroll
      this.$refs.scroll.refresh();
      // 获取 4个主题的offsetTop
      this.getThemeTopY();
    },

    // 点击标题，滚动到对应内容
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },

    // 移动页面变化标题栏
    contentScroll(position) {
      // 1. 获取 y 值
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      // 2. 判断 方式一
      // for(let i = 0; i < length; i++) {
      //   if(
      //     this.currentIndex !== i && // 只考虑不是上一个 i 的情况，避免重复赋值
      //     ((i < length - 1 && // 不是最后一个标签
      //           positionY >= this.themeTopYs[i] && // 要考虑上下两个边界
      //           positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]) // 最后一个标签只用考虑一个边界
      //     )) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      // 方式二 引入一个最大的值与最后一个值进行比较
      for(let i = 0; i < length - 1; i++) {
        if(
          this.currentIndex !== i && // 只考虑不是上一个 i 的情况，避免重复赋值
          (positionY >= this.themeTopYs[i]) && // 上边界
          positionY < this.themeTopYs[i + 1] // 下边界
          ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3. 是否显示 BackTop
      this.isShowBackTop = (-position.y) > 1000;
    },

    // 点击 backtop 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
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
    height: calc(100% - 44px - 58px);
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*left: 0;*/
  }
</style>
