<script setup lang="ts">
import { ref } from 'vue'
import { AllColors, type Config } from '@/logic'

const props = defineProps<{
    config: Config
}>()
const config = props.config

const AllHandicaps = new Set([-1, 0, 1, 2, 3])

const ifStandardDeck = ref(config.ifStandardDeck)
const ifRegenOnShuffle = ref(config.ifRegenOnShuffle)
const handicap = ref(config.handicap)
const ifHalfHandicap = ref(config.ifHalfHandicap)

const selectedColors = new Map<string, boolean>()
for (const col of AllColors) {
    selectedColors.set(col, false)
    if (config.colors.includes(col)) {
        selectedColors.set(col, true)
    }
}

const emit = defineEmits(['submit'])

function submitSetup() {
    const colors: string[] = []
    for (const col of AllColors) {
        if (selectedColors.get(col)) {
            colors.push(col)
        }
    }
    if (ifStandardDeck) {
        ifRegenOnShuffle.value = false
    }
    config.ifStandardDeck = ifStandardDeck.value
    config.ifRegenOnShuffle = ifStandardDeck.value
    config.handicap = handicap.value
    config.ifHalfHandicap = ifHalfHandicap.value
    config.colors = colors
    emit('submit', config)
}

</script>
<template>
  <div id="setup_div">
    <form id="setup_form">
      <span id="general_options">
        <label>
          <input type="checkbox" v-model="ifStandardDeck" id="standard_deck">
          Use standard deck?
        </label><br>
        <label v-if="!ifStandardDeck">
          <input type="checkbox" v-model="ifRegenOnShuffle" id="regen_on_shuffle">
          Generate a new deck instead of shuffling?
        </label><br>
        <label>Difficulty handicap:</label>
        <select id="handicap_selector" v-model="handicap">
          <option v-for="hc in AllHandicaps">{{ hc }}</option>
        </select>
        <label v-if="handicap != 0">
          <input type="checkbox" v-model="ifHalfHandicap" id="half_handicap">
          Apply handicap value only half the time?
        </label>
      </span>
      <span v-if="!ifStandardDeck" id="color_selector">
        <ul id="color_list">
          <li class="color_selector_item" v-for="col in AllColors">
            <label>
            <img :src="'./assets/cars/' + col + '_car.png'" alt="col + ' car'">
            <input type="checkbox" :value="selectedColors.get(col)" @input="selectedColors.get(col)">
            </label>
          </li>
        </ul>
      </span>
    </form>
    <button id="button_accept" @click="submitSetup">Accept</button>
  </div>

</template>
<style>
#setup_div {
    margin: auto

}

</style>