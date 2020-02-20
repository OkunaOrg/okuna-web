import Vue from 'vue';
import vueScrollBehavior from 'vue-scroll-behavior';

export default ({app}) => {
    Vue.use(vueScrollBehavior, {
        router: app.router
    })
}