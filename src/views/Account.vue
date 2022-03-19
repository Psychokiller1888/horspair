<template>
	<div class="mainContainer">
		<div class="subMenu">
			<ul>
				<li @click="page = 'data'">Mes données</li>
				<li @click="page = 'guardian'">Ange Gardien</li>
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
			<div class="inputsWrapper" v-if="page === 'guardian'">
				<p class="holderTitle">
					Ange gardien
				</p>
				<p v-if="!$store.state.user.isGuardian" class="textJustified">
					Tu peux rejoindre le programme "Ange gardien"! C'est quoi un ange gardien? C'est une personne comme toi qui se met volontairement à disposition d'autres personnes en besoin urgent. Tu peux renseigner les jours ainsi que créneaux horaires où tu es disponible et tu seras contacté(e) par email pour te prévenir si quelqu'un cherche du soutient. Tu restes bien entendu libre d'accepter, de refuser ou d'ignorer la demande. Si personne n'est disponible pour soutenir la personne en demande, elle sera redirigée vers les institutions officielles.<br>
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Rejoindre le programme" @click="becomeGuardian"/>
				</p>
				<p v-if="$store.state.user.isGuardian" class="textJustified">
					Tu fais partie des anges gardiens! Défini ici tes disponibilités et tu seras avertis, par email, si quelqu'un cherche de l'aide pendant tes créneaux horaires.
				</p>
			</div>
			<div class="inputsWrapper" style="width: auto; min-width: 1000px;" v-if="page === 'guardian' && $store.state.user.isGuardian">
				<p class="holderTitle">
					Mes disponibilités
				</p>
				<div class="newAvailabilityDaysSelectors" >
					<p class="inputWrapper">
						<span>Lundi</span>
						<input type="checkbox" v-model="daysToAdd" value="1"/>
					</p>
					<p class="inputWrapper">
						<span>Mardi</span>
						<input type="checkbox" v-model="daysToAdd" value="2"/>
					</p>
					<p class="inputWrapper">
						<span>Mercredi</span>
						<input type="checkbox" v-model="daysToAdd" value="3"/>
					</p>
					<p class="inputWrapper">
						<span>Jeudi</span>
						<input type="checkbox" v-model="daysToAdd" value="4"/>
					</p>
					<p class="inputWrapper">
						<span>Vendredi</span>
						<input type="checkbox" v-model="daysToAdd" value="5"/>
					</p>
					<p class="inputWrapper">
						<span>Samedi</span>
						<input type="checkbox" v-model="daysToAdd" value="6"/>
					</p>
					<p class="inputWrapper">
						<span>Dimanche</span>
						<input type="checkbox" v-model="daysToAdd" value="7"/>
					</p>
				</div>
				<div class="newAvailabilityHoursSelectors">
					<div style="margin: 0 15px 0 0;">
						De
					</div>
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
					</div>
					<div>
						<select name="minuteStart" v-model="guardianAvailabilityMinutesStart">
							<option>00</option>
							<option>15</option>
							<option>30</option>
							<option>45</option>
						</select>
					</div>
					<div style="margin: 0 15px 0 15px;">
						à
					</div>
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
					</div>
					<div>
						<select name="minuteEnd" v-model="guardianAvailabilityMinutesEnd">
							<option>00</option>
							<option>15</option>
							<option>30</option>
							<option>45</option>
						</select>
					</div>
				</div>
				<p class="confirmCancelButtonsWrapper" style="width: 250px;">
					<font-awesome-icon :icon="['far', 'circle-check']" class="button" title="Ajouter" @click="addAvailability" v-if="daysToAdd.length > 0"/>
					<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" title="Annuler" @click="cancelAddAvailability" v-if="daysToAdd.length > 0"/>
				</p>
				<div class="weekday" v-for="day in availableDays" :key="day[0]">
					<div class="weekdayCell">{{ day[1] }}</div>
					<div class="weekdayCell dayAvailabilitiesList">
						<div class="availableHours" v-for="data in $store.state.guardianAvailabilities[day[0]]" :key="data.id">
							<font-awesome-icon :icon="['far', 'circle-xmark']" class="textButton" title="Supprimer" @click="deleteAvailability(data.id)"/>{{ toFormattedTimeStr(data.start) }} - {{ toFormattedTimeStr(data.end) }}
						</div>
					</div>
				</div>
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
			page: 'guardian',
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
		},
		becomeGuardian: async function() {
			await this.$store.dispatch('becomeGuardian')
		},
		deleteAvailability: function(id) {
			this.$store.dispatch('deleteGuardianAvailability', id)
		},
		addAvailability: function() {
			for (const weekDay of this.daysToAdd) {
				this.$store.dispatch('addGuardianAvailability', {
					'weekDay': weekDay,
					'start': `${this.guardianAvailabilityHoursStart}${this.guardianAvailabilityMinutesStart}`,
					'end': `${this.guardianAvailabilityHoursEnd}${this.guardianAvailabilityMinutesEnd}`
				})
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
	margin-bottom: 25px;
}

.newAvailabilityDaysSelectors {
	display: flex;
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

</style>
