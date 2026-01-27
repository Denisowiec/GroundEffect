<script setup>
import { ref } from 'vue'

const props = defineProps({
    config: Object
})
const modes = Object.freeze({
    CHAMPIONSHIP_SETUP: 0,
    ADD_RESULTS: 1,
    RESULTS_DISPLAY: 2,
})

const mode = ref(modes.RESULTS_DISPLAY)

let colors = Array.from(props.config.colors)
const playerColors = ["purple", "orange"]
colors = playerColors.concat(colors)
const playerNames = ref(new Map([["purple", "Koriakin"], ["orange", "TaalTarang"]]))

const races = ["France", "Italy", "Japan", "USA"]
const results = ref(new Map())
const currentRace = ref(0)

for (let r of races) {
    let newMap = new Map()
    for (let c of colors) {
        newMap.set(c, Math.floor(Math.random() * 10))
    }
    results.value.set(r, newMap)
}

</script>
<template>
  <div id="championship_div" v-if="mode == modes.RESULTS_DISPLAY">
    <table id="championship_table">
      <thead>
        <tr>
          <th></th>
          <th v-for="col of colors"><img :src="'./assets/cars/' + col + '_car.png'" :alt="col + ' car'"><br>
          <span v-if="playerNames.has(col)" contenteditable="true" spellcheck="false" @blur="playerNames.set(col, $event.target.innerText); console.log(playerNames.get(col))">{{ playerNames.get(col)}}</span></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="race of races">
          <td class="race_name">{{ race }}</td>
          <td class="race_points" v-for="col of colors">{{ results.get(race).get(col) }}</td>
          <td><button v-if="currentRace == race">Add results</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="chmp_setup_div" v-if="mode == modes.CHAMPIONSHIP_SETUP">
    
  </div>
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
    font-size: xx-large;
    padding: 5px;
}
</style>