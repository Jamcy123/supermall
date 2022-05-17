<template>
  <div id="app">
    <!--登录注册-->
    <div v-if="!showMall" class="outside">
      <router-view/>
    </div>
    <!--商城页面-->
    <div v-if="showMall" class="inside">
      <keep-alive exclude="Detail">
        <router-view/>
      </keep-alive>
      <main-tab-bar/>
    </div>
  </div>
</template>

<script>
import Login from "views/login/Login";
import MainTabBar from 'components/content/maintabbar/MainTabBar';

export default {
  name: 'App',
  components: {
    Login,
    MainTabBar
  },
  data() {
    return {
      showMall: false
    }
  },
  mounted() {
    this.$bus.$on('homePageShow', () => {
      this.showMall = !this.showMall;
    });
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
