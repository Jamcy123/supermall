<template>
  <uesr-input
    ref="userPassword"
    :dataType="passwordShow ? 'text' : 'password'"
    dataPlaceholder="密码"
    dataName="userAccount"
    @inputFocus="passwordFocus"
  >
    <template v-slot:icon-slot>
      <img src="~assets/img/login/ico-password.png" alt="密码标志">
    </template>
    <template v-slot:option-slot>
      <div :class="eyeStyle" @click="eyeWink"></div>
    </template>
  </uesr-input>
</template>

<script>
import uesrInput from "components/content/userInput/UesrInput";

export default {
  name: "PasswordInput",
  components: {
    uesrInput
  },
  data() {
    return {
      passwordShow: false, // 显示密码
    }
  },
  computed: {
    // 显示密码按钮
    eyeStyle() {
      return this.passwordShow ? 'eye-close eye-open' : 'eye-close';
    },
    // 密码
    password() {
      return this.$refs.userPassword.message;
    },
  },
  methods: {
    // 获取焦点
    passwordFocus() {
      this.$emit('passwordFocus');
    },
    // 展示错误信息
    showError(error) {
      this.$refs.userPassword.showError(error);
    },
    // 关闭错误信息
    closeError() {
      this.$refs.userPassword.closeError();
    },
    // 密码显示
    eyeWink() {
      this.passwordShow = !this.passwordShow;
    },
  }
}
</script>

<style scoped>
  img {
    margin: 10px;
  }

  .eye-close {
    width: 22px;
    height: 22px;
    background-image: url("~assets/img/login/eye.png");
    background-repeat: no-repeat;
    margin-right: 7px;
    background-position: -179px -476px;
  }

  .eye-open {
    background-position: -94px -476px;
  }
</style>
