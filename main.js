import Vue from 'vue'
import App from './App'
import uView from './UI/uview-ui'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)

const app = new Vue({
    ...App
})
app.$mount()
