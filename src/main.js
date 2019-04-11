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
//全局图标
import "./icons"; // icon
//mock
import { mockXHR } from "../mock"; // simulation data

// mock api in github pages site build
if (process.env.NODE_ENV === "production") {
  mockXHR();
}

Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
