import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import Toast from "components/common/toast";

import fastClick from 'fastclick'

Vue.config.productionTip = false

// 初始化 EventBus 事件总线
// 每个 Vue 实例的原型对象上都有 $emit 和 $on
Vue.prototype.$bus = new Vue()

// 安装 Toast 插件 会去指向 toast 里面的index.js的install函数
Vue.use(Toast);

// 解决移动端 300ms 延迟
fastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
