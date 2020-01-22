import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Message, Loading } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
	children:[
		{
			path:'/',
			component: () => import('../components/RouterHome.vue')
		},
		{
			path:'/classtype',
			component: () => import('../components/ClassType.vue')
		},
		{
			path:'/classlist',
			component: () => import('../components/ClassList.vue')
		},
		{
			path:'/musicrecommend',
			component: () => import('../components/MusicRecommend.vue')
		},
		{
			path:'/musicsearch',
			component: () => import('../components/MusicSearch.vue')
		}
	]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	const isLogin = localStorage.getItem('token') ? true : false;
	if(to.path === '/login' || to.path === '/register'){
		next();
	}else{
		if(isLogin){
			next()
		}else{
			Message.error('请先登陆');
			next({name: 'login'})
		}
	}
})

export default router
