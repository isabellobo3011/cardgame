<template>
<div class="popup md-modal md-effect-2 mt-3 mb-3" :class="this.$store.state.cssClassCardFullState" id="modal-6">
    <div class="md-content">
        <!-- <h3 class="modal-header"></h3> -->
        <div>
            <div class="modal-content p-3 pt-5">
                <h2 class="title text-center"><span class="quote">“</span>{{ this.$store.state.currentCard.Prejudice }}<span class="quote">”</span></h2>
                <p class="text-center"><span class="quote">“</span>{{ this.$store.state.currentCard["Prejudice Elaborate"] }}<span class="quote">”</span></p>
                <button class="copyURLtoClipboard copyURLtoClipboard1" title="Copy Link">Copy Link</button>

                <div class="border p-2 mb-3 mt-3" v-if="this.$store.state.currentCard['long answer+facts']">

                    <h3 class="longAnswer">Answer</h3>
                    <p v-for="item in this.$store.state.currentCard['long answer+facts']" v-bind:key="item">{{ item }}</p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['Diagram Data']">

                    <h3 class="diagram">Diagram</h3>
                    <p>{{this.$store.state.currentCard["Diagram Description"]}}</p>

                    <div class="ct-chart ct-golden-section " style=" max-width: 50em;margin: auto !important; ">
                    </div>
                </div>

                <Quiz />
                <Video />

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['Read On 1 Text']">

                    <h3 class="readOn">Read More</h3>
                    <p>{{this.$store.state.currentCard["Read On 1 Text"]}}</p>
                    <p><a target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 1 Link']">Read on</a></p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['Read On 2 Text']">

                    <h3 class="readOn">Read More</h3>
                    <p>{{this.$store.state.currentCard["Read On 2 Text"]}}</p>
                    <p><a target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 2 Link']">Read on</a></p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['Read On 3 Text']">
                    <h3 class="readOn">Read More</h3>
                    <p>{{this.$store.state.currentCard["Read On 3 Text"]}}</p>
                    <p><a target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 3 Link']">Read on</a></p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['wiki - Myths']">
                    <h3 class="WikiMyths">Wiki Myths</h3>
                    <p>This bitcoin misconception cleared up by the bitcoin wiki community: <a target="_blank" rel="noopener" :href="this.$store.state.currentCard['wiki - Myths']">Read</a></p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['Eric Voskuil']">
                    <h3 class="EricVoskuil">Eric Voskuil</h3>
                    <p>{{ this.$store.state.currentCard['Eric Voskuil'] }}</p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['Counter-questions']">

                    <h3 class="counterQuestion">Counter-questions</h3>
                    <p>{{this.$store.state.currentCard["Counter-questions"]}}</p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['analogy']">

                    <h3 class="">Analogy</h3>
                    <p>{{this.$store.state.currentCard["analogy"]}}</p>
                </div>

                <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['FlowerPower']">

                    <h3 class="flowerPower">Flower Power</h3>
                    <p>{{this.$store.state.currentCard["FlowerPower"]}}</p>
                </div>

                <!-- <div class="border p-2 mb-3" v-if="this.$store.state.currentCard['Related']">
                    <h3 class="related">Related</h3>
                    <p>
                        <span v-for="item in this.$store.state.currentCard['Related']" v-bind:key="item" @click="$store.commit('showCardIntroFromURL', item)">
                            <router-link :to="'/card/' + item">{{ item }}</router-link>
                        </span>
                    </p>
                </div> -->
                <RelatedCards />

                <div class="border p-2 mb-3">
                    <p><a target="_blank" rel="noopener" href="https://web.telegram.org/#/im?p=@bcbird">Comment in our Telegram group</a></p>
                </div>

                <SocialMedia />
                <Person3 />
                <button class="md-close mt-5" @click="$store.commit('hideModal')">Close</button>
                <button class="copyURLtoClipboard copyURLtoClipboard2">Copy Link</button>
                <!-- <div class=" p-2 mb-3" style="background: none;"> -->

                <!-- </div> -->

            </div>

        </div>

    </div>
    <a @click="$store.commit('hideModal')" class="md-close md-close-cross">×</a>
</div>
</template>

<script>
import Quiz from "@/components/Quiz.vue";
import Video from "@/components/Video.vue";
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
import Person3 from "@/components/AnimatedCharacters/Person3.vue";

export default {
    name: "CardFull",
    components: {
        Quiz,
        Video,
        SocialMedia,
        RelatedCards,
        Person3
    },
    data: function () {
        return {
            title: this.$store.state.currentTitle
        }
    },
    computed: {
        getPrejudice: function () {
            return this.$store.state.currentCard.Prejudice;
        }
    },
    watch: {
        getPrejudice(newValue, oldValue) {
            setTimeout(() => {
                if (this.$store.state.currentCard['Diagram Data']) {
                    this.createBarGraph();
                }
            }, 1000);

        }
    },

    mounted() {
        this.showPurringCat();

    },
    props: {
        msg: String
    },
    methods: {
        createBarGraph() {
            var options = {
                seriesBarDistance: 1,
                // divisor: 40,
                // stackBars: true,
                axisX: {
                    offset: 40
                },
                axisY: {
                    offset: 40,
                    onlyInteger: true,
                    // ticks: [1, 10, 20, 30],
                    // position: 'end',
                    labelInterpolationFnc: function (value) {
                        return value;
                    },
                    scaleMinSpace: 15
                }
            };
            var currentCardDiagram = this.$store.state.currentCard['Diagram Data'];
            var data = {};
            var labels = currentCardDiagram.split('|')[0];
            var series = currentCardDiagram.split('|')[1];
            labels = labels.split(',');
            series = series.split(',');
            data.labels = labels;
            data.series = [];
            data.series[0] = series;
            var diagram = new Chartist.Bar('.ct-chart', data, options);
            
            // https://stackoverflow.com/a/48299759
            diagram.on('draw', function (data) {
                if (data.type == 'bar') {
                    data.element.animate({
                        y2: {
                            dur: '2s',
                            from: data.y1,
                            to: data.y2
                        }
                    });
                }
            });
        },
        showPurringCat() {
            // var inViewport = false;
            var isStarted = false;
            /*!
             * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
             * Determine if an element is in the viewport
             * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
             * @param  {Node}    elem The element
             * @return {Boolean}      Returns true if element is in the viewport
             */
            var isInViewport = function (elem) {
                var distance = elem.getBoundingClientRect();
                return (
                    distance.top >= 0 &&
                    distance.left >= 0 &&
                    distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    distance.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            };

            function check(event) {
                if (isInViewport(object)) {
                    if (!isStarted) {
                        if (localStorage.getItem("soundOn") === "true") pur.play();
                        document.querySelector("body").classList.add("person3");
                        setTimeout(function () {
                            pur.stop();
                            document.querySelector("body").classList.remove("person3");
                            isStarted = false;
                        }, 7000);
                        isStarted = true;
                    }
                }
            }

            var object = document.querySelector('.md-close');
            // window.addEventListener('scroll', _.throttle(check, 1000), false);

            // var interval = setInterval(check, 1000);
        }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
/*! https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/ */

// MODAL
/* General styles for the modal */
// .modal-content {
//     position: absolute;
// }
// div.popup.md-modal>div.md-content>div>.modal-content>div {
//     width: 100%;
//     border: 3px solid green;

// }

// /* Small devices (landscape phones, 576px and up) */
// @media (min-width: 576px) {

//     div.popup.md-modal>div.md-content>div>.modal-content>div {
//         width: 33%;
//         // position: static;
//         float: left !important;
//         // display: block;
//     }
// }

// .modal-header {
//     border-bottom: none;
// }

.modal-content {
    background: $cardFullBackground;
}

.modal-content>div {
    color: $cardFullBlockText;
    background: $cardFullBlockBackground;
}

.modal-content>div a {
    color: $cardFullBlockLink;
    background: $cardFullBlockBackground;
}

.modal-content h3 {
    background-repeat: no-repeat;
    background-size: 1.2em;
    // padding: 0.4em;
    padding-left: 2em;
    // padding-bottom: 1em;
    // margin-top: 1em;
}

// .modal-content h3.title {
//     // background-image: url(../assets/img/logo/blockchainbird-logo.png);
//     padding: 0.4em;
//     padding-left: 0;
//     padding-bottom: 0;
// }

.modal-content h3.longAnswer {
    background-image: url(../assets/img/animated-gif/mens38.gif);
}

.modal-content h3.quiz {
    background-image: url(../assets/img/icons/flat/quiz.svg);
    text-align: left;
}

.modal-content h3.video {
    background-image: url(../assets/img/icons/flat/film.svg);
    text-align: left;
}

.modal-content h3.flowerPower {
    background-image: url(../assets/img/animated-gif/pink_panther_e0.gif);
}

.modal-content h3.readOn {
    background-image: url(../assets/img/animated-gif/guestbk2.gif);
}

.modal-content h3.counterQuestion {
    background-image: url(../assets/img/animated-gif/insects15.gif);
}

.modal-content h3.related {
    background-image: url(../assets/img/logo/blockchainbird-logo.png);
}

.modal-content h3.libbitcoin {
    background-image: url(../assets/img/logo/libbitcoin.png);
}

.modal-content a.modalbox-iconbackground {
    text-decoration: underline;
}

.md-modal * {
    text-align: left;
}

// /* Content styles */
.md-content {
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);

}

// .md-content div {
//     background: transparent;
//     border: none;
// }

// .md-content>div {
//     padding: 15px 40px 30px;
//     margin: 0;
// }

// .md-content>div p {
//     margin: 0;
//     padding: 10px 0;
// }

// .md-content>div ul {
//     margin: 0;
//     padding: 0 0 30px 20px;
// }

// .md-content>div ul li {
//     padding: 5px 0;
// }

.md-content button {
    display: block;
    margin: 0 auto;
    font-size: 1em;
}

// ESSENTIAL

/* 
Styles for the html/body for special modal where we want 3d effects
Note that we need a container wrapping all content on the page for the 
perspective effects (not including the modals and the overlay).
*/
.md-perspective,
.md-perspective body {
    height: 100%;
    overflow: hidden;
}

.md-perspective body {
    // background: #222;
    // -webkit-perspective: 600px;
    // -moz-perspective: 600px;
    perspective: 600px;
}

.md-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    width: 95%;
    // max-width: 630px;
    max-width: 50em;
    // min-width: 320px;
    // height: auto;
    height: 100%;
    // z-index: 2000;
    z-index: 4;
    visibility: hidden;

    // -webkit-backface-visibility: hidden;
    // -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    // -webkit-transform: translateX(-50%) translateY(-50%);
    // -moz-transform: translateX(-50%) translateY(-50%);
    // -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}

.md-show {
    visibility: visible;
}

.md-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0;
    // -webkit-transition: all 0.3s;
    // -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show~.md-overlay {
    opacity: 1;
    visibility: visible;
}

.md-content {
    height: 100%;
    overflow: scroll;
}

@media screen and (max-width: 46.0625em) {}

@media screen and (max-width: 25em) {}

.md-show.md-effect-16~.container {
    -ms-filter: blur(3px);
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -o-filter: blur(3px);
    filter: url(#blur3px)
}

@media screen and (max-width: 32em) {}

@media screen and (max-width: 800px) {}

@media screen and (max-width: 460px) {}

/* Individual modal styles with animations/transitions */

/* Effect 1: Fade in and scale up */
.md-effect-1 .md-content {
    -webkit-transform: scale(0.7);
    -moz-transform: scale(0.7);
    -ms-transform: scale(0.7);
    transform: scale(0.7);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show.md-effect-1 .md-content {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}

/* Effect 2: Slide from the right */
.md-effect-2 .md-content {
    -webkit-transform: translateX(20%);
    -moz-transform: translateX(20%);
    -ms-transform: translateX(20%);
    transform: translateX(20%);
    opacity: 0;
    // -webkit-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    // -moz-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}

.md-show.md-effect-2 .md-content {
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
}

/* Effect 3: Slide from the bottom */
.md-effect-3 .md-content {
    -webkit-transform: translateY(20%);
    -moz-transform: translateY(20%);
    -ms-transform: translateY(20%);
    transform: translateY(20%);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show.md-effect-3 .md-content {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
}

/* Effect 4: Newspaper */
.md-effect-4 .md-content {
    -webkit-transform: scale(0) rotate(720deg);
    -moz-transform: scale(0) rotate(720deg);
    -ms-transform: scale(0) rotate(720deg);
    transform: scale(0) rotate(720deg);
    opacity: 0;
}

.md-show.md-effect-4~.md-overlay,
.md-effect-4 .md-content {
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
}

.md-show.md-effect-4 .md-content {
    -webkit-transform: scale(1) rotate(0deg);
    -moz-transform: scale(1) rotate(0deg);
    -ms-transform: scale(1) rotate(0deg);
    transform: scale(1) rotate(0deg);
    opacity: 1;
}

/* Effect 5: fall */
.md-effect-5.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-5 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(600px) rotateX(20deg);
    -moz-transform: translateZ(600px) rotateX(20deg);
    -ms-transform: translateZ(600px) rotateX(20deg);
    transform: translateZ(600px) rotateX(20deg);
    opacity: 0;
}

.md-show.md-effect-5 .md-content {
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
    -webkit-transform: translateZ(0px) rotateX(0deg);
    -moz-transform: translateZ(0px) rotateX(0deg);
    -ms-transform: translateZ(0px) rotateX(0deg);
    transform: translateZ(0px) rotateX(0deg);
    opacity: 1;
}

/* Effect 6: side fall */
.md-effect-6.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-6 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translate(30%) translateZ(600px) rotate(10deg);
    -moz-transform: translate(30%) translateZ(600px) rotate(10deg);
    -ms-transform: translate(30%) translateZ(600px) rotate(10deg);
    transform: translate(30%) translateZ(600px) rotate(10deg);
    opacity: 0;
}

.md-show.md-effect-6 .md-content {
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
    -webkit-transform: translate(0%) translateZ(0) rotate(0deg);
    -moz-transform: translate(0%) translateZ(0) rotate(0deg);
    -ms-transform: translate(0%) translateZ(0) rotate(0deg);
    transform: translate(0%) translateZ(0) rotate(0deg);
    opacity: 1;
}

/* Effect 7:  slide and stick to top */
.md-effect-7 {
    top: 0;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}

.md-effect-7 .md-content {
    -webkit-transform: translateY(-200%);
    -moz-transform: translateY(-200%);
    -ms-transform: translateY(-200%);
    transform: translateY(-200%);
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    transition: all .3s;
    opacity: 0;
}

.md-show.md-effect-7 .md-content {
    -webkit-transform: translateY(0%);
    -moz-transform: translateY(0%);
    -ms-transform: translateY(0%);
    transform: translateY(0%);
    border-radius: 0 0 3px 3px;
    opacity: 1;
}

/* Effect 8: 3D flip horizontal */
.md-effect-8.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-8 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: rotateY(-70deg);
    -moz-transform: rotateY(-70deg);
    -ms-transform: rotateY(-70deg);
    transform: rotateY(-70deg);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    opacity: 0;
}

.md-show.md-effect-8 .md-content {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
    opacity: 1;
}

/* Effect 9: 3D flip vertical */
.md-effect-9.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-9 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: rotateX(-70deg);
    -moz-transform: rotateX(-70deg);
    -ms-transform: rotateX(-70deg);
    transform: rotateX(-70deg);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    opacity: 0;
}

.md-show.md-effect-9 .md-content {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    transform: rotateX(0deg);
    opacity: 1;
}

/* Effect 10: 3D sign */
.md-effect-10.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-10 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: rotateX(-60deg);
    -moz-transform: rotateX(-60deg);
    -ms-transform: rotateX(-60deg);
    transform: rotateX(-60deg);
    -webkit-transform-origin: 50% 0;
    -moz-transform-origin: 50% 0;
    transform-origin: 50% 0;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show.md-effect-10 .md-content {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    transform: rotateX(0deg);
    opacity: 1;
}

/* Effect 11: Super scaled */
.md-effect-11 .md-content {
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show.md-effect-11 .md-content {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}

/* Effect 12:  Just me */
.md-effect-12 .md-content {
    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show.md-effect-12~.md-overlay {
    background: #e74c3c;
}

.md-effect-12 .md-content h3,
.md-effect-12 .md-content {
    background: transparent;
}

.md-show.md-effect-12 .md-content {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}

/* Effect 13: 3D slit */
.md-effect-13.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-13 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(-3000px) rotateY(90deg);
    -moz-transform: translateZ(-3000px) rotateY(90deg);
    -ms-transform: translateZ(-3000px) rotateY(90deg);
    transform: translateZ(-3000px) rotateY(90deg);
    opacity: 0;
}

.md-show.md-effect-13 .md-content {
    -webkit-animation: slit .7s forwards ease-out;
    -moz-animation: slit .7s forwards ease-out;
    animation: slit .7s forwards ease-out;
}

@-webkit-keyframes slit {
    50% {
        -webkit-transform: translateZ(-250px) rotateY(89deg);
        opacity: .5;
        -webkit-animation-timing-function: ease-out;
    }

    100% {
        -webkit-transform: translateZ(0) rotateY(0deg);
        opacity: 1;
    }
}

@-moz-keyframes slit {
    50% {
        -moz-transform: translateZ(-250px) rotateY(89deg);
        opacity: .5;
        -moz-animation-timing-function: ease-out;
    }

    100% {
        -moz-transform: translateZ(0) rotateY(0deg);
        opacity: 1;
    }
}

@keyframes slit {
    50% {
        transform: translateZ(-250px) rotateY(89deg);
        opacity: 1;
        animation-timing-function: ease-in;
    }

    100% {
        transform: translateZ(0) rotateY(0deg);
        opacity: 1;
    }
}

/* Effect 14:  3D Rotate from bottom */
.md-effect-14.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-14 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateY(100%) rotateX(90deg);
    -moz-transform: translateY(100%) rotateX(90deg);
    -ms-transform: translateY(100%) rotateX(90deg);
    transform: translateY(100%) rotateX(90deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    transform-origin: 0 100%;
    opacity: 0;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}

.md-show.md-effect-14 .md-content {
    -webkit-transform: translateY(0%) rotateX(0deg);
    -moz-transform: translateY(0%) rotateX(0deg);
    -ms-transform: translateY(0%) rotateX(0deg);
    transform: translateY(0%) rotateX(0deg);
    opacity: 1;
}

/* Effect 15:  3D Rotate in from left */
.md-effect-15.md-modal {
    -webkit-perspective: 1300px;
    -moz-perspective: 1300px;
    perspective: 1300px;
}

.md-effect-15 .md-content {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(100px) translateX(-30%) rotateY(90deg);
    -moz-transform: translateZ(100px) translateX(-30%) rotateY(90deg);
    -ms-transform: translateZ(100px) translateX(-30%) rotateY(90deg);
    transform: translateZ(100px) translateX(-30%) rotateY(90deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    transform-origin: 0 100%;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show.md-effect-15 .md-content {
    -webkit-transform: translateZ(0px) translateX(0%) rotateY(0deg);
    -moz-transform: translateZ(0px) translateX(0%) rotateY(0deg);
    -ms-transform: translateZ(0px) translateX(0%) rotateY(0deg);
    transform: translateZ(0px) translateX(0%) rotateY(0deg);
    opacity: 1;
}

/* Effect 16:  Blur */
.md-show.md-effect-16~.md-overlay {
    background: rgba(180, 46, 32, 0.5);
}

.md-show.md-effect-16~.container {
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    filter: blur(3px);
}

.md-effect-16 .md-content {
    -webkit-transform: translateY(-5%);
    -moz-transform: translateY(-5%);
    -ms-transform: translateY(-5%);
    transform: translateY(-5%);
    opacity: 0;
}

.md-show.md-effect-16~.container,
.md-effect-16 .md-content {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.md-show.md-effect-16 .md-content {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
}

/* Effect 17:  Slide in from bottom with perspective on container */
.md-show.md-effect-17~.container {
    height: 100%;
    overflow: hidden;
    -webkit-transition: -webkit-transform 0.3s;
    -moz-transition: -moz-transform 0.3s;
    transition: transform 0.3s;
}

.md-show.md-effect-17~.container,
.md-show.md-effect-17~.md-overlay {
    -webkit-transform: rotateX(-2deg);
    -moz-transform: rotateX(-2deg);
    -ms-transform: rotateX(-2deg);
    transform: rotateX(-2deg);
    -webkit-transform-origin: 50% 0%;
    -moz-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.md-effect-17 .md-content {
    opacity: 0;
    -webkit-transform: translateY(200%);
    -moz-transform: translateY(200%);
    -ms-transform: translateY(200%);
    transform: translateY(200%);
}

.md-show.md-effect-17 .md-content {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
    -webkit-transition: all 0.3s 0.2s;
    -moz-transition: all 0.3s 0.2s;
    transition: all 0.3s 0.2s;
}

/* Effect 18:  Slide from right with perspective on container */
.md-show.md-effect-18~.container {
    height: 100%;
    overflow: hidden;
}

.md-show.md-effect-18~.md-overlay {
    background: rgba(143, 27, 15, 0.8);
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
}

.md-show.md-effect-18~.container,
.md-show.md-effect-18~.md-overlay {
    -webkit-transform-style: preserve-3d;
    -webkit-transform-origin: 0% 50%;
    -webkit-animation: rotateRightSideFirst 0.5s forwards ease-in;
    -moz-transform-style: preserve-3d;
    -moz-transform-origin: 0% 50%;
    -moz-animation: rotateRightSideFirst 0.5s forwards ease-in;
    transform-style: preserve-3d;
    transform-origin: 0% 50%;
    animation: rotateRightSideFirst 0.5s forwards ease-in;
}

@-webkit-keyframes rotateRightSideFirst {
    50% {
        -webkit-transform: translateZ(-50px) rotateY(5deg);
        -webkit-animation-timing-function: ease-out;
    }

    100% {
        -webkit-transform: translateZ(-200px);
    }
}

@-moz-keyframes rotateRightSideFirst {
    50% {
        -moz-transform: translateZ(-50px) rotateY(5deg);
        -moz-animation-timing-function: ease-out;
    }

    100% {
        -moz-transform: translateZ(-200px);
    }
}

@keyframes rotateRightSideFirst {
    50% {
        transform: translateZ(-50px) rotateY(5deg);
        animation-timing-function: ease-out;
    }

    100% {
        transform: translateZ(-200px);
    }
}

.md-effect-18 .md-content {
    -webkit-transform: translateX(200%);
    -moz-transform: translateX(200%);
    -ms-transform: translateX(200%);
    transform: translateX(200%);
    opacity: 0;
}

.md-show.md-effect-18 .md-content {
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -webkit-transition: all 0.5s 0.1s;
    -moz-transition: all 0.5s 0.1s;
    transition: all 0.5s 0.1s;
}

/* Effect 19:  Slip in from the top with perspective on container */
.md-show.md-effect-19~.container {
    height: 100%;
    overflow: hidden;
}

.md-show.md-effect-19~.md-overlay {
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
}

.md-show.md-effect-19~.container,
.md-show.md-effect-19~.md-overlay {
    -webkit-transform-style: preserve-3d;
    -webkit-transform-origin: 50% 100%;
    -webkit-animation: OpenTop 0.5s forwards ease-in;
    -moz-transform-style: preserve-3d;
    -moz-transform-origin: 50% 100%;
    -moz-animation: OpenTop 0.5s forwards ease-in;
    transform-style: preserve-3d;
    transform-origin: 50% 100%;
    animation: OpenTop 0.5s forwards ease-in;
}

@-webkit-keyframes OpenTop {
    50% {
        -webkit-transform: rotateX(10deg);
        -webkit-animation-timing-function: ease-out;
    }
}

@-moz-keyframes OpenTop {
    50% {
        -moz-transform: rotateX(10deg);
        -moz-animation-timing-function: ease-out;
    }
}

@keyframes OpenTop {
    50% {
        transform: rotateX(10deg);
        animation-timing-function: ease-out;
    }
}

.md-effect-19 .md-content {
    -webkit-transform: translateY(-200%);
    -moz-transform: translateY(-200%);
    -ms-transform: translateY(-200%);
    transform: translateY(-200%);
    opacity: 0;
}

.md-show.md-effect-19 .md-content {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
    -webkit-transition: all 0.5s 0.1s;
    -moz-transition: all 0.5s 0.1s;
    transition: all 0.5s 0.1s;
}

// Chartist diagrams
.ct-label {
    color: #111;
}

.ct-series-a .ct-bar {
    /* Colour of your bars */
    // stroke: rgb(25, 0, 255);
    /* The width of your bars */
    //   stroke-width: 20px;
    stroke-width: 6%;
    /* Yes! Dashed bars! */
    // stroke-dasharray: 20px;
    /* Maybe you like round corners on your bars? */
    //   stroke-linecap: round;
}

</style>
