<template>
  <div class="user-input">
    <div class="main-container">
      <div class="pic">
        <slot></slot>
      </div>
      <div class="input-box">
        <input :type="dataType"
               :name="dataName"
               :placeholder="dataPlaceholder"
               v-model="message"
               @focus="inputFocus"
               @blur="inputBlur"
        />
      </div>
    </div>
    <div class="error-box" v-if="isErrorShow">{{error}}</div>
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
      isErrorShow: true,
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
      this.isErrorShow = true;
    },
    // 关闭错误信息
    closeError() {
      this.isErrorShow = false;
    }
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
