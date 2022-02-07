<template>
	<div class="mainContainer">
		<div class="recorder">
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'calendar-days']" size="2x"/></span>
				<datepicker first-day-of-week="mon" year-picker-range="2" :full-month-name="true" :language="fr" calendar-class="calendar"></datepicker>
			</p>
			<p class="inputWrapper">
				<span><font-awesome-icon :icon="['far', 'clock']" size="2x"/></span>
				<select>
					<option>00:00</option>
					<option>00:30</option>
					<option>01:00</option>
					<option>01:30</option>
					<option>02:00</option>
					<option>02:30</option>
					<option>03:00</option>
					<option>03:30</option>
					<option>04:00</option>
					<option>04:30</option>
					<option>05:00</option>
					<option>05:30</option>
					<option>06:00</option>
					<option>06:30</option>
					<option>07:00</option>
					<option>07:30</option>
					<option>08:00</option>
					<option>08:30</option>
					<option>09:00</option>
					<option>09:30</option>
					<option>10:00</option>
					<option>10:30</option>
					<option>11:00</option>
					<option>11:30</option>
					<option>12:00</option>
					<option>12:30</option>
					<option>13:00</option>
					<option>13:30</option>
					<option>14:00</option>
					<option>14:30</option>
					<option>15:00</option>
					<option>15:30</option>
					<option>16:00</option>
					<option>16:30</option>
					<option>17:00</option>
					<option>17:30</option>
					<option>18:00</option>
					<option>18:30</option>
					<option>19:00</option>
					<option>19:30</option>
					<option>20:00</option>
					<option>20:30</option>
					<option>21:00</option>
					<option>21:30</option>
					<option>22:00</option>
					<option>22:30</option>
					<option>23:00</option>
					<option>23:30</option>
				</select>
			</p>
			<p class="moodSelectors">
				<span class="smiley">
					<font-awesome-icon :icon="['far', 'face-angry']" class="button" />
				</span>
				<span class="smiley">
					<font-awesome-icon :icon="['far', 'face-sad-tear']" class="button" />
				</span>
				<span class="smiley">
					<font-awesome-icon :icon="['far', 'face-frown-open']" class="button" />
				</span>
				<span class="smiley">
					<font-awesome-icon :icon="['far', 'face-meh']" class="button" />
				</span>
				<span class="smiley">
					<font-awesome-icon :icon="['far', 'face-grin']" class="button" />
				</span>
				<span class="smiley">
					<font-awesome-icon :icon="['far', 'face-grin-beam']" class="button" />
				</span>
				<span class="smiley">
					<font-awesome-icon :icon="['far', 'face-grin-tears']" class="button" />
				</span>
			</p>
		</div>
	</div>
</template>

<script>
import { fr } from '@sum.cumo/vue-datepicker/dist/locale'

export default {
	name: 'Home',
	data: function() {
		return {
			fr: fr
		}
	}
}
</script>

<style scoped>

.recorder {
	width: 500px;
	margin: 0 auto;
}

.moodSelectors {
	margin-top: 40px;
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

.smiley:hover {
	-webkit-transform: scale(1.2);
}

</style>
