<template>
  <v-container v-if="movies.length != 0">
    <v-layout justify-center class="search">
      <v-flex xs8>
        <v-text-field outline label="Busca tu película" type="text" v-model="searchValue">
          <template v-slot:append>
            <v-fade-transition leave-absolute></v-fade-transition>
          </template>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <h1 class="mb-4">{{getGenre}}</h1>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12>
        <v-card v-for="(movie, index) in moviesToShow" :key="index">
          <router-link :to="'/movie/' + Number(movie.id)" class="card">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{movie.title}}</div>
                    <div>
                      <p>
                        Fecha de lanzamiento:
                        <br>
                        {{movie.release_date}}
                      </p>
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
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination circle v-model="currentPage" total-visible="5" :length="numOfPages"></v-pagination>
    </div>
  </v-container>
  <v-container v-else>
    <v-flex class="loader">
      <v-progress-circular indeterminate color="primary" size="99" width="8"></v-progress-circular>
    </v-flex>
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
      perPage: 10,
      currentPage: 1,
      genres: [
        {
          id: 28,
          name: "Acción"
        },
        {
          id: 12,
          name: "Aventura"
        },
        {
          id: 16,
          name: "Animación"
        },
        {
          id: 35,
          name: "Comedia"
        },
        {
          id: 80,
          name: "Crimen"
        },
        {
          id: 99,
          name: "Documental"
        },
        {
          id: 18,
          name: "Drama"
        },
        {
          id: 10751,
          name: "Familia"
        },
        {
          id: 14,
          name: "Fantasía"
        },
        {
          id: 36,
          name: "Historia"
        },
        {
          id: 27,
          name: "Terror"
        },
        {
          id: 10402,
          name: "Música"
        },
        {
          id: 9648,
          name: "Misterio"
        },
        {
          id: 10749,
          name: "Romance"
        },
        {
          id: 878,
          name: "Ciencia ficción"
        },
        {
          id: 10770,
          name: "Película de TV"
        },
        {
          id: 53,
          name: "Suspense"
        },
        {
          id: 10752,
          name: "Bélica"
        },
        {
          id: 37,
          name: "Western"
        }
      ]
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
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.perPage;
    },
    limit() {
      return this.offset + this.perPage;
    },
    numOfPages() {
      return Math.ceil(this.movies.length / this.perPage);
    },
    moviesToShow() {
      if (this.offset > this.movies.length) {
        this.currentPage = this.numOfPages;
      }
      return this.movies
        .filter(movie =>
          movie.title.toLowerCase().includes(this.searchValue.toLowerCase())
        )
        .slice(this.offset, this.limit);
    },
    getGenre() {
      return this.genres.find(g => g.id == this.genre).name;
    }
  },
  created() {
    this.getMovie();
  }
};
</script>

<style>
.v-input__slot {
  margin-top: 30px;
}
.flex.xs4 {
  margin-top: 30px;
}
.container {
  padding-top: 0px;
}
.loader {
  display: flex;
  justify-content: center;
}
</style>
