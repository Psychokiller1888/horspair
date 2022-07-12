<template>
	<div class="mainContainer">
		<div class="board" @click="clickOnBoard">
			<note
				v-for="(note, id) in notes"
				:key="id"
				:id="id"
				:controller="this"
				:object="note"
			/>
		</div>
	</div>
</template>

<script>
import MoveableItem from '@/js/movableItem'
import note from '@/views/note'

export default {
	name: 'Notes',
	components: {
		note
	},
	data: function() {
		return {
			moveableItem: new MoveableItem(this),
			focused: null,
			moveable: null,
			notes: {
				1: {
					'class': 'postit',
					'bgColor': 'green',
					'txtColor': 'black',
					'width': 250,
					'height': 250,
					'top': 137,
					'left': 451,
					'rot': -12,
					'zIndex': 0,
					'content': 'Appeler les Toises',
					'deadline': '17 juillet 2022 12h30'
				}
			}
		}
	},
	mounted: function() {

	},
	methods: {
		clickOnBoard() {
			if (this.focused) {
				this.focused.destroyMoveable()
				this.focused = null
			}
		},
		setFocus(element) {
			if (this.focused && this.focused.target === element) {
				return
			}
			if (this.focused) {
				this.focused.destroyMoveable()
			}
			this.focused = new MoveableItem(this, element)
			this.focused.setMoveable(element, element)
		}
	}
}
</script>

<style scoped>
	.board {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		background-color: #04000c;
		flex-grow: 1;
	}
</style>
