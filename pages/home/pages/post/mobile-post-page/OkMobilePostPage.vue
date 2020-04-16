<template>
    <section>
        <ok-post v-if="post" :post="post"></ok-post>
    </section>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils-service/IUtilsService";
    import { IUser } from "~/models/auth/user/IUser";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import OkPost from '~/components/post/Post.vue';

    @Component({
        name: "OkMobilePostPage",
        components: {OkPost},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkMobilePostPage extends Vue {

        @Prop({
            type: String,
            required: true
        }) readonly postUuid: string;

        $route!: Route;
        requestInProgress = false;
        post: IPost = null;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private refreshPostOperation?: CancelableOperation<IPost>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUser);
        }

        onLoggedInUser(loggedInUser: IUser) {
            if (loggedInUser) this.refreshPost();
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



