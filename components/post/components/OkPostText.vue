<template>
    <div class="content ok-has-text-primary-invert">
        <ok-translatable-smart-text :initial-text="post.text"
                                    :can-translate-text="canTranslatePost"
                                    :translate-text="translatePostText"
        >
        </ok-translatable-smart-text>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import {Component, Prop, Vue} from "nuxt-property-decorator"
    import {IPost} from "~/models/posts/post/IPost";
    import {okunaContainer} from "~/services/inversify";
    import {TYPES} from "~/services/inversify-types";
    import {IUserService} from "~/services/user/IUserService";
    import {BehaviorSubject} from "rxjs";
    import {IUser} from "~/models/auth/user/IUser";
    import OkTranslatableSmartText from "~/components/smart-text/OkTranslatableSmartText.vue";

    @Component({
        name: "OkPostText",
        components: {OkTranslatableSmartText},
        subscriptions: function() {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        async translatePostText() {
            return await this.userService.translatePost({post: this.post});
        }

        get canTranslatePost() {
            return this.$observables.loggedInUser?.value?.canTranslatePost(this.post);
        }
    }
</script>
