import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
		connecting: false,
		connectionError: false,
		user: null,
		username: null,
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
			Data.set('client_id', 'horspairorg')
			await axios.post('/oauth', Data).then(async response => {
				//this.$cookies.set('token', response.data['access_token'])
				//this.$cookies.set('refreshToken', response.data['refresh_token'])
				//this.$cookies.set('token_expires', response.data['expires_in'])
				await commit('setUsername', Data.get('username'))
				await commit('connect', Data.get('username'))
				commit('connecting', false)
			}).catch(async (reason) => {
				commit('connectionError', true)
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
		async setUsername(state, username) {
			state.username = username
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
