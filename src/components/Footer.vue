<template>
	<div class="footer">
		@copyright Hors-Pairs
	</div>
</template>

<script>
export default {
	name: 'Nav'
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
</style>
