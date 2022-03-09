<template>
	<div class="mainContainer">
		<div class="recorder">
			<p class="score">
				score d'humeur du mois: <strong>{{ score }}</strong>
			</p>
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'calendar-days']" size="2x"/></span>
				<v-date-picker v-model="date" mode="dateTime" is24hr locale="fr">
					<template v-slot="{ inputValue, inputEvents }">
						<input
							class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
							:value="inputValue"
							v-on="inputEvents"
						/>
					</template>
				</v-date-picker>
			</p>
			<p class="moodSelectors">
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
			<p class="confirmCancelButtonsWrapper" style="margin: 0 auto;" v-if="selected !== ''">
				<font-awesome-icon :icon="['far', 'circle-check']" class="button" @click="save" title="enregistrer"/>
				<font-awesome-icon :icon="['far', 'circle-xmark']" class="button" @click="selected = ''" title="annuler"/>
			</p>
		</div>
		<div class="viewData">
			<v-calendar
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
									<tooltip :label="attr.customData.time"><font-awesome-icon :icon="['far', `face-${attr.customData.icon}`]"/></tooltip>
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
			score: 100,
			selected: '',
			date: new Date(),
			masks: {
				weekdays: "WWWW"
			},
			attributes: this.$store.state.moodTrackerData
		}
	},
	methods: {
		nextPage(page) {
			this.score = 100
			const daysInMonth = new Date(page.year, page.month, 0).getDate()
			const monthData = this.$store.getters.getMoodDataByMonth(page.month, page.year)

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
			this.$store.dispatch('deleteMoodEntry', key)
		},
		save() {
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
					return
			}
			this.$store.dispatch('addNewMoodEntry', {
				date: this.date,
				icon: icon
			})
			this.selected = ''
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
