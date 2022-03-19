<template>
	<div class="mainContainer">
		<div class="inputsWrapper" v-if="!serverError && !registrationDone && !confirmedAccount && !expiredLink && !invalidLink && !alreadyActive &&!wait">
			<p class="inputWrapper" :class="{redBorders: invalidInvite}">
				<span><font-awesome-icon :icon="['far', 'key-skeleton']" size="2x"/></span>
				<input type="text" v-model="inviteCode" placeholder="Code d'invitation" @keyup="validate"/>
			</p>
			<div class="explanation" v-if="invalidInvite">Pour recevoir ton code d'invitation valide, parles en avec ton/ta thérapeute ou pose la question sur notre serveur Discord</div>
			<p class="inputWrapper" :class="{redBorders: invalidFirstname}">
				<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
				<input type="text" v-model="firstname" placeholder="Prénom" @keyup="validate"/>
			</p>
			<p class="inputWrapper" :class="{redBorders: invalidLastname}">
				<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
				<input type="text" v-model="lastname" placeholder="Nom de famille" @keyup="validate"/>
			</p>
			<p class="inputWrapper" :class="{redBorders: invalidEmail}">
				<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
				<input type="text" v-model="email" placeholder="Email" @keyup="validate"/>
			</p>
			<div class="explanation" v-if="emailAlreadyInUse">Cette adresse email est déjà utilisée</div>
			<p class="inputWrapper" :class="{redBorders: invalidPassword}">
				<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
				<input type="password" v-model="password" placeholder="Mot de passe" @keyup="validate"/>
			</p>
			<div class="explanation" v-if="invalidPassword">Min. 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial</div>
			<p class="inputWrapper" :class="{redBorders: invalidPasswordControl}">
				<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
				<input type="password" v-model="password2" placeholder="Vérification mot de passe" @keyup="validate"/>
			</p>
			<div class="explanation" v-if="invalidPasswordControl">Les mots de passe ne correspondent pas</div>
			<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;">
				<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="register" title="Créer!" v-if="allValid"/>
				<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" @click="cancel" title="Annuler"/>
			</p>
		</div>
		<div class="textBlock redBorders" v-if="serverError">
			Désolé, mais ta demande d'enregistrement a rencontré un problème technique.
		</div>
		<div class="textBlock" v-if="registrationDone">
			Merci de t'être enregistré! Nous venons de t'envoyer un email à ton adresse email pour confirmer celle-ci. Le lien inclus est valide pendant 15 minutes, ouvres-le vite pour pouvoir commencer à utiliser notre site!
		</div>
		<div class="textBlock" v-if="confirmedAccount">
			Super, merci d'avoir confirmé ton email. Tu peux maintenant utiliser toutes les fonctions du site, en te <a href="/login">connectant ici</a>.
		</div>
		<div class="textBlock redBorders" v-if="expiredLink">
			Le lien que tu as utilisé n'est plus valable, merci de t'enregistrer à nouveau.
		</div>
		<div class="textBlock redBorders" v-if="invalidLink">
			Le lien que tu as utilisé n'est pas valide.
		</div>
		<div class="textBlock redBorders" v-if="alreadyActive">
			Ton compte est déjà actif! Tu peux te <a href="/login">connecter ici</a>.
		</div>
	</div>
</template>

<script>
import commons from '@/js/commons'
import Vue from 'vue';

export default {
	name: 'Enregistrement',
	data: function() {
		return {
			firstname: '',
			lastname: '',
			inviteCode: '',
			email: '',
			password: '',
			password2: '',
			invalidFirstname: false,
			invalidLastname: false,
			invalidInvite: true,
			invalidEmail: false,
			invalidPassword: false,
			invalidPasswordControl: false,
			wait: false,
			emailAlreadyInUse: false,
			serverError: false,
			registrationDone: false,
			confirmedAccount: false,
			expiredLink: false,
			invalidLink: false,
			alreadyActive: false
		}
	},
	computed: {
		allValid: function() {
			return !this.invalidFirstname && !this.invalidLastname && !this.invalidInvite && !this.invalidEmail && !this.invalidPassword && !this.invalidPasswordControl
		}
	},
	methods: {
		register: function() {
			if (!this.allValid) {
				return
			}

			const self = this
			const account = new FormData()
			account.append('firstname', this.firstname)
			account.append('lastname', this.lastname)
			account.append('email', this.email)
			account.append('inviteCode', this.inviteCode)
			account.append('password', this.password)

			this.$store.state.axios.post('/register/', account).then(_response => {
				self.registrationDone = true
				self.cancel()
			}).catch(reason => {
				if (reason.response) {
					const response = reason.response
					let message
					if (response.status === 409) {
						self.invalidEmail = true
						self.emailAlreadyInUse = true
						message = 'Cette adresse email est déjà utilisée'
					} else if (response.status === 400) {
						if (response.data.errorDescription.includes('first name')) {
							self.invalidFirstname = true
							message = "Le prénom n'est pas valide"
						} else if (response.data.errorDescription.includes('last name')) {
							self.invalidLastname = true
							message = "Le nom de famille n'est pas valide"
						} else if (response.data.errorDescription.includes('email')) {
							self.invalidEmail = true
							message = "L'adresse email n'est pas valide"
						} else if (response.data.errorDescription.includes('invite code')) {
							self.invalidInvite = true
							message = "Ton code d'invitation n'est pas ou plus valide"
						} else if (response.data.errorDescription.includes('password')) {
							self.invalidPassword = true
							message = "Ton mot de passe n'est pas valide"
						}
					} else if (response.status === 500) {
						self.serverError = true
						message = 'Erreur du server, désolé....'
					}
					Vue.notify({
						title: 'Erreur',
						type: 'error',
						text: message
					})
				}
			})
		},
		cancel: function() {
			this.firstname = ''
			this.lastname = ''
			this.inviteCode = ''
			this.email = ''
			this.password = ''
			this.password2 = ''
			this.invalidFirstname = false
			this.invalidLastname = false
			this.invalidInvite = true
			this.invalidEmail = false
			this.invalidPassword = false
			this.invalidPasswordControl = false
			this.emailAlreadyInUse = false
		},
		validate: function() {
			this.validateFirstname()
			this.validateLastname()
			this.validateEmail()
			this.validatePassword()
			this.validatePasswordControl()
			this.validateInviteCode()
		},
		validateFirstname: function() {
			this.invalidFirstname = this.firstname.length <= 0
		},
		validateLastname: function() {
			this.invalidLastname = this.lastname.length <= 0
		},
		validateInviteCode: function() {
			this.invalidInvite = this.inviteCode.length !== 16
		},
		validateEmail: function() {
			this.invalidEmail = !commons.isEmailValid(this.email)
		},
		validatePassword: function() {
			this.invalidPassword = !commons.validatePassword(this.password)
		},
		validatePasswordControl: function() {
			this.invalidPasswordControl = this.invalidPassword || this.password !== this.password2
		}
	},
	watch:       {
		$route: {
			immediate: true,
			handler() {
				if ('a' in this.$route.query && 'b' in this.$route.query) {
					this.wait = true
					const self = this
					const data = {
						registerKey: this.$route.query.a,
						userId: this.$route.query.b
					}
					this.$store.state.axios.post('/register/confirm/', data).then(response => {
						if (response.status !== 200) {
							self.invalidLink = true
						} else {
							self.confirmedAccount = true
						}
					}).catch(reason => {
						let code = reason.response.status
						switch (code) {
							case 412:
								self.alreadyActive = true
								break
							case 401:
								self.expiredLink = true
								break
							case 403:
								self.invalidLink = true
								break
							default:
								self.serverError = true
						}
					})
				}
				if (this.$store.getters.isConnected) {
					this.$router.replace({path: '/'})
				}
				if ('invite' in this.$route.query) {
					this.inviteCode = this.$route.query.invite
					this.validate()
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
	.explanation {
		text-align: center;
		font-style: italic;
		font-size: 0.75em;
		display: block;
	}
</style>