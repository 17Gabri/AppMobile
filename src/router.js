import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Movie from "./views/Movie.vue";
import Genre from "./views/Genre.vue";
import Year from "./views/Year.vue";
import GenreFilter from "./views/Filter.vue";
import Rating from "./views/Rating.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: Movie,
      props: true
    },
    {
      path: "/genre",
      name: "genre",
      component: Genre,

    },
    {
      path: "/genre/:genre",
      name: "genreFilter",
      component: GenreFilter,
      props: true
    },
    {
      path: "/year",
      name: "year",
      component: Year,

    },
    {
      path: "/rating",
      name: "rating",
      component: Rating,

    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});