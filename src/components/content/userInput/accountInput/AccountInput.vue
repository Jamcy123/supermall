<template>
  <uesr-input
    ref="userAccount"
    dataType="text"
    :dataPlaceholder="dataPlaceholder"
    dataName="userAccount"
    @inputFocus="accountFocus"
    @inputBlur="accountBlur"
  >
    <template v-slot:icon-slot>
      <img src="~assets/img/login/ico-user.png" alt="用户标志">
    </template>
  </uesr-input>
</template>

<script>
import uesrInput from "components/content/userInput/UesrInput";
import { validateEmail, validatePhone } from "common/utils";

export default {
  name: "AccountInput",
  components: {
    uesrInput
  },
  props: {
    dataPlaceholder: {
      type: String,
      default(){
        return '账号'
      }
    }
  },
  data() {
    return {
      accountRight: false, // 账号格式正确
    }
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
    // 失去焦点
    accountBlur() {
      this.$emit('accountBlur');
    },
    // 账号框错误显示
    accountError() {
      // 判断格式
      if(this.account.length === 0) {
        this.showError('请输入账号');
      } else if(!this.accountCheck(this.account)) {
        this.accountRight = false;
        this.showError('账号格式不符合要求');
      } else {
        this.accountRight = true;
        console.log('账号格式符合要求');
      }
    },
    // 展示错误信息
    showError(error) {
      return this.$refs.userAccount.showError(error);
    },
    // 关闭错误信息
    closeError() {
      this.$refs.userAccount.closeError();
    },
    // 验证格式
    accountCheck(account) {
      // 手机号 / 邮箱
      return validatePhone(account) || validateEmail(account);
    }
  }
}
</script>

<style scoped>
  img {
    margin: 10px;
  }
</style>
