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

const mode = ref(modes.CHAMPIONSHIP_SETUP)

const champData = {
    colors: props.config.colors,
    races: ["France", "Italy", "Japan", "USA"],
    results: new Map(),
    currentRace: "France"
}
for (let r of champData.races) {
    let newMap = new Map()
    for (let c of champData.colors) {
        newMap.set(c, Math.floor(Math.random() * 10))
    }
    champData.results.set(r, newMap)
}

</script>
<template>
  <div id="championship_div" v-if="mode == modes.RESULTS_DISPLAY">
    <table id="championship_table">
      <thead>
        <tr>
          <th></th>
          <th v-for="col of champData.colors"><img :src="'./assets/cars/' + col + '_car.png'" :alt="col + ' car'"></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="race of champData.races">
          <td class="race_name">{{ race }}</td>
          <td class="race_points" v-for="col of champData.colors">{{ champData.results.get(race).get(col) }}</td>
          <td><button v-if="champData.currentRace == race">Add results</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="chmp_setup_div" v-if="mode == modes.CHAMPIONSHIP_SETUP">

  </div>
</template>
<style>
#championship_div {
    width: 600px;
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