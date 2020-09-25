import Vue from 'vue'
import App from './App.vue'
import Subs from '../index.js'
console.log(Subs)
Vue.use(Subs)
new Vue({
  el: '#app',
  render: h => h(App)
})
