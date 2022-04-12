<template>
  <div id="homepage">
    <nav-bar class="home-nav">
      <template v-slot:center><div>首页</div></template>
    </nav-bar>
    <!-- 选项卡 -->
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="fixed"
                 v-show="isTabFixed"
    />
    <!-- better-scroll 滚动 scroll -->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore"
    >
      <!-- 轮播图home-swiper -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <!-- 本周流行 -->
      <feature-view/>
      <!-- 选项卡 -->
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="chooseList"/>
    </scroll>
    <!-- 不随着滚动 -->
    <!-- 组件点击要native 修饰组件根元素的原生事件 -->
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
// import {deBounce} from "common/utils";
import {itemListenerMixin} from "common/mixin";

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
  mixins: [itemListenerMixin], // 混入
  data() {
    return {
      banners: [], // 轮播
      recommends: [], // 推荐
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentType: 'pop', // 当前商品类型
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0, // 记录离开的位置
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
  mounted() { // 用了混入
    // // 1. 监听 item 中的图片加载完成
    // // 挂载之后再通过 refs 绑定元素去监听
    // const refresh = deBounce(this.$refs.scroll.refresh, 300);
    //
    // // 保存监听的事件
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh();
    // });
  },
  // 这两个在有keep-live的时候才能用
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 最好刷新一下 以防出现不能滚动的bug
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1. 保存离开 home 时的位置
    this.saveY = this.$refs.scroll.getScrollY();

    // 2. 取消全局事件的监听，这里的第二个参数(on 对应的第二个参数)必须要传, 否则全局取消事件
    this.$bus.$off('itemImageLoad', this.itemImgListener)
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 点击 backtop 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听滚动
    contentScroll(position) {
      // 是否显示 BackTop
      this.isShowBackTop = (-position.y) > 1000;
      // 是否显示 tabControl1
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType); // 请求数据
    },
    // 轮播图加载完成
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
    position: relative;
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

  .fixed {
    position: relative;
    z-index: 9;
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
