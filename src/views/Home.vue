<template>
<div>
    <div class="" :class="this.$store.state.cssClassCardOverviewState">
        <Cards msg="Bitcoin Card Game" />
    </div>
    <CardIntro />
    <CardFull />
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import * as d3 from "d3-dsv";
import Cards from "@/components/Cards.vue";
import CardIntro from "@/components/CardIntro.vue";
import CardFull from "@/components/CardFull.vue";
import {
    cardGameName
} from "../main";

export default {
    name: "Home",
    data() {
        return {}
    },
    components: {
        Cards,
        CardIntro,
        CardFull
    },
    watch: { //https://www.reddit.com/r/vuejs/comments/58g6u7/how_can_i_detect_the_browser_back_button_with_vue/
        '$route'(to, from) { // https://flaviocopes.com/vue-watchers/
            // if there is a card in the url -> card should be shown:
            if (to.params.card !== undefined) {
                // deal with CSS to open and close
                this.$store.commit("changeCssClassCardIntroState", "open");
                this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");
                var currentCard = this.$store.getters.getCard(to.params.card);
            }
            // if there is no card, then intro-screen should not be shown
            else {
                // TODO: this is scattered around and should be made into a function / method or something
                this.$store.commit("changeCssClassCardIntroState", "");
                this.$store.commit("changeCssClassCardOverviewState", "");
                // if you close the intro card, the full card screen should also be closed.
                // TODO: see also toggleOverlayFullscreen, rewrite
                this.$store.commit('hideModal');
            }

            if (currentCard !== undefined) {
                this.$store.commit("changeCard", currentCard);
            }
        }
    },
    mounted: function () {
        this.fetchData();
    },

    // https://stackoverflow.com/a/44347195
    methods: {
        fetchData() {
            // only fetch data
            if (this.$store.state.dataFetched === false) {
                // return axios.get("https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php")
                return axios.get(process.env.VUE_APP_CARDS_CONTENT)
                    .then(response => {
                        var responseData = d3.csvParse(response.data);
                        var responseDataTemp = [];
                        // prepare data

                        // select the stack
                        // "stack" is a column in the Google Sheet content source. It defines where a card belongs to. It works like this: if the string contains an "1", it belongs to Bitcoin, if a "2" is in the string, it belong to Blockchain. "12" means it belongs to both.
                        // TODO: move this to main.js
                        var stack = 0;
                        if (cardGameName === "Bitcoin") {
                            stack = 1;
                        } else if (cardGameName === "Blockchain") {
                            stack = 2;
                        }

                        // select only the items that are in the selected stack
                        // avoid working on a changing array by using a temp array
                        for (let i = 0; i < responseData.length; i++) {
                            if (responseData[i].Stack.indexOf(stack) > -1) {
                                responseDataTemp.push(responseData[i]);
                            }
                        }
                        // just to be sure that it's empty…:
                        responseData = [];
                        responseData.length = 0;
                        // …and fill array again:
                        responseData = responseDataTemp;
                        // and empty the temp just to be sure, probably not necessary:
                        responseDataTemp = [];
                        responseDataTemp.length = 0;
                        // now we only have items that are in the given stack

                        this.$store.state.numberofCards = responseData.length;

                        // cleaning
                        for (let i = 0; i < responseData.length; i++) {
                            for (var k in responseData[i]) {
                                if (responseData[i].hasOwnProperty(k)) {
                                    // console.log("Key is " + k + ", value is: " + dataLayer1[i][k]);
                                    // the csv source from google introduces \' so we remove the backslash:
                                    responseData[i][k] = responseData[i][k].replace(/\\'/g, "‘");
                                    //experimental:
                                    responseData[i][k] = responseData[i][k].replace(/'/g, "‘");
                                    // responseData[i][k] = responseData[i][k].replace(/(\n\n)/gm, "</p><p>");
                                    responseData[i][k] = responseData[i][k].trim();
                                    // console.log('responseData[i][k]: ', responseData[i][k]);
                                }
                            }
                        }

                        // split strings into arrays
                        for (let i = 0; i < responseData.length; i++) {
                            // format quiz data
                            responseData[i]["Quiz"] = this.prepareQuiz(responseData[i]["Quiz"]);

                            // split string on \n\n, so we can make paragraphs later, or separate links for example
                            responseData[i]["long answer+facts"] = this.splitString(responseData[i]["long answer+facts"], "\n\n");

                            responseData[i]["Related"] = this.splitString(responseData[i]["Related"], ",");

                            // trim spaces (for example when source is: word1, word2) TODO: do this for everything
                            if (responseData[i]["Related"] !== undefined) {
                                for (let k = 0; k < responseData[i]["Related"].length; k++) {
                                    responseData[i]["Related"][k] = responseData[i]["Related"][k].trim();
                                }
                            }
                        }

                        // save data to store, probably not necessary, can be done via data and props
                        this.$store.state.theJSON = responseData;
                        this.createCategoriesArray(this.$store.state.theJSON);

                        // create an overview of all cards. All items are generated if no argument is given, elsewhere we create an overview based on category chosen

                        this.$store.commit("showPickedItems");
                        this.$store.commit("showItemsInSelectedCategory");

                        this.$store.state.dataFetched = true;
                        // deal with URL. We now have an overview of all the cards. Should we show a card intro? If no card param then stop…
                        if (this.$route.params.card === undefined) {
                            return;

                            // if there is a specific url / card param, the do following:
                        } else if (this.$route.params.card !== "") {
                            this.$store.commit("showCardIntroFromURL", this.$route.params.card);
                        }

                    });

            }
        },
        prepareQuiz(quiz) {
            var temp = [];

            function splitString(string, splitter) {
                if (string !== "") {
                    // https://stackoverflow.com/a/5963202
                    return string.split(splitter);
                }
            }

            if (quiz !== "") {
                // split quiz, make array
                quiz = splitString(quiz, "|");
                //put question in first item, first string item is always question
                temp[0] = {
                    "question": quiz[0]
                }

                // put answers in second item
                temp[1] = {
                    "answers": []
                };
                for (let i = 1; i < quiz.length - 1; i++) {
                    let isQuizItemAnswerRight = false;

                    if (quiz[i].charAt(0) === "+") {
                        isQuizItemAnswerRight = true;
                        quiz[i] = quiz[i].substr(1);
                    }

                    temp[1].answers.push([quiz[i], isQuizItemAnswerRight]);
                }
                // put explanation in third item, last string item is always answer
                temp[2] = {
                    "explanation": quiz[quiz.length - 1]
                };

                quiz = [];
                quiz = temp;
                return quiz;
            }
        },
        splitString(string, splitter) {
            if (string !== "") {
                return string.split(splitter);
            }
        },
        createCategoriesArray(theJSON) {
            // temporary store category names in array
            var categoriesArray = [];

            // https://stackoverflow.com/a/14438954
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            // create array with all categories (to create a menu with all categories):
            for (var i = 0; i < theJSON.length; i++) {
                categoriesArray.push(theJSON[i].Cat);
            }

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            // var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
            // remove duplicate entries
            categoriesArray = categoriesArray.filter(onlyUnique);

            // now we have an array with categories. Now create final array in the store containing object with name, and number of items in that category:
            for (let i = 0; i < categoriesArray.length; i++) {
                var counter = 0;
                for (let j = 0; j < theJSON.length; j++) {
                    if (theJSON[j].Cat === categoriesArray[i]) {
                        //TODO: number of items in category is sometimes wrong
                        counter++;
                    }
                }

                this.$store.state.categories.push({
                    "name": categoriesArray[i],
                    "numberOfItems": counter
                });
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
// https://stackoverflow.com/a/57764811
body.ios-device {
    cursor: pointer !important;
    /* iOS click events don't fire without this! */
}

// .container {
//     overflow-x: hidden;
//     // -webkit-transition: -webkit-transform 0.5s;
//     transition: transform 0.5s;
// }

// .container.overlay-fullscreen-open {
//     -webkit-transform: translateX(50%);
//     transform: translateX(50%);
// }

// .container::after {
//     content: '';
//     opacity: 0;
//     visibility: hidden;
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.6);
//     // -webkit-transition: opacity 0.5s, visibility 0s 0.5s;
//     transition: opacity 0.5s, visibility 0s 0.5s;
// }
</style>
