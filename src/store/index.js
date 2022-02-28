import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VuexPersist from 'vuex-persist'
import router from '@/router'

// Load Vuex
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
	key:     'vuex',
	storage: window.sessionStorage
})

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: process.env.VUE_APP_API_BASEURL
})
axiosInstance.interceptors.request.use(async config => {
	config.headers = {
		'Authorization': `Bearer ${Vue.$cookies.get('accessToken')}`,
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
	return config
}, error => {
	return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
	return response
}, async (error) => {
	const originalConfig = error.config
	if (error.response && error.response.status === 498 && !originalConfig._retry) {
		originalConfig._retry = true
		try {
			const refresh = await axiosInstance.get(`/refreshToken/${Vue.$cookies.get('userId')}/${Vue.$cookies.get('refreshToken')}/`)
			const data = refresh.data
			Vue.$cookies.set('accessToken', data['accessToken'])
			Vue.$cookies.set('refreshToken', data['refreshToken'])
			return axiosInstance(originalConfig)
		} catch (error) {
			return Promise.reject(error)
		}
	} else if (error.response && error.response.status === 307) {
		if (error.response.data['doLogout']) {
			store.commit('disconnect')
		}
		await router.push({path: error.response.data['redirectTo']})
		return
	}
	return Promise.reject(error)
})

// Create store
const store = new Vuex.Store({
	state:     {
		axios:           axiosInstance,
		connecting:      false,
		connectionError: false,
		user:            null,
		therapists:      {},
		friends:         {}
	},
	getters:   {
		getTherapistsEmails(state) {
			return Object.keys(state.therapists)
		},
		getFriendsEmails(state) {
			return Object.keys(state.friends)
		}
	},
	actions:   {
		async login({commit}, Data) {
			commit('connecting', true)
			commit('connectionError', false)
			await axiosInstance.post('/login/', Data).then(async response => {
				if (response.status !== 200) {
					commit('connectionError', true)
				} else {
					Vue.$cookies.set('userId', response.data['userData']['id'])
					Vue.$cookies.set('accessToken', response.data['accessToken'])
					Vue.$cookies.set('refreshToken', response.data['refreshToken'])
					let partDay = new Date().getHours()
					Vue.notify({
						title: 'Connexion',
						type: 'success',
						text: `${(partDay > 2 && partDay < 18) ? 'Bonjours' : 'Bonsoir'} ${response.data['userData']['firstname']}!`
					})
					await commit('connect', response.data['userData'])
					await commit('setFriendList', response.data['friendList'])
					commit('connecting', false)
				}
			}).catch(async (_reason) => {
				commit('connectionError', true)
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Erreur de connexion. Vérifies ton adresse email et ton mot de passe'
				})
				throw new Error()
			}).finally(() => {
				commit('connecting', false)
			})
		},
		async updateProfile({commit}, data) {
			axiosInstance.patch(`/users/${Vue.$cookies.get('userId')}/`, data).then(response => {
				if (response.status === 200) {
					commit('updateProfile', data)
					Vue.notify({
						title: 'Succès',
						type: 'success',
						text: 'Ton profil a été mis à jour!'
					})
				} else {
					Vue.notify({
						title: 'Erreur',
						type: 'error',
						text: 'Malheureusement une erreur s\'est produite au moment d\'enregistrer tes données.'
					})
				}
			}).catch(_reason => {
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Malheureusement une erreur s\'est produite au moment d\'enregistrer tes données.'
				})
			})
		}
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
			Vue.$cookies.keys().forEach(cookie => Vue.$cookies.remove(cookie))
		},
		updateProfile(state, userdata) {
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
	plugins:   [vuexLocalStorage.plugin]
})

export default store
