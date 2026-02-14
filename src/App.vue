<script lang="ts" setup>
import { ref } from 'vue'
import { getConfig, saveConfig, type Config, Results } from './logic'

enum Modes {
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

// navbar callback functions
function setupButtonCallback() {
    mode.value = Modes.SETUPSCREEN
}

function cardButtonCallback() {
    mode.value = Modes.CARDDISPLAY
}
function champButtonCallback() {
    mode.value = Modes.CHAMPIONSHIPRESULTS
}

</script>

<template>
  <header>
    <span>GroundEffect</span>
  </header>
  <nav>
    <ul class="nav-bar">
      <li class="nav-item"><button :style="[mode === Modes.SETUPSCREEN ? 'font-weight: bold' : 'font-weight: normal']" @click="setupButtonCallback" class="nav-button">Setup</button></li>
      <li class="nav-item"><button :style="[mode === Modes.CARDDISPLAY ? 'font-weight: bold' : 'font-weight: normal']" @click="cardButtonCallback" class="nav-button">Card</button></li>
      <li class="nav-item"><button :style="[mode === Modes.CHAMPIONSHIPRESULTS ? 'font-weight: bold' : 'font-weight: normal']" @click="champButtonCallback" class="nav-button">Results</button></li>
    </ul>
  </nav>
  <main>
    <carddisplay v-if="mode === Modes.CARDDISPLAY" :config="config" @back-to-setup="newSetup"/>
    <setupscreen v-else-if="mode === Modes.SETUPSCREEN" :config="config" @submit="newGame" />
    <championshipresults v-else-if="mode === Modes.CHAMPIONSHIPRESULTS" :config="config" :results="champResults" @exit="backToGame"/>
  </main>
</template>

