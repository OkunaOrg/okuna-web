<template>
    <button
            class="button is-rounded is-fullwidth has-text-weight-bold justify-center align-items-center ok-new-post-button is-paddingless"
            :style="buttonCssStyle"
            :class="buttonCssClass"
            @click="onButtonClicked"
    >
        <ok-plus-icon
                class="is-icon-2n5x"></ok-plus-icon>
        <span class="has-padding-left-10 is-hidden">{{$t('global.snippets.create_post')}}</span>
    </button>
</template>

<style lang="scss">
    .ok-new-post-button {
        height: 4rem !important;
        width: 4rem !important;
    }
</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { IModalService } from "~/services/modal/IModalService";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IThemeService } from "~/services/theme/IThemeService";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { IPostUploaderService } from "~/services/post-uploader/IPostSubmitterService";


    @Component({
        name: "OkNewPostButton",
        components: {},
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme
            }
        }
    })
    export default class OkNewPostButton extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly community: ICommunity;


        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private postUploaderService: IPostUploaderService = okunaContainer.get<IPostUploaderService>(TYPES.PostUploaderService);

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined | null>,
            activeTheme: BehaviorSubject<ITheme | undefined>
        };

        async onButtonClicked() {
            const postStudioData = await this.modalService.openPostStudioModal({
                community: this.community,
            });

            if (postStudioData) {
                const postUpload = this.postUploaderService.uploadPost(postStudioData);
                postUpload.start();
            }
        }


        get buttonCssStyle() {
            let style = {
                color: "white"
            };

            if (!this.community) return style;

            const activeTheme = this.$observables.activeTheme.value;
            const themeColorIsCommunityColor = this.community.color.hex() === activeTheme.primaryColor.hex();

            style["background-image"] = "none";
            style["backgroundColor"] = themeColorIsCommunityColor ? activeTheme.primaryHighlightColor.hsl().string() : this.community.color.hex();
            style["color"] = themeColorIsCommunityColor ? activeTheme.primaryInvertColor.hex() : this.community.colorInvert.hex();

            return style;
        }

        get buttonCssClass() {
            return this.community ? "" : "ok-has-background-accent-gradient";
        }

    }
</script>



