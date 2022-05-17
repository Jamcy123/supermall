<template>
  <div class="register">
    <div class="back" @click="backClick">返回</div>
    <div class="logo">注册界面</div>
    <form :action="formAction" method="post" ref="form">
      <div class="m-container">
        <!--账号-->
        <account-input
          ref="userAccount"
          dataPlaceholder="手机号码/邮箱"
          @accountFocus="inputFocus"/>
        <!--密码-->
        <password-input ref="userPassword" @passwordFocus="inputFocus"/>
        <password-input
          ref="repeatPassword"
          dataPlaceholder="重复密码"
          @passwordFocus="inputFocus"
        />
        <!--错误提示-->
        <!--登录条款-->
        <!--登录按钮-->
        <div class="loginBtn">
          <a href="javascript:void(0);" @click="registerClick">
            注&nbsp;&nbsp;册
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AccountInput from "components/content/userInput/accountInput/AccountInput";
import PasswordInput from "components/content/userInput/passwordInput/PasswordInput";

export default {
  name: "Register",
  components: {
    AccountInput,
    PasswordInput,
  },
  data() {
    return {
      formAction: '', // 表单提交地址
      accountRight: false, // 账号格式正确
      passwordRight: false, // 密码格式正确
      repeatRight: false, // 两次密码相同
    }
  },
  computed: {
    account() {
      return this.$refs.userAccount.account; // 账号
    },
    password() {
      return this.$refs.userPassword.password; // 密码
    },
    passwordRepeat() {
      return this.$refs.repeatPassword.password; // 重复密码
    }
  },
  methods: {
    // 回退
    backClick() {
      this.$router.go(-1);
    },
    /**
     * 关闭错误显示
     */
    // 输入框获取焦点，不显示错误
    inputFocus() {
      this.$refs.userAccount.closeError();
      this.$refs.userPassword.closeError();
      this.$refs.repeatPassword.closeError();
    },

    /**
     * 注册按钮
     */
    registerClick() {
      // 判断格式
      if(this.inputCheck()) {
        // 提交数据

        // 账号是否已经用过


        // 注册成功跳转
        // this.$toast.show('注册成功', 1000);
        // this.backClick();
      }
    },
    // 格式判断
    inputCheck() {
      // 本地判断格式
      this.$refs.userAccount.accountError();
      this.$refs.userPassword.passwordError();
      this.$refs.repeatPassword.passwordError();
      // 记录格式正确性
      this.passwordRight = this.$refs.userPassword.passwordRight;
      this.accountRight = this.$refs.userAccount.accountRight;
      this.repeatRight = (this.password === this.passwordRepeat);
      // 密码格式正确 但密码不相同
      if(this.passwordRight && this.accountRight && !this.repeatRight) {
        // 密码不相同
        // 第三个框弹出提示信息
        this.$refs.repeatPassword.showError('两次输入的密码不相同');
      }
      return this.passwordRight && this.accountRight && this.repeatRight;
    },
  }
}
</script>

<style scoped>
  * {
    touch-action: none;
  }

  .register {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .back {
    position: fixed;
    left: 0;
    top: 0;
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

  .loginBtn {
    width: 100px;
    height: 30px;
    margin-top: 10px;
    text-align: center;
    border-radius: 7%;
    background: var(--color-tint);
  }

  .loginBtn a {
    line-height: 30px;
    color: #f2f5f8;
  }
</style>
