import Vue from "vue";
import publicPath from "../vue.config";
// import axios from "axios";
import App from "./App.vue";
import router from "./router/router";
// import VueAnalytics from "vue-analytics";
import VueGtag from "vue-gtag";
import store from "./store/store";
import * as d3 from 'd3-dsv';
import './assets/js/TweenMax.min';
import {Howl, Howler} from 'howler';
import _ from "lodash";
// import './assets/js/menu_sideslide';
// import bootstrap from 'bootstrap';

//https://github.com/rakk7/vue-bootstrap-toasts
import VueBootstrapToasts from "vue-bootstrap-toasts";

Vue.use(d3);
Vue.config.productionTip = false;
Vue.use(VueBootstrapToasts);
Vue.use(Howl, Howler);

// Vue.use(VueAnalytics, {
//   id: "+ process.env.VUE_APP_GOOGLE_ANALYTICS_ID +",
//   router
// });

// Vue.use(VueGtag, {
//   config: { id: "+ process.env.VUE_APP_GOOGLE_ANALYTICS_ID +" }
// }, router);

Vue.use(VueGtag, {
  config: { id: "+ process.env.VUE_APP_GOOGLE_ANALYTICS_ID +" },
  // pageTrackerScreenviewEnabled: true,
  // appName: "Card game",
  pageTrackerTemplate(to) {
    return {
      page_title: window.location.pathname
      // page_path: to.path
    }
  }
}, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


// redirects
if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Architecture&q=preview-7-transactions-per-second&title=Bitcoin%20has%20only%20seven%20transactions%20per%20second") {window.location.replace("https://blockchainbird.com/t/btc/card/7-transactions-per-second");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Beliefs&q=preview-convince-me&title=You%20cannot%20convince%20me%20of%20the%20usefulness%20of%20bitcoin") {window.location.replace("https://blockchainbird.com/t/btc/card/convince-me");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Beliefs&q=preview-too-late&title=I%E2%80%98ve%20already%20missed%20out%20on%20bitcoin") {window.location.replace("https://blockchainbird.com/t/btc/card/too-late");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Control&q=preview-chinese-government&title=Bitcoin%20is%20controlled%20by%20the%20Chinese%20government") {window.location.replace("https://blockchainbird.com/t/btc/card/chinese-government");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Control&q=preview-few-deciders&title=Only%20a%20few%20people%20have%20ultimate%20control%20over%20Bitcoin") {window.location.replace("https://blockchainbird.com/t/btc/card/few-deciders");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Control&q=preview-quantum-computing&title=Quantum%20computers%20will%20breach%20the%20security%20of%20crypto-currencies") {window.location.replace("https://blockchainbird.com/t/btc/card/quantum-computing");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Crime&q=preview-anonymous&title=Bitcoin%20is%20anonymous") {window.location.replace("https://blockchainbird.com/t/btc/card/anonymous");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Crime&q=preview-anonymous&title=Bitcoin%20is%20anonymous%2C%20criminals%20go%20unpunished") {window.location.replace("https://blockchainbird.com/t/btc/card/anonymous");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Crime&q=preview-anonymous&title=Bitcoin%20is%20anonymous,%20criminals%20go%20unpunished") {window.location.replace("https://blockchainbird.com/t/btc/card/anonymous");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Crime&q=preview-criminals&title=Bitcoin%20is%20mostly%20for%20criminals") {window.location.replace("https://blockchainbird.com/t/btc/card/criminals");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Crime&q=preview-money-laundering&title=Bitcoin%20is%20one%20big%20money%20laundering%20machine") {window.location.replace("https://blockchainbird.com/t/btc/card/money-laundering");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Crime&q=preview-tax-evaders&title=Bitcoin%20is%20for%20tax%20evaders") {window.location.replace("https://blockchainbird.com/t/btc/card/tax-evaders");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Environment&q=preview-complex-useless-calcs&title=Complex%2C%20useless%20calculations%20soak%20up%20energy") {window.location.replace("https://blockchainbird.com/t/btc/card/complex-useless-calcs");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Environment&q=preview-energy-for-elsewhere&title=Sustainable%20energy%20should%20be%20used%20elsewhere") {window.location.replace("https://blockchainbird.com/t/btc/card/energy-for-elsewhere");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Environment&q=preview-transaction-electricity&title=Per%20transaction%2C%20bitcoin%20costs%20XX%20MegaWatts%2C%20YY%20euros") {window.location.replace("https://blockchainbird.com/t/btc/card/transaction-electricity");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Environment&q=preview-unsustainable&title=Bitcoin%20is%20unsustainable%20and%20killing%20the%20earth") {window.location.replace("https://blockchainbird.com/t/btc/card/unsustainable");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Existential&q=preview-intrinsic-value&title=Bitcoin%20has%20no%20intrinsic%20value") {window.location.replace("https://blockchainbird.com/t/btc/card/intrinsic-value");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Existential&q=preview-not-first-crypto&title=Bitcoin%20was%20not%20the%20first%20cryptocurrency") {window.location.replace("https://blockchainbird.com/t/btc/card/not-first-crypto");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Existential&q=preview-ponzi&title=Bitcoin%20is%20a%20Ponzi%20scheme,%20a%20new%20tulip%20mania") {window.location.replace("https://blockchainbird.com/t/btc/card/ponzi");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Existential&q=preview-ponzi&title=Bitcoin%20is%20a%20Ponzi%20scheme%2C%20a%20new%20tulip%20mania") {window.location.replace("https://blockchainbird.com/t/btc/card/ponzi");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Existential&q=preview-will-die&title=Bitcoin%20will%20die") {window.location.replace("https://blockchainbird.com/t/btc/card/will-die");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Legal&q=preview-legal-tender&title=Bitcoin%20is%20not%20legal%20tender") {window.location.replace("https://blockchainbird.com/t/btc/card/legal-tender");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Legal&q=preview-shut-down&title=Governments%20will%20shut%20bitcoin%20down") {window.location.replace("https://blockchainbird.com/t/btc/card/shut-down");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Price&q=preview-cant-buy-1&title=I%20can") {window.location.replace("https://blockchainbird.com/t/btc/card/cant-buy-anything");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Price&q=preview-price-criminals&title=A%20high%20bitcoin%20price%20is%20due%20to%20criminals%E2%80%98%20involvement") {window.location.replace("https://blockchainbird.com/t/btc/card/price-criminals");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Price&q=preview-price-criminals&title=High%20bitcoin%20price%20is%20due%20to%20criminals") {window.location.replace("https://blockchainbird.com/t/btc/card/price-criminals");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Price&q=preview-price-down&title=The%20bitcoin%20price%20went%20down%20lately") {window.location.replace("https://blockchainbird.com/t/btc/card/price-down");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Skills&q=preview-its-over-after-21&title=After%20the%2021%20milion%20bitcoin%20are%20mined%2C%20it%E2%80%98s%20over") {window.location.replace("https://blockchainbird.com/t/btc/card/its-over-after-21");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Supply&q=preview-inflation&title=Bitcoin%20has%20strong%20inflation") {window.location.replace("https://blockchainbird.com/t/btc/card/inflation");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Supply&q=preview-volatile&title=Bitcoin%20is%20volatile") {window.location.replace("https://blockchainbird.com/t/btc/card/volatile");}
else if (window.location.href === "https://blockchainbird.com/t/btc/?cat=Use&q=preview-slow&title=Bitcoin%20is%20slow") {window.location.replace("https://blockchainbird.com/t/btc/card/slow");}
else if (window.location.href === "https://www.blockchainbird.com/t/btc/?cat=Beliefs&q=preview-too-late&title=I%E2%80%98ve%20already%20missed%20out%20on%20bitcoin") {window.location.replace("https://blockchainbird.com/t/btc/card/too-late");}
else if (window.location.href === "https://www.blockchainbird.com/t/btc/?cat=Environment&q=preview-proof-of-stake&title=Proof-of-stake%20coins%20are%20far%20more%20sustainable%20than%20mining%20bitcoin") {window.location.replace("https://blockchainbird.com/t/btc/card/proof-of-stake");}



// find out what version of the cardgame is active. Based on URL.
var cardGameName = "";
var cardImage = "";
export {cardGameName};
export {cardImage};

// if "/btc/" in URL or "localhost" in URL then it's BTC, if not then BCB
if ((window.location.href.indexOf("\/btc\/") > -1) || (window.location.href.indexOf("localhost") > -1)) {
  document.querySelector("body").classList.add("btc");
  cardGameName = "Bitcoin";
  cardImage = "bitcoin.svg";
  store.commit("setGameName", cardGameName);
  store.commit("setCardImage", cardImage);
} else {
  document.querySelector("body").classList.add("bcb");
  cardGameName = "Blockchain";
  cardImage = "blockchain.svg";
  store.commit("setGameName", cardGameName);
  store.commit("setCardImage", cardImage);
}



// copy URL into clipboard via click on button
// Note: here it is not: "this.$store.commit" but "store.commit" (https://stackoverflow.com/q/51348936)
var clipboard1 = new ClipboardJS('.copyURLtoClipboard1', {
  text: function () {
      store.commit("showToast", "You can now paste the link on Twitter, Facebook etc.");
      if (localStorage.getItem("soundOn") === "true") go.play();
      document.querySelector("body").classList.add("person1");
      setTimeout(function(){document.querySelector("body").classList.remove("person1");}, 1500);
      // return "“" + store.state.currentCard["Prejudice"] + "”\n" + store.state.currentCard["short direct answer"] + " 👉 " + window.location.href;
      return "“" + store.state.currentCard["Prejudice"] + "”\n" + " 👉 " + window.location.href;
  }
});
var clipboard1 = new ClipboardJS('.copyURLtoClipboard2', {
  text: function () {
      store.commit("showToast", "You can now paste the link on Twitter, Facebook etc.");
      if (localStorage.getItem("soundOn") === "true") go.play();
      document.querySelector("body").classList.add("person1");
      setTimeout(function(){document.querySelector("body").classList.remove("person1");}, 1500);
      // return "“" + store.state.currentCard["Prejudice"] + "”\n" + store.state.currentCard["short direct answer"] + " 👉 " + window.location.href;
      return "“" + store.state.currentCard["Prejudice"] + "”\n" + " 👉 " + window.location.href;
  }
});
var clipboard1 = new ClipboardJS('.copyURLtoClipboard3', {
  text: function () {
      store.commit("showToast", "You can now paste the link on Twitter, Facebook etc.");
      if (localStorage.getItem("soundOn") === "true") go.play();
      document.querySelector("body").classList.add("person1");
      setTimeout(function(){document.querySelector("body").classList.remove("person1");}, 1500);
      // return "“" + store.state.currentCard["Prejudice"] + "”\n" + store.state.currentCard["short direct answer"] + " 👉 " + window.location.href;
      return "“" + store.state.currentCard["Prejudice"] + "”\n" + " 👉 " + window.location.href;
  }
});

// I keep this for reference although I am not sure what it is for
// clipboard1.on('success', textCopiedFeedback);
// clipboard2.on('success', textCopiedFeedback);
// document.querySelector(".copyURLtoClipboard3").addEventListener("click", textCopiedFeedback, false);
// clipboard3.on('success', textCopiedFeedback);
