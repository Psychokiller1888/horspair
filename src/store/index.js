import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
		user: null,
		therapists: {
			'yep@notatall.ch': {
				firstName: 'Claire',
				lastName: 'Di Paola',
				phone: '011 111 11 11',
				email: 'yep@notatall.ch'
			},
			'thisisit@nobody.ch': {
				firstName: 'Anaïs',
				lastName: 'Do Carmo',
				phone: '011 111 11 11',
				email: 'thisisit@nobody.ch'
			},
			'jpl@lestoises.ch': {
				firstName: 'Jean-Philippe',
				lastName: 'Lang',
				phone: '011 111 11 11',
				email: 'jpl@lestoises.ch'
			}
		},
		friends: {
			'tiz@ana.ch': {
				firstName: 'Tiziana',
				lastName: 'JeSaisPas',
				phone: '011 111 11 11',
				email: 'tiz@ana.ch'
			},
			'archer@power.com': {
				firstName: 'Marie-Jane',
				lastName: 'D\'arc',
				phone: '011 111 11 11',
				email: 'archer@power.com'
			}
		}
	},
	getters: {
		getTherapistsEmails(state) {
			return Object.keys(state.therapists)
		},
		getFriendsEmails(state) {
			return Object.keys(state.friends)
		}
	},
	actions: {
	},
	mutations: {
		connect(state, userdata) {
			state.user = userdata
		},
		disconnect(state) {
			state.user = null
		},
		updateProfile(state, userdata){
			state.user = Object.assign({}, state.user, userdata)
		},
		addFriend(state, data) {
			state.friends[data.email] = data.data
		},
		addTherapist(state, data) {
			state.therapists[data.email] = data.data
		},
		removeTherapist(state, email) {
			Vue.delete(state.therapists, email)
		},
		removeFriend(state, email) {
			Vue.delete(state.friends, email)
		}
	},
	plugins: [createPersistedState()]
})
