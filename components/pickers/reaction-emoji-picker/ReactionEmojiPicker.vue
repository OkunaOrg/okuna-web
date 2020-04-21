<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-reaction-picker ok-has-background-primary-highlight"
                :class="{'is-loading': isLoading || requestInProgress, 'has-width-100-percent': isFullWidth}">
            <div v-for="reactionEmojiGroup in reactionEmojiGroups" :key="reactionEmojiGroup.id">
                <div>
                    <span class="has-text-weight-bold ok-has-text-primary-invert">{{ reactionEmojiGroup.keyword }}</span>
                </div>
                <div class="is-flex wrap">
                    <div role="button"
                         v-for="reactionEmoji in reactionEmojiGroup.emojis"
                         :key="reactionEmoji.id"
                         class="is-flex has-cursor-pointer has-padding-right-20 has-padding-bottom-10 has-padding-top-10"
                         @click="onReactionEmojiPressed(reactionEmoji)"
                    >
                        <figure class="image is-24x24">
                            <img :src="reactionEmoji.image" :alt="reactionEmoji.keyword">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-reaction-picker {
        width: 358px;
        height: 250px;
        overflow-x: hidden;
        overflow-y: auto;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IEmojiGroup } from "~/models/common/emoji-group/IEmojiGroup";
    import { IEmoji } from "~/models/common/emoji/IEmoji";

    @Component({
        name: "OkReactionEmojiPicker",
    })
    export default class OkReactionEmojiPicker extends Vue {

        @Prop(String) readonly text: string;
        @Prop({
            type: Boolean,
            default: false
        }) readonly isFullWidth: string;

        @Prop({
            type: Boolean,
            default: false
        }) readonly isLoading: boolean;

        reactionEmojiGroups: IEmojiGroup[] = [];

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        private requestReactionEmojiGroupsOperation?: CancelableOperation<IEmojiGroup[]>;

        requestInProgress = false;

        mounted() {
            this.getReactionEmojiGroups();
        }

        destroyed() {
            if (this.requestReactionEmojiGroupsOperation) this.requestReactionEmojiGroupsOperation.cancel();
        }

        onReactionEmojiPressed(emoji: IEmoji) {
            this.$emit("onReactionPicked", emoji);
        }

        private async getReactionEmojiGroups() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.requestReactionEmojiGroupsOperation = CancelableOperation.fromPromise(this.userService.getReactionEmojiGroups());
                const reactionEmojiGroups = await this.requestReactionEmojiGroupsOperation.value;
                this.reactionEmojiGroups = reactionEmojiGroups;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestReactionEmojiGroupsOperation = null;
                this.requestInProgress = false;
            }
        }
    }
</script>
