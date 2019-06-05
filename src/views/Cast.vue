<template>
  <v-container v-if="cast.length != 0">
    <v-card v-for="actor in cast" :key="actor.name" min-width="250" max-height="550">
      <v-img height="350" :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`"></v-img>

      <v-card>
        <p class="headline ml-4">{{actor.name}}</p>
      </v-card>
      <v-card>
        <p class="headline ml-4">{{actor.character}}</p>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cast: [],
      movieDetails: [],
      url: "https://api.themoviedb.org/3/movie/",
      url2: "?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      url3: "/videos?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      url4: "/credits?api_key=18661481496a15370caf925d682d33b0"
    };
  },
  props: ["id"],
  methods: {
    getDetails() {
      fetch(this.url + this.id + this.url2)
        .then(json => json.json())
        .then(data => (this.movieDetails = data));
    },
    getCast() {
      fetch(this.url + this.id + this.url4)
        .then(json => json.json())
        .then(data => (this.cast = data.cast));
    }
  },
  created() {
    this.getDetails();
    this.getCast();
  }
};
</script>

<style>
</style>
