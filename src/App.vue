<template>
  <v-app>
    <v-layout id="top">
      <v-toolbar dark color="black" fixed height="60px">
        <v-toolbar-title class="white--text">
          <img class="logo" src="./assets/logo.png" height="75" width="75">
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn fab small color="cyan" dark href="javascript:history.back()">
          <v-icon dark>arrow_back</v-icon>
        </v-btn>
        <v-btn fab small color="cyan" dark @click="login()" v-if="user == null">
          <v-icon dark>account_circle</v-icon>
        </v-btn>
        <v-speed-dial
          v-else
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" small color="cyan" dark fab>
              <v-avatar v-if="!fab">
                <img :src="user.photoURL" class="avatar" alt="Avatar">
              </v-avatar>
              <v-icon v-else>keyboard_arrow_up</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="indigo">
            <v-icon>info</v-icon>
          </v-btn>
          <v-btn fab dark small color="red" @click="logout()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-toolbar>
      <v-breadcrumbs class="bread" :items="items"></v-breadcrumbs>
      <v-btn fab bottom right fixed small color="cyan" dark href="#top">
        <v-icon dark>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-layout>
    <router-view></router-view>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  components: {},
  data() {
    return {
      direction: "bottom",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: false,
      left: false,
      transition: "slide-y-reverse-transition",
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
  },
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {});
    },

    showUser() {
      firebase.auth().onAuthStateChanged(function(user) {
        var userZone = document.getElementById("userZone");
        var wrapProducts = document.getElementById("wrapProducts");
        var userName = document.getElementById("userName");
        if (user) {
          userZone.style.visibility = "visible";
          wrapProducts.style.paddingTop = "40px";
          userName.innerHTML = user.displayName;
          window.loginORlogout(LOGOUT);
          console.log(user.displayName);
        } else {
          userZone.style.visibility = "hidden";
          wrapProducts.style.paddingTop = "10px";
          userName.innerHTML = "";
          window.loginORlogout(LOGIN);
          console.log("sin usuario");
        }
      });
    }
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    },
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
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
  }
};
</script>
<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
.container {
  padding-top: 0px;
}
img.avatar {
  height: 40px;
  width: 40px;
  position: relative;
  bottom: 4px;
}
.logo {
  margin-top: 25px;
}
.bread {
  margin-top: 60px;
}
</style>



