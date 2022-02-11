import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import PouchDB from 'pouchdb-browser'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
		database: null,
		databaseUrl: null
	},
	getters: {
	},
	actions: {
		init() {
			this.state.database = new PouchDB('HorsPair')
		},
		insert(context, data) {
			data['_id'] = Date.now().toString()
			this.state.database.put(data)
		},
		get(context, payload) {

		}
	},
	mutations: {
		setDatabaseUrl(state, data) {
			state.databaseUrl = data
		},
		setDatabase(state, data) {
			state.database = data
		}
	},
	plugins: [createPersistedState()]
})
