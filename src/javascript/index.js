import Vue from 'vue';
import App from '../component/App';
import router from './Router/Router';
import store from './Store/Store';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  el: '#App',
  store: store,
  template: '<app/>',
  components: {App},
  router,
});



