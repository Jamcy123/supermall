<template xmlns:tab-control="http://www.w3.org/1999/xlink">
  <div id="homepage">
    <nav-bar class="home-nav">
      <template v-slot:center><div>首页</div></template>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature/>
    <tab-control :titles="['流行', '新款', '精选']" />
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import tabControl from "components/content/tabControl/TabControl"

import HomeSwiper from "./childcomps/HomeSwiper";
import recommendView from "views/homepage/childcomps/RecommendView";
import feature from "views/homepage/childcomps/feature";

import { getHomeMultidata, getHomeGoods } from "network/homepage";

export default {
  name: 'HomePage',
  components: {
    NavBar,
    tabControl,
    HomeSwiper,
    recommendView,
    feature
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
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
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    }
  }
}
</script>

<style scoped>
  .home-nav{
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 8;
  }
</style>
