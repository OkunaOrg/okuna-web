import Vue from 'vue';
import vueNotVisible from 'vue-not-visible';

const breakpoints = {
    mobile: 425,
    tablet: 769,
    desktop: 1024,
};

Vue.use(vueNotVisible, breakpoints); // this is default