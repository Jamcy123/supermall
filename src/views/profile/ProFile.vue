<template>
  <div>
    <h2>我的</h2>
    <button @click="signOut">退出登录</button>
  </div>
</template>

<script>

export default {
  name: "ProFile",
  methods: {
    signOut() {
      this.$router.push('/login')
      this.$bus.$emit('homePageShow');
    }
  }
}
</script>

<style scoped>

</style>
