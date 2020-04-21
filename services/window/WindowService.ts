import { IWindowService, EventListenerRemover, OnWidthChangeListener } from '~/services/window/IWindowService';
import { injectable } from '~/node_modules/inversify';
import debounce from 'lodash.debounce';

@injectable()
export class WindowService implements IWindowService {

    windowResizeListeners = [];

    constructor() {
        window.addEventListener('resize', debounce(this.onWindowResize, 200).bind(this));
    }

    getWidth(): number {
        return window.innerWidth;
    }

    onWidthChange(listener: OnWidthChangeListener): EventListenerRemover {
        this.windowResizeListeners.push(listener);

        return () => {
            this.windowResizeListeners.splice(this.windowResizeListeners.indexOf(listener), 1)
        }
    }

    private onWindowResize() {
        const width = window.innerWidth;
        this.windowResizeListeners.forEach((listener) => listener(width));
    }

}
