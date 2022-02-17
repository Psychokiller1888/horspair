<template>
	<div class="mainContainer">
		<div class="inputsWrapper">
			<p class="inputWrapper" :class="{redBorders: invalidInvite}">
				<span><font-awesome-icon :icon="['far', 'key-skeleton']" size="2x"/></span>
				<input type="text" v-model="inviteCode" placeholder="Code d'invitation" @keyup="validate"/>
			</p>
			<div class="explanation" v-if="invalidInvite">Pour recevoir ton code d'invitation valide, parles en avec ton/ta thérapeute ou pose la question sur notre serveur Discord</div>
			<p class="inputWrapper" :class="{redBorders: invalidFirstname}">
				<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
				<input type="text" v-model="firstName" placeholder="Prénom" @keyup="validate"/>
			</p>
			<p class="inputWrapper" :class="{redBorders: invalidLastname}">
				<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
				<input type="text" v-model="lastName" placeholder="Nom de famille" @keyup="validate"/>
			</p>
			<p class="inputWrapper" :class="{redBorders: invalidEmail}">
				<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
				<input type="text" v-model="email" placeholder="Email" @keyup="validate"/>
			</p>
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
	</div>
</template>

<script>
export default {
	name: 'Enregistrement',
	data: function() {
		return {
			firstName: '',
			lastName: '',
			inviteCode: '',
			email: '',
			username: '',
			password: '',
			password2: '',
			invalidFirstname: false,
			invalidLastname: false,
			invalidInvite: true,
			invalidEmail: false,
			invalidPassword: false,
			invalidPasswordControl: false
		}
	},
	computed: {
		allValid: function() {
			return !this.invalidFirstname && !this.invalidLastname && !this.invalidInvite && !this.invalidEmail && !this.invalidPassword && !this.invalidPasswordControl
		}
	},
	methods: {
		register: function() {
			if (parseInt(process.env.VUE_APP_DEMO_MODE) === 1) {
				if (this.inviteCode === 'je teste le truc') {
					this.$store.commit('connect', {
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
			} else {
				return
			}
		},
		cancel: function() {
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
			this.invalidFirstname = this.firstName.length <= 0
		},
		validateLastname: function() {
			this.invalidLastname = this.lastName.length <= 0
		},
		validateInviteCode: function() {
			this.invalidInvite = this.inviteCode.length !== 16
		},
		validateEmail: function() {
			let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			this.invalidEmail = !re.test(this.email)
		},
		validatePassword: function() {
			const length = this.password.length >= 8
			const uppercase = /[A-Z]/.test(this.password)
			const lowercase = /[a-z]/.test(this.password)
			const number = /[0-9]/.test(this.password)
			const special = /[#?!@$%^&*-]/.test(this.password)
			this.invalidPassword = !length || !uppercase || !lowercase || !number || !special
		},
		validatePasswordControl: function() {
			this.invalidPasswordControl = this.invalidPassword || this.password !== this.password2
		}
	},
	watch:       {
		$route: {
			immediate: true,
			handler() {
				if (this.$store.state.user) {
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
