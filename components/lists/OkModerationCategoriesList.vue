<template>
    <ok-http-list
            :show-no-more="false"
            :refresher="refresher">
        <div slot-scope="props">
            <ok-tile :on-click="()=>{ onModerationCategoryClicked(props.item)}">
                <template v-slot:content>
                    <div class="ok-has-text-primary-invert has-text-weight-bold">
                        {{props.item.title}}
                    </div>
                    <div class="ok-has-text-primary-invert-80">{{props.item.description}}</div>
                </template>
            </ok-tile>
        </div>
    </ok-http-list>
</template>

<style lang="scss">
</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { ReportObjectModalParams } from "~/services/modal/IModalService";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import OkLoadingIndicator from "../utils/OkLoadingIndicator.vue";
    import OkTile from "../tiles/OkTile.vue";
    import OkHttpList from "../http-list/OkHttpList.vue";
    import { IModerationCategory } from "../../models/moderation/moderation_category/IModerationCategory";
    import { IUserService } from "../../services/user/IUserService";

    @Component({
        name: "OkModerationCategoriesList",
        components: {OkHttpList, OkTile, OkLoadingIndicator, OkPostTheatre},
    })
    export default class OkModerationCategoriesList extends Vue {
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        refresher(): Promise<IModerationCategory[]> {
            return this.userService.getModerationCategories();
        }

        onModerationCategoryClicked(moderationCategory: IModerationCategory) {
            this.$emit("onModerationCategoryClicked", moderationCategory);
        }
    }
</script>