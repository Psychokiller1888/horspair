import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Datepicker from '@sum.cumo/vue-datepicker'
import '@sum.cumo/vue-datepicker/dist/Datepicker.css'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ToggleButton } from 'vue-js-toggle-button'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
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

Vue.use(VueCookies)
Vue.use(Notifications)

//Chart.plugins.register(ChartDataLabels)

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_BASEURL
Vue.config.productionTip = false

if (process.env.VUE_APP_NODE_ENV === 'dev') {
	Vue.$cookies.config('14d', '', '', false, 'strict')
} else {
	Vue.$cookies.config('14d', '', '', true, 'strict')
}

const axiosApiInstance = axios.create()
axios.interceptors.request.use(async config => {
	config.headers = {
		'Authorization': `Bearer ${Vue.$cookies.get('accessToken')}`,
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	return config
}, error => {
	Promise.reject(error)
})

axios.interceptors.response.use(response => {
	return response
}, async function (error) {
	console.log(error.response)
	if (error.response.status === 498 && !error.config._retry) {
		error.config._retry = true
		axios.get(`/refreshToken/${Vue.$cookies.get('userId')}/`, {headers: {'Authorization': `Bearer ${Vue.$cookies.get('refreshToken')}`}}).then(response => {
			if (response.status === 200) {
				Vue.$cookies.set('accessToken', response.data['accessToken'])
				Vue.$cookies.set('tokenExpiry', response.data['accessTokenExpiry'])
				Vue.$cookies.set('refreshToken', response.data['refreshToken'])
				Vue.$cookies.set('refreshTokenExpiry', response.data['refreshTokenExpiry'])
				axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['accessToken']}`
				return axiosApiInstance(error.config)
			} else {
				return Promise.reject(error)
			}
		}).catch(error => {
			return Promise.reject(error)
		})
	} else if (error.response.status === 307) {
		console.log('redirect')
	}
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
