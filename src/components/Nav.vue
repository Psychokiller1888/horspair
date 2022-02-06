<template>
	<div class="header">
		<div class="logo" title="Par des HP pour des HP"></div>
		<ul>
			<router-link to="/">
				<li title="Accueil"><font-awesome-icon :icon="['far', 'house']" /></li>
			</router-link>
			<router-link to="/temoignages">
				<li title="Témoignages"><font-awesome-icon :icon="['far', 'messages']" /></li>
			</router-link>
			<router-link to="/traqueur">
				<li title="Traqueur d'humeur"><font-awesome-icon :icon="['far', 'face-clouds']" /></li>
			</router-link>
			<router-link to="/emdr">
				<li title="EMDR"><font-awesome-icon :icon="['far', 'eyes']" /></li>
			</router-link>
			<router-link to="/respiration">
				<li title="Respiration accompagnée"><font-awesome-icon :icon="['far', 'face-exhaling']" /></li>
			</router-link>
			<router-link to="/carnet">
				<li title="Carnet de bord"><font-awesome-icon :icon="['far', 'memo-pad']" /></li>
			</router-link>
			<router-link to="/notes">
				<li title="Tâches"><font-awesome-icon :icon="['far', 'notes']" /></li>
			</router-link>
			<router-link to="/settings">
				<li title="Configuration"><font-awesome-icon :icon="['far', 'gear']" /></li>
			</router-link>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Nav'
}
</script>

<style scoped>
  .header {
		position: sticky;
		top: 0;
		display: flex;
		flex-grow: 1;
		background-color: var(--main-bg-color);
		border-bottom: 1px solid var(--main-text-color);
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
		font-family: var(--nav-font), sans-serif;
		font-weight: lighter;
		font-size: 2em;
		display: inline-block;
		margin: 10px;
		text-transform: uppercase;
	}

	li:hover {
		color: var(--hover-text-color);
		cursor: pointer;
	}
</style>
