import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Temoignages from '@/views/Temoignages'
import Traqueur from '@/views/Traqueur'
import Emdr from '@/views/Emdr'
import Respiration from '@/views/Respiration'
import Carnet from '@/views/Carnet'
import Notes from '@/views/Notes'
import Connexion from '@/views/Connexion';
import Enregistrement from '@/views/Enregistrement';
import Logout from '@/views/Logout';
import Account from '@/views/Account';

Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {}
	},
	{
		path: '/temoignages',
		name: 'Témoignages',
		component: Temoignages,
		meta: {}
	},
	{
		path: '/traqueur',
		name: 'Traqueur d\'humeur',
		component: Traqueur,
		meta: {}
	},
	{
		path: '/emdr',
		name: 'EMDR',
		component: Emdr,
		meta: {}
	},
	{
		path: '/respiration',
		name: 'Respiration accompagnée',
		component: Respiration,
		meta: {}
	},
	{
		path: '/carnet',
		name: 'Carnet de bord',
		component: Carnet,
		meta: {}
	},
	{
		path: '/notes',
		name: 'Notes',
		component: Notes,
		meta: {}
	},
	{
		path: '/account',
		name: 'Mon compte',
		component: Account,
		meta: {}
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout,
		meta: {
			doLogout: true
		}
	},
	{
		path: '/login',
		name: 'Connexion',
		component: Connexion,
		meta: {}
	},
	{
		path: '/signin',
		name: 'Enregistrement',
		component: Enregistrement,
		meta: {}
	}
]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
