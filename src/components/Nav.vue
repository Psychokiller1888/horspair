<template>

	<ul>
		<li>Home</li>
		<li>Témoignages</li>
		<li>Mon tracker d'humeur</li>
		<li>Séance d'EMDR</li>
		<li>Respiration accompagnée</li>
		<li>Mon carnet de bord</li>
		<li>Mes tâches</li>
		<li>Configurations</li>
	</ul>
</template>

<script>
export default {
	name: 'Nav'
}
</script>

<style scoped>
	ul {
		width: 98%;
		padding: 0;
		margin: 0 auto;
		display: flex;
		justify-content: end;
		align-items: center;
		border-bottom: 1px solid var(--main-text-color);
		height: 7em;
	}

	li {
		font-family: var(--nav-font), sans-serif;
		font-weight: lighter;
		font-size: 1.1em;
		display: inline-block;
		margin: 10px;
		text-transform: uppercase;
	}

	li:hover {
		color: var(--hover-text-color);
		cursor: pointer;
	}
</style>
