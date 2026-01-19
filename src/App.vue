<script setup>
import cardRow from './cardrow.vue'
</script>

<template>
  <h1>GroundEffect</h1>
  <h3>Legends deck replacement</h3>
  <div id="card">
    <table>
      <thead>
        <tr>
          <th>Colour</th>
          <th>Corner speed</th>
          <th>Straight speed</th>
        </tr>
      </thead>
      <tbody>
        <cardRow color="blue" corner-speed="0" straight-speed="10"/>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
