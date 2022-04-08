<template>
 <div class="navbar">
   <div id="left"><slot name="left"></slot></div>
   <div id="center"><slot name="center"></slot></div>
   <div id="right"><slot name="right"></slot></div>
 </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .navbar{
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
  }
  #center {
    flex: 1;
  }
  #right, #left {
    width: 60px;
  }

</style>
