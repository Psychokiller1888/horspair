<template>
	<div class="mainContainer">
		<div class="inputsWrapper">
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
				<input type="text" v-model="form.username" placeholder="Email"/>
			</p>
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
				<input type="password" v-model="form.password" placeholder="Mot de passe" @keydown.enter="submit"/>
			</p>
			<p class="inputWrapper">
				<toggle :labels="{checked: 'Retenir', unchecked: 'Ne pas retenir'}" :width="120" :height="40" :color="{checked: 'var(--secondary-bg-color)', unchecked: 'var(--tertiary-bg-color)'}"></toggle>
			</p>
			<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;">
				<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="submit" title="Connecter" v-if="form.username && form.password"/>
				<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancel"/>
			</p>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	name: 'Connection',
	data: function() {
		return {
			form: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions(['login']),
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
			this.form.username = ''
			this.form.password = ''
			this.$router.replace({path: '/'})
		},
		async submit() {
			const User = new FormData()
			User.append('username', this.form.username)
			User.append('password', this.form.password)
			try {
				try {
					await this.login(User)
				} catch (error) {
					await this.$store.dispatch('logout')
				}
				this.$store.commit('loggingIn', false)
				await this.$router.push('/')
			} catch (error) {
				return
			}
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
