<template>
	<div class="mainContainer"></div>
</template>

<script>
import Vue from 'vue';

export default {
	name: 'Déconnexion',
	data: function() {
		return {
		}
	},
	methods: {},
	watch:       {
		$route: {
			immediate: true,
			handler() {
				Vue.notify({
					title: 'Déconnexion',
					type:  'success',
					text:  `A bientôt ${this.$store.state.user.firstname}!`
				})
				this.$store.commit('disconnect')
				this.$router.replace({path: '/'})
			}
		}
	}
}
</script>

<style scoped>
	.connectionBox {
		width: 300px;
		background-color: var(--secondary-bg-color);
		padding: 15px;
		box-sizing: border-box;
		border-radius: 10px;
		border: 1px solid var(--tertiary-bg-color);
	}
	.mainContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
