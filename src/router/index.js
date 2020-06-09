import Vue from 'vue'
import VueRouter from 'vue-router'
import MainUI from '../components/Main.vue'
//import PekoLanguage from '../components/PekoLangUI.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: MainUI,
        meta: {
            title: "おかゆボタン OKAYU BUTTON",
        },
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
