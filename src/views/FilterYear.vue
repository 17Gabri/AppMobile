<template>
  <v-container v-if="movies.length != 0">
    <v-layout justify-center class="search mt-5">
      <v-flex xs8>
        <v-text-field outline label="Busca tu película" type="text" v-model="searchValue">
          <template v-slot:append>
            <v-fade-transition leave-absolute></v-fade-transition>
          </template>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12>
        <v-card v-for="(movie, index) in filteredMovies" :key="index">
          <router-link :to="'/movie/' + Number(movie.id)" class="card">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{movie.title}}</div>
                    <div>
                      <p>Fecha de lanzamiento:</p>
                      <p>{{movie.release_date}}</p>
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
          <v-card-actions class="pa-3">
            Valora esta película
            <v-spacer></v-spacer>
            <div>
              <v-rating background-color="orange lighten-3" color="orange" small></v-rating>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-pagination circle v-model="page" :length="6"></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ["year"],
  data() {
    return {
      url:
        "https://api.themoviedb.org/3/list/78677?api_key=18661481496a15370caf925d682d33b0&language=es-ES",
      movies: [],
      searchValue: "",
      //   pages: Math.ceil(this.movies.length / 10),
      page: 1,
      numeroPelis: 10
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
      //   if (this.year == "70") {
      //     return [
      //       "1970",
      //       "1971",
      //       "1972",
      //       "1973",
      //       "1974",
      //       "1975",
      //       "1976",
      //       "1977",
      //       "1978",
      //       "1979"
      //     ];
      //   }
      //   if (this.year == "80") {
      //     return [
      //       "1980",
      //       "1981",
      //       "1982",
      //       "1983",
      //       "1984",
      //       "1985",
      //       "1986",
      //       "1987",
      //       "1988",
      //       "1989"
      //     ];
      //   }
      //   if (this.year == "90") {
      //     return [
      //       "1990",
      //       "1991",
      //       "1992",
      //       "1993",
      //       "1994",
      //       "1995",
      //       "1996",
      //       "1997",
      //       "1998",
      //       "1999"
      //     ];
      //   }
      //   if (this.year == "100") {
      //     return [
      //       "2000",
      //       "2001",
      //       "2002",
      //       "2003",
      //       "2004",
      //       "2005",
      //       "2006",
      //       "2007",
      //       "2008",
      //       "2009"
      //     ];
      //   }
      //   if (this.year == "110") {
      //     return [
      //       "2010",
      //       "2011",
      //       "2012",
      //       "2013",
      //       "2014",
      //       "2015",
      //       "2016",
      //       "2017",
      //       "2018",
      //       "2019"
      //     ];
      //   }

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
        case "100":
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
        case "110":
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
        default:
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
            "1979",
            "1980",
            "1981",
            "1982",
            "1983",
            "1984",
            "1985",
            "1986",
            "1987",
            "1988",
            "1989",
            "1990",
            "1991",
            "1992",
            "1993",
            "1994",
            "1995",
            "1996",
            "1997",
            "1998",
            "1999",
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
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

    // pagination() {
    //   let pagination = {};
    //   let paginas = Math.ceil(this.movies.length / this.numeroPelis);
    //   let inicio = 0;
    //   let final = 10;
    //   for (let i = 0; i < paginas; i++) {
    //     let corte = this.filteredMovies.slice(inicio, final);
    //     pagination["slider" + i] = corte;

    //     inicio = inicio + this.numeroPelis;
    //     final = final + this.numeroPelis;
    //   }
    //   return pagination;
    // }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  },
  created() {
    this.getMovie();
  }
};
</script>

<style>
</style>
