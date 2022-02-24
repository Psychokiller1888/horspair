import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
		connecting: false,
		connectionError: false,
		user: null,
		token: null,
		refreshToken: null,
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
		async login({commit}, Data) {
			commit('connecting', true)
			commit('connectionError', false)
			await axios.post('/login/', Data).then(async response => {
				if (response.status !== 200) {
					commit('connectionError', true)
					throw(new Error())
				} else {
					Vue.$cookies.set('token', response.data['accessToken'])
					Vue.$cookies.set('refreshToken', response.data['refreshToken'])
					Vue.$cookies.set('tokenExpiry', response.data['expiry'])
					Vue.$cookies.set('userId', response.data['userId'])
					await commit('connect', Data.get('email'))
					commit('connecting', false)
				}
			}).catch(async (reason) => {
				commit('connectionError', true)
				console.warn(reason)
				throw(new Error(reason))
			}).finally(() => {
				commit('connecting', false)
			})
		},
	},
	mutations: {
		connect(state, userdata) {
			state.user = userdata
		},
		connecting(state, data) {
			state.connecting = data
		},
		connectionError(state, data) {
			state.connectionError = data
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
		},
		async setToken(state, token) {
			state.token = token
		},
		async setRefreshToken(state, token) {
			state.refreshToken = token
		},
	},
	plugins: [createPersistedState()]
})
