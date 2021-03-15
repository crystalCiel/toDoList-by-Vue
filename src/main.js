import Vue from 'vue';
import App from './App.vue';
import store from './store';
import 'bootstrap';

Vue.config.productionTip = false

const root = document.createElement('div');
const rootId = root.id = 'app'

new Vue({
  store,
  render: h => h(App),
}).$mount(`#${rootId}`)
