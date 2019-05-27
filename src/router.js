import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Loading from "./views/Loading.vue";
import Movie from "./views/Movie.vue";
import Genre from "./views/Genre.vue";
import Year from "./views/Year.vue";
import GenreFilter from "./views/Filter.vue";
import FilterYear from "./views/FilterYear.vue";
import FilterRating from "./views/FilterRating.vue";
import Rating from "./views/Rating.vue";

Vue.use(Router);

const router = new Router({
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
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router