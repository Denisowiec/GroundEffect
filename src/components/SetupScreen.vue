<script setup>
import { ref } from 'vue'

const props = defineProps({
    colors: Set
})

const AllColors = new Set(["black", "blue", "green", "grey", "orange", "purple", "red", "yellow"])

const ifStandardDeck = ref(false)
const ifRegenOnShuffle = ref(false)

const selectedColors = new Object()
for (const col of AllColors) {
    selectedColors[col] = false
    if (AllColors.has(col)) {
        selectedColors[col] = true
    }
}

const emit = defineEmits(['submit'])

function submitSetup() {
    const colors = new Set()
    for (const col of AllColors) {
        if (selectedColors[col]) {
            colors.add(col)
        }
    }
    if (ifStandardDeck) {
        ifRegenOnShuffle.value = false
    }
    emit('submit', ifStandardDeck.value, ifRegenOnShuffle.value, colors)
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
      </span>
      <span v-if="!ifStandardDeck" id="color_selector">
        <ul id="color_list">
          <li class="color_selector_item" v-for="col in AllColors">
            <label>
            <img :src="'./assets/cars/' + col + '_car.png'" alt="col + ' car'">
            <input type="checkbox" v-model="selectedColors[col]">
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