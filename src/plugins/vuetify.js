import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/es5/locale/zh-Hans'
import en from 'vuetify/es5/locale/zh-Hans'
import ja from 'vuetify/es5/locale/zh-Hans'

Vue.use(Vuetify);


Vue.component('my-component', {
    methods: {
        changeLocale() {
            this.$vuetify.lang.current = 'zhHans'
        },
    },
})
export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    lang: {
        locales: { zhHans, en, ja },
        current: 'zhHans',
    },
    theme: {
        themes: {
            light: {
                primary: '#e8c7fe', //主题色1
                secondary: '#b75dc0', //主题色2 
            },
            dark: { //夜间模式下的颜色
                primary: '#6a66a3', //主题色1
                secondary: '#F26389', //主题色2
            }
        },
    }
});
