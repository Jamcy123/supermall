<template>
  <uesr-input
    ref="userAccount"
    dataType="text"
    dataPlaceholder="账号"
    dataName="userAccount"
    @inputFocus="accountFocus"
  >
    <template v-slot:icon-slot>
      <img src="~assets/img/login/ico-user.png" alt="用户标志">
    </template>
  </uesr-input>
</template>

<script>
import uesrInput from "components/content/userInput/UesrInput";

export default {
  name: "AccountInput",
  components: {
    uesrInput
  },
  computed: {
    // 账号
    account() {
      return this.$refs.userAccount.message;
    },
  },
  methods: {
    // 获取焦点
    accountFocus() {
      this.$emit('accountFocus');
    },
    // 展示错误信息
    showError(error) {
      this.$refs.userAccount.showError(error);
    },
    // 关闭错误信息
    closeError() {
      this.$refs.userAccount.closeError();
    },
  }
}
</script>

<style scoped>
  img {
    margin: 10px;
  }
</style>
