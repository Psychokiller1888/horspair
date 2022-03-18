<template>
  <div id="app">
		<notifications position="top center"/>
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
	justify-content: space-around;
	align-items: center;
	box-sizing: border-box;
	padding-top: 10px;
	padding-bottom: 10px;
	border-radius: 5px;
	font-size: 2em;
}

.inputsWrapper {
	width: 500px;
	background-color: var(--secondary-bg-color);
	padding: 15px;
	box-sizing: border-box;
	border-radius: 10px;
	border: 1px solid var(--tertiary-bg-color);
}

.inputWrapper {
	display: flex;
	height: 50px;
	background-color: var(--main-bg-color);
	justify-content: right;
	align-items: center;
	box-sizing: border-box;
	padding-left: 10px;
	padding-right: 5px;
	border-radius: 5px;
	border: 1px solid var(--tertiary-bg-color);
	margin-bottom: 10px;
}

.textAreaWrapper {
	height: 200px;
	overflow: hidden;
	align-items: unset;
	padding-top: 5px;
	box-sizing: border-box;
}

.textBlock {
	font-size: 1.1em;
	width: 500px;
	background-color: var(--secondary-bg-color);
	padding: 35px;
	box-sizing: border-box;
	border-radius: 10px;
	border: 1px solid var(--tertiary-bg-color);
	text-align: justify;
}

.inputWrapper > input,
.inputWrapper > select,
.inputWrapper > textarea {
	display: flex;
	flex-grow: 1;
	outline: none;
	border: none;
	background-color: var(--main-bg-color);
	text-align: right;
	margin-right: 5px;
	box-sizing: border-box;
	padding-right: 10px;
	font-size: 1.25em;
	height: 100%;
	width: 100%;
	color: var(--main-text-color);
	cursor: pointer;
	resize: none;
}

.inputWrapper > textarea {
	text-align: left;
	padding: 15px;
	box-sizing: border-box;
}

.inputWrapper > input:focus,
.inputWrapper > select:focus {
	font-style: italic;
}

.inputWrapper > input:disabled,
.inputWrapper > select:disabled {
	color: var(--tertiary-text-color)
}

/* Chrome, Safari, Edge, Opera */
.inputWrapper > input::-webkit-outer-spin-button,
.inputWrapper > input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
.inputWrapper > input[type=number] {
	-moz-appearance: textfield;
}

.inputWrapper > input[type=checkbox] {
	width: 18px;
	min-width: 18px;
}

button {
	margin: 0 auto;
	background-color: var(--main-bg-color);
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
	background-color: var(--main-bg-color);
	cursor: pointer;
	padding: 10px 25px 10px 25px;
	border-radius: 5px;
	border: 1px solid var(--tertiary-bg-color);
	color: var(--main-text-color);
}

.button:hover {
	background-color: var(--secondary-bg-color);
	color: var(--hover-text-color);
	cursor: pointer;
}

.textButton {
	color: var(--main-text-color);
	display: inline-block;
	margin-right: 5px;
}

.textButton:hover {
	cursor: pointer;
	color: var(--hover-text-color);
}

.textCentered {
	text-align: center;
}

.textRed {
	color: red;
}

.textJustified {
	text-align: justify;
}

.shake {
	animation: shake 0.5s;
	animation-iteration-count: infinite;
}

@keyframes shake {
	0% { transform: translate(1px, 1px) rotate(0deg); }
	10% { transform: translate(-1px, -2px) rotate(-1deg); }
	20% { transform: translate(-3px, 0px) rotate(1deg); }
	30% { transform: translate(3px, 2px) rotate(0deg); }
	40% { transform: translate(1px, -1px) rotate(1deg); }
	50% { transform: translate(-1px, 2px) rotate(-1deg); }
	60% { transform: translate(-3px, 1px) rotate(0deg); }
	70% { transform: translate(3px, 1px) rotate(-1deg); }
	80% { transform: translate(-1px, -1px) rotate(1deg); }
	90% { transform: translate(1px, 2px) rotate(0deg); }
	100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shrinkAway {
	animation-name: shrinkAway;
	animation-duration: 0.5s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}

@keyframes shrinkAway {
	0% { transform: scale(100%) rotate(0);}
	20% { transform: scale(110%) rotate(25deg); }
	100% { transform: scale(0%) rotate(-240deg); }
}

.redBorders {
	border: 1px solid red;
}

.vue-notification {
	font-size: 16px!important;
}

.inlineButton {
	width: auto;
	padding: 3px 8px 3px 8px;
	border-radius: 5px;
	border: 1px solid var(--main-text-color);
	cursor: pointer;
}

.blueBackground {
	background-color: rgba(20, 78, 149, 0.6);
}

.hidden {
	display: none;
}

.v-tour__target--highlighted {
	box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.75) !important;
}
</style>
