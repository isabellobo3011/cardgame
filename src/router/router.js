import Vue from "vue";
import VueRouter from "vue-router";
import publicPath from "../../vue.config";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/card/:card",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/scores",
    name: "Scores",
    component: () =>
      import("../views/Scores.vue")
  },
  {
    path: "/twitter-real-time",
    name: "TwitterRealTime",
    component: () =>
      import("../views/TwitterRealTime.vue")
  }
];

const router = new VueRouter({
  base: publicPath.publicPath,
  // mode: 'hash', // back button not work, https://github.com/vuejs/vue-router/issues/853 ??
  mode: 'history',
  routes,
  scrollBehavior() { //https://stackoverflow.com/a/57212309, TODO: https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling
    // setTimeout(function(){document.getElementById('app').scrollIntoView();}, 3000);
    document.getElementById("app").scrollIntoView();
    document.querySelector(".modal-content").scrollIntoView();
    document.querySelector(".overlay-fullscreen .card-body").scrollIntoView();
  }
});

export default router;