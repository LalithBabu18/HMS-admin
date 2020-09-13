// =========================================================
// * Vue Material Dashboard - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";

// router setup
import router from "@/router/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { IconsPlugin } from "bootstrap-vue";
import Multiselect from "vue-multiselect";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("multiselect", Multiselect);
import * as mdbvue from "mdbvue";
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component]);
}

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(Notifications);
const ENV_PATH = require(`@/environments/environment.${process.env.VUE_APP_ENV_PATH}.js`);
console.log(ENV_PATH.ENV);

let {
  API_BASE_URI,
  IMG_CDN,
  AUDIO_CDN,
  VIDEO_CDN,
  DOCUMENT_CDN
} = ENV_PATH.ENV;

//Object.assign(Vue.prototype, )
/* if (ENV_PATH.ENV) {
  Vue.prototype = { ...Vue.prototype, ...ENV_PATH.ENV };
} */

function prefix(obj) {
  return Object.entries(obj)
    .map(([key, val]) => [`$${key}`, val])
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
}

//if (ENV_PATH.ENV) {   // I don't know why ES6 object appending is not working...
//Vue.prototype = { ...Vue.prototype, ...prefix(ENV_PATH.ENV) };
//}

Object.assign(Vue.prototype, prefix(ENV_PATH.ENV), {});

console.dir(Vue.prototype);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});
// store.$app = app;
