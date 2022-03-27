<template>
	<div class="mainContainer">
		<div class="pageContent">
			<p class="title">urgences</p>
			<p class="explanations">
				Tu as besoin d'aide? Besoin de parler, besoin d'écoute? Besoin de te changer les idées, de soutient ou simplement d'une main tendue? Les gens qui te répondront ici ne sont pas des professionnels, mais des gens comme toi, inscris à notre programme "Anges Gardien", offrant de leur personne en cas de besoin.
			</p>
			<p class="explanations explanation">
				En utilisant ce service, les anges gardiens seront avertis et le premier à répondre recevra ton numéro de téléphone pour pouvoir te contacter. Il se peut que personne ne soit disponible au moment où tu en as besoin, auquel cas nous te conseillons, si ça ne va vraiment pas, de contacter les instances officielles.
			</p>
			<div class="helpButton" v-if="timer <= 0">
				<div class="helpButtonInner">
					help
				</div>
			</div>
			<p class="countdown" v-if="timer > 0">
				00:00
			</p>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Urgency',
	data: function() {
		return {
			timer: 10
		}
	},
	methods: {

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
	background-color: #dc0000;
}

.helpButtonInner:active {
	background-color: #3d0000;
}

.countdown {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2.5em;
	font-weight: bold;
	text-transform: uppercase;
	transition-duration: .3s;
}

</style>
