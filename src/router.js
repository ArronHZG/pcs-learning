import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "login"
      // name: "home",
      // component: () => import("./views/Home.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      hidden: true
    }
  ]
});
