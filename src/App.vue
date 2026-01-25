<script setup>
import { ref } from 'vue'

const modes = Object.freeze({
    SETUP: 0,
    CARDDISPLAY: 1,
    SETUPSCREEN: 2
})

let colors = new Set(["black", "blue", "green", "grey", "red", "yellow"])
let handicap = 0
let halfHandicap = false
let regenOnShuffle = false
let useStandardDeck = false

const mode = ref(modes.SETUPSCREEN)

function newGame(ifStandardDeck, ifRegenOnShuffle, handicapValue, ifHalfHandicap, selectedColors) {
    colors = selectedColors
    handicap = Number(handicapValue)
    halfHandicap = ifHalfHandicap
    regenOnShuffle = ifRegenOnShuffle
    useStandardDeck = ifStandardDeck
    mode.value = modes.CARDDISPLAY
}
function newSetup() {
    mode.value = modes.SETUPSCREEN
}

</script>

<template>
  <h1>GroundEffect</h1>
  <h3>Legends deck replacement</h3>
  <carddisplay v-if="mode == modes.CARDDISPLAY" :colors="colors" :handicap="handicap" :useStandardDeck="useStandardDeck" :regenOnShuffle="regenOnShuffle" :halfHandicap="halfHandicap" @back-to-setup="newSetup"/>
  <setupscreen v-else-if="mode == modes.SETUPSCREEN" :colors="colors" @submit="newGame" />
</template>

<style>
body {
    background-color: slategray;
    font-family: Arial, Helvetica, sans-serif;
    font-size: large;
}
button {
    padding: 4px 8px;
    background-color: rgb(22, 54, 102);
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 3px;
    text-align: center;
}
button:hover {
    background-color: rgb(42, 78, 145);
}
img {
    margin: 0px;
}
h1 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: xx-large;
    font-size: 70px;
    text-align: center;
    margin: 10px;
}
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: x-large;
    text-align: center;
    margin: 10px;
}
</style>
