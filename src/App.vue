<script setup>
import { ref } from 'vue'

const modes = Object.freeze({
    SETUP: 0,
    CARDDISPLAY: 1,
    SETUPSCREEN: 2
})

let colors = new Set(["black", "blue", "green", "grey", "orange", "purple", "red", "yellow"])

const mode = ref(modes.SETUPSCREEN)

function newGame(ifStandardDeck, ifRegenOnShuffle, selectedColors) {
    console.log("submit clicked")
    colors = selectedColors
    mode.value = modes.CARDDISPLAY
}

</script>

<template>
  <h1>GroundEffect</h1>
  <h3>Legends deck replacement</h3>
  <carddisplay v-if="mode == modes.CARDDISPLAY" :colors="colors"/>
  <setupscreen v-else-if="mode == modes.SETUPSCREEN" :colors="colors" @submit="newGame" />
</template>

<style>
body {
    background-color: slategray;
}
img {
    margin: 0px;
}
h1 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 70px;
    text-align: center;
    margin: 10px;
}
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    text-align: center;
    margin: 10px;
}
h6 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 50px;
    color: white;
    text-shadow: 0px 0px 8px black;
    margin: 0px;
}
</style>
