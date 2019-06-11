<template>
  <v-layout v-if="actorDetails.length != 0">
    <v-flex xs12 sm6 offset-sm3 fill-width fill-height>
      <v-card class="card">
        <v-flex xs12>
          <v-card dark color="primary">
            <h1 class="section">{{actorDetails.name}}</h1>
          </v-card>
        </v-flex>
        <v-layout justify-center class="bg">
          <v-img
            class="poster"
            max-width="200"
            :src="`https://image.tmdb.org/t/p/original/${actorDetails.profile_path}`"
          ></v-img>
        </v-layout>
        <v-card class="section" dark color="blue">
          <h1 class="font">Imágenes</h1>
          <v-layout row class="reparto">
            <v-card
              min-width="250"
              max-height="550"
              v-for="image in actorImages"
              :key="image.file_path"
            >
              <v-img
                contain
                height="250"
                :src="`https://image.tmdb.org/t/p/original${image.file_path}`"
              ></v-img>
            </v-card>
          </v-layout>
        </v-card>
        <v-card-title primary-title id="content">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card class="section" dark color="blue" row>
                <v-layout row>
                  <v-flex xs12>
                    <h2>
                      <u>Bio</u>
                    </h2>
                    <p>
                      <u class="title">Fecha de Nacimiento:</u>
                    </p>
                    <p>{{actorDetails.birthday}}</p>
                    <p>
                      <u class="title">Lugar de Nacimiento:</u>
                    </p>
                    <p>{{actorDetails.place_of_birth}}</p>
                    <p>
                      <u class="title">Biografía:</u>
                    </p>
                    <p>{{actorDetails.biography}}</p>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-flex xs12>
            <v-card class="section" dark color="blue">
              <h2>
                <u>Filmografía</u>
              </h2>
              <v-card
                class="movie"
                v-if="movie.poster_path != null"
                v-for="movie in actorMovies"
                :key="movie.title"
                :to="'/movie/' + Number(movie.id)"
              >
                <v-img
                  class="poster"
                  max-width="100vh"
                  :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`"
                >
                  <v-container>
                    <v-layout justify-center>
                      <v-flex xs12>
                        <span class="headline">Aparece como: {{movie.character}}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-card>
            </v-card>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  <v-container v-else>
    <v-flex class="loader">
      <v-img :src="require('../assets/loader.gif')"></v-img>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      url: "https://api.themoviedb.org/3/person/",
      url2: "?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      url3:
        "/movie_credits?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      url4: "/images?api_key=18661481496a15370caf925d682d33b0",
      idActor: "",
      actorDetails: [],
      actorMovies: [],
      actorImages: [],
      dialog: false
    };
  },
  props: ["id"],
  methods: {
    getDetails() {
      fetch(this.url + this.id + this.url2)
        .then(json => json.json())
        .then(data => (this.actorDetails = data));
    },
    getMovies() {
      fetch(this.url + this.id + this.url3)
        .then(json => json.json())
        .then(data => (this.actorMovies = data.cast));
    },
    getImage() {
      fetch(this.url + this.id + this.url4)
        .then(json => json.json())
        .then(data => (this.actorImages = data.profiles));
    }
  },
  created() {
    this.getDetails();
    this.getMovies();
    this.getImage();
  }
};
</script>

<style>
span.headline {
  background-color: rgb(0, 0, 0);
}
.reparto {
  max-width: 100vw;
  overflow: scroll;
}
.movie {
  margin-top: 40px;
}
.title {
  font-size: 20px;
}
</style>
