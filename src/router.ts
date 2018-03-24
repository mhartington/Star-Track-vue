import Vue from "vue";
import Router from "vue-router";
import SearchPage from "./views/SearchPage.vue";
import TrackDetailPage from "./views/TrackDetailPage.vue";

// Vue.config.productionTip = false;
// Vue.config.ignoredElements = [/ion-\w*/];
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "search",
      component: SearchPage,
    },
    {
      path: "/track-detail/:id",
      name: "trackDetail",
      component: TrackDetailPage,
    }
  ],
});
