<template>
	<div class="mainContainer">
		<div ref="addModal" v-if="isBoardSetting">
			<div class="modal">
				<div class="modalContent">
					<h1 class="textCentered">
						Propriétés de ton tableau
					</h1>
					<div class="inlineSettingField">
						<div class="inlineSettingLabel">
							Couleur du tableau:
						</div>
						<div class="inlineSettingInput">
							<color-picker
								v-model="boardColor"
								row-length="6"
								shapes="circles"
								show-border
								show-fallback
								popover-x="left"
								fallback-input-type="color"
							/>
						</div>
					</div>
					<div class="inlineSettingField">
						<div class="inlineSettingLabel">
							Couleur par défaut des notes:
						</div>
						<div class="inlineSettingInput">
							<color-picker
								v-model="defaultNoteColor"
								row-length="6"
								shapes="circles"
								show-border
								show-fallback
								fallback-input-type="color"
							/>
						</div>
					</div>
					<p class="buttonsWrapper" style="margin: 0 auto;">
						<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="saveBoardSettings" title="enregistrer"/>
						<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" @click="isBoardSetting = false" title="annuler"/>
					</p>
				</div>
			</div>
		</div>
		<div ref="addModal" v-if="isAddingNote || isEditingNote">
			<div class="modal">
				<div class="modalContent">
					<h1 class="textCentered" v-if="isAddingNote">
						Nouvelle note
					</h1>
					<h1 class="textCentered" v-else>
						Editer une note
					</h1>
					<div class="inlineSettingField">
						<div class="inlineSettingLabel">
							Contenu:
						</div>
						<div class="inlineSettingInput">
							<textArea cols="50" rows="20" style="resize: none" v-model="noteDataTemplate.content" ref="noteContent"></textArea>
						</div>
					</div>
					<div class="inlineSettingField">
						<div class="inlineSettingLabel">
							Date limite:
						</div>
						<div class="inlineSettingInput">
							<v-date-picker v-model="noteDataTemplate.deadline" mode="datetime" locale="fr" is24hr :minute-increment="15"/>
						</div>
					</div>
					<div class="inlineSettingField">
						<div class="inlineSettingLabel">
							Couleur de la note:
						</div>
						<div class="inlineSettingInput">
							<color-picker
								v-model="noteDataTemplate.bgColor"
								row-length="6"
								shapes="circles"
								popover-x="left"
								popover-y="top"
								show-border
								show-fallback
								fallback-input-type="color"
							/>
						</div>
					</div>
					<div class="inlineSettingField">
						<div class="inlineSettingLabel">
							Couleur du texte:
						</div>
						<div class="inlineSettingInput">
							<color-picker
								v-model="noteDataTemplate.textColor"
								row-length="6"
								shapes="circles"
								popover-x="left"
								popover-y="top"
								show-border
								show-fallback
								fallback-input-type="color"
							/>
						</div>
					</div>
					<p class="buttonsWrapper" style="margin: 0 auto;">
						<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="saveNote" title="enregistrer"/>
						<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" @click="cancelNote" title="annuler"/>
					</p>
				</div>
			</div>
		</div>
		<div class="boardHolder">
			<div class="boardMenu">
				<font-awesome-icon :icon="['far', 'gears']" @click="openBoardSettings"/>
				<font-awesome-icon :icon="['far', 'plus']" @click="addNewNote"/>
			</div>
			<div ref="board" class="board" :class="{dragging: isDragging}" :style="`background-color: ${boardColor}; top: 0; left: 0; transform: scale(${zoomLevel});`" @click="clickOnBoard" @mousedown="mouseDownOnBoard">
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
import Vue from 'vue'

export default {
	name: 'Notes',
	components: {
		note
	},
	data: function() {
		return {
			notes: null,
			defaultTextColor: '#000000',
			defaultNoteColor: '#4bb625',
			board: null,
			zoomLevel: 1.0,
			boardColor: '#04000C',
			moveableItem: new MoveableItem(this),
			focused: null,
			moveable: null,
			dragStartX: null,
			dragStartY: null,
			isDragging: false,
			isBoardSetting: false,
			isAddingNote: false,
			isEditingNote: false,
			noteDataTemplate: {},
			noteBackup: {},
			noteObjectBackup: {}
		}
	},
	created: function() {
		let self = this
		document.addEventListener('wheel', function (event) {
			if (self.$route.path.toLowerCase() !== '/notes') return
			if (self.isDragging || self.isEditingNote || self.isAddingNote) return
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
			if (self.dragStartX === null || self.focused) return
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
		this.notes = this.$store.state.notes
	},
	methods: {
		editNote(note) {
			this.noteBackup = note
			this.noteObjectBackup = JSON.parse(JSON.stringify(note.object))
			this.noteDataTemplate = note.object
			this.isEditingNote = true
		},
		resetNewNoteData() {
			this.noteDataTemplate = {
				userId: Vue.$cookies.get('userId'),
				type: 'note',
				content: '',
				deadline: new Date().setDate(new Date().getDate() + 1),
				dismissed: false,
				startX: -1,
				startY: -1,
				endX: null,
				endY: null,
				bgColor: '#e5ffdc',
				textColor: '#000000',
				width: 250,
				height: 250,
				zIndex: 999,
				rotation: 0
			}
		},
		addNewNote() {
			this.resetNewNoteData()
			const board = this.$refs['board']
			board.style.left = '0'
			board.style.top = '0'
			board.style.transform = 'scale(1.0)'
			this.isAddingNote = true
		},
		cancelNote() {
			if (this.isEditingNote) {
				//this.noteBackup.object = JSON.parse(JSON.stringify(this.noteObjectBackup))
				this.isEditingNote = false
			} else {
				this.isAddingNote = false
			}
		},
		saveNote() {
			this.isAddingNote = false
			this.noteDataTemplate.content = this.$refs['noteContent'].value
			this.noteDataTemplate.startX = 50000 - parseInt(this.$refs['board'].style.left)
			this.noteDataTemplate.startY = 50000 - parseInt(this.$refs['board'].style.top)
			this.$store.dispatch('addNote', this.noteDataTemplate)
		},
		saveBoardSettings() {
			this.isBoardSetting = false
		},
		openBoardSettings() {
			this.isBoardSetting = true
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
		setFocus(element, note) {
			if (this.focused && this.focused.target === element) {
				return
			}
			if (this.focused) {
				this.focused.destroyMoveable()
			}
			this.focused = new MoveableItem(this)
			this.focused.setMoveable(element, note)
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
		margin-left: 15px;
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
	.inlineSettingField {
		border-top: 1px solid var(--hover-bg-color);
		padding: 15px 0 15px 0;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.inlineSettingLabel {
		flex-grow: 1;
	}
</style>
