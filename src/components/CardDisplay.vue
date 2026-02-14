<script lang="ts" setup>
import { ref } from 'vue'
import { type Config, shuffle, generateDeck } from '@/logic.js'

const props = defineProps<{
    config: Config
}>()
const config = props.config

let deck = generateDeck(new Set(config.colors), config.ifStandardDeck)
const currentCard = ref(0)

function nextCard() {
    currentCard.value++
    if (currentCard.value >= 10) {
        currentCard.value = 0
        if (config.ifRegenOnShuffle) {
            deck = generateDeck(new Set(config.colors), config.ifStandardDeck)
        } else {
            shuffle(deck)
        }
    }
}

function calculateSpeed(speed: number) {
    if (!config.ifHalfHandicap) {
        return speed + Number(config.handicap)
    }
    if (Math.random() > 0.5) {
        return speed + Number(config.handicap)
    }
    if (config.handicap > 0) {
        return speed + Number(config.handicap) - 1
    }
    return speed
}

const emit = defineEmits(['backToSetup'])

</script>
<template>
  <div id="card">
    <table class="card-table">
      <thead>
        <tr class="card-table-row">
          <th class="card-table-header-cell">Colour</th>
          <th class="card-table-header-cell">Corner<br>speed</th>
          <th class="card-table-header-cell">Straight<br>speed</th>
        </tr>
      </thead>
      <tbody>
        <tr class="card-table-row" v-for="row in deck[currentCard]">
          <td class="card-table-cell"><img :src="'./assets/cars/' + row.color + '_car.png'" :alt="row.color + ' car'"></td>
          <td class="card-table-cell"><img :src="'./assets/signs/sign_' + row.cornerSpeed + '.png'" :alt="'Corner speed: ' + row.cornerSpeed"></td>
          <td class="card-table-cell"><span class="sspeed_span">{{ calculateSpeed(row.straightSpeed) }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <span id="card-counter">{{ (currentCard + 1) + " / 10" }}</span>
    <button id="button-next" @:click="nextCard()">Next card</button>
  </div>
  <button id="button-backtosetup" @click="$emit('backToSetup')">Setup screen...</button>
</template>
