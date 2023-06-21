import './assets/main.css'

import { createApp } from 'vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create Vuetify Instance
const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'


const app = createApp(App)

app.use(vuetify)
app.mount('#app')
