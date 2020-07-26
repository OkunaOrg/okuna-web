<template>
    <article class="ok-post">
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

            <div class="has-padding-bottom-10 has-padding-right-20 has-padding-left-20">
                <div class="content">
                    <b-skeleton width="90%"></b-skeleton>
                    <b-skeleton width="50%"></b-skeleton>
                    <b-skeleton width="75%"></b-skeleton>
                    <b-skeleton width="40%"></b-skeleton>
                    <b-skeleton width="80%"></b-skeleton>
                </div>
            </div>

            <footer class="card-footer has-padding-20">
                <div class="card-footer-item is-borderless is-paddingless has-padding-right-10">
                    <b-skeleton></b-skeleton>
                </div>
                <div class="card-footer-item is-paddingless has-padding-left-10">
                    <b-skeleton></b-skeleton>
                </div>
            </footer>
        </div>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";

    @Component({
        name: "OkPostSkeleton",
        components: {OkImageAvatar}
    })
    export default class extends Vue {}
</script>
