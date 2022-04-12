<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item, index) in titles" :key="index"
               class="title-item"
               :class="{active: index === currentIndex}"
               @click="itemClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', "参数", "评论", "推荐"],
      currentIndex: 0
    }
  },
  methods: {
    // 标题栏点击切换
    itemClick(index) {
      this.currentIndex = index;
      // 传出 currentIndex
      this.$emit('titleClick', index);
    },
    // 回退
    backClick() {
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back {
    margin-top: 6px;
  }
</style>
