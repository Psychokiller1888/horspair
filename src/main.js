import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Datepicker from '@sum.cumo/vue-datepicker'
import '@sum.cumo/vue-datepicker/dist/Datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// Import icons
import { faHouse, faMessages, faFaceClouds, faEyes, faFaceExhaling, faMemoPad, faNotes, faGear, faBookOpenReader, faCalendarDays, faFaceMeh, faFaceGrin, faFaceGrinBeam, faGrinTears, faFrownOpen, faFaceSadTear, faFaceAngry, faClock} from '@fortawesome/pro-regular-svg-icons'
library.add(faHouse, faMessages, faFaceClouds, faEyes, faFaceExhaling, faMemoPad, faNotes, faGear, faBookOpenReader, faCalendarDays, faFaceMeh, faFaceGrin, faFaceGrinBeam, faGrinTears, faFrownOpen, faFaceSadTear, faFaceAngry, faClock)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('datepicker', Datepicker)

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
