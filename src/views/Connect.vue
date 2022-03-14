<template>
	<div class="mainContainer">
		<div class="inputsWrapper" ref="loginContainer">
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
				<input type="email" name="login" v-model="form.email" placeholder="Email"/>
			</p>
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
				<input type="password" name="password" v-model="form.password" placeholder="Mot de passe" @keydown.enter="connect"/>
			</p>
			<p class="inputWrapper">
				<toggle :labels="{checked: 'Retenir', unchecked: 'Ne pas retenir'}" :width="120" :height="40" :color="{checked: 'var(--secondary-bg-color)', unchecked: 'var(--tertiary-bg-color)'}"></toggle>
			</p>
			<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;">
				<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="connect" title="Connecter" v-if="form.email && form.email"/>
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
				email: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions(['login']),
		async connect() {
			if (this.$store.state.connecting) {
				return
			}
			const User = new FormData()
			User.append('email', this.form.email)
			User.append('password', this.form.password)
			try {
				await this.login(User).then(() => {
					this.$refs.loginContainer.classList.add('shrinkAway')
					const self = this
					setTimeout(function() {
						self.$refs.loginContainer.classList.remove('shrinkAway')
						self.$router.push('/')
					}, 500)
				})
			} catch (error) {
				this.$refs.loginContainer.classList.add('shake')
				this.$refs.loginContainer.classList.add('redBorders')
				const self = this
				setTimeout(function() {
					self.$refs.loginContainer.classList.remove('shake')
					self.$refs.loginContainer.classList.remove('redBorders')
				}, 500)
			}
		},
		cancel: function() {
			this.form.email = ''
			this.form.password = ''
			this.$router.replace({path: '/'})
		}
	},
	watch:       {
		$route: {
			immediate: true,
			handler() {
				if (this.$store.getters.isConnected) {
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
