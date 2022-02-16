<template>
	<div class="mainContainer">
		<div class="connectionBox">
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
				<input type="text" v-model="username" placeholder="Email"/>
			</p>
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
				<input type="password" v-model="password" placeholder="Mot de passe" @keydown.enter="connect"/>
			</p>
			<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;">
				<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="connect" title="Connecter"/>
				<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler"/>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: function() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		connect: function() {
		}
	},
	watch:       {
		$route: {
			immediate: true,
			handler() {
				if (this.$store.state.user) {
					this.$router.replace({path: '/'})
				}
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
	}
	.mainContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
