<template>
	<div class="mainContainer">
		<transition name="fade">
			<div ref="joinModal" @click="resetPasswordModal = false" v-if="resetPasswordModal">
				<div class="modal">
					<div class="modalContent">
						<p>
							Si "{{ form.email }}" correspond à un compte, nous venons d'y envoyer un email contenant les informations pour réinitialiser ton mot de passe.
						</p>
					</div>
				</div>
			</div>
		</transition>
		<div ref="loginContainer" class="pageContent" v-if="!passwordResetToken">
			<div class="inputsWrapper">
				<p class="inputWrapper">
					<label for="email">
						<font-awesome-icon :icon="['far', 'at']"/> Email
					</label>
					<input id="email" type="email" name="login" v-model="form.email"/>
				</p>
				<p class="inputWrapper">
					<label for="password">
						<font-awesome-icon :icon="['far', 'key']"/> Mot de passe
					</label>
					<input id="password" type="password" name="password" v-model="form.password" @keydown.enter="connect"/>
				</p>
				<p class="link" @click="resetPassword" v-if="form.email.length > 0">
					J'ai oublié mon mot de passe
				</p>
				<!--<toggle :labels="{checked: 'Retenir', unchecked: 'Ne pas retenir'}" :width="120" :height="40" :color="{checked: 'var(--secondary-bg-color)', unchecked: 'var(--tertiary-bg-color)'}"></toggle>-->
				<p class="buttonsWrapper" style="margin: 0 auto;">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="connect" title="Connecter" v-if="form.email && form.password"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancel"/>
				</p>
			</div>
		</div>
		<div class="pageContent" v-else>
			<div class="inputsWrapper">
				<p class="inputWrapper">
					<label for="password">
						<font-awesome-icon :icon="['far', 'key']"/> Nouveau mot de passe
					</label>
					<input id="newPassword" type="password" name="newPassword" v-model="form.password" @keydown.enter="doReset" @keyup="validatePassword"/>
				</p>
				<p class="buttonsWrapper" style="margin: 0 auto;">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="doReset" title="Sauvegarder" v-if="form.password && !invalidPassword"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancel"/>
				</p>
				<p class="inputWrapperTextBlock explanation" v-if="invalidPassword">
					Mot de passe: Min. 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
import Vue from 'vue'
import commons from '@/js/commons'

export default {
	name: 'Connection',
	data: function() {
		return {
			form: {
				email: '',
				password: ''
			},
			resetPasswordModal: false,
			passwordResetToken: '',
			invalidPassword: false
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
		validatePassword: function() {
			this.invalidPassword = !commons.validatePassword(this.form.password)
		},
		cancel: function() {
			this.form.email = ''
			this.form.password = ''
			this.$router.replace({path: '/'})
		},
		resetPassword: function() {
			this.$store.state.axios.get(`/password_reset/${this.form.email}/`).then((result) => {
				this.resetPasswordModal = true
			}).catch(() => {
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Erreur de demande de mot de passe.'
				})
			})
		},
		doReset: function() {
			const payload = {
				'password': this.form.password
			}

			this.$store.state.axios.patch(`/password_reset/${this.passwordResetToken}/`, payload).then((response) => {
				this.invalidPassword = false
				this.passwordResetToken = ''
				this.form.password = ''
				Vue.notify({
					title: 'Récupération mot de passe',
					type: 'success',
					text: 'Ton mot de passe a été changé, tu peux te connecter avec celui-ci'
				})
			}).catch(() => {
				Vue.notify({
					title: 'Erreur',
					type: 'error',
					text: 'Erreur réinitialisation du mot de passe.'
				})
			})
		}
	},
	watch:       {
		$route: {
			immediate: true,
			handler() {
				if ('a' in this.$route.query) {
					this.$store.commit('disconnect')
					this.passwordResetToken = this.$route.query.a
				} else if (this.$store.getters.isConnected) {
					this.$router.replace({path: '/'})
				} else {
					this.passwordResetToken = ''
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
