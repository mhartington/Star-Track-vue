import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { transform } from './filters/ms-to-mins';

// import './registerServiceWorker';
Vue.config.ignoredElements = [/ion-\w*/];
Vue.filter('msToMins', (value: any) => transform(value));
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
