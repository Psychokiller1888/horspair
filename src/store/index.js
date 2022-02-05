import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
	},
	getters: {
	},
	actions: {
	},
	mutations: {
	},
	plugins: [createPersistedState()]
})
