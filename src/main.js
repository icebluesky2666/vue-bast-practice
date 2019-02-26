// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入mokejs
import Mock from './mock/index'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入图标库 font-awesome
import 'font-awesome/scss/font-awesome.scss'
// 引入自定义滚动条
import VueScroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
// 全局样式文件
import './assets/css/common.scss'


Vue.config.productionTip = false

/* 注入插件*/
Vue.use(ElementUI);
Vue.use(VueScroll, { ops: { bar: { background: '#C0C4CC' } } })
Mock.mockData()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})