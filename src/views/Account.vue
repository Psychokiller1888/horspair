<template>
	<div class="mainContainer">
		<div class="subMenu">
			<ul>
				<li @click="page = 'data'">Mes données</li>
				<li @click="page = 'therapists'">Mes thérapeutes</li>
				<li @click="page = 'friends'">Mes amis</li>
			</ul>
		</div>
		<div class="content">
			<div class="inputsWrapper" v-if="page === 'data'">
				<p class="holderTitle">
					Mes données
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
					<input type="text" v-model="firstname" placeholder="Prénom"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'id-card']" size="2x"/></span>
					<input type="text" v-model="lastname" placeholder="Nom de famille"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'location-crosshairs']" size="2x"/></span>
					<input type="text" v-model="address" placeholder="Rue"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'input-numeric']" size="2x"/></span>
					<input type="number" v-model="zip" placeholder="NPA" min="1000"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'city']" size="2x"/></span>
					<input type="text" v-model="city" placeholder="Ville"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'phone']" size="2x"/></span>
					<input type="tel" v-model="phone" placeholder="Téléphone"/>
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
					<input type="text" v-model="email" placeholder="Email" disabled/>
				</p>
				<p>
					Modification du mot de passe
				</p>
				<p class="inputWrapper">
					<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
					<input type="password" v-model="password" placeholder="Mot de passe actuel"/>
				</p>
				<p class="inputWrapper" :class="{redBorders: invalidPassword}">
					<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
					<input type="password" v-model="newPassword1" placeholder="Nouveau mot de passe" @keyup="validate"/>
				</p>
				<div class="explanation" v-if="invalidPassword">Min. 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial</div>
				<p class="inputWrapper" :class="{redBorders: invalidPasswordControl}">
					<span><font-awesome-icon :icon="['far', 'key']" size="2x"/></span>
					<input type="password" v-model="newPassword2" placeholder="Confirmer nouveau mot de passe" @keyup="validate"/>
				</p>
				<div class="explanation" v-if="invalidPasswordControl">Les mots de passe ne correspondent pas</div>
				<p class="confirmCancelButtonsWrapper">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Mettre à jour!" @click="update"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancel"/>
				</p>
			</div>
			<div class="inputsWrapper" v-if="page === 'therapists'">
				<p class="holderTitle">
					Ajouter un thérapeute
				</p>
				<p class="inputWrapper" :class="{redBorders: !emailValid('therapist')}">
					<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
					<input type="text" v-model="newTherapistEmail" placeholder="Email"/>
				</p>
				<div class="explanation" v-if="newTherapistExists">Ce thérapeute existe déjà</div>
				<p class="confirmCancelButtonsWrapper">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Ajouter" @click="addTherapist" v-if="emailValid('therapist')"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancelTherapist"/>
				</p>
			</div>
			<div class="inputsWrapper" style="width: auto; min-width: 150px;" v-if="page === 'therapists'">
				<p class="holderTitle">
					Mes thérapeutes
				</p>
				<div class="contactEntry" v-for="therapist in $store.state.therapists" :key="therapist.id">
					<div class="contactName">{{ therapist.firstname }} {{ therapist.lastname }}</div>
					<div class="contactEmail"><a :href="`mailto:${therapist.email}`">{{ therapist.email }}</a></div>
					<div class="contactPhone"><a :href="`tel:${therapist.phone}`">{{ therapist.phone }}</a></div>
					<div class="deleteContact"><font-awesome-icon :icon="['far', 'trash-can']" class="button" title="Supprimer" @click="deleteTherapist(therapist.email)"/></div>
				</div>
			</div>
			<div class="inputsWrapper" v-if="page === 'friends'">
				<p class="holderTitle">
					Ajouter un ami
				</p>
				<p class="inputWrapper" :class="{redBorders: !emailValid('friend')}">
					<span><font-awesome-icon :icon="['far', 'at']" size="2x"/></span>
					<input type="text" v-model="newFriendEmail" placeholder="Email"/>
				</p>
				<div class="explanation" v-if="newFriendExists">Ce contact existe déjà</div>
				<p class="confirmCancelButtonsWrapper">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Ajouter" @click="addFriend" v-if="emailValid('friend')"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancelFriend"/>
				</p>
			</div>
			<div class="inputsWrapper" style="width: auto; min-width: 150px;" v-if="page === 'friends'">
				<p class="holderTitle">
					Mes amis
				</p>
				<div class="contactEntry" v-for="friend in friendListAccepted" :key="friend.id">
					<div class="contactName">{{ friend.firstname }} {{ friend.lastname }}</div>
					<div class="contactEmail"><a :href="`mailto:${friend.email}`">{{ friend.email }}</a></div>
					<div class="contactPhone"><a :href="`tel:${friend.phone}`">{{ friend.phone }}</a></div>
					<div class="deleteContact"><font-awesome-icon :icon="['far', 'trash-can']" class="button" title="Supprimer" @click="deleteFriend(friend.email)"/></div>
				</div>
				<div class="contactEntry" v-for="friend in friendListPending" :key="friend.id">
					<div class="contactName">{{ friend.firstname }} {{ friend.lastname }}</div>
					<div class="contactEmail"><a :href="`mailto:${friend.email}`">{{ friend.email }}</a></div>
					<div class="contactPhone"><a :href="`tel:${friend.phone}`">{{ friend.phone }}</a></div>
					<div class="deleteContact"><font-awesome-icon :icon="['far', 'trash-can']" class="button" title="Supprimer" @click="deleteFriend(friend.email)"/></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import commons from '@/js/commons'
import {mapActions} from 'vuex'

export default {
	name: 'Compte',
	data: function() {
		return {
			page: 'data',
			firstname: this.$store.state.user['firstname'],
			lastname: this.$store.state.user['lastname'],
			address: this.$store.state.user['address'],
			zip: this.$store.state.user['zip'],
			city: this.$store.state.user['city'],
			phone: this.$store.state.user['phone'],
			email: this.$store.state.user['email'],
			password: '',
			newPassword1: '',
			newPassword2: '',
			invalidPassword: false,
			invalidPasswordControl: false,
			newTherapistEmail: '',
			newFriendEmail: ''
		}
	},
	computed: {
		friendListPending: function() {
			return this.$store.getters.getFriendList['pending']
		},
		friendListAccepted: function() {
			return this.$store.getters.getFriendList['accepted']
		},
		newTherapistExists: function() {
			return this.$store.getters.getTherapistsEmails.includes(this.newTherapistEmail.trim())
		},
		newFriendExists: function() {
			return this.$store.getters.getFriendsEmails.includes(this.newFriendEmail.trim())
		},
		emailValid: function() {
			let self = this
			return function(type) {
				if (type === 'therapist') {
					return commons.isEmailValid(self.newTherapistEmail) && !this.$store.getters.getTherapistsEmails.includes(self.newTherapistEmail.trim())
				} else if (type === 'friend') {
					return commons.isEmailValid(self.newFriendEmail) && !this.$store.getters.getFriendsEmails.includes(self.newFriendEmail.trim())
				}
			}
		}
	},
	methods: {
		...mapActions(['updateProfile']),
		async update() {
			if (this.newPassword1 !== this.newPassword2) {
				this.invalidPasswordControl = true
				return
			}

			const payload = {
				firstname: this.firstname,
				lastname: this.lastname,
				address: this.address,
				zip: this.zip,
				city: this.city,
				phone: this.phone,
				email: this.email
			}

			if (this.newPassword1 && this.newPassword2) {
				payload['password'] = this.password
				payload['newPassword1'] = this.newPassword1
				payload['newPassword2'] = this.newPassword2
			}
			await this.updateProfile(payload)
		},
		cancel: function() {
			this.firstname = this.$store.state.user['firstname']
			this.lastname = this.$store.state.user['lastname']
			this.address = this.$store.state.user['address']
			this.zip = this.$store.state.user['zip']
			this.city = this.$store.state.user['city']
			this.phone = this.$store.state.user['phone']
			this.email = this.$store.state.user['email']
			this.$router.push({path: '/'})
		},
		cancelTherapist: function() {
			this.newTherapistEmail = ''
		},
		cancelFriend: function() {
			this.newFriendEmail = ''
		},
		addTherapist: function() {
			this.$store.commit('addTherapist', {
				email: this.newTherapistEmail,
				data: {
					email: this.newTherapistEmail,
					pendingInvite: true
				}
			})
			this.cancelTherapist()
		},
		deleteTherapist: function(email) {
			this.$store.commit('removeTherapist', email)
		},
		addFriend: function() {
			this.$store.commit('addFriend', {
				email: this.newFriendEmail,
				data: {
					email: this.newFriendEmail
				}
			})
			this.cancelFriend()
		},
		deleteFriend: function(email) {
			this.$store.commit('removeFriend', email)
		},
		validate: function() {
			this.validatePassword()
			this.validatePasswordControl()
		},
		validatePassword: function() {
			this.invalidPassword = !commons.validatePassword(this.newPassword1)
		},
		validatePasswordControl: function() {
			this.invalidPasswordControl = this.invalidPassword || this.newPassword1 !== this.newPassword2
		}
	}
}
</script>

<style scoped>
ul {
	padding: 0;
	margin-right: 25px;
}
li {
	font-family: var(--main-font), sans-serif;
	font-size: 1.1em;
	display: block;
	box-sizing: border-box;
	text-decoration: underline;
	padding: 15px;
}
li:hover {
	cursor: pointer;
	color: var(--hover-text-color);
	background-color: var(--tertiary-bg-color);
}
.mainContainer {
	display: flex;
	padding-top: 50px;
	box-sizing: border-box;
}
.content {
	flex-grow: 1;
	margin-bottom: 15px;
}
.holderTitle {
	font-size: 25px;
	text-transform: uppercase;
	position: relative;
	top: -53px;
}
.inputsWrapper {
	float: left;
	margin-right: 25px;
}
.contactEntry {
	width: 100%;
	display: flex;
}

.contactName {
	width: 250px;
	overflow: hidden;
	padding: 10px;
	box-sizing: border-box;
}

.contactEmail {
	width: 250px;
	overflow: hidden;
	padding: 10px;
	box-sizing: border-box;
}

.contactPhone {
	width: 250px;
	overflow: hidden;
	padding: 10px;
	box-sizing: border-box;
}
</style>
