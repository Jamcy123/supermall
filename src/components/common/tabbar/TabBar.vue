<template>
  <div id="tab-bar">
    <!-- 使用插槽 以便能往里面动态传入TabBarItem -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar {
    /* 本身的样式 */
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);

    /* 利用flex进行布局 */
    display: flex;

    /* 定位相关 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
