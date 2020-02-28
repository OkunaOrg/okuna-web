<template>
    <article
            class="box ok-has-background-primary is-paddingless has-height-100-percent is-flex has-overflow-hidden"
            :class="{'is-loading': requestInProgress}"
    >
        <div class="columns has-width-100-percent is-gapless" v-if="post">
            <div class="column has-height-100-percent" v-if="post.mediaThumbnail">
                <ok-post-theatre-media :post="post"></ok-post-theatre-media>
            </div>
            <div class="column is-narrow ok-post-theatre-sidebar-container">
                <ok-post-theatre-sidebar :post="post"></ok-post-theatre-sidebar>
            </div>
        </div>

    </article>
</template>

<style lang="scss" scoped>

    .ok-post-theatre-media-container{

    }


    .ok-post-theatre-sidebar-container{
        max-width: 450px;
        min-width: 350px;
        min-height: 100%;
        max-height: 100%;
        overflow: hidden;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils-service/IUtilsService";
    import { IUser } from "~/models/auth/user/IUser";
    import OkPostTheatreSidebar from '~/components/post-theatre/post-theatre-sidebar/OkPostTheatreSidebar.vue';
    import OkPostTheatreMedia from '~/components/post-theatre/post-theatre-media/OkPostTheatreMedia.vue';

    @Component({
        name: "OkPostTheatre",
        components: {OkPostTheatreMedia, OkPostTheatreSidebar},
    })
    export default class OkPostTheatre extends Vue {
        @Prop(String) readonly postUuid: string;
        @Prop(String) readonly postCommentId: string;

        @Prop({
            type: Boolean,
            default: false,
        }) readonly postCommentReplies: boolean;

        @Prop(Number) readonly postCommentReplyId: number;

        requestInProgress = false;
        post: IPost = null;

        private refreshPostOperation?: CancelableOperation<IPost>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        mounted() {
            this.userService.loggedInUser.subscribe(this.onLoggedInUser);
        }

        onLoggedInUser(loggedInUser: IUser) {
            if(loggedInUser) this.refreshPost();
        }

        destroyed() {
            if (this.refreshPostOperation) this.refreshPostOperation.cancel();
        }


        private async refreshPost() {
            if (this.requestInProgress) return;

            this.requestInProgress = true;

            try {
                this.refreshPostOperation = CancelableOperation.fromPromise(this.userService.getPost({
                    postUuid: this.postUuid
                }));

                const post = await this.refreshPostOperation.value;
                this.post = post;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.refreshPostOperation = null;
                this.requestInProgress = false;
            }
        }


    }
</script>
