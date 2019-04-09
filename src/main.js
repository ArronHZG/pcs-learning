import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Element from "element-ui";
// element样式
import "./styles/element-variables.scss";
import "@/styles/index.scss"; // global css
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "./icons"; // icon
Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
