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
			<router-link to="/traqueur" v-if="$store.state.user">
				<tooltip label="Traqueur d'humeur" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'face-clouds']" /></li></tooltip>
			</router-link>
			<router-link to="/emdr" v-if="$store.state.user">
				<tooltip label="EMDR" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'eyes']" /></li></tooltip>
			</router-link>
			<router-link to="/respiration" v-if="$store.state.user">
				<tooltip label="Respiration accompagnée" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'face-exhaling']" /></li></tooltip>
			</router-link>
			<router-link to="/carnet" v-if="$store.state.user">
				<tooltip label="Carnet de bord" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'memo-pad']" /></li></tooltip>
			</router-link>
			<router-link to="/notes" v-if="$store.state.user">
				<tooltip label="Tâches" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'notes']" /></li></tooltip>
			</router-link>
			<router-link to="/account" v-if="$store.state.user">
				<tooltip label="Mon compte" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'circle-user']" /></li></tooltip>
			</router-link>
			<router-link to="/logout" v-if="$store.state.user">
				<tooltip label="Déconnecter" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'right-from-bracket']" /></li></tooltip>
			</router-link>
			<router-link to="/signin" v-if="!$store.state.user">
				<tooltip label="S'enregistrer" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'user-plus']" /></li></tooltip>
			</router-link>
			<router-link to="/login" v-if="!$store.state.user">
				<tooltip label="Se connecter" position="is-bottom"><li class="button"><font-awesome-icon :icon="['far', 'right-to-bracket']" /></li></tooltip>
			</router-link>
		</ul>
	</div>
</template>

<script>

import Vue from 'vue';

export default {
	name: 'Nav',
	mounted() {
		if (!this.$store.state.user && this.$cookies.get('accessToken')) {
			this.$store.state.axios.post(`/relogin/${this.$cookies.get('userId')}/`).then(response => {
				console.log('here')
				this.$store.commit('connect', response)
			}).catch(error => {
				console.log(error)
			})
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
	}
	.button:hover {
		background-color: unset;
	}
</style>
