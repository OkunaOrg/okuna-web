<template>
    <article
            @click="onCommunityTileClicked"
            class="media has-background-covered has-border-radius-10 has-overflow-hidden is-flex align-items-center ok-has-black-overlay-80 has-padding-5"
            :class="{'has-cursor-pointer': !!onClick}"
            :style="{ backgroundImage: 'url(' + tileBackgroundImage + ')' }">
        <figure class="media-left">
            <ok-community-avatar :community="community" class="has-padding-left-10"></ok-community-avatar>
        </figure>
        <div class="media-content has-z-index-1">
            <div class="has-text-overflow-ellipsis">
                <span class="has-text-white" v-line-clamp:20="1">
                    c/{{community.name}}
                </span>
            </div>
            <div class="has-text-overflow-ellipsis">
                <span class="has-text-weight-bold has-text-white" v-line-clamp:20="1">
                    {{community.title}}
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
    import OkCommunityAvatar from "../avatars/community-avatar/OkCommunityAvatar.vue";
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkCommunityTile",
        components: {OkCommunityAvatar},
    })
    export default class OkCommunityTile extends Vue {

        @Prop({
            type: Object,
            required: true,
        }) readonly community: ICommunity;

        @Prop({
            type: Function,
            required: false
        }) readonly onClick: (community: ICommunity) => Promise<void> | void;


        get tileBackgroundImage() {
            return this.community.avatar;
        }

        onCommunityTileClicked() {
            if (this.onClick) this.onClick(this.community);
        }

    }
</script>
