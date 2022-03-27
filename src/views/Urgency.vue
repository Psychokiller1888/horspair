<template>
	<div class="mainContainer">
		<div class="pageContent">
			<p class="title">urgences</p>
			<div v-if="timer <= 0">
				<p class="explanations">
					Tu as besoin d'aide? Besoin de parler, besoin d'écoute? Besoin de te changer les idées, de soutient ou simplement d'une main tendue? Les gens qui te répondront ici ne sont pas des professionnels, mais des gens comme toi, inscris à notre programme "Anges Gardien", offrant de leur personne en cas de besoin.
				</p>
				<p class="explanations explanation">
					En utilisant ce service, les anges gardiens seront avertis et le premier à répondre recevra ton numéro de téléphone pour pouvoir te contacter. Il se peut que personne ne soit disponible au moment où tu en as besoin, auquel cas nous te conseillons, si ça ne va vraiment pas, de contacter les instances officielles.
				</p>
				<div class="helpButton" v-if="timer <= 0" @click="askForHelp">
					<div class="helpButtonInner">
						help
					</div>
				</div>
			</div>
			<div v-else>
				<p class="explanations">
					Ta demande a été transmise et les anges gardien disponible maintenant ont été alerté
				</p>
				<p class="countdown">
					{{ remainingMinutes }}:{{ remainingSeconds }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>

import commons from '@/js/commons';

export default {
	name: 'Urgency',
	data: function() {
		return {
			timer: 0,
			remainingMinutes: '00',
			remainingSeconds: '00'
		}
	},
	methods: {
		askForHelp: function() {
			this.$store.state.axios.get('/guardianAngel/urgency/').then(response => {
				this.timer = 300
				this.countdown()
			}).catch(() => {
				this.timer = 300
				this.countdown()
			})
		},
		countdown: function() {
			if (this.timer <= 0) {
				return
			}

			this.remainingMinutes = commons.addZeroBefore(Math.floor(this.timer / 60 ).toString())
			this.remainingSeconds = commons.addZeroBefore(Math.floor(this.timer % 60 ).toString())
			this.timer--
			setTimeout(this.countdown, 1000)
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

</style>
