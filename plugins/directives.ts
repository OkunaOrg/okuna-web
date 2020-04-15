import Vue from 'vue'
import twemoji from 'twemoji';
import vDebounce from 'v-debounce';

Vue.directive('twemoji', {
    bind(element) {
        element.innerHTML = twemoji.parse(element.innerText, {
            folder: 'twemoji',
            ext: '.svg',
            base: '/'
        });
    }
});

Vue.directive('debounce', vDebounce);


const recalculateWithElement = (el, removeChild, queryString) => {
    let currentScreen;

    if (window.innerWidth > 1024) {
        currentScreen = 'desktop';
    } else if (window.innerWidth > 769) {
        currentScreen = 'tablet';
    } else {
        currentScreen = 'touch';
    }

    const currentStatus = el['isVisible'];
    const isVisible = queryString.toLowerCase().includes(currentScreen);

    if(isVisible !== currentStatus){
        if (isVisible) {
            if (removeChild.parentNode) {
                removeChild.parentNode.replaceChild(el, removeChild)
            }
        } else {
            if (el.parentNode) {
                el.parentNode.replaceChild(removeChild, el)
            }
        }
    }

    el['isVisible'] = isVisible;
};

Vue.directive('ok-if-screen', {
    bind(el, binding, vnode) {
      Vue.nextTick(()=>{
          const queryString = binding.value;
          const removeChild = document.createComment(' ');
          const onResize = () => recalculateWithElement(el, removeChild, queryString);
          el['onResize'] = onResize;
          onResize();
          window.addEventListener('resize', onResize);
      });
    },
    unbind(el) {
        window.removeEventListener('resize', el['onResize']);
    }
});