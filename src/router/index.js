import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {requiresAuth: true}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {requiresAuth: false}
	},
	{
		path: '/stats',
		name: 'Stats',
		component: Stats,
		meta: {requiresAuth: true}
	},
	{
		path: '/generate',
		name: 'Create',
		component: Create,
		meta: {requiresAuth: true}
	}
]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta['requiresAuth'])) {
		if (store.getters.isConnected) {
			next()
			return
		}
		next('/login')
	} else {
		next()
	}
})

export default router
