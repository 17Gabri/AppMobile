<template>
  <v-container v-if="actuallyMovies.length != 0">
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
      <v-flex xs12 class="Subtitle">
        <h1 class="mb-4">En Cartelera</h1>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12>
        <v-card v-for="movie in filteredMovies" :key="movie.title">
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
  </v-container>
  <v-container v-else>
    <v-flex class="loader">
      <v-progress-circular indeterminate color="primary" size="99" width="8"></v-progress-circular>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      url:
        "https://api.themoviedb.org/3/movie/now_playing?api_key=18661481496a15370caf925d682d33b0&language=es-ES&page=1",
      actuallyMovies: [],
      searchValue: ""
    };
  },
  methods: {
    getActually() {
      fetch(this.url)
        .then(json => json.json())
        .then(data => (this.actuallyMovies = data.results));
    }
  },
  computed: {
    filteredMovies() {
      return this.actuallyMovies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  },
  created() {
    this.getActually();
  }
};
</script>
<style>
.v-list.card.theme--light {
  background-color: rgba(0, 0, 139, 0.658);
  color: white;
}
.search {
  margin-top: 10px;
}
.Subtitle {
  text-align: center;
  margin-bottom: 10px;
}
a {
  text-decoration: none;
}
.card {
  color: black;
}
.v-input__slot {
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

