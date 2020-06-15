<template>
    <article class="media has-overflow-hidden is-flex align-items-center has-padding-5">
        <figure class="media-left">
            <ok-hashtag-avatar :hashtag="hashtag" class="has-padding-left-10"></ok-hashtag-avatar>
        </figure>
        <div class="media-content has-z-index-1">
            <div class="has-text-overflow-ellipsis">
                <span class="ok-has-text-primary-invert has-text-weight-bold">
                    #{{hashtag.name}}
                </span>
            </div>
            <div class="has-text-overflow-ellipsis">
                <span class="ok-has-text-primary-invert-80">
                    {{humanFriendlyPostsCount}} {{$t('global.keywords.posts')}}
                </span>
            </div>
        </div>
        <div class="media-right has-z-index-1">
            <slot name="trailing"></slot>
        </div>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import OkHashtagAvatar from "../avatars/hashtag-avatar/OkHashtagAvatar.vue";
    import { IHashtag } from '~/models/common/hashtag/IHashtag';

    @Component({
        name: "OkHashtagTile",
        components: {OkHashtagAvatar},
    })
    export default class OkHashtagTile extends Vue {

        @Prop({
            type: Object,
            required: true,
        }) readonly hashtag: IHashtag;
    }
</script>
