<template>
  <v-container class="bgc" v-if="movies.length != 0">
    <v-layout justify-center class="search">
      <v-flex xs8>
        <v-text-field outline label="Busca tu película" type="text" v-model="searchValue">
          <template v-slot:append>
            <v-fade-transition leave-absolute></v-fade-transition>
          </template>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <h1 class="mb-4">Decada de los {{year}}'s</h1>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12>
        <v-card v-for="(movie, index) in moviesToShow" :key="index">
          <router-link :to="'/movie/' + Number(movie.id)" class="card">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{movie.title}}</div>
                    <div>
                      <p>
                        Fecha de lanzamiento:
                        <br>
                        {{movie.release_date}}
                      </p>
                    </div>
                    <div>
                      <v-layout class="mb-2">
                        <span>
                          <v-icon medium color="blue darken-2">info</v-icon>
                        </span>
                      </v-layout>
                    </div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs5>
                <v-img
                  class="poster"
                  data-sizes="auto"
                  :src="`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`"
                ></v-img>
              </v-flex>
            </v-layout>
          </router-link>
          <v-divider light></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination circle v-model="currentPage" total-visible="5" :length="numOfPages"></v-pagination>
    </div>
  </v-container>
  <v-container v-else>
    <v-flex class="loader">
      <v-img :src="require('../assets/loader.gif')"></v-img>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  props: ["year"],
  data() {
    return {
      url:
        "https://api.themoviedb.org/3/list/104324?api_key=18661481496a15370caf925d682d33b0&language=es_ES",
      movies: [],
      searchValue: "",
      perPage: 10,
      currentPage: 1
    };
  },
  methods: {
    getMovie() {
      fetch(this.url)
        .then(json => json.json())
        .then(
          data =>
            (this.movies = data.items.filter(m => {
              return this.allYears().includes(m.release_date.split("-")[0]);
            }))
        );
    },
    allYears() {
      switch (this.year) {
        case "50":
          return [
            "1950",
            "1951",
            "1952",
            "1953",
            "1954",
            "1955",
            "1956",
            "1957",
            "1958",
            "1959"
          ];
        case "60":
          return [
            "1960",
            "1961",
            "1962",
            "1963",
            "1964",
            "1965",
            "1966",
            "1967",
            "1968",
            "1969"
          ];
        case "70":
          return [
            "1970",
            "1971",
            "1972",
            "1973",
            "1974",
            "1975",
            "1976",
            "1977",
            "1978",
            "1979"
          ];
        case "80":
          return [
            "1980",
            "1981",
            "1982",
            "1983",
            "1984",
            "1985",
            "1986",
            "1987",
            "1988",
            "1989"
          ];
        case "90":
          return [
            "1990",
            "1991",
            "1992",
            "1993",
            "1994",
            "1995",
            "1996",
            "1997",
            "1998",
            "1999"
          ];
        case "2000":
          return [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009"
          ];
        case "2010":
          return [
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019"
          ];
      }
    }
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.perPage;
    },
    limit() {
      return this.offset + this.perPage;
    },
    numOfPages() {
      return Math.ceil(this.movies.length / this.perPage);
    },
    moviesToShow() {
      if (this.offset > this.movies.length) {
        this.currentPage = this.numOfPages;
      }
      return this.movies
        .filter(movie =>
          movie.title.toLowerCase().includes(this.searchValue.toLowerCase())
        )
        .slice(this.offset, this.limit);
    }
  },
  created() {
    this.getMovie();
  }
};
</script>

<style>
.container {
  padding-top: 0px;
}
.loader {
  display: flex;
  justify-content: center;
}
.bgc {
  background-color: rgba(169, 223, 238, 0.548);
}
</style>
