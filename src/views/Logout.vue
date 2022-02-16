<template>
	<div class="mainContainer"></div>
</template>

<script>
export default {
	name: 'Home',
	data: function() {
		return {
		}
	},
	methods: {
	},
	watch:       {
		$route: {
			immediate: true,
			handler() {
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
