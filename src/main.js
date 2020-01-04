import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import Vuetify from './plugins/vuetify';
import vuelidate from './plugins/vuelidate';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vuetify,
  vuelidate,
  render: h => h(App)
}).$mount('#app')
