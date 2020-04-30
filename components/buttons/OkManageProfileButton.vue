<template>
    <button @click="onPressed"
            class="button is-rounded is-small ok-has-background-primary-highlight is-borderless"
    >
        ManageProfile
    </button>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IReactionsEmojiCount } from "~/models/posts/reactions-emoji-count/IReactionsEmojiCount";


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


        mounted() {

        }

        onPressed() {
            this.$emit("onPressed", this.emojiCount);
        }



    }
</script>
