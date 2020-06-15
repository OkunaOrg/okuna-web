<template>
    <article
            class="ok-hashtag-tile media has-background-covered has-border-radius-10 has-overflow-hidden is-flex align-items-center ok-has-black-overlay-80"
            :style="{ backgroundImage: 'url(' + tileBackgroundImage + ')' }">
        <div class="media-content has-z-index-1 has-padding-20">
            <div class="has-text-overflow-ellipsis">
                <span class="has-text-weight-bold has-text-white">
                    #{{hashtag.name}}
                </span>
                <span class="has-text-white" v-if="humanFriendlyPostsCount">
                    · {{humanFriendlyPostsCount}} {{$t('global.keywords.posts')}}
                </span>
            </div>
        </div>
        <div class="media-right has-z-index-1">
            <slot name="trailing">
                <div class="has-padding-20 is-flex align-items-center justify-center">
                    <ok-more-vertical class="is-icon-2x has-text-white"></ok-more-vertical>
                </div>
            </slot>
        </div>
    </article>
</template>

<style lang="scss">
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IHashtag } from "~/models/common/hashtag/IHashtag";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";

    @Component({
        name: "OkHashtagBanner",
    })
    export default class OkHashtagBanner extends Vue {

        @Prop({
            type: Object,
            required: true,
        }) readonly hashtag: IHashtag;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        get tileBackgroundImage() {
            return this.hashtag.image;
        }


        get humanFriendlyPostsCount() {
            if (!this.hashtag.postsCount) return;
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.hashtag.postsCount);
        }

    }
</script>
