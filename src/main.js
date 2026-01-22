import { createApp } from 'vue'
import App from './App.vue'
import CardDisplay from './components/CardDisplay.vue'
import SetupScreen from './components/SetupScreen.vue'

const app = createApp(App)
app.component('carddisplay', CardDisplay)
app.component('setupscreen', SetupScreen)
app.mount('#app')
