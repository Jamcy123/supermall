<template xmlns:tab-control="http://www.w3.org/1999/xlink">
  <div id="homepage">
    <nav-bar class="home-nav">
      <template v-slot:center><div>首页</div></template>
    </nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
      <goods-list :goods="chooseList"/>
    </scroll>
    <!-- 不随着滚动 -->
    <!-- 组件点击要native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import tabControl from "components/content/tabControl/TabControl"
import scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childcomps/HomeSwiper";
import recommendView from "views/homepage/childcomps/RecommendView";
import FeatureView from "views/homepage/childcomps/FeatureView";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/homepage";
import {deBounce} from "common/utils";

export default {
  name: 'HomePage',
  components: {
    NavBar,
    tabControl,
    scroll,
    HomeSwiper,
    recommendView,
    FeatureView,
    GoodsList,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    chooseList() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata()

    // 2. 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
    // 监听 item 中的图片加载完成
    // 挂载之后再通过 refs 绑定元素去监听
    const refresh = deBounce(this.$refs.scroll.refresh, 300);

    this.$bus.$on('itemImageLoad', () => {
      refresh();
    });

  },
  beforeDestory() {
    // 移除监听事件
    // this.$bus.$off('itemImageLoad');
  },
  methods: {
    /**
     * 绑定事件相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    // 点击 backtop 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听滚动
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType); // 请求数据
    },

    /**
     * 网络请求相关
     */
    // 1. 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    // 2. 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多 不然只能加载一次
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #homepage {
    /*position: relative;*/
    height: 100vh;
  }

  .home-nav{
    background: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 8;*/
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
