import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap';
 import 'font-awesome/css/font-awesome.min.css';
import './style/custom.scss';
import db from './datastore';
import filters from './common/filters';
import VeeValidate from 'vee-validate';





if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$db = db;
filters.registerAll();
Vue.use(VeeValidate);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
