<template>
  <div class="user-input">
    <div class="main-container">
      <!--图标-->
      <div class="icon-box">
        <slot name="icon-slot"></slot>
      </div>
      <!--输入框-->
      <div class="input-box">
        <input :type="dataType"
               :name="dataName"
               :placeholder="dataPlaceholder"
               v-model="message"
               @focus="inputFocus"
               @blur="inputBlur"
               class="input-label"
        />
      </div>
      <!--右边插槽-->
      <div class="option-box">
        <slot name="option-slot"></slot>
      </div>
    </div>
    <!--错误提示-->
    <div class="error-box" v-show="isErrorShow">
      <div class="err-img"></div>
      <div class="err-mes" ref="errMsgDiv"></div>
    </div>
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
      error: '错误信息展示'
    }
  },
  methods: {
    // 获取焦点
    inputFocus() {
      this.$emit('inputFocus');
    },
    // 失去焦点
    inputBlur() {
      this.$emit('inputBlur');
    },
    // 展示错误信息
    showError(error) {
      this.error = error;
      // 展示盒子
      this.isErrorShow = true;
      // 修改错误信息
      this.$refs.errMsgDiv.innerHTML = this.error;
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

  .main-container:focus-within {
    border: 1px solid var(--color-tint);
  }

  .input-box {
    height: 100%;
    width: 100%;
  }

  .icon-box {
    max-width: 40px;
    max-height: 40px;
  }

  input {
    height: 100%;
    width: 100%;
    flex: 1;
    border: none;
    outline: none;
  }

  .err-mes {
    display: inline-block;
    margin-left: 5px;
    vertical-align: top;
    color: red;
    font-size: 13px;
  }

  .err-img {
    display: inline-block;
    margin-left: 8px;
    width: 16px;
    height: 16px;
    background: url("~assets/img/login/err-img.png") no-repeat;
  }

</style>
