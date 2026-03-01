<script setup lang="ts">
import { ref } from 'vue'
import { AllColors, StdColors, type Config } from '@/logic'

const props = defineProps<{
    config: Config
}>()
const config = props.config

const AllHandicaps = new Set([-1, 0, 1, 2, 3])

const ifStandardDeck = ref(config.ifStandardDeck)
const ifRegenOnShuffle = ref(config.ifRegenOnShuffle)
const handicap = ref(config.handicap)
const ifHalfHandicap = ref(config.ifHalfHandicap)

const selectedColors: Record<string, boolean> = {}
for (const col of AllColors) {
    selectedColors[col] = false
    if (config.colors.includes(col)) {
        selectedColors[col] = true
    }
}
const selCol = ref(selectedColors)

const emit = defineEmits(['submit'])

function submitSetup() {
    const colors: string[] = []
    if (ifStandardDeck.value) {
        ifRegenOnShuffle.value = false
        for (const col of StdColors) {
            colors.push(col)
        }
    } else {
        for (const col of AllColors) {
            if (selCol.value[col]) {
                colors.push(col)
            }
        }
    }
    config.ifStandardDeck = ifStandardDeck.value
    config.ifRegenOnShuffle = ifRegenOnShuffle.value
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
        <label class="checkbox-container">
          <input type="checkbox" class="checkbox" v-model="ifStandardDeck" id="standard_deck">
          Use standard deck?
          <span class="checkmark"></span>
        </label><br>
        <label class="checkbox-container" v-if="!ifStandardDeck">
          <input type="checkbox" class="checkbox" v-model="ifRegenOnShuffle" id="regen_on_shuffle">
          Generate a new deck instead of shuffling?
          <span class="checkmark"></span>
        </label><br>
        <label>Difficulty handicap:</label>
        <select id="handicap_selector" v-model="handicap">
          <option v-for="hc in AllHandicaps">{{ hc }}</option>
        </select><br>
        <label class="checkbox-container" v-if="handicap != 0">
          <input type="checkbox" class="checkbox" v-model="ifHalfHandicap" id="half_handicap">
          Apply handicap value only half the time?
        </label>
      </span>
      <span v-if="!ifStandardDeck" id="color_selector">
        <p>Choose car colors that should be included in the deck:</p>
        <ul id="color-list">
          <li class="color-selector-item" v-for="col in AllColors">
            <label class="checkbox-car-container">
            <input type="checkbox" class="checkbox-car" :id="'checkbox-' + col" v-model="selCol[col]">
            <img class="car-image" :src="'./assets/cars/' + col + '_car.png'" :alt="'col' + ' car'">
            <span class="checkmark-car"></span>
            </label>
          </li>
        </ul>
      </span>
    </form>
    <button id="button-accept" @click="submitSetup">Save config</button>
  </div>

</template>
