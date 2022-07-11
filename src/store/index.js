import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VuexPersist from 'vuex-persist'
import router from '@/router'
import commons from '@/js/commons'

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
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	if (Vue.$cookies.get('accessToken')) {
		config.headers['Authorization'] = `Bearer ${Vue.$cookies.get('accessToken')}`
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
		if (error.response.data.payload['logout']) {
			store.commit('disconnect')
		}
		await router.push({path: error.response.data.payload['redirect']})
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
		friends:         {},
		moodTrackerData: [],
		guardianAngelTimer: 0,
		guardianAngelNoAvailable: false,
		guardianAvailabilities: {
			0: [],
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: []
		}
	},
	getters:   {
		isConnected(state) {
			return state.user !== null && 'email' in state.user && state.user.email !== ''
		},
		getTherapistsEmails(state) {
			return Object.keys(state.therapists)
		},
		getFriendsEmails(state) {
			return Object.keys(state.friends)
		},
		getFriendList(state) {
			const pending = {}
			const accepted = {}

			for (const [key, Friend] of Object.entries(state.friends)) {
				if (Friend['pendingInvite'] === 1) {
					pending[key] = Friend
				} else {
					accepted[key] = Friend
				}
			}
			return {
				pending: pending,
				accepted: accepted
			}
		},
		getMoodDataByMonth: (state) => (month, year) => {
			const ret = {}
			Object.values(state.moodTrackerData).forEach((entry) => {
				const date = new Date(entry.dates)
				if (date.getMonth() + 1 === month && date.getFullYear() === year) {
					if (!(date.getDate() in ret)) {
						ret[date.getDate()] = []
					}
					ret[date.getDate()].push(entry)
				}
			})
			return ret
		}
	},
	actions:   {
		async login({commit}, Data) {
			commit('connecting', true)
			commit('connectionError', false)
			await axiosInstance.post('/login/', Data).then(async response => {
				if (response.status !== 200) {
					commit('connectionError', true)
					Vue.notify({
						title: 'Erreur',
						type: 'error',
						text: 'Erreur de connexion.'
					})
				} else {
					Vue.$cookies.set('userId', response.data['userData']['id'])
					Vue.$cookies.set('accessToken', response.data['accessToken'])
					Vue.$cookies.set('refreshToken', response.data['refreshToken'])
					let partDay = new Date().getHours()
					Vue.notify({
						title: 'Connexion',
						type: 'success',
						text: `${(partDay > 2 && partDay < 18) ? 'Bonjour' : 'Bonsoir'} ${response.data['userData']['firstname']}!`
					})
					await commit('connect', response.data['userData'])
					await commit('setFriendList', response.data['friendList'])
					await commit('setGuardianAvailabilities', response.data['guardianAvailabilities'])
					await commit('setGuardianWaitTimer', response.data['guardianWaitTime'])
					await commit('setGuardianNoAvailable', response.data['guardianNoAvailable'])
					commit('connecting', false)
				}
			}).catch(async (_reason) => {
				commit('connectionError', true)
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Erreur de connexion.'
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
			}).catch(reason => {
				if (reason.response.status === 401) {
					Vue.notify({
						title: 'Erreur',
						type: 'warn',
						text: "Le mot de passe actuel ne correspond pas, ton mot de passe n'a pas été changé."
					})
				} else {
					Vue.notify({
						title: 'Erreur',
						type: 'error',
						text: 'Malheureusement une erreur s\'est produite au moment d\'enregistrer tes données.'
					})
				}
			})
		},
		async addNewMoodEntry({commit}, data) {
			let key = 0
			for (const entry of this.state.moodTrackerData) {
				if (entry.key > key) {
					key = entry.key
				}
			}
			let newEntry = {
				key: key + 1,
				customData: {
					time: `${commons.addZeroBefore(data.date.getHours())}:${commons.addZeroBefore(data.date.getMinutes())}`,
					icon: data.icon,
					comment: data.comment,
					class: 'calendar-icon'
				},
				dates: data.date
			}
			await axiosInstance.put(`/moodTracker/${Vue.$cookies.get('userId')}/`, {
				mood: data.icon,
				date: data.date.toString(),
				comment: data.comment
			}).then(async response => {
				if (response.status !== 200) {
					Vue.notify({
						title: 'Erreur',
						type: 'error',
						text: 'Une erreur est survenue au moment de l\'enregistrement'
					})
				} else {
					Vue.notify({
						title: 'Succès',
						type: 'success',
						text: 'Ton humeur a bien été enregistrée!'
					})
					newEntry.key = response.data.payload['insertId']
					await commit('addMood', newEntry)
				}
			}).catch(async (_reason) => {
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Une erreur est survenue au moment de l\'enregistrement'
				})
				throw new Error()
			})
		},
		async editMoodEntry({commit}, data) {
			await axiosInstance.patch(`/moodTracker/${Vue.$cookies.get('userId')}/`, {
				id: data.id,
				mood: data.icon,
				date: data.date.toString(),
				comment: data.comment
			}).then(async response => {
				if (response.status !== 200) {
					throw new Error()
				} else {
					for (const [index, entry] of Object.entries(this.state.moodTrackerData)) {
						if (entry.key === data.id) {
							commit('editMood', {index: index, mood: data})
							Vue.notify({
								title: 'Succès',
								type: 'success',
								text: 'Entrée éditée'
							})
							break
						}
					}
				}
			}).catch(async (_reason) => {
				console.log(_reason)
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Une erreur est survenue au moment de l\'enregistrement'
				})
				throw new Error()
			})
		},
		async deleteMoodEntry({commit}, key) {
			await axiosInstance.delete(`/moodTracker/${key}/`).then(async response => {
				if (response.status !== 200) {
					Vue.notify({
						title: 'Erreur',
						type: 'error',
						text: 'Une erreur est survenue au moment de la suppression de l\'entrée'
					})
				} else {
					for (const [index, entry] of Object.entries(this.state.moodTrackerData)) {
						if (entry.key === key) {
							commit('removeMood', index)
							Vue.notify({
								title: 'Succès',
								type: 'success',
								text: 'Entrée supprimée'
							})
							break
						}
					}
				}
			}).catch(async (_reason) => {
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Une erreur est survenue au moment de la suppression de l\'entrée'
				})
				throw new Error()
			})
		},
		async getMoods({commit}) {
			commit('eraseMoods')
			await axiosInstance.get(`/moodTracker/${Vue.$cookies.get('userId')}/`).then(async response => {
				if (response.status !== 200) {
					Vue.notify({
						title: 'Erreur',
						type: 'error',
						text: 'Une erreur est survenue au moment de la récupération des données'
					})
				} else {
					for (const mood of response.data) {
						const date = new Date(mood['date'])
						let newEntry = {
							key: mood['id'],
							customData: {
								time: `${commons.addZeroBefore(date.getHours())}:${commons.addZeroBefore(date.getMinutes())}`,
								icon: mood['mood'],
								comment: mood['comment'],
								class: 'calendar-icon'
							},
							dates: date
						}
						await commit('addMood', newEntry)
					}
				}
			}).catch(async (_reason) => {
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Une erreur est survenue au moment de la récupération des données'
				})
				throw new Error()
			})
		},
		async becomeGuardian({commit, state}) {
			await axiosInstance.put(`/guardianAngel/${Vue.$cookies.get('userId')}/`).then(response => {
				if (response.status !== 200) {
					throw new Error()
				} else {
					commit('setGuardian', true)
					Vue.notify({
						title: 'Succès',
						type: 'success',
						text: `Bienvenu dans le programme de soutient ${state.user.firstname}!`
					})
				}
			}).catch(async (_reason) => {
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Tu n\'as pas pu rejoindre le programme suite à une erreur.'
				})
				throw new Error()
			})
		},
		async addGuardianAvailabilities({commit}, data) {
			await axiosInstance.post('/guardianAngel/availabilities/', data).then(response => {
				if (response.status !== 200) {
					throw new Error()
				} else {
					for (const availability of response.data) {
						commit('addGuardianAvailability', availability)
					}
					Vue.notify({
						title: 'Succès',
						type:  'success',
						text:  'Disponibilités mise à jour!'
					})
				}
			}).catch(() => {
				Vue.notify({
					title: 'Erreur',
					type:  'error',
					text:  'Erreur au moment de la mise à jour'
				})
			})
		},
		async deleteGuardianAvailability({commit, state}, id) {
			await axiosInstance.delete(`/guardianAngel/availabilities/${id}/`).then(response => {
				if (response.status !== 200) {
					throw new Error()
				} else {
					commit('deleteGuardianAvailability', id)
					Vue.notify({
						title: 'Succès',
						type:  'success',
						text:  `Disponibilité supprimée!`
					})
				}
			}).catch(error => {
				console.log(error)
				Vue.notify({
					title: 'Erreur',
					type:  'error',
					text:  'Erreur au moment de la suppression'
				})
			})
		},
		async addFriend({commit, state}, email) {
			axiosInstance.put(`/friends/${state.user.id}/`, {email: email}).then((response) => {
				if (response.data.status === 'asked') {
					Vue.notify({
						title: 'Invité',
						type:  'success',
						text:  'Ton ami n\'est pas encore membre de notre site. Nous lui avons envoyé un email pour l\'inviter à nous rejoindre.'
					})
				} else if (response.data.status === 'invited') {
					Vue.notify({
						title: 'Demande envoyée',
						type:  'success',
						text:  'Nous avons envoyé ta demande d\'amitié à ton ami.'
					})
				} else {
					throw new Error()
				}
			}).catch(() => {
				Vue.notify({
					title: 'Erreur',
					type:  'error',
					text:  'Nous n\'avons pas pu envoyer la demande à ton ami'
				})
			})
		},
		async removeFriendship({commit, state}, friendId) {
			axiosInstance.delete(`/friends/${friendId}/`).then(() => {
				Vue.delete(state.friends, friendId)
			}).catch(() => {
				Vue.notify({
					title: 'Erreur',
					type:  'error',
					text:  'Nous n\'avons pas pu supprimer la relation'
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
			state.moodTrackerData = []
			state.guardianAngelNoAvailable = false
			state.guardianAngelTimer = 0
			state.guardianAvailabilities = {
				1: [],
				2: [],
				3: [],
				4: [],
				5: [],
				6: [],
				0: []
			}
			Vue.$cookies.keys().forEach(cookie => {
				if (!cookie.startsWith('k_')) {
					Vue.$cookies.remove(cookie)
				}
			})
			window.localStorage.removeItem('vuex')
		},
		updateProfile(state, userdata) {
			state.user = Object.assign({}, state.user, userdata)
		},
		addFriend(state, data) {
			axiosInstance.put(`/friends/${state.user.id}/`, data).then((response) => {
				if (response.data.status === 'asked') {
					Vue.notify({
						title: 'Succès',
						type:  'success',
						text:  'Demande envoyée!'
					})
				}
				state.friends[data.email] = data.data
			})
		},
		addTherapist(state, data) {
			axiosInstance.put(`/therapists/${state.user.id}/`, data).then(() => {
				data.data['pendingInvite'] = true
				state.therapists[data.email] = data.data
			})
		},
		removeTherapist(state, email) {
			Vue.delete(state.therapists, email)
		},
		removeFriend(state, email) {
			Vue.delete(state.friends, email)
		},
		setFriendList(state, list) {
			state.friends = list
		},
		setGuardianAvailabilities(state, list) {
			state.guardianAvailabilities = list
		},
		addMood(state, data) {
			state.moodTrackerData.push(data)
		},
		editMood(state, data) {
			let wasMood = state.moodTrackerData[data.index]
			const date = new Date(data.mood.date)
			wasMood.customData.time = `${commons.addZeroBefore(date.getHours())}:${commons.addZeroBefore(date.getMinutes())}`
			wasMood.customData.icon = data.mood.icon
			wasMood.customData.comment = data.mood.comment
			wasMood.dates = data.mood.date
			state.moodTrackerData[data.index] = wasMood
		},
		removeMood(state, index) {
			Vue.delete(state.moodTrackerData, index)
		},
		eraseMoods(state) {
			state.moodTrackerData = []
		},
		setGuardian(state, isGuardian) {
			state.user.isGuardian = isGuardian
		},
		addGuardianAvailability(state, data) {
			state.guardianAvailabilities[data.weekDay].push({
				id: data.id,
				start: data.start,
				end: data.end
			})
		},
		deleteGuardianAvailability(state, id) {
			for (let i = 0; i <= 6; i++) {
				for (let j = 0; j < state.guardianAvailabilities[i].length; j++) {
					if (state.guardianAvailabilities[i][j].id === id) {
						Vue.delete(state.guardianAvailabilities[i], j)
						return
					}
				}
			}
		},
		setGuardianWaitTimer(state, endTime) {
			state.guardianAngelTimer = endTime
		},
		setGuardianNoAvailable(state, data) {
			state.guardianAngelNoAvailable = data
		}
	},
	plugins: [
		vuexLocalStorage.plugin
	]
})

export default store
