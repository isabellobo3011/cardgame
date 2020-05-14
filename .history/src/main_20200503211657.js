import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import d3Dsv from "d3-dsv";
import * as d3 from 'd3-dsv';

Vue.use(d3);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// console.log(d3);
var path = "../data-proxy.php";

var data = d3.csvParse("https://blockchainbird.com/t/cardgame-resources/data/data.csv");

// d3.csvFormatRows("https://blockchainbird.com/t/cardgame-resources/data/data.csv", function(d) {
//   console.log(d);
//   // return {
//   //   year: new Date(+d.Year, 0, 1), // lowercase and convert "Year" to Date
//   //   make: d.Make, // lowercase
//   //   model: d.Model, // lowercase
//   //   length: +d.Length // lowercase and convert "Length" to number
//   // };
// });