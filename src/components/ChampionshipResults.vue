<script lang="ts" setup>
import { ref } from 'vue'
import { Results, type Config, saveChampResults, getChampResults } from '@/logic'

const props = defineProps<{
    config: Config,
    results: Results | null
}>()

enum Modes {
    NORMAL,
    ADDPLAYER,
    ADDRACE
}

const mode = ref(Modes.NORMAL)

// Loading championship results
// The one forwarded from the app takes precedent over the one in browser storage
const res = ref(new Results(Array.from(props.config.colors)))
if (props.results != null) {
    res.value = props.results
} else {
    const loadedRes = getChampResults()
    if (loadedRes != null) {
        res.value = loadedRes
    }
}

// Reactive values for the modal dialogs
const newPlayerName = ref<string | null>(null)
const newPlayerColor = ref<string | null>(null)
const newRace = ref("")

function addPlayerCallback() {
    newPlayerName.value = null
    newPlayerColor.value = null
    mode.value = Modes.ADDPLAYER
}

function playerSubmitCallback() {
    if (newPlayerName.value === null || newPlayerColor.value === null) {
        return
    }
    res.value.addPlayer(newPlayerName.value, newPlayerColor.value)
    mode.value = Modes.NORMAL
}

function addRaceCallback() {
    newRace.value = ""
    mode.value = Modes.ADDRACE
}

function addRaceSubmitCallback() {
    res.value.addRace(newRace.value)
    mode.value = Modes.NORMAL
}

function editPlayerNameCallback(event: Event, color: string) {
    let target = event.target as HTMLElement
    let text = target.innerText
    res.value.editPlayerName(color, text.trim())
}

function editResultsCallback(event: Event, raceName: string, color: string) {
    let target = event.target as HTMLElement
    let content = target.innerText.trim()
    let number = parseInt(content)
    res.value.putResults(raceName, color, number)
}

function loadChampResultsCallback() {
    let loadedResults = getChampResults()
    if (loadedResults !== null) {
        res.value = loadedResults
    }
}

const emit = defineEmits(['exit'])

function exitChampScreen() {
    emit('exit', res.value)
}
</script>
<template>
  <div id="championship-div">
    <table id="championship-table">
      <thead>
        <tr>
          <th class="champ-table-header-cell"><button v-if="mode !== Modes.ADDPLAYER" id="add-player-button" @click="addPlayerCallback()">Add player</button></th>
          <th class="champ-table-header-cell" v-for="col of res.getAllColors()"><img style="width: 80px" :src="'./assets/cars/' + col + '_car.png'" :alt="col + ' car'"><br>
          <span v-if="res.players.has(col)" contenteditable="true" spellcheck="false" @blur="editPlayerNameCallback($event, col)">{{ res.players.get(col)}}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="race of res.raceNames">
          <td class="race-name" spellcheck="false">{{ race }}</td>
          <td class="race-points" contenteditable="true" v-for="col of res.getAllColors()" @blur="editResultsCallback($event, race, col)">{{ res.getResult(race, col) }}</td>
        </tr>
        <tr>
          <td class="total-points-name">Total</td>
          <td class="total-points" v-for="col of res.getAllColors()">{{ res.sumResults(col) }}</td>
        </tr>
        <tr>
          <td></td>
          <td style="text-align: center;" :colspan="res.getAllColors().length">
            <button v-if="mode !== Modes.ADDRACE" id="add-race-button" @click="addRaceCallback()">Add Race</button>
            <div id="add-race-div" v-if="mode === Modes.ADDRACE">
                <label>Track: <select v-model="newRace">
                <option v-for="track of res.getAvTracks()">{{ track }}</option>
                </select></label>
                <button @click="addRaceSubmitCallback()">Accept</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="add-player-div" v-if="mode === Modes.ADDPLAYER">
    <label>Player name: <input type="text" v-model="newPlayerName"></label><br>
    <label>Player color: <select v-model="newPlayerColor">
      <option v-for="col of res.getAvColors()">{{ col }}</option>
    </select></label>
    <button @click="playerSubmitCallback()">Accept</button>
  </div>
  <button id="save-champ-button" @click="saveChampResults(res)">Save results</button><button id="load-champ-button" @click="loadChampResultsCallback()">Load results</button>
</template>