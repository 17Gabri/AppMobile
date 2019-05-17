<template>
  <v-app>
    <v-layout id="top">
      <v-toolbar dark color="black" fixed height="60px">
        <v-toolbar-title class="white--text">Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn fab small color="cyan" dark href="javascript:history.back()">
          <v-icon dark>arrow_back</v-icon>
        </v-btn>
        <v-btn fab small color="cyan" dark href="javascript:history.back()">
          <v-icon dark>account_circle</v-icon>
        </v-btn>
      </v-toolbar>
      <v-breadcrumbs class="mt-5" :items="items"></v-breadcrumbs>
      <v-btn fab bottom right fixed small color="cyan" dark href="#top">
        <v-icon dark>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-layout>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      items: [
        {
          text: "Inicio",
          disabled: false,
          to: "/"
        },
        {
          text: "Género",
          disabled: false,
          to: "/genre"
        },
        {
          text: "Año",
          disabled: false,
          to: "/year"
        },
        {
          text: "Valoración",
          disabled: false,
          to: "/rating"
        }
      ]
    };
  }
};
</script>
<style>
.container {
  padding-top: 0px;
}
</style>



