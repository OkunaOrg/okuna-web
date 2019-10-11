import Vue from 'vue'
import twemoji from 'twemoji';
import vDebounce from 'v-debounce';

Vue.directive('twemoji', {
  bind(element) {
    element.innerHTML = twemoji.parse(element.innerText,{
      folder: 'twemoji',
      ext: '.svg',
      base: '/'
    });
  }
});

Vue.directive('debounce', vDebounce);

