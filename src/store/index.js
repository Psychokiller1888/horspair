import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	state: {
		database: null
	},
	getters: {
	},
	actions: {
		init() {
			const database = localStorage.getItem('data')
			if (database === null) {
				this.commit('setDatabase', {})
				this.dispatch('storeDatabase')
				return
			}
			this.commit('setDatabase', JSON.parse(database))
		},
		storeDatabase() {
			localStorage.setItem('data', JSON.stringify(this.state.database))
		},
		createTable(context, data) {
			if (!('tableName' in data)) {
				console.error('No table name specified')
				return false
			} else if (!('schema' in data)) {
				console.error('No table schema specified')
				return false
			}

			let ifNotExists = false
			if ('ifNotExists' in data) {
				ifNotExists = data['ifNotExists']
			}

			if (data['tableName'] in this.state.database && !ifNotExists) {
				console.error(`Table ${data['tableName']} already exists`)
				return false
			}
			this.state.database[data['tableName']] = {
				'schema': data['schema'],
				'data':   {}
			}
			this.dispatch('storeDatabase')
		},
		dropTable(context, data) {
			if (!('tableName' in data)) {
				console.error('No table name specified')
				return false
			}

			let ifExists = false
			if ('ifExists' in data) {
				ifExists = data['ifExists']
			}

			if (!(data['tableName'] in this.state.database) && !ifExists) {
				return false
			}
			delete this.state.database[data['tableName']]
			this.dispatch('storeDatabase')
		},
		fetch(context, data) {
			if (!('tableName' in data)) {
				console.error('No table name specified')
				return false
			}

			const tableName = data['tableName']
			if (!(tableName in this.state.database)) {
				console.error(`Table ${tableName} does not exist`)
				return false
			}

			let select = '*'
			if ('select' in data) {
				select = data['select']
				if (!(select in this.store.database[tableName]['schema'])) {
					console.error(`Unknown column ${select}`)
					return
				}
			}

			let limit = 0
			if ('limit' in data) {
				limit = data['limit']
				if (limit <= 0) {
					console.error('LIMIT must be greater than 0')
					return
				}
			}

			let whereKey = ''
			let whereValue = ''
			let whereComparator = '='
			if ('whereKey' in data) {
				if (!(whereValue in data)) {
					console.error('Cannot specify WHERE without value')
				}
				whereKey = data['whereKey']
				whereValue = data['whereValue']

				if ('whereComparator' in data) {
					whereComparator = data['whereComparator']
				}

				if (!(whereKey in this.store.database[tableName]['schema'])) {
					console.error(`Unknown "where" column ${whereKey}`)
					return
				}
			}

			const table = this.state.database[tableName]['data']
			console.log(this.state.database[tableName])
			let ret = {}
			for (const [id, row] of Object.entries(table)) {
				if (whereKey === 'id' && parseInt(id) === parseInt(whereValue)) {
					ret[id] = row
					break
				} else if (whereKey !== '') {
					switch (whereComparator) {
						case '<':
							if (parseInt(whereValue) < parseInt(row[whereKey])) {
								ret[id] = row
							}
							break
						case '>':
							if (parseInt(whereValue) > parseInt(row[whereKey])) {
								ret[id] = row
							}
							break
						case '<=':
							if (parseInt(whereValue) <= parseInt(row[whereKey])) {
								ret[id] = row
							}
							break
						case '>=':
							if (parseInt(whereValue) >= parseInt(row[whereKey])) {
								ret[id] = row
							}
							break
						case '!=':
							if (whereValue !== row[whereKey]) {
								ret[id] = row
							}
							break
						default:
							if (whereValue === row[whereKey]) {
								ret[id] = row
							}
							break
					}
				} else {
					ret[id] = row
				}
				if (limit > 0 && ret.length >= limit) {
					break
				}
			}
			return ret
		},
		insert(context, data) {
			if (!('tableName' in data)) {
				console.error('No table name specified')
				return false
			}

			if (!('data' in data)) {
				console.error('No data to insert specified')
				return false
			}

			const tableName = data['tableName']
			if (!(tableName in this.state.database)) {
				console.error(`Table ${tableName} does not exist`)
				return false
			}

			const table = this.state.database[tableName]
			if (data['data'].length !== table['schema'].length || JSON.stringify(Object.keys(data['data']).sort()) !== JSON.stringify(Object.keys(table['schema']).sort())) {
				console.error('Specified data does not match table schema')
				return false
			}

			let id = -1
			for (const key in Object.keys(table['data'])) {
				if (parseInt(key) > id) {
					id = parseInt(key)
				}
			}

			id += 1

			data['data']['id'] = id
			table['data'][id] = data
			this.dispatch('storeDatabase')
			return id
		}
	},
	mutations: {
		setDatabase(state, data) {
			state.database = data
		}
	},
	plugins: [createPersistedState()]
})
