<template>
    <div class="columns is-mobile">
        <div class="column is-6" v-if="onPrevious">
            <button class="button is-rounded is-fullwidth is-medium has-text-weight-bold is-text has-no-text-decoration"
                    type="button"
                    :class="{'is-disabled' : nextInProgress}" :disabled="nextInProgress" @click="onPreviousButtonPressed">
                {{previousText || $t('global.keywords.previous')}}
            </button>
        </div>
        <div class="column" :class="{'is-6': onPrevious, 'is-12': !onPrevious}">
            <button class="button is-success is-rounded is-fullwidth is-medium has-background-rainbow has-text-weight-bold"
                    type="button"
                    :class="{'is-disabled' : nextInProgress}" :disabled="nextInProgress" @click="onNextButtonPressed">
                {{nextText || $t('global.keywords.next')}}
            </button>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkButtonsNavigation"
    })
    export default class OkButtonsNavigation extends Vue {
        @Prop({
            type: Function,
            required: false,
        }) readonly onPrevious: () => Promise<void> | void;

        @Prop({
            type: String,
            required: false,
        }) readonly previousText: string;

        @Prop({
            type: Function,
            required: true,
        }) readonly onNext: () => Promise<void> | void;

        @Prop({
            type: String,
            required: false,
        }) readonly nextText: string;

        private nextOperation?: CancelableOperation<any>;
        private previousOperation?: CancelableOperation<any>;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        nextInProgress = false;
        previousInProgress = false;


        get hasOnPreviousCallback() {
            return typeof this.onPrevious !== "undefined";
        }

        async onNextButtonPressed() {
            const onNextIsPromise = this.utilsService.isPromise(this.onNext);
            if (!onNextIsPromise) {
                this.onNext();
                return;
            }

            if (this.nextInProgress) return;
            this.nextInProgress = true;


            try {
                this.nextOperation = CancelableOperation.fromPromise(this.onNext() as Promise<void>);

                await this.nextOperation.value;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.nextOperation = null;
                this.nextInProgress = false;
            }
        }

        async onPreviousButtonPressed() {
            const onPreviousIsPromise = this.utilsService.isPromise(this.onPrevious);
            if (!onPreviousIsPromise) {
                this.onPrevious();
                return;
            }

            if (this.previousInProgress) return;
            this.previousInProgress = true;


            try {
                this.previousOperation = CancelableOperation.fromPromise(this.onPrevious() as Promise<void>);

                await this.previousOperation.value;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.previousOperation = null;
                this.previousInProgress = false;
            }
        }
    }
</script>