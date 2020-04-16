export interface IWindowService {
    getWidth(): number;

    onWidthChange(listener: OnWidthChangeListener): EventListenerRemover;
}


export type EventListenerRemover = Function;
export type OnWidthChangeListener = (windowWidth: number) => void;
