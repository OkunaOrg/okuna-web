<template>
    <div class="has-padding-right-20 has-padding-left-20 has-padding-top-10 has-padding-bottom-10 ok-has-text-primary-invert-60 is-flex align-items-center is-size-7">
        <span>{{$t('components.post_comments_sort_switcher.showing')}}</span>
        <div class="has-padding-10">
            <b-dropdown aria-role="list">
                <button
                        class="button is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert-60 is-borderless is-small"
                        slot="trigger" slot-scope="{ active }"
                >
                    <ok-menu-down-icon class="ok-svg-icon-primary-invert-60 is-icon-2x"></ok-menu-down-icon>
                    <span class="has-padding-left-5">
                            {{currentPostCommentSortSettingText}}
                        </span>
                </button>


                <b-dropdown-item aria-role="button"
                                 v-for="(postCommentSortSetting, localizationString)  in postCommentSortSettingLocalizationObject"
                                 v-if="localizationString !== currentPostCommentSortSettingText"
                                 @click="setPostCommentsSortSetting(postCommentSortSetting)"
                >
                    {{localizationString}}
                </b-dropdown-item>
            </b-dropdown>
        </div>
        <span>{{$t('components.post_comments_sort_switcher.first')}}</span>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPost } from "~/models/posts/post/IPost";
    import { PostCommentsSortSetting } from "~/services/user-preferences-service/libs/PostCommentsSortSetting";
    import { IUserPreferencesService } from "~/services/user-preferences-service/IUserPreferencesService";

    @Component({
        name: "OkPostCommentsSortSwitcher",
        subscriptions: function () {
            return {
                postCommentsSortSetting: this.userPreferencesService.postCommentsSortSetting
            }
        }
    })
    export default class OkPostCommentsSortSwitcher extends Vue {

        @Prop(Object) readonly post: IPost;

        private userPreferencesService: IUserPreferencesService = okunaContainer.get<IUserPreferencesService>(TYPES.UserPreferencesService);

        setPostCommentsSortSetting(postCommentSortSetting: PostCommentsSortSetting) {
            this.userPreferencesService.setPostCommentsSortSetting(postCommentSortSetting);
        }

        get currentPostCommentSortSettingText() {
            return this.postCommentSortSettingLocalizationMap.get(this.$observables["postCommentsSortSetting"].value);
        }

        get postCommentSortSettingLocalizationObject() {
            const object = {};
            this.postCommentSortSettingLocalizationMap.forEach((value, key) => {
                object[value] = key;
            });
            return object;
        }

        private get postCommentSortSettingLocalizationMap(): Map<PostCommentsSortSetting, String> {
            return this.userPreferencesService.getPostCommentsSortSettingLocalizationMap();
        }


    }
</script>



