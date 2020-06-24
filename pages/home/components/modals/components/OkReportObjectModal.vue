<template>
    <div class="is-flex justify-center align-items-center has-height-100-percent">
        <div class="ok-has-background-primary is-semi-rounded is-relative has-height-100-percent">
            <div
                    class="box ok-has-background-primary-highlight is-paddingless ok-report-object-modal has-height-100-percent-mobile">
                <template v-if="!moderationCategory">
                    <h3 class="ok-has-text-primary-invert is-size-5 has-text-weight-bold has-padding-20">
                        {{$t('components.report_object_modal.why', {objectName: reportedObjectInstanceTypeToString})}}
                    </h3>
                    <ok-moderation-categories-list
                            @onModerationCategoryClicked="onModerationCategoryClicked"></ok-moderation-categories-list>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-report-object-modal {
        overflow-x: scroll;
        max-height: 500px;
        max-width: 350px;
        width: 100%;
    }
</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import { ReportObjectModalParams } from "~/services/modal/IModalService";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import OkModerationCategoriesList from "~/components/lists/OkModerationCategoriesList.vue";
    import { IModerationCategory } from "~/models/moderation/moderation_category/IModerationCategory";

    @Component({
        name: "OkReportObjectModal",
        components: {OkModerationCategoriesList, OkPostTheatre},
    })
    export default class OkReportObjectModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: ReportObjectModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        private requestOperation?: CancelableOperation<Promise | void>;
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestInProgress = false;
        selectedModerationCategory: IModerationCategory;
        moderationDescription = "";


        onModerationCategoryClicked(moderationCategory: IModerationCategory) {
            this.selectedModerationCategory = moderationCategory;
        }


        get reportedObjectInstanceTypeToString() {
            return this.utilsService.convertModelInstanceTypeToString(this.params.object, false);
        }
    }
</script>