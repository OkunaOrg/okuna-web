<template>
    <button @click="onPressed"
            class="button is-rounded is-small ok-has-background-primary-highlight is-borderless"
            :class="{'has-text-weight-bold': isCurrentReaction, 'ok-emoji-reaction-button-small': isSmallSize}"
    >
    <span class="image" :class="reactionImageClass">
                <img :src="emojiCount.emoji.image" :alt="emojiCount.emoji.keyword">
    </span>
        <span :class="{'is-size-8' : size === OkEmojiReactionButtonSize.small, 'is-size-7' : size === OkEmojiReactionButtonSize.medium}"
              class="has-padding-left-10 ok-has-text-primary-invert">
            {{ emojiCount.count }}
        </span>
    </button>
</template>

<style lang="scss">

    .ok-emoji-reaction-button-small {
        padding: 0 10px !important;
        height: 2.2em !important;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IReactionsEmojiCount } from "~/models/posts/reactions-emoji-count/IReactionsEmojiCount";
    import { OkEmojiReactionButtonSize } from "~/components/buttons/emoji-reaction-button/lib/OkEmojiReactionButtonSize";


    @Component({
        name: "OkEmojiReactionButton",
        components: {},
    })
    export default class OkEmojiReactionButton extends Vue {
        @Prop(Object) readonly emojiCount: IReactionsEmojiCount;

        @Prop({
            type: Boolean,
            default: false
        }) readonly isCurrentReaction: boolean;

        @Prop({
            type: Number,
            default: OkEmojiReactionButtonSize.medium
        }) readonly size: OkEmojiReactionButtonSize;

        OkEmojiReactionButtonSize = OkEmojiReactionButtonSize;


        mounted() {

        }

        onPressed() {
            this.$emit("onPressed", this.emojiCount);
        }

        get isSmallSize() {
            return this.size === OkEmojiReactionButtonSize.small;
        }

        get reactionImageClass() {
            return this.isSmallSize ? "is-12x12" : "is-16x16";
        }


    }
</script>
