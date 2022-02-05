<template>
  <div id="app">
		<router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
:root {
	--main-bg-color: #272727;
	--secondary-bg-color: #393939;
	--tertiary-bg-color: #cbcbcb;
	--hover-bg-color: #434343;

	--main-text-color: white;
	--secondary-text-color: #333333;
	--tertiary-text-color: #e0e0e0;
	--hover-text-color: #a4a4a4;
}

html, body {
	background-color: var(--main-bg-color);
	color: var(--main-text-color);
	width: 100%;
	margin: 0 auto;
	padding: 0;
}
</style>
