<template>
    <article class="columns is-centered has-height-100-percent is-gapless is-marginless">
        <ok-loading-indicator v-if="!latestPost"> </ok-loading-indicator>
        <div v-else class="column has-height-100-percent ok-post-theatre-container" :class="{'is-narrow' : !latestPost.mediaThumbnail}">
            <div
                    class="has-height-100-percent">
                <div
                        id="wtf"
                        class="box ok-has-background-primary is-paddingless has-height-100-percent is-flex has-overflow-hidden"
                        :class="{'is-loading': requestInProgress}"
                >
                    <div class="columns has-width-100-percent is-gapless" v-if="latestPost">
                        <div class="column has-height-100-percent" v-if="latestPost.mediaThumbnail">
                            <ok-post-theatre-media :post="latestPost"></ok-post-theatre-media>
                        </div>
                        <div class="column is-narrow ok-post-theatre-sidebar-container" :class="sidebarClass">
                            <ok-post-theatre-sidebar :post="latestPost"></ok-post-theatre-sidebar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>

    .ok-post-theatre-container {
        max-width: 1444px;
    }


    .ok-post-theatre-sidebar-container {
        min-height: 100%;
        max-height: 100%;
        overflow: hidden;

        &--media{
            max-width: 425px;
            min-width: 425px;
        }

        &--text{
            max-width: 500px;
            min-width: 500px;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUser } from "~/models/auth/user/IUser";
    import OkPostTheatreSidebar from "~/components/post-theatre/post-theatre-sidebar/OkPostTheatreSidebar.vue";
    import OkPostTheatreMedia from "~/components/post-theatre/post-theatre-media/OkPostTheatreMedia.vue";
    import OkLoadingIndicator from '~/components/utils/OkLoadingIndicator.vue';

    @Component({
        name: "OkPostTheatre",
        components: {OkLoadingIndicator, OkPostTheatreMedia, OkPostTheatreSidebar},
    })
    export default class OkPostTheatre extends Vue {
        @Prop(String) readonly postUuid: string;
        @Prop(Object) readonly post: IPost;

        @Prop({
            type: Boolean,
            default: false,
        }) readonly postCommentReplies: boolean;

        @Prop(Number) readonly postCommentReplyId: number;

        requestInProgress = false;
        latestPost: IPost = null;

        private refreshPostOperation?: CancelableOperation<IPost>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        async mounted() {
            if (!this.post) {
                this.userService.loggedInUser.subscribe(this.onLoggedInUser);
            } else {
                this.latestPost = this.post;

                await this.$nextTick(() => {
                    if (this.post.mediaThumbnail && this.$parent?.$parent?.$el?.classList?.contains('ok-modal')) {
                        this.$parent.$parent.$el.classList.add('ok-post-modal-with-media');
                    }
                });
            }
        }

        @Watch("postUuid")
        onPostUuidChange(val: string, oldVal: string) {
            this.latestPost = null;
            if(val){
                this.refreshPost();
            }
        }

        onLoggedInUser(loggedInUser: IUser) {
            if (loggedInUser) this.refreshPost();
        }

        destroyed() {
            if (this.refreshPostOperation) this.refreshPostOperation.cancel();
        }

        get sidebarClass(){
            return this.latestPost.mediaThumbnail ? 'ok-post-theatre-sidebar-container--media' : 'ok-post-theatre-sidebar-container--text';
        }


        private async refreshPost() {
            if (this.requestInProgress) return;

            this.requestInProgress = true;

            try {
                this.refreshPostOperation = CancelableOperation.fromPromise(this.userService.getPost({
                    postUuid: this.postUuid
                }));

                this.latestPost = await this.refreshPostOperation.value;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.refreshPostOperation = null;
                this.requestInProgress = false;
            }
        }




    }
</script>
