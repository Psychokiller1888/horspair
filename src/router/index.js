import Vue from 'vue'
import store from '@/store/index'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Temoignages from '@/views/Temoignages'
import Tracker from '@/views/Tracker'
import Emdr from '@/views/Emdr'
import Respiration from '@/views/Respiration'
import Carnet from '@/views/Carnet'
import Notes from '@/views/Notes'
import Connexion from '@/views/Connect'
import Enregistrement from '@/views/Register'
import Logout from '@/views/Logout'
import Account from '@/views/Account'
import Urgency from '@/views/Urgency'

Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/temoignages',
		name: 'Témoignages',
		component: Temoignages,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/traqueur',
		name: 'Traqueur d\'humeur',
		component: Tracker,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/emdr',
		name: 'EMDR',
		component: Emdr,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/respiration',
		name: 'Respiration accompagnée',
		component: Respiration,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/carnet',
		name: 'Carnet de bord',
		component: Carnet,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/notes',
		name: 'Notes',
		component: Notes,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/account',
		name: 'Mon compte',
		component: Account,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/urgences',
		name: 'Urgences',
		component: Urgency,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'Connexion',
		component: Connexion,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/signin',
		name: 'Enregistrement',
		component: Enregistrement,
		meta: {
			requiresAuth: false
		}
	}
]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, _from, next) => {
	if (to.path !== '/login' && to.meta['requiresAuth'] && !store.getters.isConnected) {
		next('/login')
	} else {
		next()
	}
})

export default router
