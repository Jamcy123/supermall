<template>
  <div class="login">
    <div class="logo">标题</div>
    <form :action="formAction" method="post" ref="form">
      <div class="m-container">
        <uesr-input
          ref="userAccount"
          dataType="text"
          dataPlaceholder="账号"
          dataName="userAccount"
          @inputFocus="accountFocus"
          @inputBlur="accountBlur"
        >
          <img src="~assets/img/login/ico-user.png" alt="用户标志">
        </uesr-input>
        <!--密码-->
        <uesr-input
          ref="userPassword"
          dataType="password"
          dataPlaceholder="密码"
          dataName="userAccount"
          @inputFocus="passwordFocus"
          @inputBlur="passwordBlur"
        >
          <img src="~assets/img/login/ico-password.png" alt="用户标志">
        </uesr-input>
        <!--错误提示-->
        <div class="error-box" style="display:none;"></div>
        <!--登录条款-->
<!--        <div>登录条款</div>-->
        <!--登录按钮-->
        <div>
          <a href="javascript:void(0);" @click="loginClick">
            登&nbsp;&nbsp;录
          </a>
        </div>
      </div>
    </form>
    <button @click="btnClick">123</button>
  </div>
</template>

<script>
import UesrInput from "components/content/userInput/UesrInput";

import {
  validateEmail,
  validatePhone,
  validatePassword
} from "@/common/utils";

export default {
  name: "Login",
  components: {
    UesrInput
  },
  data() {
    return {
      formAction:'',
      account: '',
      password: '',
      accountRight: false,
      passwordRight: false,
    }
  },
  methods: {
    btnClick() {
      this.$refs.userAccount.showError(123);
    },

    /**
     * 输入框焦点相关
     */
    accountBlur() {
      this.account = this.$refs.userAccount.message;
      if(!this.accountCheck(this.account)) {
        this.accountRight = false;
        console.log('账号格式不符合要求');
      } else {
        this.accountRight = true;
        console.log('账号格式符合要求');
      }
    },
    passwordBlur() {
      this.password = this.$refs.userPassword.message;
      if(!this.passwordCheck(this.password)) {
        this.passwordRight = false;
        console.log('密码格式不符合要求');
      } else {
        this.passwordRight = true;
        console.log('密码格式符合要求');
      }
    },
    accountFocus() {
      this.$refs.userAccount.closeError();
    },
    passwordFocus() {
      this.$refs.userPassword.closeError();
    },

    /**
     * 正则相关
     */
    accountCheck(account) {
      // 非空
      if(account.length === 0) return false;
      // 手机号 邮箱
      if(!validatePhone(account) && !validateEmail(account)) return false;
      // 符合要求
      return true;
    },
    passwordCheck(password) {
      // 8-16个字符, 需包含大、小写字母和数字, 不能包含空格
      return validatePassword(password);
    },

    /**
     * 登录按钮
     */
    loginClick() {
      // 本地判断
      !this.accountRight && this.accountBlur();
      !this.passwordRight && this.passwordBlur();

      // 提交数据
      // this.$refs.form.submit();

      // 返回值处理？

      // 存储 切换
      // this.$store.commit('addAccount', this.account);
      // console.log(this.$store.state);
    }
  }
}
</script>

<style scoped>
  .login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 100px;
  }

  .m-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    margin: 10px;
  }

</style>
