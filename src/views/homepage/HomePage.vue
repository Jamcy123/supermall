<template>
  <div id="homepage">
    <nav-bar class="home-nav">
      <template v-slot:center><div>购物车</div></template>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childcomps/HomeSwiper";
import {getHomeMultidata} from "network/homepage";
import recommendView from "views/homepage/childcomps/RecommendView";

export default {
  name: 'HomePage',
  components: {
    NavBar,
    HomeSwiper,
    recommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    // 1. 请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home-nav{
    background: var(--color-tint);
    color: #fff;
  }
</style>
