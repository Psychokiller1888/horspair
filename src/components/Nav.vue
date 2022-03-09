<template>
	<div class="header">
		<div class="logo" title="Par des HP pour des HP"></div>
		<ul>
			<router-link to="/">
				<tooltip label="Accueil" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'house']" /></li></tooltip>
			</router-link>
			<router-link to="/temoignages">
				<tooltip label="Témoignages" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'messages']" /></li></tooltip>
			</router-link>

			<tooltip label="Applications" position="is-bottom"><li class="button" v-if="$store.getters.isConnected">
				<font-awesome-icon :icon="['far', 'table-cells']" @click="openSubMenu"/>
				<div ref="appsSubMenu" class="navSubMenu">
					<ul>
						<router-link to="/traqueur" v-if="$store.getters.isConnected">
							<tooltip label="Traqueur d'humeur" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'face-clouds']" /></li></tooltip>
						</router-link>
						<router-link to="/emdr" v-if="$store.getters.isConnected">
							<tooltip label="EMDR" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'eyes']" /></li></tooltip>
						</router-link>
						<router-link to="/respiration" v-if="$store.getters.isConnected">
							<tooltip label="Respiration accompagnée" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'face-exhaling']" /></li></tooltip>
						</router-link>
						<router-link to="/carnet" v-if="$store.getters.isConnected">
							<tooltip label="Carnet de bord" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'memo-pad']" /></li></tooltip>
						</router-link>
						<router-link to="/notes" v-if="$store.getters.isConnected">
							<tooltip label="Tâches" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'notes']" /></li></tooltip>
						</router-link>
					</ul>
				</div>
			</li></tooltip>

			<!--<tooltip label="Serveur Discord" position="is-bottom"><li class="button"><font-awesome-icon :icon="['fab', 'discord']" @click="openDiscord"/></li></tooltip>-->

			<router-link to="/account" v-if="$store.getters.isConnected">
				<tooltip label="Mon compte" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'circle-user']" /></li></tooltip>
			</router-link>
			<router-link to="/logout" v-if="$store.getters.isConnected">
				<tooltip label="Déconnecter" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'right-from-bracket']" /></li></tooltip>
			</router-link>
			<router-link to="/signin" v-if="!$store.getters.isConnected">
				<tooltip label="S'enregistrer" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'user-plus']" /></li></tooltip>
			</router-link>
			<router-link to="/login" v-if="!$store.getters.isConnected">
				<tooltip label="Se connecter" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'right-to-bracket']" /></li></tooltip>
			</router-link>
		</ul>
	</div>
</template>

<script>

import Vue from 'vue'

export default {
	name: 'Nav',
	mounted() {
		if (!this.$store.state.user && this.$cookies.get('accessToken')) {
			this.$store.state.axios.post(`/relogin/${this.$cookies.get('userId')}/`).then(response => {
				this.$store.commit('connect', response.data.userData)
				Vue.$cookies.set('userId', response.data['userData']['id'])
				Vue.$cookies.set('accessToken', response.data['accessToken'])
				Vue.$cookies.set('refreshToken', response.data['refreshToken'])
			}).catch()
		}
	},
	methods: {
		openDiscord: function() {
			window.open('https://discord.gg/F363MtabM5')
		},
		openSubMenu: function() {
			this.$refs.appsSubMenu.classList.contains('extended') ? this.$refs.appsSubMenu.classList.remove('extended') : this.$refs.appsSubMenu.classList.add('extended')
		}
	}
}
</script>

<style scoped>
  .header {
		position: sticky;
		top: 0;
		display: flex;
		background-color: var(--main-bg-color);
		border-bottom: 1px solid var(--main-text-color);
		z-index: 999;
	}
  .logo {
		background-image: url('../assets/logo.png');
		background-repeat: no-repeat;
		background-size: contain;
		width: 100px;
		margin-top: 10px;
	}
	ul {
		padding: 0;
		display: flex;
		justify-content: end;
		align-items: center;
		flex-grow: 1;
	}
	li {
		font-family: var(--main-font), sans-serif;
		font-weight: lighter;
		font-size: 2em;
		display: inline-block;
		margin: 10px;
		text-transform: uppercase;
	}
	.button {
		padding: 0;
		border: unset;
		background-color: unset;
	}
	.button:hover {
		background-color: unset;
	}
	.navSubMenu {
		position: absolute;
		background-color: var(--main-bg-color);
		right: 0;
		top: 75px;
		overflow: hidden;
		max-height: 0;
		transition: max-height 1.5s, ease-in-out;
		-webkit-transition: max-height 1.5s, ease-in-out;
		-moz-transition: max-height 1.5s, ease-in-out;
	}
	.navSubMenu ul {
		width: auto;
	}
	.navSubMenu li {
		display: block;
		width: 100%;
		height: 50px;
		font-size: 1em;
	}
	.navSubMenu .button {
		display: block;
		width: 100%;
	}
	.extended {
		max-height: 250px;
		transition: max-height 1.5s, ease-in-out;
		-webkit-transition: max-height 1.5s, ease-in-out;
		-moz-transition: max-height 1.5s, ease-in-out;
	}
</style>
