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
	--main-bg-color: #202124;
	--secondary-bg-color: #303134;
	--tertiary-bg-color: #737373;
	--hover-bg-color: #434343;

	--main-text-color: #d0d0d0;
	--secondary-text-color: #638cff;
	--tertiary-text-color: #525252;
	--hover-text-color: #a4a4a4;

	--main-font: "Trebuchet MS";
	--main-font-size: 1.1em;
}

html, body {
	background-color: var(--main-bg-color);
	color: var(--main-text-color);
	width: 100%;
	margin: 0 auto;
	padding: 0 15px 0 15px;
	box-sizing: border-box;
}

a {
	color: var(--main-text-color);
}

.mainContainer {
	margin-top: 15px;
	font-family: var(--main-font);
	color: var(--main-text-color);
	font-size: var(--main-font-size);
	line-height: 150%;
}

.clickable:hover {
	color: var(--hover-text-color);
	cursor: pointer;
}
</style>
