import Vue from "vue";
import App from "./App.vue";
import "destyle.css";
import Router from "vue-router";

import Modal from "@burhanahmeed/vue-modal-2";

Vue.use(Modal);
Vue.use(Router);
Vue.config.productionTip = false;

const router = new Router({});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
