import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const HomePage = () => import('views/homepage/HomePage');
const Category = () => import('views/category/CateGory');
const ShopCart = () => import('views/shopcart/ShopCart');
const Profile = () => import('views/profile/ProFile');
const Detail = () => import('views/detail/Detail');
const Login = () => import('views/login/Login');
const Register = () => import('views/register/Register');

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
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
];

export default new Router({
    routes
})
