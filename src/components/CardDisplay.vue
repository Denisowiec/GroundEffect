<script setup>
import { ref } from 'vue'

const props = defineProps({
    colors: Set
})
import { shuffle, generateDeck } from '/src/logic.js'

const deck = generateDeck(props.colors)
const currentCard = ref(0)

function nextCard() {
  currentCard.value++
  if (currentCard.value >= 10) {
    currentCard.value = 0
    shuffle(deck)
  }
}

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
          <td class="card_table_cell"><img :src="'./assets/cars/' + row.color + '_car.png'" :alt="row.color + 'car'"></td>
          <td class="card_table_cell"><img :src="'./assets/signs/sign_' + row.cornerSpeed + '.png'" :alt="'Corner speed: ' + row.cornerSpeed"></td>
          <td class="card_table_cell"><h6>{{ row.straightSpeed }}</h6></td>
        </tr>
      </tbody>
    </table>
      <div class="card_footer"><span id="card_counter">{{ (currentCard + 1) + " / 10" }}</span><button id="button_next" @:click="nextCard()">Next card</button></div>
  </div>
    
</template>
<style>
h6 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 50px;
    color: white;
    text-shadow: 0px 0px 8px black;
    margin: 0px;
}
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
    padding: 0px;
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
    padding: 0px 4px;
    background-color: darkblue;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 30px;
    color: white;
    border: 2px solid black;
    border-radius: 10px;
    position: relative;
    float: right;
    text-align: center;
    cursor: pointer;
}
#button_next:hover {
    background-color: cornflowerblue;
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
</style>