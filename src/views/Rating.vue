<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/rating/1">
          <v-img :src="require('../assets/r1.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Pelis TOP</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/rating/2">
          <v-img :src="require('../assets/r2.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Para ver en el cine entre semana</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/rating/3">
          <v-img :src="require('../assets/r3.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Para ver en casa con palomitas</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/rating/4">
          <v-img :src="require('../assets/r4.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Para la hora de la siesta</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/rating/5">
          <v-img :src="require('../assets/r5.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Cuando él/ella está sol@ en casa</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>

<style>
.whiteFont {
  color: white;
}
.titulo {
  background-color: rgba(128, 128, 128, 0.521);
  width: 100%;
}
</style>
