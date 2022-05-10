<template>
  <div class="user-input">
    <div class="main-container">
      <!--图标-->
      <div class="pic">
        <slot></slot>
      </div>
      <!--输入框-->
      <div class="input-box">
        <input :type="dataType"
               :name="dataName"
               :placeholder="dataPlaceholder"
               v-model="message"
               @focus="inputFocus"
        />
      </div>
    </div>
    <!--错误提示-->
    <div class="error-box"
         ref="errorBox"
    >
    </div>
<!--    <div class="error-box" v-if="isErrorShow"></div>-->
  </div>
</template>

<script>
export default {
  name: "UesrInput",
  props: {
    dataPlaceholder: {
      type: String,
      default() {
        return '请输入';
      }
    },
    dataType: {
      type: String,
      default() {
        return 'text';
      }
    },
    dataName: {
      type: String,
      default() {
        return 'userMessage';
      }
    }
  },
  data() {
    return {
      message: '',
      isErrorShow: false,
      errMsgDiv: null, // 错误信息盒子
      error: '错误信息展示'
    }
  },
  methods: {
    // 获取焦点
    inputFocus() {
      this.$emit('inputFocus');
    },
    // 展示错误信息
    showError(error) {
      this.error = error;
      // 请输入账号
      // 请输入密码
      // 账号或密码错误
      this.isErrorShow = true;
      if(!this.errMsgDiv) {
        const errMsgDiv = document.createElement('div');
        this.errMsgDiv = errMsgDiv;
        console.log(errMsgDiv)
        this.$refs.errorBox.appendChild(errMsgDiv);
      }
      this.errMsgDiv.innerHTML = this.error;

    },
    // 关闭错误信息
    closeError() {
      this.isErrorShow = false;
    },
  }
}
</script>

<style scoped>
  .user-input {
  }

  .main-container {
    height: 46px;
    width: 235px;
    margin: 10px;
    border: 1px solid black;
    border-radius: 2%;

    display: flex;
    align-items: center;
  }

  .input-box {
    height: 100%;
    width: 100%;
  }

  .pic {
    max-width: 40px;
    max-height: 40px;
  }

  input {
    border: none;
    height: 100%;
    width: 100%;
    flex: 1;
  }
</style>
