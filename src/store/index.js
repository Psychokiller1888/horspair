import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
		user: null,
		doctors: [],
		friends: []
	},
	getters: {
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
			state.friends.push(data)
		},
		addTherapist(state, data) {
			state.friends.push(data)
		}
	},
	plugins: [createPersistedState()]
})
