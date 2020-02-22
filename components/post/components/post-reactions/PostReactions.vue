<template>
    <div class="is-flex has-padding-10 wrap">
        <div v-for="reactionsEmojiCount in post.reactionsEmojiCounts"
             :key="reactionsEmojiCount.emoji.id" class="has-padding-5">
            <ok-emoji-reaction-button
                    :emoji-count="reactionsEmojiCount"
            ></ok-emoji-reaction-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/EmojiReactionButton.vue";

    @Component({
        name: "OkPostReactions",
        components: {OkEmojiReactionButton},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;


        mounted() {
        }


    }
</script>
