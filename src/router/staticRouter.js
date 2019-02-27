import TheLayout from '@/pages/layout/TheLayout'
import AppLogin from '@/pages/login/AppLogin'
import AppRegister from '@/pages/login/AppRegister'
import AppError401 from '@/pages/error/AppError401'
import AppError404 from '@/pages/error/AppError404'
import FuncHome from '@/pages/functions/home/FuncHome'
import FuncFormsBase from '@/pages/functions/forms/FuncFormsBase'
import FuncFormsEdit from '@/pages/functions/forms/FuncFormsEdit'

/* 静态页面路由 */
const staticRouter = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/login',
    name: '登录',
    component: AppLogin
}, {
    path: '/register',
    name: '注册',
    component: AppRegister
}, {
    path: '/',
    component: TheLayout,
    menu: true,
    children: [{
        path: '/index',
        alias: '/home',
        name: '首页',
        icon: 'el-icon-menu',
        component: FuncHome
    }]
}, {
    path: '/',
    component: TheLayout,
    menu: true,
    name: '表单',
    icon: 'el-icon-tickets',
    children: [{
        path: '/forms/base',
        name: '基本表单',
        component: FuncFormsBase
    }, {
        path: '/forms/edit',
        name: '富文本编辑器',
        component: FuncFormsEdit
    }]
}, {
    path: '/error/401',
    name: '错误401',
    component: AppError401
}, {
    path: '*',
    name: '错误404',
    component: AppError404
}]

export default staticRouter