<template>
	<div class="mainContainer">
		<div class="inputsWrapper">
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
				<input type="text" v-model="username" placeholder="Email"/>
			</p>
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
				<input type="password" v-model="password" placeholder="Mot de passe" @keydown.enter="connect"/>
			</p>
			<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;">
				<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="connect" title="Connecter" v-if="username && password"/>
				<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancel"/>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Connection',
	data: function() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		connect: function() {
			if (parseInt(process.env.VUE_APP_DEMO_MODE) === 1) {
				this.$store.commit('connect', {
					username: 'Demo',
					email: this.email,
					firstName: this.firstName,
					lastName: this.lastName,
					address: 'Ruelles des Gerles 5',
					cityCode: 1788,
					city: 'Praz-Vully',
					phone: '0797985351',
					access: 99
				})
				this.$router.replace({path: '/'})
			}
		},
		cancel: function() {
			this.username = ''
			this.password = ''
			this.$router.replace({path: '/'})
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
	.mainContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
