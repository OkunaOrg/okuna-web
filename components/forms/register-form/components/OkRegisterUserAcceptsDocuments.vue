<template>
    <form class="has-text-left" @submit.prevent="onSubmit">
        <div class="field">
            <label class="label is-medium ok-has-text-primary-invert">
                {{$t('global.snippets.legal_confirmation')}}
            </label>
            <p class="help ok-has-text-primary-invert has-text-left has-margin-bottom-15 is-size-6">
                {{$t('global.snippets.legal_confirmation_description')}}
            </p>
        </div>
        <ok-buttons-navigation :onNext="onNext" :onPrevious="onPrevious" :nextText="'Register'" class="has-padding-top-20"/>
    </form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";

    @Component({
        name: "OkRegisterUserAcceptsDocuments",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterUserAcceptsDocuments extends Vue {

        @Prop({
            type: Function,
            required: true,
        }) readonly onPrevious: () => Promise<void> | void;

        @Prop({
            type: Function,
            required: true,
        }) readonly onNext: () => Promise<void> | void;


    }
</script>

