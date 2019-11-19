import 'babel-polyfill' // 解决ie9, 及高级浏览器低版本不能使用es6语法问题
// import 'amfe-flexible'
import '@/packages/style/base.less'
import '@/styles/app.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/demo/App.vue'
import routes from '@/views/demo/router/router'
import store from '@/views/demo/store/store'
import lang from '@/lang/index'
import auth from '@/utils/auth'
import ga from '@/utils/baidu_ga'
import FastClick from 'fastclick'

FastClick.attach(document.body)

import {Button, Icon, NavBar, Cell, CellGroup, Dialog, Toast, Notify, Axios} from 'fy-elui'

Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
Vue.component(NavBar.name, NavBar)
Vue.component(Cell.name, Cell)
Vue.component(CellGroup.name, CellGroup)

Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Notify)
Vue.use(Axios)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
window._hmt = window._hmt || [];

router.beforeEach((to, from, next) => {
  if (window.location.host.indexOf('smart') !== -1) {
    ga()
  }

  if (to.path) {
    window._hmt.push(['_trackPageview', '/#' + to.fullPath])
  }

  next()
})
auth.checkLogin(router)
const i18n = lang.initLanguage()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
