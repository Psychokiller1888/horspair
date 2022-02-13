<template>
  <div id="app">
		<Nav/>
		<router-view/>
		<Footer/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
		Nav,
		Footer
  },
	created() {
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

	--main-font: Montserrat, Helvetica, Arial, sans-serif;
	--main-font-size: 1.1em;
}

html, body {
	background-color: var(--main-bg-color);
	color: var(--main-text-color);
	width: 100%;
	margin: 0 auto;
	padding: 0 15px 0 15px;
	box-sizing: border-box;
	height: 100%;
}

#app {
	display: flex;
	flex-direction: column;
	height: 100%;
}

a {
	color: var(--main-text-color);
}

.mainContainer {
	margin-top: 15px;
	font-family: var(--main-font);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: var(--main-text-color);
	font-size: var(--main-font-size);
	line-height: 150%;
	flex-grow: 1;
}

.clickable:hover {
	color: var(--hover-text-color);
	cursor: pointer;
}

.calendar {
	background: var(--secondary-bg-color) !important;
	color: var(--secondary-text-color) !important;
}

.vdp-datepicker {
	flex-grow: 1 !important;
}

.confirmCancelButtonsWrapper {
	display: flex;
	background-color: var(--secondary-bg-color);
	justify-content: space-evenly;
	align-items: center;
	box-sizing: border-box;
	padding-top: 10px;
	padding-bottom: 10px;
	border-radius: 5px;
	border: 1px solid var(--tertiary-bg-color);
	font-size: 2em;
}

.inputWrapper {
	display: flex;
	height: 50px;
	background-color: var(--secondary-bg-color);
	justify-content: right;
	align-items: center;
	box-sizing: border-box;
	padding-left: 10px;
	padding-right: 5px;
	border-radius: 5px;
	border: 1px solid var(--tertiary-bg-color);
	margin-bottom: 10px;
}

input,
select {
	display: flex;
	flex-grow: 1;
	outline: none;
	border: none;
	background-color: var(--secondary-bg-color);
	text-align: right;
	margin-right: 5px;
	box-sizing: border-box;
	padding-right: 10px;
	font-size: 1.25em;
	height: 100%;
	width: 100%;
	color: var(--main-text-color);
	cursor: pointer;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type=number] {
	-moz-appearance: textfield;
}

button {
	margin: 0 auto;
	background-color: var(--tertiary-bg-color);
	border-radius: 5px;
	font-size: 1.2em;
	padding: 5px;
	cursor: pointer;
}

.calendar {
	background: var(--main-bg-color) !important;
	color: var(--main-text-color) !important;
}

.button {
	cursor: pointer;
}

.button:hover {
	color: var(--hover-text-color);
	cursor: pointer;
}

</style>
