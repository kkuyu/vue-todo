import Vue from 'vue'
import App from '~/App'
import router from "~/router"
import store from "~/store"

new Vue({
  el: '#app',
  router,
  store,
  // render(createElement) {
  //  return createElement(App);
  // },
  render: (h) => h(App)
})
