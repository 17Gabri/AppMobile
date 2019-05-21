import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),

  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyC4plRXFektXJJPGqj5YJinlynKqOU2BCA",
      authDomain: "gabifilms-31d74.firebaseapp.com",
      databaseURL: "https://gabifilms-31d74.firebaseio.com",
      projectId: "gabifilms-31d74",
      storageBucket: "gabifilms-31d74.appspot.com",
      messagingSenderId: "170473940793",
      appId: "1:170473940793:web:5b07cb15ab7222c8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

}).$mount("#app");

// {
//   "rules": {
//     ".read": false,
//     ".write": false
//   }
// }