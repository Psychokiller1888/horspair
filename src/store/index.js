import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VuexPersist from 'vuex-persist'

// Load Vuex
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
	key: 'vuex',
	storage: window.sessionStorage
})

// Create store
export default new Vuex.Store({
	state: {
		connecting: false,
		connectionError: false,
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
		async login({commit}, Data) {
			commit('connecting', true)
			commit('connectionError', false)
			await axios.post('/login/', Data).then(async response => {
				if (response.status !== 200) {
					commit('connectionError', true)
					throw(new Error())
				} else {
					Vue.$cookies.set('userId', response.data['userId'])
					Vue.$cookies.set('accessToken', response.data['accessToken'])
					Vue.$cookies.set('tokenExpiry', response.data['accessTokenExpiry'])
					Vue.$cookies.set('refreshToken', response.data['refreshToken'])
					Vue.$cookies.set('refreshTokenExpiry', response.data['refreshTokenExpiry'])
					await commit('connect', response.data['userData'])
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
		}
	},
	plugins: [vuexLocalStorage.plugin]
})
