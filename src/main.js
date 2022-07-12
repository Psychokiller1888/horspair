import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ToggleButton } from 'vue-js-toggle-button'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import VCalendar from 'v-calendar'
import PrettyInput from 'pretty-checkbox-vue/input'
import PrettyCheck from 'pretty-checkbox-vue/check'
import PrettyRadio from 'pretty-checkbox-vue/radio'
import VueTour from 'vue-tour'
require('vue-tour/dist/vue-tour.css')

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
	faTrashCan,
	faTableCells,
	faComment,
	faCopyright,
	faFaceExplode,
	faBars,
	faBell,
	faBellOn,
	faQuoteLeft,
	faQuoteRight,
	faSpinner,
	faBook,
	faGears
} from '@fortawesome/pro-regular-svg-icons'

import {
	faDiscord
} from '@fortawesome/free-brands-svg-icons'

library.add(
	faGears,
	faBook,
	faSpinner,
	faQuoteLeft,
	faQuoteRight,
	faBellOn,
	faBell,
	faBars,
	faFaceExplode,
	faCopyright,
	faComment,
	faTableCells,
	faDiscord,
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
Vue.component('tooltip', VueCustomTooltip)
Vue.component('toggle', ToggleButton)
Vue.component('p-input', PrettyInput)
Vue.component('p-check', PrettyCheck)
Vue.component('p-radio', PrettyRadio)

Vue.use(VueTour)
Vue.use(VueCookies)
Vue.use(Notifications)
Vue.use(VCalendar)

//Chart.plugins.register(ChartDataLabels)

Vue.config.productionTip = false

if (process.env.VUE_APP_NODE_ENV === 'dev') {
	Vue.$cookies.config('14d', '', '', false, 'strict')
} else {
	Vue.$cookies.config('14d', '', '', true, 'strict')
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
