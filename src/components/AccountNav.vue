<template>
	<ul>
		<router-link to="/account/data">
			<li class="button"><font-awesome-icon :icon="['far', 'house']" /></li>
		</router-link>
	</ul>
</template>

<script>
export default {
	name: 'Nav'
}
</script>

<style scoped>
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
</style>
