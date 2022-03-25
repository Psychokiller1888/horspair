<template>
	<div class="footer">
		<div class="cookies" ref="ackCookies">
			Nous utilisons des cookies pour rendre ta navigation plus fluide. Tu peux en apprendre plus ici. <span class="inlineButton blueBackground" @click="ackCookies">OK</span>
		</div>
		<div class="address">
			Laurent Chervet<br>
			Ruelle des Gerles 5<br>
			1788 Praz-Vully
		</div>
		<div class="legals">
			Terms of Service<br>
			Confidentialité
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

export default {
	name: 'Nav',
	mounted() {
		if (Vue.$cookies.get('k_a_c')) {
			this.$refs.ackCookies.classList.add('hidden')
		}
	},
	methods: {
		ackCookies: function() {
			Vue.$cookies.set('k_a_c', true)
			this.$refs.ackCookies.classList.add('hidden')
		}
	}
}
</script>

<style scoped>
  .footer {
		display: flex;
		background-color: var(--main-bg-color);
		border-top: 1px solid var(--hover-text-color);
		padding-top: 10px;
		padding-bottom: 10px;
		box-sizing: border-box;
		margin-top: 50px;
		justify-content: space-between;
	}
	.cookies {
		width: 100%;
		background-color: rgb(131, 131, 141);
		position: fixed;
		z-index: 99999;
		left: 0;
		bottom: 0;
		height: 75px;
		text-align: center;
		padding-top: 25px;
		box-sizing: border-box;
		font-size: 1.5em;
	}
	.address {
		font-style: italic;
		font-variant: small-caps;
		font-size: 0.8em;
	}
	.legals {
		font-style: italic;
		font-variant: small-caps;
		font-size: 0.8em;
		text-align: right;
	}
</style>
