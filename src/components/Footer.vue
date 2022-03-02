<template>
	<div class="footer">
		<div class="cookies" ref="ackCookies">
			Nous utilisons des cookies pour rendre ta navigation plus fluide. Tu peux en apprendre plus ici. <span class="inlineButton blueBackground" @click="ackCookies">OK</span>
		</div>
		@copyright Hors-Pairs
	</div>
</template>

<script>
import Vue from 'vue'

export default {
	name: 'Nav',
	mounted() {
		if (Vue.$cookies.get('ackCookies')) {
			this.$refs.ackCookies.classList.add('hidden')
		}
	},
	methods: {
		ackCookies: function() {
			Vue.$cookies.set('ackCookies', true)
			this.$refs.ackCookies.classList.add('hidden')
		}
	}
}
</script>

<style scoped>
  .footer {
		display: flex;
		background-color: var(--main-bg-color);
		border-top: 1px solid var(--main-text-color);
		height: 50px;
		min-height: 50px;
		padding-top: 10px;
		box-sizing: border-box;
	}
	.cookies {
		width: 100%;
		background-color: rgb(131, 131, 141);
		position: fixed;
		left: 0;
		bottom: 0;
		height: 75px;
		text-align: center;
		padding-top: 25px;
		box-sizing: border-box;
		font-size: 1.5em;
	}
</style>
