import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Datepicker from '@sum.cumo/vue-datepicker'
import '@sum.cumo/vue-datepicker/dist/Datepicker.css'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ToggleButton } from 'vue-js-toggle-button'
//import { Chart } from 'chart.js'
//import ChartDataLabels from 'chartjs-plugin-datalabels'

// Import icons
import {
	faHouse,
	faMessages,
	faFaceClouds,
	faEyes,
	faFaceExhaling,
	faMemoPad,
	faNotes,
	faGear,
	faBookOpenReader,
	faCalendarDays,
	faFaceMeh,
	faFaceGrin,
	faFaceGrinBeam,
	faGrinTears,
	faFrownOpen,
	faFaceSadTear,
	faFaceAngry,
	faClock,
	faCircleXmark,
	faCircleCheck,
	faRightToBracket,
	faUserPlus,
	faCircleUser,
	faRightFromBracket,
	faKey,
	faAt,
	faIdCard,
	faKeySkeleton,
	faLocationCrosshairs,
	faCity,
	faInputNumeric,
	faPhone,
	faTrashCan
} from '@fortawesome/pro-regular-svg-icons'
import axios from 'axios'

library.add(
	faTrashCan,
	faPhone,
	faInputNumeric,
	faCity,
	faLocationCrosshairs,
	faKeySkeleton,
	faIdCard,
	faKey,
	faAt,
	faHouse,
	faMessages,
	faFaceClouds,
	faEyes,
	faFaceExhaling,
	faMemoPad,
	faNotes,
	faGear,
	faBookOpenReader,
	faCalendarDays,
	faFaceMeh,
	faFaceGrin,
	faFaceGrinBeam,
	faGrinTears,
	faFrownOpen,
	faFaceSadTear,
	faFaceAngry,
	faClock,
	faCircleXmark,
	faCircleCheck,
	faRightToBracket,
	faUserPlus,
	faCircleUser,
	faRightFromBracket
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('datepicker', Datepicker)
Vue.component('tooltip', VueCustomTooltip)
Vue.component('toggle', ToggleButton)
//Chart.plugins.register(ChartDataLabels)

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_API_BASEURL
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
