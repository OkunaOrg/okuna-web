<template>
    <div>
        <div>
            <p>

            </p>
            <p>
                Hooray!
            </p>
            <p>
                Your account has been created
            </p>
        </div>
        <ok-buttons-navigation :onNext="onNext" :nextText="'Register'" class="has-padding-top-20"/>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkButtonsNavigation from "~/components/navigation/OkButtonsNavigation.vue";

    @Component({
        name: "OkRegisterAccountCreated",
        components: {OkButtonsNavigation}
    })
    export default class OkRegisterAccountCreated extends Vue {

        @Prop({
            type: Function,
            required: true,
        }) readonly onNext: () => Promise<void> | void;


    }
</script>

