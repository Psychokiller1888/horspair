<template>
	<div
		:ref="`note_${id}`"
		:class="`${object.type}Holder`"
		v-bind:style="getStyle"
		@click="setFocus"
	>
		<div class="note">
			<div class="noteHeader">
				<font-awesome-icon :icon="['far', 'gears']" @click="openSettings"/>
			</div>
			<div>
				{{ object.content }}
			</div>
		</div>
		<div class="deadline" :class="{red: isOverdue}">{{ getDeadline }}</div>
	</div>
</template>

<script>
import commons from '@/js/commons'

export default {
	name: 'note',
	props: [
		'controller',
		'object',
		'id'
	],
	computed: {
		getStyle: function() {
			return `
				background-color: ${this.object.bgColor};
				color: ${this.object.textColor};
				top: ${this.object.startY}px;
				left: ${this.object.startX}px;
				width: ${this.object.width}px;
				height: ${this.object.height}px;
				z-index: ${this.object.zIndex};
				transform: rotate(${this.object.rotation}deg);
			`
		},
		getDeadline: function() {
			let deadline = new Date(this.object.deadline)
			return `${deadline.getDate()}.${commons.addZeroBefore(deadline.getMonth() + 1)}.${deadline.getFullYear()} ${commons.addZeroBefore(deadline.getHours())}:${commons.addZeroBefore(deadline.getMinutes())}`
		},
		isOverdue: function() {
			const now = new Date()
			const deadline = new Date(this.object.deadline)
			return now > deadline
		}
	},
	methods: {
		save: function() {
			this.$store.dispatch('updateNote', this.object)
		},
		openSettings: function(e) {
			e.stopPropagation()
			this.$parent.editNote(this)
		},
		setFocus: function(e) {
			e.stopPropagation()
			this.$parent.setFocus(this.$refs[`note_${this.id}`], this)
		}
	}
}
</script>

<style scoped>
.noteHolder {
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
	color: var(--main-text-color);
	transition: color 0.25s;
}

.noteHeader svg:hover {
	color: var(--hover-text-color);
}

.deadline {
	margin-top: 10px;
	font-size: 0.8em;
	text-align: right;
	color: var(--main-text-color)
}

.red {
	color: red;
	font-weight: bolder;
}



</style>
