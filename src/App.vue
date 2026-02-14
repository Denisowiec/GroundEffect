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
  <button @click="mode = Modes.CHAMPIONSHIPRESULTS" id="champ-results-button" v-if="mode !== Modes.CHAMPIONSHIPRESULTS">Championship results</button>
</template>

