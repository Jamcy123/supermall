<template>
  <div class="login">
    <div class="pic">标题</div>
    <form :action="formAction" method="post" ref="form">
      <div class="m-container">
        <!--账号-->
        <div class="input-box" id="account-box">
          <!--图标-->
          <div class="u-logo">
            <div class="u-logo-img1"></div>
          </div>
          <!--账号输入框-->
          <div class="u-input">
            <label for="u_account"></label>
            <input
              type="text"
              name="u_account"
              id="u_account"
              placeholder="账号"
              maxlength="50"
              v-model="account"
              @focus="accountFocus"
              @blur="accountBlur"
            />
          </div>
        </div>
        {{account}}
        <!--密码-->
        <div class="input-box" id="password-box">
          <!--图标-->
          <div class="u-logo">
            <div class="u-logo-img2"></div>
          </div>
          <!--密码输入框-->
          <div>
            <label for="u_password"></label>
            <input type="password"
                   name="u_password"
                   id="u_password"
                   v-model="password"
                   placeholder="密码"
                   @focus="passwordFocus"
                   @blur="passwordBlur"
            />
          </div>
        </div>
        {{password}}
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
  </div>
</template>

<script>
import {
  validateEmail,
  validatePhone,
  validatePassword
} from "@/common/utils";

export default {
  name: "Login",
  data() {
    return {
      formAction:'./index.html',
      account: '',
      password: '',
      accountRight: false,
      passwordRight: false,
    }
  },
  methods: {
    /**
     * 输入框焦点相关
     */
    accountBlur() {
      if(!this.accountCheck(this.account)) {
        this.accountRight = false;
        console.log('账号格式不符合要求');
      } else {
        this.accountRight = true;
        console.log('账号格式符合要求');
      }
    },
    passwordBlur() {
      if(!this.passwordCheck(this.password)) {
        this.passwordRight = false;
        console.log('密码格式不符合要求');
      } else {
        this.passwordRight = true;
        console.log('密码格式符合要求');
      }
    },
    accountFocus() {

    },
    passwordFocus() {

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
  *{
    touch-action: none
  }

  .login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .pic {
    height: 100px;
  }

  .m-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .input-box {
    margin: 10px;
    /*padding: 5px;*/
    border: 1px solid black;
    border-radius: 1%;
    display: flex;
  }

  input {
    border: none;
    height: 46px;
  }

  .u-logo {
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-box .u-logo .u-logo-img1 {
    width: 20px;
    height: 20px;
    background: url("~assets/img/login/ico-user.png") no-repeat;
  }

  .input-box .u-logo .u-logo-img2 {
    width: 20px;
    height: 20px;
    background: url("~assets/img/login/ico-password.png") no-repeat;
  }

</style>
