<template>
    <button @click="onPressed" class="button is-rounded is-small ok-has-background-primary-highlight is-borderless">
    <span class="image is-16x16">
                <img :src="emojiCount.emoji.image" :alt="emojiCount.emoji.keyword">
    </span>
        <span class="has-padding-left-10 ok-has-text-primary-invert">{{ emojiCount.count }}</span>
    </button>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IReactionsEmojiCount } from "~/models/posts/reactions-emoji-count/IReactionsEmojiCount";

    @Component({
        name: "OkEmojiReactionButton",
        components: {},
    })
    export default class OkEmojiReactionButton extends Vue {
        @Prop(Object) readonly emojiCount: IReactionsEmojiCount;
        @Prop(Boolean) readonly reacted: boolean;


        mounted() {

        }

        onPressed() {
            this.$emit("onPressed", this.emojiCount);
        }


    }
</script>
