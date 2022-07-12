<template>
	<div
		:ref="`note_${id}`"
		:class="object.class"
		v-bind:style="`
		background-color: ${object.bgColor};
		color: ${object.txtColor};
		top: ${object.top}px;
		left: ${object.left}px;
		width: ${object.width}px;
		height: ${object.height}px;
		z-index: ${object.zIndex};
		transform: rotate(${object.rot}deg);
		`"
		@click="setFocus"
	>
		<div class="note">
			<div class="noteHeader">
				<font-awesome-icon :icon="['far', 'gears']" @click="openSettings"/>
			</div>
			<div class="">
				<strong>{{ object.content }}</strong>
			</div>
		</div>
		<div class="deadline red">{{ object.deadline }}</div>
	</div>
</template>

<script>
export default {
	name: 'note',
	props: [
		'controller',
		'object',
		'id'
	],
	methods: {
		openSettings: function(e) {
			e.stopPropagation()
		},
		setFocus: function(e) {
			e.stopPropagation()
			this.$parent.setFocus(this.$refs[`note_${this.id}`])
		}
	}
}
</script>

<style scoped>
.postit {
	position: absolute;
	width: 200px;
	min-height: 200px;
	-webkit-box-shadow: 4px 8px 15px 3px #000000;
	box-shadow: 4px 8px 15px 3px #000000;
	padding: 10px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-grow: 0;
}

.note {
	font-family: "Comic Sans MS", "Monotype Corsiva", "Bradley Hand ITC", serif;
	flex-grow: 1;
	text-align: justify;
	display: flex;
	flex-direction: column;
}

.noteHeader {
	text-align: right;
	font-size: 1.5em;
}

.noteHeader svg {
	cursor: pointer;
	color: var(--main-text-color)
}

.noteHeader svg:hover {
	color: var(--hover-text-color)
}

.deadline {
	margin-top: 10px;
	font-size: 0.8em;
	text-align: right;
}

.red {
	color: red;
	font-weight: bolder;
}
</style>
