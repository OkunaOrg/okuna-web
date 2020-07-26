<template>
    <div class="is-flex justify-center align-items-center">
        <div class="ok-get-the-app-modal">
            <div class="ok-has-background-primary is-semi-rounded has-padding-20 ok-has-text-primary-invert">
                <div class="content">
                    <h2>
                        <span class="icon" v-twemoji>📱</span>
                        <span class="has-padding-left-10">
                            {{$t('global.snippets.its_better_on_the_app')}}
                        </span>
                    </h2>
                    <h4>
                        {{$t('global.snippets.okuna_web_is_wip')}}
                    </h4>
                    <p>
                        {{$t('global.snippets.get_the_mobile_app')}}
                    </p>
                </div>
                <div class="columns is-mobile">
                    <div class="column">
                        <ok-app-store-button/>
                    </div>
                    <div class="column">
                        <ok-play-store-button/>
                    </div>
                </div>
            </div>
            </div>
    </div>
</template>

<style lang="scss">
    .ok-get-the-app-modal {
        max-width: 390px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkAppStoreButton from '~/components/buttons/app-store-button/OkAppStoreButton.vue';
    import OkPlayStoreButton from '~/components/buttons/play-store-button/OkPlayStoreButton.vue';

    @Component({
        name: "OkGetTheAppModal",
        components: {OkPlayStoreButton, OkAppStoreButton},
    })
    export default class OkGetTheAppModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;



    }
</script>
