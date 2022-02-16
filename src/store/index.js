import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
		user: null,
		databaseUrl: null
	},
	getters: {
	},
	actions: {
	},
	mutations: {
		setDatabaseUrl(state, data) {
			state.databaseUrl = data
		}
	},
	plugins: [createPersistedState()]
})
