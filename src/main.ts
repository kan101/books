import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'
import VueAwesomePaginate from "vue-awesome-paginate"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"


const app = createApp(App)
.use(VueAwesomePaginate)
.use(Toast)

initializeRouter(app)

app.mount('#app')
