import { createApp } from 'vue'
import router from './router'
import { store, key } from './store'
// import 'element-plus/dist/index.css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import './styles/main.less'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(store, key)
app.mount('#app')
