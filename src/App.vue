<script setup>
import { ref } from 'vue'

const colors = ["black", "blue", "green", "grey", "orange", "purple", "red", "yellow", "purple"]


</script>

<template>
  <h1>GroundEffect</h1>
  <h3>Legends deck replacement</h3>
  <carddisplay :colors="colors"/>
</template>

<style>
body {
    background-color: slategray;
}
img {
    margin: 0px;
}
h1 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 70px;
    text-align: center;
    margin: 10px;
}
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    text-align: center;
    margin: 10px;
}
h6 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 50px;
    color: white;
    text-shadow: 0px 0px 8px black;
    margin: 0px;
}
</style>
