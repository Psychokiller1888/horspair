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
				firstname: 'Claire',
				lastname: 'Di Paola',
				phone: '011 111 11 11',
				email: 'yep@notatall.ch'
			},
			'thisisit@nobody.ch': {
				firstname: 'Anaïs',
				lastname: 'Do Carmo',
				phone: '011 111 11 11',
				email: 'thisisit@nobody.ch'
			},
			'jpl@lestoises.ch': {
				firstname: 'Jean-Philippe',
				lastname: 'Lang',
				phone: '011 111 11 11',
				email: 'jpl@lestoises.ch'
			}
		},
		friends: {}
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
					await commit('setFriendList', response.data['friendList'])
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
			state.friends = {}
			state.therapists = {}
			Vue.$cookies.remove('userId')
			Vue.$cookies.remove('accessToken')
			Vue.$cookies.remove('tokenExpiry')
			Vue.$cookies.remove('refreshToken')
			Vue.$cookies.remove('refreshTokenExpiry')
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
		setFriendList(state, list) {
			state.friends = list
		}
	},
	plugins: [vuexLocalStorage.plugin]
})
