<template>
  <v-app>
    <v-toolbar dark color="black" fixed height="60px">
      <v-menu offset-y transition="slide-x-transition">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="cyan">
            <v-toolbar-side-icon></v-toolbar-side-icon>
          </v-btn>
        </template>
        <v-list dark>
          <v-list-tile to="/genre">
            <v-list-tile-title>Buscar por Género</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/year">
            <v-list-tile-title>Buscar por Año</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/rating">
            <v-list-tile-title>Buscar por Valoración</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab dark color="cyan" to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn fab dark color="cyan">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  }
};
</script>


