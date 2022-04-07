<template>
	<div class="mainContainer">
		<div class="pageContent" v-if="!answeringToRequest">
			<p class="title">urgences</p>
			<div v-if="timer <= 0">
				<p class="explanations">
					Tu as besoin d'aide? Besoin de parler, besoin d'écoute? Besoin de te changer les idées, de soutient ou simplement d'une main tendue? Les gens qui te répondront ici ne sont pas des professionnels, mais des gens comme toi, inscris à notre programme "Anges Gardiens", offrant de leur personne en cas de besoin.
				</p>
				<p class="explanations important" v-if="$store.state.user.phone !== ''">
					En utilisant ce service, les anges gardiens seront avertis et le premier à répondre recevra ton numéro de téléphone pour pouvoir te contacter. Il se peut que personne ne soit disponible au moment où tu en as besoin, auquel cas nous te conseillons, si ça ne va vraiment pas, de contacter les instances officielles.
				</p>
				<p class="explanations important" v-else>
					Pour utiliser ce service, tu dois indiquer ton numéro de téléphone dans ton profile. Tu acceptes de facto que le premier Ange Gardien à répondre à chacune de tes demandes reçoive ton numéro de téléphone ainsi que ton prénom.
				</p>
				<div class="helpButton" v-if="timer <= 0 && $store.state.user.phone !== ''" @click="askForHelp">
					<div class="helpButtonInner">
						help
					</div>
				</div>
			</div>
			<div v-else>
				<p class="explanations" v-if="!noAvailable">
					Ta demande a été transmise et les anges gardiens disponibles maintenant ont été alertés. Le premier a répondre recevra ton numéro de téléphone et devrait te contacter sous peu.
				</p>
				<p class="explanations" v-if="noAvailable">
					Il n'y a malheureusement personne de disponible maintenant. Tu peux renvoyer une nouvelle demande dès le prochain créneau de 15 minutes. Si entre temps tu ne te sens pas bien, essaie la respiration accompagnée, ou contact une instance officielle
				</p>
				<p class="countdown">
					{{ remainingMinutes }}:{{ remainingSeconds }}
				</p>
			</div>
		</div>
		<div class="pageContent" v-else>
			<div class="textCentered" v-if="!isAlreadyAnswered && !isNotAnswered">
				<p>
					2 petites secondes s'il te plait, je recherche la personne qui a besoin d'aide
				</p>
				<p>
					<font-awesome-icon :icon="['far', 'spinner']" size="3x" spin />
				</p>
			</div>
			<div class="explanations" v-else-if="isAlreadyAnswered && !isNotAnswered">
				Merci d'avoir répondu présent! Heureusement, quelqu'un d'autre a déjà répondu à la demande et s'occupe de la personne en ce moment!
			</div>
			<div class="explanations" v-else-if="!isAlreadyAnswered && isNotAnswered">
				<h2>
					Merci d'avoir répondu présent!
				</h2>
				<p class="important">
					! IMPORTANT ! En répondant en premier à la demande, tu es maintenant la seule personne qui reçois le contact de {{ urgencyInquirer }}! Dès lors, il est important que tu ailles au bout et que tu contactes la personne. Elle a reçu un message qui lui indique que tu devrais la contacter sous peu. Le cas échéant, elle pourra rapporter ta non participation et tu ne seras plus admis en tant qu'Ange Gardien.
				</p>
				<p>
					La demande à été passée le <strong>{{ urgencyTime }}</strong><br>
					Par l'utilisateur <strong>{{ urgencyInquirer }}</strong><br>
					Tu peux la contacter sur le numéro <strong>{{ urgencyPhone }}</strong>
				</p>
			</div>
		</div>
	</div>
</template>

<script>

import commons from '@/js/commons'
import Vue from 'vue'

export default {
	name: 'Urgency',
	data: function() {
		return {
			answeringToRequest: false,
			isAlreadyAnswered: false,
			isNotAnswered: false,
			requestUid: '',
			remainingMinutes: '00',
			remainingSeconds: '00',
			noAvailable: false,
			timer: 0,
			urgencyTime: 0,
			urgencyInquirer: '',
			urgencyPhone: '',
		}
	},
	mounted() {
		this.timer = this.getSavedTimer()
		if (this.timer > 0) {
			this.countdown()
		}
	},
	computed: {},
	methods: {
		getSavedTimer: function() {
			const now = new Date().getTime()
			const timerEnd = this.$store.state.guardianAngelTimer

			if (!timerEnd || now > parseInt(timerEnd)) {
				return 0
			} else {
				const reason = this.$store.state.guardianAngelNoAvailable

				if (reason && reason === true) {
					this.noAvailable = true
				}

				return (parseInt(timerEnd) - now) / 1000
			}
		},
		askForHelp: function() {
			this.$store.state.axios.get('/guardianAngel/urgency/').then(() => {
				this.$store.commit('setGuardianNoAvailable', false)
				this.timer = 900
				this.countdown()
			}).catch(() => {
				this.$store.commit('setGuardianNoAvailable', true)
				this.noAvailable = true

				const minutes = new Date().getMinutes()
				this.timer = ((15 - (minutes % 15)) * 60) + 10
				this.countdown()
			}).finally(() => {
				this.saveTimer(this.timer)
			})
		},
		saveTimer: function(delta) {
			const timerEnd = new Date().getTime() + (delta * 1000)
			this.$store.commit('setGuardianWaitTimer', timerEnd)
		},
		countdown: function() {
			if (this.timer <= 0) {
				return
			}

			this.remainingMinutes = commons.addZeroBefore(Math.floor(this.timer / 60 ).toString())
			this.remainingSeconds = commons.addZeroBefore(Math.floor(this.timer % 60 ).toString())
			this.timer -= 1
			setTimeout(this.countdown, 1000)
		}
	},
	watch:       {
		$route: {
			immediate: true,
			handler() {
				if ('a' in this.$route.query) {
					this.answeringToRequest = true
					this.requestUid = this.$route.query['a']
					this.$store.state.axios.get(`/guardianAngel/urgency/${this.requestUid}/`).then(response => {
						const payload = response.data.payload
						this.isNotAnswered = true
						this.urgencyInquirer = payload.user
						this.urgencyPhone = payload.phone
						const time = new Date(payload.time)
						this.urgencyTime = `${commons.addZeroBefore(time.getDate())}.${commons.addZeroBefore(time.getMonth() + 1)}.${time.getFullYear()} à ${commons.addZeroBefore(time.getHours())}:${commons.addZeroBefore(time.getMinutes())}`
					}).catch(error => {
						if (error.response.status === 409) {
							this.isAlreadyAnswered = true
						} else {
							Vue.notify({
								title: 'Erreur',
								type: 'error',
								text: 'Erreur de données, désolé'
							})
						}
					})
				}
			}
		}
	}
}
</script>

<style scoped>

.title {
	font-variant: small-caps;
	font-size: 2.5em;
	color: red;
	text-align: center;
}

.explanations {
	padding: 15px;
	box-sizing: border-box;
	text-align: justify;
}

.helpButton {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 4em;
	height: 4em;
	font-size: 3em;
	background-color: #ff4646;
	border-radius: 50%;
	cursor: pointer;
	margin: 25px auto;
}

.helpButtonInner {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1em;
	font-weight: bold;
	text-transform: uppercase;
	transition-duration: .3s;
	background-color: #ff0000;
	width: 3.5em;
	height: 3.5em;
	border-radius: 50%;
}


.helpButtonInner:hover {
	filter: brightness(85%);
}

.helpButtonInner:active {
	filter: brightness(50%);
}

.countdown {
	font-family: monaco, Consolas, Lucida Console, monospace;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2.5em;
	text-transform: uppercase;
	transition-duration: .3s;
}

.important {
	color: var(--secondary-text-color)
}

</style>
