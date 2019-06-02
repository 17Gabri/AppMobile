<template>
  <v-container class="bgc" v-if="movies.length != 0">
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
      <v-flex xs12>
        <v-card v-for="(movie, index) in moviesToShow" :key="index">
          <router-link :to="'/movie/' + Number(movie.id)" class="card">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{movie.title}}</div>
                    <div>
                      <p>Fecha de lanzamiento: {{movie.release_date}}</p>
                    </div>
                    <div>
                      <p>
                        Valoración:
                        {{movie.vote_average}}
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
    <v-flex class="loader" fill-height>
      <v-img :src="require('../assets/loader.gif')"></v-img>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  props: ["rating"],
  data() {
    return {
      url:
        "https://api.themoviedb.org/3/list/104324?api_key=18661481496a15370caf925d682d33b0&language=es_ES",
      movies: [],
      searchValue: "",
      perPage: 10,
      currentPage: 1
    };
  },
  methods: {
    getMovie() {
      fetch(this.url)
        .then(json => json.json())
        .then(
          data =>
            (this.movies = data.items.filter(m => {
              return this.allRatings().includes(
                m.vote_average.toString().split(".")[0]
              );
            }))
        );
    },
    allRatings() {
      switch (this.rating) {
        case "1":
          return ["9", "8"];
        case "2":
          return ["7"];
        case "3":
          return ["6"];
        case "4":
          return ["5"];
        case "5":
          return ["4", "3", "2"];
      }
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
    }
  },
  created() {
    this.getMovie();
  }
};
</script>

<style>
.container {
  padding-top: 0px;
}
.loader {
  display: flex;
  justify-content: center;
}
.bgc {
  background-color: rgba(169, 223, 238, 0.548);
}
</style>
