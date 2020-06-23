<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-has-background-primary-highlight is-paddingless">
            <ok-report-post-tile :post="post"></ok-report-post-tile>

            <ok-tile :on-click="onWantsToDeletePost">
                <template v-slot:leading>
                    <ok-delete-icon
                            class="ok-svg-icon-primary-invert"></ok-delete-icon>
                </template>

                <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.post_actions.delete_post')}}
                            </span>
                </template>
            </ok-tile>

        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkTile from "~/components/tiles/OkTile.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import OkReportPostTile from '~/components/tiles/action/OkReportPostTile.vue';

    @Component({
        name: "OkPostActions",
        components: {OkReportPostTile, OkTile},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkPostActions extends Vue {


        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        get canReportPost() {

        }

        onWantsToReportPost() {

        }

        get canDeletePost() {

        }

        onWantsToDeletePost() {

        }

    }
</script>