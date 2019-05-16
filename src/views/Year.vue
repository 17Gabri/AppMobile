<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/genre/28">
          <v-img :src="require('../assets/70.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Década 1970-1980</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/genre/12">
          <v-img :src="require('../assets/80.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Década 1980-1990</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/genre/16">
          <v-img :src="require('../assets/90.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Década 1990-2000</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/genre/35">
          <v-img :src="require('../assets/00.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Década 2000-2010</h1>
              </div>
            </v-card-title>
          </v-img>
        </router-link>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
      <v-card>
        <router-link to="/genre/80">
          <v-img :src="require('../assets/10.jpg')" aspect-ratio="2">
            <v-card-title>
              <div class="titulo">
                <h1 class="whiteFont">Década 2010-2019</h1>
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
