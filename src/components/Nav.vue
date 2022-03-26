<template>
	<div class="header">
		<div class="siteMenu">
			<span class="button" @click.stop="toggleMenu('mainMenuExtended')">
				<font-awesome-icon :icon="['far', 'bars']" fixed-width/> HORSPAIR
			</span>
		</div>
		<transition name="fade">
			<div class="mainSubMenu" v-if="this.menusStates['mainMenuExtended']">
				<div class="mainSubMenuContent">
					<div class="mainSubMenuTitle button">
						<font-awesome-icon :icon="['far', 'circle-xmark']" fixed-width @click.stop="toggleMenu('mainMenuExtended')"/> HORSPAIR
					</div>
					<div class="mainSubMenuItem">
						<router-link to="/">
							<font-awesome-icon :icon="['far', 'house']" fixed-width/> accueil
						</router-link>
					</div>
					<div class="mainSubMenuItem">
						<router-link to="/temoignages">
							<font-awesome-icon :icon="['far', 'messages']" fixed-width/> témoignages
						</router-link>
					</div>
					<div class="mainSubMenuItem">
						<font-awesome-icon :icon="['fab', 'discord']" fixed-width @click="openDiscord"/> Discord
					</div>
					<div class="mainSubMenuItem copyright">
						<font-awesome-icon :icon="['far', 'copyright']" fixed-width/> 2022 Hors-Pairs
					</div>
				</div>
			</div>
		</transition>
		<div class="userMenu">
			<ul>
				<li class="button"><font-awesome-icon :icon="['far', 'bell']" v-if="$store.getters.isConnected && notifications.length <= 0" @click.stop="toggleMenu('notificationsMenuExtended')"/></li>
				<li class="button"><font-awesome-icon :icon="['far', 'bell-on']" v-if="$store.getters.isConnected && notifications.length > 0" @click.stop="toggleMenu('notificationsMenuExtended')"/></li>
				<li class="button"><font-awesome-icon :icon="['far', 'circle-user']" @click.stop="toggleMenu('userMenuExtended')"/></li>
			</ul>
		</div>
		<transition name="fade">
			<div class="userSubMenu" v-if="this.menusStates['notificationsMenuExtended']">
				<div v-if="notifications.length <= 0">
					<div class="noNotification">
						pas de notification
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="userSubMenu" v-if="this.menusStates['userMenuExtended']">
				<div v-if="$store.getters.isConnected">
					<div class="userSubMenuItem" style="margin-bottom: 2px;">
						<div class="greetings">Salut {{ $store.state.user.firstname }}</div>
						<div class="userEmail">{{ $store.state.user.email }}</div>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/account">
							<font-awesome-icon :icon="['far', 'circle-user']" fixed-width/> mon compte
						</router-link>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/traqueur">
							<font-awesome-icon :icon="['far', 'face-clouds']" fixed-width/> tracker
						</router-link>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/emdr">
							<font-awesome-icon :icon="['far', 'eyes']" fixed-width/> EMDR
						</router-link>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/respiration">
								<font-awesome-icon :icon="['far', 'face-exhaling']" fixed-width/> Respiration
						</router-link>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/carnet">
							<font-awesome-icon :icon="['far', 'memo-pad']" fixed-width/> Carnet de bord
						</router-link>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/notes">
							<font-awesome-icon :icon="['far', 'notes']" fixed-width/> notes
						</router-link>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/logout">
							<font-awesome-icon :icon="['far', 'right-from-bracket']" fixed-width/> se déconnecter
						</router-link>
					</div>
				</div>
				<div v-if="!$store.getters.isConnected">
					<div class="userSubMenuItem" style="margin-bottom: 2px;">
						<div class="greetings">Salut!</div>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/signin">
							<font-awesome-icon :icon="['far', 'user-plus']" fixed-width/> s'enregistrer
						</router-link>
					</div>
					<div class="userSubMenuItem">
						<router-link to="/account">
							<font-awesome-icon :icon="['far', 'circle-user']" fixed-width/> se connecter
						</router-link>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>

import Vue from 'vue'
import { mapActions } from 'vuex'

export default {
	name: 'Nav',
	data: function() {
		return {
			menusStates : {
				'mainMenuExtended': false,
				'userMenuExtended': false,
				'notificationsMenuExtended': false
			},
			notifications: []
		}
	},
	mounted() {
		this.$store.commit('connecting', false)

		if (!this.$store.state.user && this.$cookies.get('accessToken')) {
			const User = new FormData()
			User.append('userId', Vue.$cookies.get('userId'))
			this.login(User)
		}

		const self = this
		document.getRootNode().addEventListener('click', function() {
			for (const menuItem of Object.keys(self.menusStates)) {
				self.menusStates[menuItem] = false
			}
		})
		document.oncontextmenu = new Function('return false')
	},
	methods: {
		...mapActions(['login']),
		openDiscord: function() {
			window.open('https://discord.gg/F363MtabM5')
		},
		toggleMenu: function(menu) {
			for (const menuItem of Object.keys(this.menusStates)) {
				if (menuItem === menu) {
					this.menusStates[menuItem] = !this.menusStates[menuItem]
				} else {
					this.menusStates[menuItem] = false
				}
			}
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
		border-bottom: 1px solid var(--hover-text-color);
		z-index: 999;
		box-sizing: border-box;
		align-items: center;
		padding: 20px 0;
	}

	.siteMenu {
		font-size: 2em;
		display: flex;
		flex-grow: 1;
	}

	.userMenu {
		font-size: 1.75em;
		display: flex;
	}

	.button {
		padding: 0;
		border: unset;
		background-color: unset;
		text-decoration: none;
		text-transform: uppercase;
		transition-duration: 0.3s;
	}

	.button:hover {
		background-color: unset;
	}

	svg {
		margin-right: 20px;
	}

	ul {
		padding: 0;
		display: flex;
		margin: 0;
	}

	li {
		display: inline-block;
		text-transform: uppercase;
		margin: 0 0 0 10px;
	}

	.userSubMenu {
		position: fixed;
		top: 100px;
		right: 25px;
		min-width: 300px;
		min-height: 150px;
		background-color: var(--secondary-bg-color);
		-webkit-box-shadow:  var(--boxShadow);
		box-shadow:  var(--boxShadow);
	}

	.userSubMenuItem {
		width: 100%;
		padding: 15px 35px;
		box-sizing: border-box;
		background-color: var(--dark-bg-color);
		font-size: 1.25em;
		cursor: pointer;
		transition-duration: 0.3s;
	}

	.userSubMenuItem:hover {
		background-color: var(--secondary-bg-color);
	}

	a {
		text-decoration: none;
		text-transform: capitalize;
	}

	.greetings {
		font-variant: small-caps;
		font-size: 1.25em;
		font-weight: bold;
	}

	.userEmail {
		font-size: 0.75em;
	}

	.mainSubMenu {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.mainSubMenuContent {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 350px;
		background-color: var(--dark-bg-color);
		padding: 0;
		box-sizing: border-box;
	}

	.mainSubMenuTitle {
		font-size: 2em;
		width: 350px;
		background-color: var(--dark-bg-color);
		padding: 20px 0 0 30px;
		box-sizing: border-box;
		margin-bottom: 50px;
	}

	.mainSubMenuItem {
		font-size: 1.5em;
		font-weight: bold;
		height: 50px;
		padding: 30px 30px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		transition-duration: 0.3s;
	}

	.mainSubMenuItem:hover {
		cursor: pointer;
		background-color: var(--secondary-bg-color);
	}

	.copyright {
		position: absolute;
		bottom: 0;
		font-size: 1em;
		font-style: italic;
	}

	.copyright:hover {
		cursor: unset;
		background-color: unset;
	}

	.noNotification {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
		align-content: center;
		height: 150px;
		font-style: italic;
		opacity: 0.5;
	}

  .logo {
		background-image: url('../assets/logo.png');
		background-repeat: no-repeat;
		background-size: contain;
		width: 100px;
		margin-top: 10px;
	}

	.fade-enter-active, .fade-leave-active {
		transition-duration: 0.3s;
	}

	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>
