<template>
    <div class="notification-reaction">
        <figure class="image is-24x24">
            <img :src="emoji.image" :alt="emoji.keyword" :title="emoji.keyword" />
        </figure>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import { IEmoji } from "~/models/common/emoji/IEmoji";

    @Component({
        name: "OkNotificationReaction"
    })
    export default class OkNotificationReaction extends Vue {
        @Prop(Object) readonly emoji: IEmoji;
    }
</script>

<style lang="scss" scoped>
    .notification-reaction {
        height: 32px;
        display: flex;
        align-items: center;
    }
</style>
