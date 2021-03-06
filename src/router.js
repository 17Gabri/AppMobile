import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Loading from "./views/Loading.vue";
import Movie from "./views/Movie.vue";
import Actor from "./views/Actor.vue";
import Genre from "./views/Genre.vue";
import Year from "./views/Year.vue";
import GenreFilter from "./views/Filter.vue";
import FilterYear from "./views/FilterYear.vue";
import FilterRating from "./views/FilterRating.vue";
import Rating from "./views/Rating.vue";
import Cast from "./views/Cast.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      name: "loading",
      component: Loading
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: Movie,
      props: true
    },
    {
      path: "/actor/:id",
      name: "actor",
      component: Actor,
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
      path: "/year/:year",
      name: "FilterYear",
      component: FilterYear,
      props: true
    },
    {
      path: "/rating",
      name: "rating",
      component: Rating,

    },
    {
      path: "/cast/:id",
      name: "cast",
      component: Cast,
      props: true
    },
    {
      path: "/rating/:rating",
      name: "FilterRating",
      component: FilterRating,
      props: true
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