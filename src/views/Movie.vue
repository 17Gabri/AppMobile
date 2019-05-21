<template>
  <v-layout v-if="movieDetails.length != 0">
    <v-flex xs12 sm6 offset-sm3 fill-width fill-height>
      <v-card class="card">
        <v-img
          class="poster"
          data-sizes="auto"
          :src="`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movieDetails.poster_path}`"
        ></v-img>
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
              <div id="mensajes"></div>
              <v-textarea
                id="text"
                outline
                name="input-7-4"
                label="Escribe tu crítica aquí"
                placeholder="Escribe tu crítica aquí"
              ></v-textarea>
              <v-layout justify-center>
                <v-flex xs6>
                  <v-btn color="success" @click="sendMessage">Escribe tu crítica</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";

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
    },
    sendMessage() {
      let name = firebase.auth().currentUser.displayName;
      let texto = document.getElementById("text").value;

      let messageToSend = {
        nombre: name,
        mensaje: texto
      };

      firebase
        .database()
        .ref(this.movieDetails.title)
        .push(messageToSend);
    },
    getMessages() {
      firebase
        .database()
        .ref(this.movieDetails.title)
        .on("value", function(data) {
          console.log(data.val());

          document.getElementById("mensajes").innerHTML = "";

          for (let key in data.val()) {
            let element = data.val()[key];
            let p = document.createElement("p");
            p.append(element.mensaje);
            document.getElementById("mensajes").append(p);
          }
        });
    }
  },
  computed: {
    activeFab() {
      return { color: "cyan", icon: "keyboard_arrow_down" };
    }
  },
  created() {
    this.getDetails();
    this.getMessages();
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
.container {
  padding-top: 0px;
}
</style>
