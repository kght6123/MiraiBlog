import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { default as store /*, Getters, Mutations, Actions*/ } from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
