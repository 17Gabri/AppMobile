<template>
  <v-container v-if="movies.length != 0">
    <v-layout justify-center class="search mt-5">
      <v-flex xs8>
        <v-text-field outline label="Busca tu película" type="text" v-model="searchValue">
          <template v-slot:append>
            <v-fade-transition leave-absolute></v-fade-transition>
          </template>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12>
        <v-card v-for="(movie, index) in filteredMovies" :key="index">
          <router-link :to="'/movie/' + Number(movie.id)" class="card">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{movie.title}}</div>
                    <div>
                      <p>Fecha de lanzamiento:</p>
                      <p>{{movie.release_date}}</p>
                    </div>
                    <div>
                      <v-layout class="mb-2">
                        <span>
                          <v-icon medium color="blue darken-2">info</v-icon>
                        </span>
                      </v-layout>
                    </div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs5>
                <v-img
                  class="poster"
                  data-sizes="auto"
                  :src="`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`"
                ></v-img>
              </v-flex>
            </v-layout>
          </router-link>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            Valora esta película
            <v-spacer></v-spacer>
            <div>
              <v-rating background-color="orange lighten-3" color="orange" small></v-rating>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination circle v-model="page" :length="6"></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ["genre"],
  data() {
    return {
      url:
        "https://api.themoviedb.org/3/list/78677?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      movies: [],
      searchValue: "",
      //   pages: Math.ceil(this.movies.length / 10),
      page: 1,
      numeroPelis: 10
    };
  },
  methods: {
    getMovie() {
      fetch(this.url)
        .then(json => json.json())
        .then(
          data =>
            (this.movies = data.items.filter(m => {
              let filter = false;
              m.genre_ids.forEach(element => {
                if (element == Number(this.genre)) {
                  filter = true;
                }
              });
              return filter;
            }))
        );
    }
    // pagination() {
    //   let pagination = {};
    //   let paginas = Math.ceil(this.movies.length / this.numeroPelis);
    //   let inicio = 0;
    //   let final = 10;
    //   for (let i = 0; i < paginas; i++) {
    //     let corte = this.filteredMovies.slice(inicio, final);
    //     pagination["slider" + i] = corte;

    //     inicio = inicio + this.numeroPelis;
    //     final = final + this.numeroPelis;
    //   }
    //   return pagination;
    // }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  },
  created() {
    this.getMovie();
  }
};
</script>

<style>
</style>
