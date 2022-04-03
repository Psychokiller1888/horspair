<template>
	<div class="mainContainer">
		<div class="pageContent">
			<div class="inputsWrapper" v-if="!serverError && !registrationDone && !confirmedAccount && !expiredLink && !invalidLink && !alreadyActive &&!wait">
				<div class="inputWrapper fullWidth" :class="{redBorders: invalidInvite}">
					<label for="inviteCode">
						<font-awesome-icon :icon="['far', 'key-skeleton']"/> Code d'invitation
					</label>
					<input id="inviteCode" type="text" v-model="inviteCode"/>
				</div>
				<div class="inputWrapper" :class="{redBorders: invalidFirstname}">
					<label for="firstname">
						<font-awesome-icon :icon="['far', 'id-card']"/> Prénom
					</label>
					<input id="firstname" type="text" v-model="firstname" @keyup="validate"/>
				</div>
				<div class="inputWrapper" :class="{redBorders: invalidLastname}">
					<label for="lastname">
						<font-awesome-icon :icon="['far', 'id-card']"/> Nom de famille
					</label>
					<input id="lastname" type="text" v-model="lastname" @keyup="validate"/>
				</div>
				<div class="inputWrapper" :class="{redBorders: invalidEmail}">
					<label for="email">
						<font-awesome-icon :icon="['far', 'at']"/> Email
					</label>
					<input id="email" type="text" v-model="email" @keyup="validate"/>
				</div>
				<div class="inputWrapper" :class="{redBorders: invalidPassword}">
					<label for="password">
						<font-awesome-icon :icon="['far', 'key']"/> Mot de passe
					</label>
					<input id="password" type="password" v-model="password" @keyup="validate"/>
				</div>
				<div class="inputWrapper" :class="{redBorders: invalidPasswordControl}">
					<label for="controlPassword">
						<font-awesome-icon :icon="['far', 'key']"/> Vérification mot de passe
					</label>
					<input id="controlPassword" type="password" v-model="password2" @keyup="validate"/>
				</div>
				<div class="buttonsWrapper" style="margin: 0 auto;">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="register" title="Créer!" v-if="allValid"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" @click="cancel" title="Annuler"/>
				</div>
			</div>
			<div class="inputWrapperTextBlock explanation" v-if="emailAlreadyInUse">
				Cette adresse email est déjà utilisée
			</div>
			<div class="inputWrapperTextBlock explanation" v-if="invalidPasswordControl">
				Les mots de passe ne correspondent pas
			</div>
			<div class="inputWrapperTextBlock explanation" v-if="invalidPassword">
				Mot de passe: Min. 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
			</div>
			<div class="inputWrapperTextBlock explanation" v-if="invalidInvite">
				Pour recevoir ton code d'invitation valide, parles en avec ton/ta thérapeute ou pose la question sur notre serveur Discord
			</div>
			<div class="inputWrapperTextBlock redBorders" v-if="serverError">
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
			invalidInvite: false,
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
			return !this.invalidFirstname && !this.invalidLastname && !this.invalidEmail && !this.invalidPassword && !this.invalidPasswordControl
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
					} else if (response.status === 400 || response.status === 404) {
						const offending = response.data.payload['offending']
						if (offending === 'firstname') {
							self.invalidFirstname = true
							message = "Le prénom n'est pas valide"
						} else if (offending === 'lastname') {
							self.invalidLastname = true
							message = "Le nom de famille n'est pas valide"
						} else if (offending.includes('email')) {
							self.invalidEmail = true
							message = "L'adresse email n'est pas valide"
						} else if (offending.includes('invite')) {
							self.invalidInvite = true
							message = "Ton code d'invitation n'est pas ou plus valide"
						} else if (offending === 'password') {
							self.invalidPassword = true
							message = "Ton mot de passe n'est pas valide"
						}
					} else if (response.status === 500) {
						self.serverError = true
						message = 'Erreur du serveur, désolé....'
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
		},
		validateFirstname: function() {
			this.invalidFirstname = this.firstname.length <= 0
		},
		validateLastname: function() {
			this.invalidLastname = this.lastname.length <= 0
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
</style>
