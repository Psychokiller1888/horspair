<template>
	<div class="mainContainer">
		<div class="boardHolder">
			<div class="boardMenu">
				<font-awesome-icon :icon="['far', 'gears']" @click="openBoardSettings"/>
			</div>
			<div ref="board" class="board" :class="{dragging: isDragging}" :style="`top: 0; left: 0; transform: scale(${zoomLevel});`" @click="clickOnBoard" @mousedown="mouseDownOnBoard">
				<note
					v-for="(note, id) in notes"
					:key="id"
					:id="id"
					:controller="this"
					:object="note"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import MoveableItem from '@/js/movableItem'
import note from '@/views/note'
import commons from '@/js/commons'

export default {
	name: 'Notes',
	components: {
		note
	},
	data: function() {
		return {
			board: null,
			zoomLevel: 1.0,
			moveableItem: new MoveableItem(this),
			focused: null,
			moveable: null,
			dragStartX: null,
			dragStartY: null,
			isDragging: false,
			notes: {
				1: {
					'class': 'postit',
					'bgColor': 'green',
					'txtColor': 'black',
					'width': 250,
					'height': 250,
					'top': 50000,
					'left': 50000,
					'rot': -12,
					'zIndex': 0,
					'content': 'Appeler les Toises',
					'deadline': '17 juillet 2022 12h30'
				}
			}
		}
	},
	created: function() {
		let self = this
		document.addEventListener('wheel', function (event) {
			if (self.$route.path.toLowerCase() !== '/notes') return
			if (event.deltaY > 1) {
				self.zoomLevel = Math.max(self.zoomLevel - 0.05, 0.1)
			} else {
				self.zoomLevel = Math.min(self.zoomLevel + 0.05, 3.0)
			}
			localStorage.setItem('zoomLevel', self.zoomLevel)
		})
		document.addEventListener('mouseup', function (event) {
			if (self.$route.path.toLowerCase() !== '/notes') return
			self.mouseUp(event)
		})
		document.addEventListener('mousemove', function (event) {
			if (self.$route.path.toLowerCase() !== '/notes') return
			if (self.dragStartX === null) return
			if (!event.target.classList.contains('board')) return

			self.isDragging = true
			const distX = event.layerX - self.dragStartX
			const distY = event.layerY - self.dragStartY
			let actualX = self.board.style.left || '0'
			let actualY = self.board.style.top || '0'
			actualX = parseInt(actualX.replace('px', ''))
			actualY = parseInt(actualY.replace('px', ''))
			let destX = commons.clamp(actualX + distX, -50000, 50000)
			let destY = commons.clamp(actualY + distY, -50000, 50000)
			self.board.style.left = `${destX}px`
			self.board.style.top = `${destY}px`
		})
		this.zoomLevel = parseFloat(localStorage.getItem('zoomLevel')) || 1.0
	},
	mounted: function() {
		this.board = this.$refs['board']
	},
	methods: {
		openBoardSettings() {

		},
		clickOnBoard() {
			if (this.focused) {
				this.focused.destroyMoveable()
				this.focused = null
			}
		},
		mouseDownOnBoard(e) {
			this.dragStartX = e.layerX
			this.dragStartY = e.layerY
		},
		mouseUp(e) {
			this.dragStartX = null
			this.dragStartY = null
			this.isDragging = false
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
	.boardHolder {
		position: absolute;
		top: 100px;
		bottom: 70px;
		left: 15px;
		right: 15px;
		overflow: hidden;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		justify-items: center;
		align-items: center;
	}
	.boardMenu {
		color: white;
		position: absolute;
		top: 10px;
		right: 15px;
		z-index: 10000;
		display: flex;
		flex-direction: row-reverse;
	}
	.boardMenu svg {
		font-size: 2em;
		cursor: pointer;
		color: var(--main-text-color);
		transition: color 0.25s;
	}
	.boardMenu svg:hover {
		color: var(--hover-text-color)
	}
	.board {
		box-sizing: border-box;
		flex: 1;
		height: 100000px;
		width: 100000px;
		min-height: 100000px;
		min-width: 100000px;
		position: relative;
		background-color: #04000c;
	}
	.dragging {
		cursor: grabbing;
	}
</style>
