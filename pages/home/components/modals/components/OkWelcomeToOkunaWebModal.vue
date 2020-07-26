<template>
    <div class="is-flex justify-center align-items-center">
        <div class="ok-welcome-to-okuna-web-modal">
            <div class="ok-has-background-primary is-semi-rounded has-padding-20 ok-has-text-primary-invert">
                <div class="content">
                    <h2>
                        <span class="icon" v-twemoji>🥳</span>
                        <span class="has-padding-left-10">
                            {{$t('global.snippets.glad_you_made_it')}}
                        </span>
                    </h2>
                    <h4>
                        {{$t('global.snippets.welcome_to_okuna')}}
                    </h4>
                    <p>
                        {{$t('global.snippets.welcome_to_okuna_keep_in_mind_okuna_wip')}}
                    </p>
                    <p>
                        {{$t('global.snippets.welcome_to_okuna_get_the_app')}}
                    </p>
                    <p>
                        {{$t('global.snippets.welcome_to_okuna_thanks')}}
                    </p>
                    <p>
                        {{$t('global.snippets.welcome_to_okuna_signature')}}
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
    .ok-welcome-to-okuna-web-modal {
        max-width: 390px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { PostActionsModalParams } from "~/services/modal/IModalService";
    import { IPost } from "~/models/posts/post/IPost";
    import OkPlayStoreButton from '~/components/buttons/play-store-button/OkPlayStoreButton.vue';
    import OkAppStoreButton from '~/components/buttons/app-store-button/OkAppStoreButton.vue';

    @Component({
        name: "OkWelcomeToOkunaWebModal",
        components: {OkAppStoreButton, OkPlayStoreButton},
    })
    export default class OkWelcomeToOkunaWebModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;




    }
</script>
