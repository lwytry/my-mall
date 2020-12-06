import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 安装插件
Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: '首页',
        redirect: '/home'
    },{
        path: '/home',
        name: '首页',
        component: Home
    },{
        path: '/category',
        name: '分类',
        component: Category
    },{
        path: '/cart',
        name: '购物车',
        component: Cart
    },{
        path: '/profile',
        name: '我的',
        component: Profile
    }
    // ,{
    //     path: '/detail/:id',
    //     name: '详情',
    //     component: Detail
    // }
    ,{
        path: '/detail',
        name: '详情',
        component: Detail
    }
];

// 创建router
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
