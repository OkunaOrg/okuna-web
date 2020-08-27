<template>
    <div class="ok-post-creator-content has-height-100-percent is-flex flex-direction-column">
        <div class="ok-post-creator-content-body columns is-paddingless is-marginless is-mobile is-flex-1">
            <div class="column is-narrow">
                <div>
                    <ok-logged-in-user-avatar/>
                </div>
                <div>
                    100
                </div>
            </div>
            <div class="column">
                <div>
                    Text
                </div>
                <div>
                    Image
                </div>
            </div>
        </div>
        <div class="columns is-multiline is-mobile is-paddingless is-marginless">
           <div class="column is-narrow">
               <button>
                   Media
               </button>
           </div>
            <div class="column is-narrow">
                <button>
                    Camera
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUser } from "~/models/auth/user/IUser";
    import { OkPostCreatorParams, OkPostCreatorStep } from "~/components/post-creator/lib/OkPostCreatorTypes";
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkLoggedInUserAvatar from '~/components/avatars/logged-in-user-avatar/OkLoggedInUserAvatar.vue';

    @Component({
        name: "OkPostCreatorContent",
        components: {OkLoggedInUserAvatar},
    })
    export default class OkPostCreatorContent extends Vue {


    }
</script>
