// @types/vue.d.ts
import * as moment from "moment";

interface ITimerAttr {
    wait?: number;
    loop?: boolean;
    start?: boolean;
}

interface Callback {
    (): void;
}

interface Timer {
    start(): boolean;
    stop(): boolean;
    clearTime(): boolean;
    updateStartEndTickFromDuration(duration: number): boolean;
    getDuration(): number;
    getRemainingDuration(): number;
    isStopped(): boolean;
    isStarted(): boolean;
}

interface IMoment extends moment.Moment, Timer {
    (
        inp?: moment.MomentInput,
        format?: moment.MomentFormatSpecification,
        language?: string,
        strict?: boolean
    ): IMoment;
    duration(
        inp?: moment.DurationInputArg1,
        unit?: moment.DurationInputArg2
    ): IMoment;

    timer(attributes: ITimerAttr, callback?: Callback): IMoment;
}

declare module "vue/types/vue" {
    interface Vue {
        $moment: IMoment;
    }
    interface VueConstructor {
        $moment: IMoment;
    }
}