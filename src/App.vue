<template>
  <div id="app">
		<Nav/>
		<router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
		Nav
  }
}
</script>

<style>
:root {
	--main-bg-color: #000000;
	--secondary-bg-color: #212121;
	--tertiary-bg-color: #737373;
	--hover-bg-color: #434343;

	--main-text-color: white;
	--secondary-text-color: #333333;
	--tertiary-text-color: #e0e0e0;
	--hover-text-color: #a4a4a4;

	--nav-font: "Trebuchet MS";
}

html, body {
	background-color: var(--main-bg-color);
	color: var(--main-text-color);
	width: 100%;
	margin: 0 auto;
	padding: 0;
}
</style>
