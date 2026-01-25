<script setup>
import { ref } from 'vue'

const props = defineProps({
    config: Object
})
const config = props.config
import { shuffle, generateDeck } from '/src/logic.js'

let deck = generateDeck(config.colors, config.ifStandardDeck)
const currentCard = ref(0)

function nextCard() {
    currentCard.value++
    if (currentCard.value >= 10) {
        currentCard.value = 0
        if (config.ifRegenOnShuffle) {
            deck = generateDeck(config.colors, config.ifStandardDeck)
        } else {
            shuffle(deck)
        }
    }
}

function calculateSpeed(speed) {
    if (!config.ifHalfHandicap) {
        return speed + config.handicap
    }
    if (Math.random() > 0.5) {
        return speed + config.handicap
    }
    if (config.handicap > 0) {
        return speed + config.handicap - 1
    }
    return speed
}

const emit = defineEmits(['backToSetup'])

</script>
<template>
  <div id="card">
    <table class="card_table">
      <thead>
        <tr class="card_table_row">
          <th>Colour</th>
          <th>Corner speed</th>
          <th>Straight speed</th>
        </tr>
      </thead>
      <tbody>
        <tr class="card_table_row" v-for="row in deck[currentCard]">
          <td class="card_table_cell"><img :src="'./assets/cars/' + row.color + '_car.png'" :alt="row.color + ' car'"></td>
          <td class="card_table_cell"><img :src="'./assets/signs/sign_' + row.cornerSpeed + '.png'" :alt="'Corner speed: ' + row.cornerSpeed"></td>
          <td class="card_table_cell"><span class="sspeed_span">{{ calculateSpeed(row.straightSpeed) }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card_footer">
    <span id="card_counter">{{ (currentCard + 1) + " / 10" }}</span>
    <button id="button_next" @:click="nextCard()">Next card</button>
  </div>
  <button id="button_backtosetup" @click="$emit('backToSetup')">Back to setup screen...</button>
</template>
<style>
#card {
    margin: auto;
    position: relative;
    background-color: bisque;
    border-style: solid;
    border-radius: 15px;
    width: 400px;
}
.card_footer {
    width: 400px;
    margin: auto;
    position: static;
    margin-top: 10px;
    padding: 5px;
}
#card_counter {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 30px;
    padding: 0px 4px;
    position: relative;
    float: left;
}
#button_next {
    font-size: 30px;
    border-radius: 10px;
    float: right;
}
#button_backtosetup {
    position: fixed;
    bottom: 10px;
    right: 10px;
    float: none;
}
.card_table {
    color: black;
    text-align: center;
    margin: auto;
}
.card_table_row {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    border: 1px solid black;
}
.card_table_cell {
    margin: 10px;
    width: 120px;
    height: 70px;
}
.sspeed_span {
    font-family: Arial, Helvetica, sans-serif;
    font-size: xx-large;
    color: white;
    text-shadow: 0px 0px 8px black;
    margin: 0px;

}
</style>