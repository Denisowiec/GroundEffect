import { createApp } from 'vue'
import App from './App.vue'
import CardDisplay from './components/CardDisplay.vue'

const app = createApp(App)
app.component('carddisplay', CardDisplay)
app.mount('#app')
