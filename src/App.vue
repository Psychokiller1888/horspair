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
	--dark-bg-color: #1e1e1e;
	--hover-bg-color: #434343;

	--main-text-color: #d0d0d0;
	--secondary-text-color: #638cff;
	--tertiary-text-color: #525252;
	--hover-text-color: #a4a4a4;

	--main-font: 'Open Sans', Helvetica, Arial, sans-serif;

	--boxShadow: 5px 5px 28px -8px #000000;
}

html, body {
	background-color: var(--main-bg-color);
	color: var(--main-text-color);
	width: 100%;
	margin: 0 auto;
	padding: 0;
	box-sizing: border-box;
	height: 100%;
	font-family: var(--main-font);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	overflow-x: hidden;

	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

::-webkit-scrollbar {
	width: 10px;
}

::-webkit-scrollbar-track {
	background: var(--dark-bg-color);
}

::-webkit-scrollbar-thumb {
	background: var(--secondary-bg-color);
}

#app {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 0 15px 0 15px;
	box-sizing: border-box;
}

a {
	color: var(--main-text-color);
}

.link {
	color: var(--secondary-text-color);
	font-style: italic;
	cursor: pointer;
	text-decoration: none;
}

.link:hover {
	text-decoration: underline;
}

.mainContainer {
	margin-top: 15px;
	line-height: 150%;
	flex-grow: 1;
}

.pageContent {
	display: flex;
	flex-direction: column;
	padding: 15px;
	box-sizing: border-box;
	max-width: 800px;
	margin: 25px auto;
	background-color: var(--dark-bg-color);
	-webkit-box-shadow:  var(--boxShadow);
	box-shadow:  var(--boxShadow);
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

.buttonsWrapper {
	display: flex;
	flex-basis: 100%;
	justify-content: center;
	align-items: center;
	padding: 15px;
	box-sizing: border-box;
}

button,
.button {
	cursor: pointer;
}

button:hover,
.button:hover {
	color: var(--hover-text-color);
}

.buttonsWrapper > button,
.buttonsWrapper > .button {
	background-color: var(--main-bg-color);
	padding: 10px 25px 10px 25px;
	border-radius: 5px;
	border: 1px solid var(--tertiary-bg-color);
	color: var(--main-text-color);
	margin: 0 5px;
	font-size: 1.5em;
}

.buttonsWrapper > button:hover,
.buttonsWrapper > .button:hover {
	background-color: var(--secondary-bg-color);
}

.inputsWrapper {
	padding: 15px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	height: auto;
	flex-grow: 1
}

.inputWrapper {
	display: flex;
	width: 250px;
	flex-direction: column;
	height: 75px;
	border: 1px solid var(--tertiary-bg-color);
	padding: 5px;
	box-sizing: border-box;
	color: var(--hover-text-color);
	margin: 15px 25px;
	font-size: 1em;
}

.textAreaWrapper {
	height: 250px;
	margin: 0;
	width: 100%;
}

.inputWrapper > label {
	cursor: pointer;
	font-variant: small-caps;
}

.inputWrapper > label > svg {
	margin-right: 10px;
}

.inputWrapper > input,
.inputWrapper > select,
.inputWrapper > div > select {
	display: flex;
	flex-grow: 1;
	outline: none;
	border: none;
	background-color: unset;
	text-align: left;
	box-sizing: border-box;
	padding: 5px;
	font-size: 1em;
	color: var(--main-text-color);
	cursor: pointer;
	resize: none;
	margin: 0;
}

.textAreaWrapper > textarea {
	text-align: left;
	padding: 15px;
	box-sizing: border-box;
	resize: none;
	height: 100%;
	width: 100%;
	margin-top: 15px;
	background-color: var(--secondary-bg-color);
	border: 0;
	color: var(--main-text-color);
	font-size: 1.25em;
}

.textAreaWrapper > textarea:focus {
	outline: none !important;
}

.inputWrapper > input:disabled,
.textAreaWrapper > textarea:disabled,
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
	appearance: textfield;
	-moz-appearance: textfield;
}

.inputWrapper > input[type=checkbox] {
	width: 12px;
	min-width: 12px;
}

.inputWrapperTextBlock {
	font-size: 1.25em;
	padding: 15px;
	box-sizing: border-box;
	border: 1px solid var(--tertiary-bg-color);
	text-align: center;
	margin: 15px;
}

.explanation {
	font-style: italic;
}

.break {
	flex-basis: 100%;
	text-align: center;
	font-variant: small-caps;
	font-size: 1.25em;
}

.fullWidth {
	flex-basis: 100%;
}

.calendar {
	background: var(--main-bg-color) !important;
	color: var(--main-text-color) !important;
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

.textCentered {
	text-align: center;
}

.v-tour__target--highlighted {
	box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.75) !important;
}

h1 {
	font-size: 1.75em;
}

h2 {
	font-size: 1.5em;
}

.modal {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999999;
}

.modalContent {
	width: 25%;
	max-height: 75%;
	margin: 0 auto;
	background-color: var(--secondary-bg-color);
	padding: 25px;
	text-align: justify;
	overflow-y: auto;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

.v-step {
	z-index: 99999999 !important;
}
</style>
