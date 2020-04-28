<template>
    <button @click="onPressed"
            class="button is-rounded is-small ok-has-background-primary-highlight is-borderless"
            :class="{'has-text-weight-bold': isCurrentReaction, 'ok-emoji-reaction-button-small': isSmallSize}"
    >
        ManageProfile
    </button>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IReactionsEmojiCount } from "~/models/posts/reactions-emoji-count/IReactionsEmojiCount";
    import { OkManageProfileButtonSize } from "~/components/buttons/emoji-reaction-button/lib/OkManageProfileButtonSize";


    @Component({
        name: "OkManageProfileButton",
        components: {},
    })
    export default class OkManageProfileButton extends Vue {
        @Prop(Object) readonly emojiCount: IReactionsEmojiCount;

        @Prop({
            type: Boolean,
            default: false
        }) readonly isCurrentReaction: boolean;

        @Prop({
            type: Number,
            default: OkManageProfileButtonSize.medium
        }) readonly size: OkManageProfileButtonSize;

        OkManageProfileButtonSize = OkManageProfileButtonSize;


        mounted() {

        }

        onPressed() {
            this.$emit("onPressed", this.emojiCount);
        }

        get isSmallSize() {
            return this.size === OkManageProfileButtonSize.small;
        }

        get reactionImageClass() {
            return this.isSmallSize ? "is-12x12" : "is-16x16";
        }


    }
</script>
