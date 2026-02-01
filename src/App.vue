<script lang="ts" setup>
import { ref } from 'vue'
import { getConfig, saveConfig } from './logic'

const modes = Object.freeze({
    SETUP: 0,
    CARDDISPLAY: 1,
    SETUPSCREEN: 2,
    CHAMPIONSHIPRESULTS: 3
})

// default config
let config = {}
const loadedConfig = getConfig()
if (loadedConfig == null) {
    config = {
        colors: new Set(["black", "blue", "green", "grey", "red", "yellow"]),
        handicap: 0,
        ifHalfHandicap: false,
        ifRegenOnShuffle: false,
        ifStandardDeck: false
    }
} else {
    config = loadedConfig
}

// default championship results
let champResults = null

const mode = ref(modes.SETUPSCREEN)

function newGame(receivedConfig) {
    config = receivedConfig
    saveConfig(config)
    mode.value = modes.CARDDISPLAY
}
function newSetup() {
    mode.value = modes.SETUPSCREEN
}
function backToGame(results) {
    console.log(results)
    champResults = results
    mode.value = modes.CARDDISPLAY
}

</script>

<template>
  <header>
    <h1>GroundEffect</h1>
    <h3>Legends deck replacement</h3>
  </header>
  <carddisplay v-if="mode === modes.CARDDISPLAY" :config="config" @back-to-setup="newSetup"/>
  <setupscreen v-else-if="mode === modes.SETUPSCREEN" :config="config" @submit="newGame" />
  <championshipresults v-else-if="mode === modes.CHAMPIONSHIPRESULTS" :config="config" :results="champResults" @exit="backToGame"/>
  <button @click="mode = modes.CHAMPIONSHIPRESULTS" id="champ_results_button" v-if="mode !== modes.CHAMPIONSHIPRESULTS">Championship results</button>
</template>

<style>
#champ_results_button {
    position: fixed;
    bottom: 10px;
    left: 10px;
    float: none;

}
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
