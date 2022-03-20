<template>
	<div class="mainContainer">
		<v-tour name="moodTrackerOnboarding" :steps="steps" :options="tourOptions" :callbacks="tourCallbacks"></v-tour>
		<div class="recorder">
			<p class="score">
				score d'humeur du mois: <strong id="moodTracker_tour_2">{{ score }}</strong>
			</p>
			<v-date-picker v-model="date" mode="dateTime" locale="fr" is24hr :minute-increment="15" id="moodTracker_tour_3"/>
			<p class="moodSelectors" id="moodTracker_tour_4">
				<span class="smiley" :class="{selected: selected === -3}" @click="selected = -3">
					<font-awesome-icon :icon="['far', 'face-angry']"/>
				</span>
				<span class="smiley" :class="{selected: selected === -2}" @click="selected = -2">
					<font-awesome-icon :icon="['far', 'face-sad-tear']"/>
				</span>
				<span class="smiley" :class="{selected: selected === -1}" @click="selected = -1">
					<font-awesome-icon :icon="['far', 'face-frown-open']"/>
				</span>
				<span class="smiley" :class="{selected: selected === 0}" @click="selected = 0">
					<font-awesome-icon :icon="['far', 'face-meh']"/>
				</span>
				<span class="smiley" :class="{selected: selected === 1}" @click="selected = 1">
					<font-awesome-icon :icon="['far', 'face-grin']"/>
				</span>
				<span class="smiley" :class="{selected: selected === 2}" @click="selected = 2">
					<font-awesome-icon :icon="['far', 'face-grin-beam']"/>
				</span>
				<span class="smiley" :class="{selected: selected === 3}" @click="selected = 3">
					<font-awesome-icon :icon="['far', 'face-grin-tears']"/>
				</span>
			</p>
			<p class="inputWrapper textAreaWrapper" id="moodTracker_tour_5">
				<span><font-awesome-icon :icon="['far', 'comment']" size="2x"/></span>
				<textarea v-model="comment" placeholder="Remarque" />
			</p>
			<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;" v-if="selected !== ''">
				<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="save" title="enregistrer" id="moodTracker_tour_6"/>
				<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" @click="selected = ''" title="annuler"/>
			</p>
		</div>
		<div class="viewData">
			<v-calendar
				id="moodTracker_tour_1"
				:masks="masks"
				:attributes="attributes"
				locale="fr"
				is-expanded
				class="bigCalendar"
				@update:to-page="nextPage"
			>
				<template v-slot:day-content="{ day, attributes }">
					<div class="">
						<span class="">{{ day.day }}</span>
						<div class="calendar-smiley-list">
							<p
								v-for="attr in attributes"
								:key="attr.key"
								:class="attr.customData.class"
							>
								<span class="calendar-smiley" @dblclick="deleteEntry(attr.key)">
									<tooltip :label="getLabel(attr.customData)"><font-awesome-icon :icon="['far', `face-${attr.customData.icon}`]"/></tooltip>
								</span>
							</p>
						</div>
					</div>
				</template>
			</v-calendar>
		</div>
	</div>
</template>

<script>
import commons from '@/js/commons'

export default {
	name: 'Tracker',
	data: function() {
		return {
			comment: '',
			score: 100,
			selected: '',
			date: new Date(),
			masks: {
				weekdays: "WWWW"
			},
			tourCallbacks: {
				onFinish: this.tourFinished,
				onStop: this.tourFinished,
				onSkip: this.tourFinished
			},
			tourOptions: {
				useKeyboardNavigation: false,
				labels: {
					buttonSkip: 'Passer l\'introduction',
					buttonPrevious: 'Précédant',
					buttonNext: 'Suivant',
					buttonStop: 'Terminé'
				}
			},
			steps: [
				{
					target: '#moodTracker_tour_1',
					header: {
						title: 'Traqueur d\'humeur'
					},
					content: 'Bienvenue sur ton traqueur d\'humeur! Il te servira a enregistrer tes différentes humeurs au fil des jours et te permettra d\'agir en conséquence',
					params: {
						highlight: true,
						placement: 'left'
					}
				},
				{
					target: '#moodTracker_tour_2',
					header: {
						title: 'Ta note mensuelle'
					},
					content: 'Ceci est ta note mensuelle. Le score maximum est de 100 et le minimum de 0. Le score est influencé par les bonnes ou mauvaises humeurs. Il est bien entendu préférable pour toi de garder un bon score! Si ton score descend trop, rajoute du peps à ta vie, fais quelque chose pour toi, qui te fais plaisir!',
					params: {
						highlight: true,
						placement: 'top'
					}
				},
				{
					target: '#moodTracker_tour_3',
					header: {
						title: 'Ajouter une entrée'
					},
					content: 'Pour ajouter une entrée d\'humeur, sélectionnes la date et l\'heure concernée',
					params: {
						highlight: true,
						placement: 'top'
					}
				},
				{
					target: '#moodTracker_tour_4',
					header: {
						title: 'Ajouter une entrée'
					},
					content: 'Puis sélectionnes une emoticon correspondante à ton ressentis. Le smiley neutre donne 0 point, le fâché -3 et celui qui est heureux, +3',
					params: {
						highlight: true,
						placement: 'top'
					},
					before: type => new Promise((resolve) => {
						this.date = new Date()
						this.selected = 0
						resolve()
					})
				},
				{
					target: '#moodTracker_tour_5',
					header: {
						title: 'Ajouter une entrée'
					},
					content: 'Entre un commentaire, un mot, une note, si tu en as besoin, ça t\'aidera à te rappeler ce bon moment!',
					params: {
						highlight: true,
						placement: 'top'
					},
					before: type => new Promise((resolve) => {
						this.comment = ''
						const text = 'Découverte de l\'outil de suivis d\'humeur!'
						const self = this
						let time = 0
						for (let i = 0; i <= text.length - 1; i++) {
							time += Math.floor(Math.random() * 150)
							setTimeout(function() {
								self.comment += text[i]
							}, time)
						}
						this.selected = 0
						resolve()
					})
				},
				{
					target: '#moodTracker_tour_6',
					header: {
						title: 'Ajouter une entrée'
					},
					content: 'Puis cliques simplement sur "Enregistrer"! Une entrée sera alors crée dans le calendrier. Tu peux avoir plusieurs entrée par jour. Pour supprimer une entrée, double clic sur celle-ci!',
					params: {
						highlight: true,
						placement: 'top'
					}
				}
			]
		}
	},
	computed: {
		attributes: function() {
			return this.$store.state.moodTrackerData
		}
	},
	mounted() {
		if (!this.$cookies.get('k_m_t_onboarding')) {
			this.$tours['moodTrackerOnboarding'].start()
		}
		this.$store.dispatch('getMoods')
	},
	methods: {
		tourFinished: function() {
			this.$cookies.set('k_m_t_onboarding', true)
		},
		getLabel: function(customData) {
			let label = customData.time
			if (customData.comment) {
				label += ` - ${customData.comment}`
			}
			return label
		},
		nextPage(page) {
			this.calculateScore(page.month, page.year)
		},
		calculateScore(month, year) {
			this.score = 100
			const daysInMonth = new Date(year, month, 0).getDate()
			const monthData = this.$store.getters.getMoodDataByMonth(month, year)

			for (let i = 1; i <= daysInMonth; i++) {
				if (i in monthData) {
					for (const mood of monthData[i]) {
						let modifier
						switch(mood.customData.icon) {
							case 'angry':
								modifier = -3
								break
							case 'sad-tear':
								modifier = -2
								break
							case 'frown-open':
								modifier = -1
								break
							case 'meh':
								modifier = 0
								break
							case 'grin':
								modifier = 1
								break
							case 'grin-beam':
								modifier = 2
								break
							case 'grin-tears':
								modifier = 3
								break
							default:
								modifier = 0
								return
						}
						this.score = commons.clamp(this.score + modifier, 0, 100)
					}
				}
			}
		},
		deleteEntry(key) {
			this.$store.dispatch('deleteMoodEntry', key).then(() => {
				this.calculateScore(this.date.getMonth() + 1, this.date.getFullYear())
			})
		},
		save() {
			this.$tours['moodTrackerOnboarding'].stop()
			let icon
			switch(this.selected) {
				case -3:
					icon = 'angry'
					break
				case -2:
					icon = 'sad-tear'
					break
				case -1:
					icon = 'frown-open'
					break
				case 0:
					icon = 'meh'
					break
				case 1:
					icon = 'grin'
					break
				case 2:
					icon = 'grin-beam'
					break
				case 3:
					icon = 'grin-tears'
					break
				default:
					this.selected = ''
					this.comment = ''
					return
			}
			this.$store.dispatch('addNewMoodEntry', {
				date: this.date,
				icon: icon,
				comment: this.comment
			}).then(() => {
				this.selected = ''
				this.comment = ''
				this.calculateScore(this.date.getMonth() + 1, this.date.getFullYear())
			})
		}
	}
}
</script>

<style scoped>

.recorder {
	width: 500px;
	margin: 0 25px;
}

.moodSelectors {
	margin-top: 40px;
	margin-bottom: 40px;
	display: flex;
	justify-content: space-between;
}

.smiley {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 60px;
	color: black;
	width: 58px;
	height: 58px;
	background-color: #ffff48;
	border-radius: 50%;
}

.selected {
	-webkit-transform: scale(1.2);
	background-color: #488a4b;
}

.smiley:hover {
	-webkit-transform: scale(1.2);
	cursor: pointer;
}

.mainContainer {
	display: flex;
	flex-direction: row;
}

.viewData {
	width: 100%;
}

.calendar-smiley-list {
	display: flex;
}

.calendar-smiley {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 40px;
	color: black;
	width: 38px;
	height: 38px;
	background-color: #ffff48;
	border-radius: 50%;
	margin: 0 5px;
}

.score {
	color: var(--secondary-text-color);
	text-transform: uppercase;
}
</style>

<style>
input {
	width: 100% !important;
	display: flex !important;
	flex-grow: 1 !important;
}
.vc-container {
	background-color: var(--secondary-bg-color) !important;
	border-radius: unset !important;
	border: none !important;
}

.bigCalendar .vc-svg-icon {
	color: var(--main-text-color) !important;
}

.bigCalendar .vc-header {
	background-color: var(--secondary-bg-color) !important;
	padding: 10px 0 !important;
}

.vc-title {
	color: var(--main-text-color) !important;
	text-transform: capitalize;
}

.bigCalendar .vc-weeks {
	padding: 0 !important;
}

.vc-weekday {
	color: var(--hover-text-color) !important;
}

.bigCalendar .vc-weekday {
	background-color: var(--secondary-bg-color) !important;
	border-bottom: 1px solid var(--main-text-color) !important;
	border-top: 1px solid var(--main-text-color) !important;
	padding: 15px 0 !important;
}

.vc-day {
	color: var(--main-text-color) !important;
}

.bigCalendar .vc-day {
	padding: 0 5px 3px 5px !important;
	text-align: left !important;
	height: 150px !important;
	min-height: 150px !important;
	max-height: 150px !important;
	min-width: 150px !important;
	background-color: var(--secondary-bg-color) !important;
	border: 1px solid var(--main-bg-color) !important;
	font-size: 0.8em;
}

.bigCalendar .vc-day-dots {
	margin-bottom: 5px;
}

</style>
