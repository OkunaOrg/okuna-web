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
                    <a href="https://testflight.apple.com/join/XniAjdyF"  target="_blank" rel="noreferrer nofollow" class="column">
                        <figure class="image">
                            <img :src="appleAppStoreBadge" alt="Apple app store badge">
                        </figure>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=social.openbook.app" target="_blank" rel="noreferrer nofollow" class="column">
                        <figure class="image">
                            <img :src="googlePlayStoreBadge" alt="Google play store badge">
                        </figure>
                    </a>
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
    import { PostActionsModalParams } from "~/services/modal/IModalService";
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkGetTheAppModal",
        components: {},
    })
    export default class OkGetTheAppModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        get appleAppStoreBadge (){
            return require('./assets/app-store-badge.png');
        }

        get googlePlayStoreBadge(){
            return require('./assets/google-play-badge.png');
        }



    }
</script>
