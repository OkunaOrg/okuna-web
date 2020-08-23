<template>
    <article class="ok-notification">
        <div class="card ok-has-background-primary has-no-borer-radius-mobile">
            <div class="card-content">
                <header class="columns is-mobile">
                    <div class="column is-flex align-items-center">
                        <div class="media">
                            <div class="media-left">
                                <ok-image-avatar></ok-image-avatar>
                            </div>
                            <div class="media-content has-overflow-hidden">
                                <p class="title is-6 ok-has-text-primary-invert">
                                    <b-skeleton width="80px" :animated="true"></b-skeleton>
                                </p>
                                <p class="subtitle is-7 ok-has-text-primary-invert-80">
                                    <b-skeleton width="50px" height="10px" :animated="true"></b-skeleton>
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";

    @Component({
        name: "OkNotificationSkeleton",
        components: {OkImageAvatar}
    })
    export default class extends Vue {}
</script>
