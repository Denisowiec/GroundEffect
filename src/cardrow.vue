<script setup>
defineProps(['color', 'cornerSpeed', 'straightSpeed'])
</script>

<template>
    <tr>
        <td><img src="./assets/cars/blue_car.png" /></td>
        <td>{{ cornerSpeed }}</td>
        <td>{{ straightSpeed }}</td>
    </tr>
</template>