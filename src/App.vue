<template>
  <div id="app">
<!--    <button @click="btnClick" >v-if</button>-->
    <login v-if="!showItem"/>
    <div v-if="showItem">
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
      showItem: false
    }
  },
  methods: {
    btnClick() {
      this.showItem = !this.showItem;
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
