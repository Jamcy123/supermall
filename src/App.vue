<template>
  <div id="app">
    <button @click="btnClick" v-if="!showItem">v-if</button>
    <div v-if="showItem">
      <keep-alive exclude="Detail">
        <router-view/>
      </keep-alive>
      <main-tab-bar></main-tab-bar>
    </div>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar';

export default {
  name: 'App',
  components: {
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
