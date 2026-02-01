<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import { Results, saveChampResults, getChampResults } from '@/logic'

const props = defineProps({
    config: Object,
    results: Object
})

const modes = Object.freeze({
    NORMAL: 0,
    ADDPLAYER: 1,
    ADDRACE: 2
})

const mode = ref(modes.NORMAL)

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
const newPlayer = ref({ name: null, color: null })
const newRace = ref("")

function addPlayerCallback() {
    newPlayer.value = {name: null, color: null}
    mode.value = modes.ADDPLAYER
}

function playerSubmitCallback() {
    if (newPlayer.name === null || newPlayer.color === null) {
        return
    }
    res.value.addPlayer(newPlayer.value.name, newPlayer.value.color)
    mode.value = modes.NORMAL
}

function addRaceCallback() {
    newRace.value = ""
    mode.value = modes.ADDRACE
}

function addRaceSubmitCallback() {
    res.value.addRace(newRace.value)
    mode.value = modes.NORMAL
}

const emit = defineEmits(['exit'])

function exitChampScreen() {
    emit('exit', res.value)
}
</script>
<template>
  <div id="championship_div">
    <table id="championship_table">
      <thead>
        <tr>
          <th><button v-if="mode !== modes.ADDPLAYER" id="add_player_button" @click="addPlayerCallback()">Add player</button></th>
          <th v-for="col of res.getAllColors()"><img :src="'./assets/cars/' + col + '_car.png'" :alt="col + ' car'"><br>
          <span v-if="res.players.has(col)" contenteditable="true" spellcheck="false" @blur="res.editPlayerName(col, $event.target.innerText); console.log(res.players.get(col))">{{ res.players.get(col)}}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="race of res.raceNames">
          <td class="race_name" spellcheck="false">{{ race }}</td>
          <td class="race_points" contenteditable="true" v-for="col of res.getAllColors()" @blur="res.putResults(race, col, $event.target.innerText)">{{ res.getResult(race, col) }}</td>
        </tr>
        <tr>
          <td class="sum">Total</td>
          <td class="total_points" v-for="col of res.getAllColors()">{{ res.sumResults(col) }}</td>
        </tr>
        <tr>
          <td></td>
          <td style="text-align: center;" :colspan="res.getAllColors().length">
            <button v-if="mode !== modes.ADDRACE" id="add_race_button" @click="addRaceCallback()">Add Race</button>
            <div id="add_race_div" v-if="mode === modes.ADDRACE">
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
  <div id="add_player_div" v-if="mode === modes.ADDPLAYER">
    <label>Player name: <input type="text" v-model="newPlayer.name"></label><br>
    <label>Player color: <select v-model="newPlayer.color">
      <option v-for="col of res.getAvColors()">{{ col }}</option>
    </select></label>
    <button @click="playerSubmitCallback()">Accept</button>
  </div>
  <button id="save_champ_button" @click="saveChampResults(res)">Save results</button><button id="load_champ_button" @click="res = getChampResults()">Load results</button>
  <button id="exit_button" @click="exitChampScreen()">Exit</button>
</template>
<style>
#championship_div {
    width: auto;
    background-color: bisque;
    margin: auto;
    border-radius: 10px;
}
#championship_table {
    margin: auto;
    font-weight: bold;
    padding: 10px;
}
.race_name {
    text-align: right;
    font-size: x-large;
}
.race_points {
    text-align: center;
    font-size: x-large;
    padding: 5px;
}
.sum {
    border-top: 1px solid black;
    text-align: right;
    font-size: xx-large;
}
.total_points {
    border-top: 1px solid black;
    text-align: center;
    font-size: xx-large;
    padding: 5px;
}
#exit_button {
    float: right;
}
</style>