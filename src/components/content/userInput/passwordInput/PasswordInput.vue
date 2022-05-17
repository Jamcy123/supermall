<template>
  <uesr-input
    ref="userPassword"
    :dataType="passwordShow ? 'text' : 'password'"
    :dataPlaceholder="dataPlaceholder"
    dataName="userAccount"
    @inputFocus="passwordFocus"
    @inputBlur="passwordBlur"
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
import { validatePassword } from "common/utils";

export default {
  name: "PasswordInput",
  components: {
    uesrInput
  },
  props: {
    dataPlaceholder: {
      type: String,
      default() {
        return '密码';
      }
    }
  },
  data() {
    return {
      passwordShow: false, // 显示密码
      passwordRight: false, // 密码格式正确
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
    // 失去焦点
    passwordBlur() {
      this.$emit('passwordBlur');
    },
    // 密码显示
    eyeWink() {
      this.passwordShow = !this.passwordShow;
    },
    // 密码框错误显示
    passwordError() {
      // 判断格式
      if(this.password.length === 0) {
        this.showError('请输入密码');
      } else if(!this.passwordCheck(this.password)) {
        this.passwordRight = false;
        this.showError('8-16个字符, 需包含大、小写字母和数字');
      } else {
        this.passwordRight = true;
        console.log('密码格式符合要求');
      }
    },
    // 展示错误信息
    showError(error) {
      this.$refs.userPassword.showError(error);
    },
    // 关闭错误信息
    closeError() {
      this.$refs.userPassword.closeError();
    },
    // 验证格式
    passwordCheck(password) {
      // 8-16个字符, 需包含大、小写字母和数字
      return validatePassword(password);
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
