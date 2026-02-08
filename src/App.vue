<script lang="ts" setup>
import { ref } from 'vue'
import { getConfig, saveConfig, type Config, Results } from './logic'

enum Modes {
    SETUP,
    CARDDISPLAY,
    SETUPSCREEN,
    CHAMPIONSHIPRESULTS
}

// default config
let config: Config
const loadedConfig = getConfig()
console.log("Loaded config:")
console.log(loadedConfig)
if (loadedConfig === null) {
    config = {
        colors: ["black", "blue", "green", "grey", "red", "yellow"],
        handicap: 0,
        ifHalfHandicap: false,
        ifRegenOnShuffle: false,
        ifStandardDeck: false
    }
} else {
    config = loadedConfig
}

// default championship results
let champResults: Results | null = null

const mode = ref(Modes.SETUPSCREEN)

function newGame(receivedConfig: Config) {
    console.log("Received config from setup screen:")
    console.log(receivedConfig)
    config = receivedConfig
    saveConfig(config)
    mode.value = Modes.CARDDISPLAY
}
function newSetup() {
    mode.value = Modes.SETUPSCREEN
}
function backToGame(results: Results) {
    champResults = results
    mode.value = Modes.CARDDISPLAY
}

</script>

<template>
  <header>
    <h1>GroundEffect</h1>
    <h3>Legends deck replacement</h3>
  </header>
  <carddisplay v-if="mode === Modes.CARDDISPLAY" :config="config" @back-to-setup="newSetup"/>
  <setupscreen v-else-if="mode === Modes.SETUPSCREEN" :config="config" @submit="newGame" />
  <championshipresults v-else-if="mode === Modes.CHAMPIONSHIPRESULTS" :config="config" :results="champResults" @exit="backToGame"/>
  <button @click="mode = Modes.CHAMPIONSHIPRESULTS" id="champ_results_button" v-if="mode !== Modes.CHAMPIONSHIPRESULTS">Championship results</button>
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
