import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// Import icons
import { faHouse, faMessages, faFaceClouds, faEyes, faFaceExhaling, faMemoPad, faNotes, faGear, faBookOpenReader } from '@fortawesome/pro-regular-svg-icons'
library.add(faHouse, faMessages, faFaceClouds, faEyes, faFaceExhaling, faMemoPad, faNotes, faGear, faBookOpenReader)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
