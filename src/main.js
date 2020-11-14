import Vue from 'vue'
import App from './App.vue'

// Import plugins
import './plugins/axios'
import i18n from './plugins/i18n'
import vuetify from './plugins/vuetify';
import router from './plugins/router'

// Import services
import ToasterService from './components/toaster/ToasterService'
import UserService from './services/UserService'

// Import libs
import '@babel/polyfill'
import '@fortawesome/fontawesome-free/css/all.css'

// Register services as prototypes
Vue.prototype.$toaster = ToasterService
Vue.prototype.$user = UserService

new Vue({
  router,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
