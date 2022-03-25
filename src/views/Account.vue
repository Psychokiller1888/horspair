<template>
	<div class="mainContainer">
		<div class="pageContent">
			<ul>
				<li @click="page = 'data'" :class="{'activeElement': page === 'data'}">Mes données</li>
				<li @click="page = 'guardian'" :class="{'activeElement': page === 'guardian'}">Ange Gardien</li>
				<li @click="page = 'therapists'" :class="{'activeElement': page === 'therapists'}">Mes thérapeutes</li>
				<li @click="page = 'friends'" :class="{'activeElement': page === 'friends'}">Mes amis</li>
			</ul>
			<div class="content">
				<div class="inputsWrapper" v-if="page === 'data'">
					<p class="inputWrapper">
						<label for="firstname">
							<font-awesome-icon :icon="['far', 'id-card']"/> Prénom
						</label>
						<input id="firstname" type="text" v-model="firstname"/>
					</p>
					<p class="inputWrapper">
						<label for="lastname">
							<font-awesome-icon :icon="['far', 'id-card']"/> Nom de famille
						</label>
						<input id="lastname" type="text" v-model="lastname"/>
					</p>
					<p class="inputWrapper">
						<label for="street">
							<font-awesome-icon :icon="['far', 'location-crosshairs']"/> Rue
						</label>
						<input id="street" type="text" v-model="address"/>
					</p>
					<p class="inputWrapper">
						<label for="zip">
							<font-awesome-icon :icon="['far', 'input-numeric']"/> NPA
						</label>
						<input id="zip" type="number" v-model="zip" min="1000"/>
					</p>
					<p class="inputWrapper">
						<label for="city">
							<font-awesome-icon :icon="['far', 'city']"/> Ville
						</label>
						<input id="city" type="text" v-model="city"/>
					</p>
					<p class="inputWrapper">
						<label for="phone">
							<font-awesome-icon :icon="['far', 'phone']"/> Téléphone
						</label>
						<input id="phone" type="tel" v-model="phone"/>
					</p>
					<p class="inputWrapper">
						<label for="email">
							<font-awesome-icon :icon="['far', 'at']"/> Email
						</label>
						<input id="email" type="text" v-model="email" disabled/>
					</p>
					<p class="break">
						Modification du mot de passe
					</p>
					<p class="inputWrapper">
						<label for="actPassword">
							<font-awesome-icon :icon="['far', 'key']"/> Mot de passe actuel
						</label>
						<input id="actPassword" type="password" v-model="password"/>
					</p>
					<p class="inputWrapper" :class="{redBorders: invalidPassword}">
						<label for="newPassword">
							<font-awesome-icon :icon="['far', 'key']"/> Nouveau mot de passe
						</label>
						<input id="newPassword" type="password" v-model="newPassword1" @keyup="validate"/>
					</p>
					<div class="explanation break" v-if="invalidPassword">Min. 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial</div>
					<p class="inputWrapper" :class="{redBorders: invalidPasswordControl}">
						<label for="confirmPassword">
							<font-awesome-icon :icon="['far', 'key']"/> Confirmer mot de passe
						</label>
						<input id="confirmPassword" type="password" v-model="newPassword2" @keyup="validate"/>
					</p>
					<div class="explanation break" v-if="invalidPasswordControl">Les mots de passe ne correspondent pas</div>
					<p class="buttonsWrapper">
						<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Mettre à jour!" @click="update"/>
						<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancel"/>
					</p>
				</div>
				<div class="inputsWrapper" v-if="page === 'guardian'">
					<div v-if="!$store.state.user.isGuardian" class="textJustified">
						<p>
							Tu peux rejoindre le programme "Ange gardien"!
						</p>
						<p>
							C'est quoi un ange gardien? C'est une personne comme toi qui se met volontairement à disposition d'autres personnes en besoin urgent. Tu peux renseigner les jours ainsi que créneaux horaires où tu es disponible et tu seras contacté(e) par email pour te prévenir si quelqu'un cherche du soutient.
						</p>
						<p>
							Tu restes bien entendu libre d'accepter, de refuser ou d'ignorer la demande. Si personne n'est disponible pour soutenir la personne en demande, elle sera redirigée vers les institutions officielles.<br>
							<span class="buttonsWrapper" @click="becomeGuardian">
								<span class="button">
									Rejoindre le programme
								</span>
							</span>
						</p>
					</div>
					<div v-if="$store.state.user.isGuardian" class="textJustified">
						<p>
							Tu fais partie des anges gardiens! Défini ici tes disponibilités et tu seras avertis, par email, si quelqu'un cherche de l'aide pendant tes créneaux horaires.
						</p>
						<div class="newAvailabilityDaysSelectors">
							<div data-day="1" class="daySelector button" :class="{'daySelected': daysToAdd.includes('1')}" @click="toggleDay($event)">Lundi</div>
							<div data-day="2" class="daySelector button" :class="{'daySelected': daysToAdd.includes('2')}" @click="toggleDay($event)">Mardi</div>
							<div data-day="3" class="daySelector button" :class="{'daySelected': daysToAdd.includes('3')}" @click="toggleDay($event)">Mercredi</div>
							<div data-day="4" class="daySelector button" :class="{'daySelected': daysToAdd.includes('4')}" @click="toggleDay($event)">Jeudi</div>
							<div data-day="5" class="daySelector button" :class="{'daySelected': daysToAdd.includes('5')}" @click="toggleDay($event)">Vendredi</div>
							<div data-day="6" class="daySelector button" :class="{'daySelected': daysToAdd.includes('6')}" @click="toggleDay($event)">Samedi</div>
							<div data-day="0" class="daySelector button" :class="{'daySelected': daysToAdd.includes('0')}" @click="toggleDay($event)">Dimanche</div>
						</div>
						<div class="newAvailabilityHoursSelectors">
							<div class="inputWrapper">
								<span>De</span>
								<div>
									<select name="hourStart" v-model="guardianAvailabilityHoursStart">
										<option>0</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
										<option>11</option>
										<option>12</option>
										<option>13</option>
										<option>14</option>
										<option>15</option>
										<option>16</option>
										<option>17</option>
										<option>18</option>
										<option>19</option>
										<option>20</option>
										<option>21</option>
										<option>22</option>
										<option>23</option>
									</select>
									<select name="minuteStart" v-model="guardianAvailabilityMinutesStart">
										<option>00</option>
										<option>15</option>
										<option>30</option>
										<option>45</option>
									</select>
								</div>
							</div>
							<div class="inputWrapper">
								<span>à</span>
								<div>
									<select name="hourEnd" v-model="guardianAvailabilityHoursEnd">
										<option>0</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
										<option>11</option>
										<option>12</option>
										<option>13</option>
										<option>14</option>
										<option>15</option>
										<option>16</option>
										<option>17</option>
										<option>18</option>
										<option>19</option>
										<option>20</option>
										<option>21</option>
										<option>22</option>
										<option>23</option>
									</select>
									<select name="minuteEnd" v-model="guardianAvailabilityMinutesEnd">
										<option>00</option>
										<option>15</option>
										<option>30</option>
										<option>45</option>
									</select>
								</div>
							</div>
						</div>
						<div class="buttonsWrapper" v-if="daysToAdd.length > 0">
							<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Ajouter" @click="addAvailability"/>
							<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancelAddAvailability"/>
						</div>
						<div class="weekday" v-for="day in availableDays" :key="day[0]">
							<div class="weekdayCell">{{ day[1] }}</div>
							<div class="weekdayCell dayAvailabilitiesList">
								<div class="availableHours" v-for="data in $store.state.guardianAvailabilities[day[0]]" :key="data.id">
									<font-awesome-icon :icon="['far', 'circle-xmark']" class="textButton" title="Supprimer" @click="deleteAvailability(data.id)"/>{{ toFormattedTimeStr(data.start) }} - {{ toFormattedTimeStr(data.end) }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="inputsWrapper" v-if="page === 'friends'">
					<p class="break">
						Ajouter un ami
					</p>
					<p class="inputWrapper" :class="{redBorders: !emailValid('friend')}">
						<label for="friendEmail">
							<font-awesome-icon :icon="['far', 'at']"/> Email
						</label>
						<input id="friendEmail" type="text" v-model="newFriendEmail"/>
					</p>
					<p class="break explanation" v-if="newFriendExists">Ce contact existe déjà</p>
					<p class="buttonsWrapper">
						<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Ajouter" @click="addFriend" v-if="emailValid('friend')"/>
						<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancelFriend"/>
					</p>
					<p class="break" v-if="friendListAccepted.length > 0 || friendListPending.length > 0">
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
				<div class="inputsWrapper" v-if="page === 'therapists'">
					<p class="break">
						Ajouter un thérapeute
					</p>
					<p class="inputWrapper" :class="{redBorders: !emailValid('therapist')}">
						<label for="therapistEmail">
							<font-awesome-icon :icon="['far', 'at']"/> Email
						</label>
						<input id="therapistEmail" type="text" v-model="newTherapistEmail"/>
					</p>
					<p class="break explanation" v-if="newTherapistExists">Ce thérapeute existe déjà</p>
					<p class="buttonsWrapper">
						<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Ajouter" @click="addTherapist" v-if="emailValid('therapist')"/>
						<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancelTherapist"/>
					</p>
					<p class="break" v-if="$store.state.therapists.length > 0">
						Mes thérapeutes
					</p>
					<div class="contactEntry" v-for="therapist in $store.state.therapists" :key="therapist.id">
						<div class="contactName">{{ therapist.firstname }} {{ therapist.lastname }}</div>
						<div class="contactEmail"><a :href="`mailto:${therapist.email}`">{{ therapist.email }}</a></div>
						<div class="contactPhone"><a :href="`tel:${therapist.phone}`">{{ therapist.phone }}</a></div>
						<div class="deleteContact"><font-awesome-icon :icon="['far', 'trash-can']" class="button" title="Supprimer" @click="deleteTherapist(therapist.email)"/></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import commons from '@/js/commons'
import {mapActions} from 'vuex'
import Vue from 'vue';

export default {
	name: 'account',
	data: function() {
		return {
			page: 'therapists',
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
			newFriendEmail: '',
			availableDays: [
				[1, 'Lundi'],
				[2, 'Mardi'],
				[3, 'Mercredi'],
				[4, 'Jeudi'],
				[5, 'Vendredi'],
				[6, 'Samedi'],
				[0, 'Dimanche']
			],
			daysToAdd: [],
			guardianAvailabilityHoursStart: '0',
			guardianAvailabilityHoursEnd: '0',
			guardianAvailabilityMinutesStart: '00',
			guardianAvailabilityMinutesEnd: '00'
		}
	},
	mounted: function() {
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
			this.$store.dispatch('addFriend', this.newFriendEmail)
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
		},
		becomeGuardian: async function() {
			await this.$store.dispatch('becomeGuardian')
		},
		deleteAvailability: function(id) {
			this.$store.dispatch('deleteGuardianAvailability', id)
		},
		addAvailability: function() {
			let start = `${this.guardianAvailabilityHoursStart}${this.guardianAvailabilityMinutesStart}`
			let end = `${this.guardianAvailabilityHoursEnd}${this.guardianAvailabilityMinutesEnd}`

			if (parseInt(end) <  parseInt(start)) {
				Vue.notify({
					title: 'Logique',
					type:  'warning',
					text:  "L'heure de fin ne peut pas être avant l'heure de début"
				})
			} else {
				for (const weekDay of this.daysToAdd) {
					this.$store.dispatch('addGuardianAvailability', {
						'weekDay': weekDay,
						'start': start,
						'end': end
					})
				}
				this.cancelAddAvailability()
			}
		},
		cancelAddAvailability: function() {
			this.daysToAdd = []
			this.guardianAvailabilityHoursStart = '0'
			this.guardianAvailabilityHoursEnd = '0'
			this.guardianAvailabilityMinutesStart = '00'
			this.guardianAvailabilityMinutesEnd = '00'
		},
		toFormattedTimeStr: function (militaryTime) {
			militaryTime = militaryTime.toString().padStart(4, '0')
			return `${militaryTime.slice(0, 2)}:${militaryTime.slice(2)}`
		},
		toggleDay: function(event) {
			const el = event.target
			if (this.daysToAdd.includes(el.getAttribute('data-day'))) {
				this.daysToAdd = this.daysToAdd.filter(e => { return e !== el.getAttribute('data-day') })
			} else {
				this.daysToAdd.push(el.getAttribute('data-day'))
			}
		}
	}
}
</script>

<style scoped>
ul {
	padding: 0;
	width: 100%;
	display: flex;
}

li {
	flex-grow: 1;
	display: block;
	box-sizing: border-box;
	text-align: center;
	font-variant: small-caps;
	font-size: 1.1em;
}

li:hover {
	cursor: pointer;
	color: var(--hover-text-color);
	border-bottom: 2px solid var(--tertiary-bg-color);
}

.activeElement {
	color: var(--hover-text-color);
	border-bottom: 2px solid var(--tertiary-bg-color);
}

.content {
	display: flex;
	flex-grow: 1;
	margin-bottom: 15px;
}

.holderTitle {
	font-size: 25px;
	text-transform: uppercase;
	position: relative;
	top: -53px;
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

.weekday {
	height: 75px;
	min-height: 75px;
	display: flex;
	margin-bottom: 2px;
}

.weekdayCell {
	padding: 15px;
	box-sizing: border-box;
	display: flex;
	align-content: center;
	align-items: center;
	background-color: var(--tertiary-bg-color);
	margin-right: 2px;
	min-width: 120px;
}

.dayAvailabilitiesList {
	width: 100%;
}

.newAvailabilityHoursSelectors {
	display: flex;
	justify-content: center;
}

.newAvailabilityDaysSelectors {
	display: flex;
	justify-items: center;
	margin-bottom: 15px;
}

.daySelector {
	font-variant: small-caps;
	margin: 15px;
	font-size: 1.5em;
	border-bottom: 2px solid rgba(0, 0, 0, 0);
	transition-duration: 0.3s;
}

.daySelected {
	border-bottom: 2px solid var(--secondary-text-color);
	color: var(--secondary-text-color);
}

.availableHours {
	display: flex;
	align-content: center;
	align-items: center;
	background-color: var(--secondary-text-color);
	margin-right: 5px;
	border: 1px solid var(--secondary-bg-color);
	border-radius: 5px;
	padding: 5px;
	box-sizing: border-box;
}

.inputWrapper > div {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
}

.inputWrapper > div > select {
	background-color: var(--secondary-bg-color);
	color: var(--main-text-color);
	margin: 5px;
}

</style>
