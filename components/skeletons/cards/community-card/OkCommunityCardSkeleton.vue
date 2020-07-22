<template>
    <div class="columns is-multiline">
        <div class="column is-4-touch is-3-desktop">
            <div class="card ok-has-background-primary has-overflow-hidden">
                <ok-image-cover :cover-size="OkCoverSize.small"></ok-image-cover>
                <div class="card-header ok-has-border-bottom-primary-highlight">
                    <div class="columns has-padding-20 has-width-100-percent is-marginless">
                        <div class="column is-narrow is-flex align-items-center">
                            <ok-image-avatar></ok-image-avatar>
                        </div>
                        <div class="column">
                            <div class="columns is-gapless is-marginless flex-direction-column">
                                <div class="column has-margin-bottom-10">
                                    <b-skeleton width="100px"></b-skeleton>
                                </div>
                                <div class="column">
                                    <b-skeleton width="70px"></b-skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content ok-has-border-bottom-primary-highlight">
                    <div class="columns is-mobile is-multiline is-marginless">
                        <div class="column is-narrow">
                            <b-skeleton width="50px"></b-skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import OkImageCover from "~/components/covers/image-cover/OkImageCover.vue";
    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';

    @Component({
        name: "OkCommunityCardSkeleton",
        components: {OkImageCover, OkImageAvatar}
    })
    export default class OkCommunityCardSkeleton extends Vue {
        OkCoverSize = OkCoverSize;
    }
</script>
