import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const HomePage = () => import('views/homepage/HomePage')
const Category = () => import('views/category/CateGory')
const Shopcart = () => import('views/shopcart/ShopCart')
const Profile = () => import('views/profile/ProFile')
const Detail = () => import('views/detail/Detail')

// 映射关系
const routes = [
  {
    path: '',
    redirect: '/homepage'
  },
  {
    path: '/homepage',
    component: HomePage
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
];

export default new Router({
    routes
})
