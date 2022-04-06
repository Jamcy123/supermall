import Vue from 'vue'
import App from './App.vue'
import router from "@/router";

Vue.config.productionTip = false

// 初始化 EventBus 事件总线
// 每个 Vue 实例的原型对象上都有 $emit 和 $on
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
