<template>
    <div class="is-flex wrap align-items-center">
        <template v-if="post.circles.length">
            <span class="ok-has-text-primary-invert-80 is-size-7 has-padding-right-5">
                {{$t("global.snippets.you_shared_with")}}
            </span>
            <div v-for="circle in post.circles"
                 :key="post.circles.id" class="has-padding-5">
                <ok-circle-button :circle="circle"/>
            </div>
        </template>
        <template v-else-if="post.isEncircled">
              <span class="ok-has-text-primary-invert-80 is-size-7 has-padding-right-5">
                {{$t("global.snippets.post_shared_privately_in")}}
                </span>
            <div class="has-padding-5">
                <ok-circle-preview :circle="fakeConnectionsCircle" :circlePreviewSize="OkCirclePreviewSize.extraSmall"/>
            </div>
            <nuxt-link :to="'/' + post.creator.username"
                       class="ok-has-text-accent is-size-7 has-padding-left-5">
                @{{ post.creator.username }}
            </nuxt-link>
            <span class="ok-has-text-primary-invert-80 is-size-7">
                &nbsp; {{$t("global.keywords.circles")}}
            </span>
        </template>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkCircleButton from "~/components/buttons/OkCircleButton.vue";
    import OkCirclePreview from "~/components/circle-preview/OkCirclePreview.vue";
    import circleFactory from "~/models/connections/circle/factory";
    import { OkCirclePreviewSize } from "~/components/circle-preview/OkCirclePreviewSize";

    @Component({
        name: "OkPostCircles",
        components: {OkCirclePreview, OkCircleButton},
    })
    export default class OkPostCircles extends Vue {
        @Prop(Object) readonly post: IPost;

        OkCirclePreviewSize = OkCirclePreviewSize;


        get fakeConnectionsCircle() {
            if (this.post.circles?.length) return;

            return circleFactory.make({
                id: 38419,
                name: "",
                color: "#ffffff",
                users_count: 0,
            });
        }
    }
</script>
