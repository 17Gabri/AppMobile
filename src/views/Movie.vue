<template>
  <v-layout v-if="movieDetails.length != 0">
    <v-flex xs12 sm6 offset-sm3 fill-width fill-height class="mt-5">
      <v-card class="card">
        <v-img
          class="poster"
          data-sizes="auto"
          :src="`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movieDetails.poster_path}`"
        ></v-img>
        <v-btn
          v-if="show"
          v-on:click="show = !show"
          :key="activeFab.icon"
          :color="activeFab.color"
          dark
          fab
          fixed
          bottom
          right
          href="#content"
        >
          <transition name="fade">
            <v-icon>{{ activeFab.icon }}</v-icon>
          </transition>
        </v-btn>
        <v-card-title primary-title id="content">
          <v-flex xs12>
            <v-card dark color="primary">
              <h1 class="section">{{movieDetails.title}}</h1>
            </v-card>
          </v-flex>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card class="section" dark color="blue" row>
                <v-layout row>
                  <v-flex xs6>
                    <h2>
                      <u>Géneros</u>
                    </h2>
                    <p v-for="genre in movieDetails.genres" :key="genre.name">{{genre.name}}</p>
                  </v-flex>
                  <v-flex xs6>
                    <h2>
                      <u>Otros datos</u>
                    </h2>
                    <p
                      v-if="movieDetails.belongs_to_collection != null"
                    >Colección: {{movieDetails.belongs_to_collection.name}}</p>
                    <p>Producido por: {{movieDetails.production_companies[0].name}}</p>
                    <p>Valoración: {{movieDetails.vote_average}}/10</p>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-flex xs12>
            <v-card class="section" dark color="blue">
              <h2>
                <u>Sinopsis</u>
              </h2>
              <p>{{movieDetails.overview}}</p>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card class="section" dark color="blue">
              <h2>
                <u>Chat</u>
              </h2>
            </v-card>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      url: "https://api.themoviedb.org/3/movie/",
      url2: "?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      movieDetails: [],
      show: true
    };
  },
  props: ["id"],
  methods: {
    getDetails() {
      fetch(this.url + this.id + this.url2)
        .then(json => json.json())
        .then(data => (this.movieDetails = data));
    }
  },
  computed: {
    activeFab() {
      return { color: "cyan", icon: "keyboard_arrow_down" };
    }
  },
  created() {
    this.getDetails();
  }
};
</script>

<style>
.section.v-card.v-sheet.theme--dark.blue {
  padding: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
