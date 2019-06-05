<template>
  <v-layout v-if="movieDetails.length != 0">
    <v-flex xs12 sm6 offset-sm3 fill-width fill-height>
      <v-card class="card">
        <v-layout justify-center class="bg">
          <v-img
            class="poster"
            max-width="200"
            :src="`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movieDetails.poster_path}`"
          ></v-img>
        </v-layout>
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
                    <p>
                      Valoración:
                      <v-rating
                        v-model="rating"
                        background-color="orange lighten-3"
                        color="orange"
                        dense
                        :readonly="true"
                        :half-increments="true"
                      ></v-rating>
                    </p>
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
          <v-layout justify-center column v-if="idTrailer != ''">
            <v-card class="section" dark color="blue">
              <h1 class="font">Reparto</h1>
              <v-layout row class="reparto">
                <v-card v-for="actor in cutCast" :key="actor.name" min-width="250" max-height="550">
                  <v-img
                    v-if="actor.profile_path != null"
                    height="350"
                    :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`"
                  ></v-img>
                  <v-img v-else height="350" :src="require('../assets/placeholderh.jpg')"></v-img>

                  <v-card>
                    <p class="headline ml-4">{{actor.name}}</p>
                  </v-card>
                  <v-card>
                    <p class="headline ml-4">{{actor.character}}</p>
                  </v-card>
                </v-card>
              </v-layout>
              <router-link :to="'/cast/' + Number(movieDetails.id)">
                <v-card height="40px">
                  <p class="link">
                    <u>Pulsa para ver el reparto completo</u>
                  </p>
                </v-card>
              </router-link>
            </v-card>
          </v-layout>
          <v-layout justify-center column v-if="idTrailer != ''">
            <v-card class="section" dark color="blue">
              <h1 class="font">Trailer</h1>
              <iframe
                width="100%"
                height="300"
                :src="`https://www.youtube.com/embed/${idTrailer}`"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-card>
          </v-layout>
          <v-flex xs12>
            <v-card dark color="blue">
              <h1 class="section">Chat</h1>
              <v-layout v-if="user == null">
                <v-flex xs6>
                  <v-btn color="black" @click="login()">Debes iniciar sesión para ver el chat</v-btn>
                </v-flex>
              </v-layout>
              <v-layout justify-center v-if="user != null">
                <v-flex xs6>
                  <v-btn
                    color="black"
                    @click="getMessages"
                  >{{ hidden ? 'Lee las críticas' : 'Oculta las críticas' }}</v-btn>
                </v-flex>
              </v-layout>
              <v-layout column v-show="!hidden" v-if=" user">
                <v-flex id="mensajes"></v-flex>
                <v-textarea
                  @keydown="tecla"
                  color="black"
                  ref="form"
                  :clearable="true"
                  :auto-grow="true"
                  id="text"
                  outline
                  name="input-7-4"
                  label="Escribe tu crítica aquí"
                  placeholder="Escribe tu crítica aquí"
                ></v-textarea>
                <v-layout justify-center>
                  <v-flex xs6>
                    <v-btn color="black" @click="sendMessage" id="boton">Escribe tu crítica</v-btn>
                  </v-flex>
                </v-layout>
              </v-layout>
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
import firebase from "firebase";

export default {
  data() {
    return {
      hidden: true,
      url: "https://api.themoviedb.org/3/movie/",
      url2: "?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      url3: "/videos?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      url4: "/credits?api_key=18661481496a15370caf925d682d33b0",
      movieDetails: [],
      show: true,
      idTrailer: "",
      cast: [],
      cutedCast: []
    };
  },
  props: ["id"],
  methods: {
    getDetails() {
      fetch(this.url + this.id + this.url2)
        .then(json => json.json())
        .then(data => (this.movieDetails = data));
    },
    getTrailer() {
      fetch(this.url + this.id + this.url3)
        .then(json => json.json())
        .then(data => (this.idTrailer = data.results[0].key));
    },
    getCast() {
      fetch(this.url + this.id + this.url4)
        .then(json => json.json())
        .then(data => (this.cast = data.cast));
    },

    sendMessage() {
      let name = firebase.auth().currentUser.displayName;
      let texto = document.getElementById("text").value;

      let messageToSend = {
        nombre: name,
        mensaje: texto
      };
      if (texto.trim().length > 0) {
        firebase
          .database()
          .ref(this.movieDetails.title)
          .push(messageToSend);
        this.$refs.form.reset();
      } else {
        alert("No puede enviar una crítica vacía");
      }
    },
    getMessages() {
      firebase
        .database()
        .ref(this.movieDetails.title)
        .on("value", data => {
          document.getElementById("mensajes").innerHTML = "";

          for (let key in data.val()) {
            let element = data.val()[key];
            let p = document.createElement("p");
            p.setAttribute("class", "mensaje");
            p.append(element.nombre + ": " + element.mensaje);
            document.getElementById("mensajes").append(p);
          }
          document.getElementById(
            "mensajes"
          ).scrollTop = document.getElementById("mensajes").scrollHeight;
        });
      this.hidden = !this.hidden;
    },
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },

    tecla(event) {
      // PARA VER QUE TECLA ESTA PRESIONADO
      // alert(event.keyCode);

      //VALIDO LA TECLA PRESIONADA
      if (event.keyCode == 13) {
        //13 = ENTER
        this.sendMessage(); //AQUI PUEDES PONER EL ENVIO DEL FORMULARIO : document.formulario.submit;
      }
    }
  },
  computed: {
    cutCast() {
      return this.cast.slice(0, 5);
    },
    activeFab() {
      return { color: "cyan", icon: "keyboard_arrow_down" };
    },
    user() {
      return this.$store.state.user;
    },
    rating() {
      return this.movieDetails.vote_average / 2;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.state.user = user;
      } else {
        this.$store.state.user = null;
      }
    });
    this.getDetails();
    this.getTrailer();
    this.getCast();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kaushan+Script&display=swap");

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
.loader {
  display: flex;
  justify-content: center;
}
h1.section {
  padding: 20px;
  text-align: center;
  font-family: "Kaushan Script", cursive;
}
.mensaje {
  background-color: rgba(255, 255, 255, 0.788);
  color: black;
  border: solid 3px #00008b;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
}
#mensajes {
  height: 200px;
  overflow: scroll;
  scroll-behavior: smooth;
}
.bg {
  background-image: url("../assets/fondoposter.jpg");
  background-size: cover;
}
.font {
  font-family: "Kaushan Script", cursive;
  text-align: center;
}
.reparto {
  max-width: 100vw;
  overflow: scroll;
}
.v-card.v-sheet.theme--dark {
  background-color: rgba(0, 0, 0, 0.541);
}
.link {
  font-size: 16px;
}
</style>
