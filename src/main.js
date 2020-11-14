import Vue from 'vue'
import i18n from './i18n'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import '@fortawesome/fontawesome-free/css/all.css'
import ToasterService from './components/toaster/ToasterService'

Vue.prototype.$toaster = ToasterService
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
