<template>
  <div class="login">
    <!--商标-->
    <div class="logo">登录界面</div>
    <form :action="formAction" method="post" ref="form">
      <div class="m-container">
        <!--账号-->
        <account-input ref="userAccount" @accountFocus="inputFocus"/>
        <!--密码-->
        <password-input ref="userPassword" @passwordFocus="inputFocus"/>
        <!--错误提示-->
        <!--登录条款-->
        <!--登录按钮-->
        <div class="loginBtn">
          <a href="javascript:void(0);" @click="loginClick">
            登&nbsp;&nbsp;录
          </a>
        </div>
      </div>
    </form>
    <div @click="registerClick">注册</div>
  </div>
</template>

<script>
import AccountInput from "components/content/userInput/accountInput/AccountInput";
import PasswordInput from "components/content/userInput/passwordInput/PasswordInput";

export default {
  name: "Login",
  components: {
    AccountInput,
    PasswordInput,
  },
  data() {
    return {
      formAction:'', // 表单提交链接
      accountRight: false, // 账号格式正确
      passwordRight: false, // 密码格式正确
    }
  },
  computed: {
    account() {
      return this.$refs.userAccount.account; // 账号
    },
    password() {
      return this.$refs.userPassword.password; // 密码
    }
  },
  methods: {
    /**
     * 关闭错误显示
     */
    // 输入框获取焦点，不显示错误
    inputFocus() {
      this.$refs.userAccount.closeError();
      this.$refs.userPassword.closeError();
    },

    /**
     * 登录按钮
     */
    loginClick() {
      // 格式正确
      if(this.inputCheck()) {
        // 提交数据
        // this.$refs.form.submit();

        // 返回值处理？

        // 账号或密码错误提示
        this.$refs.userPassword.showError('账号或密码错误');

        // 账号密码正确
        // 存储账号
        // this.$store.commit('addAccount', this.account);
        // console.log(this.$store.state);
        // 切换页面
        this.$toast.show('登录成功', 1000);
        this.homePageShow();
      }
    },
    // 格式判断
    inputCheck() {
      // 本地判断格式
      this.$refs.userPassword.passwordError();
      this.$refs.userAccount.accountError();
      // 记录格式正确性
      this.passwordRight = this.$refs.userPassword.passwordRight;
      this.accountRight = this.$refs.userAccount.accountRight;
      return this.passwordRight && this.accountRight;
    },
    // 跳转商城页面
    homePageShow() {
      this.$router.push('/homepage')
      this.$bus.$emit('homePageShow');
    },

    /**
     * 注册
     */
    registerClick() {
      this.$router.push('/register');
    }
  }
}
</script>

<style scoped>
  * {
    touch-action: none;
  }

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
