import 'babel-polyfill' // 解决ie9, 及高级浏览器低版本不能使用es6语法问题
// import 'amfe-flexible'
import '@/styles/base.less'
import Vue from 'vue'
import App from '@/views/login/App'
import lang from '@/lang/index'

const i18n = lang.initLanguage()

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
