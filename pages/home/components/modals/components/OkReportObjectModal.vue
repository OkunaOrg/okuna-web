<template>
    <div class="is-flex justify-center align-items-center has-height-100-percent">
        <div class="ok-has-background-primary is-semi-rounded is-relative has-height-100-percent">
            <div
                    class="box ok-has-background-primary-highlight is-paddingless ok-report-object-modal has-height-100-percent-mobile"
                    ref="modalBoxContainer">
                <template v-if="!selectedModerationCategory">
                    <div class="content is-small is-marginless">
                        <h3 class="ok-has-text-primary-invert has-text-weight-bold has-padding-20 is-marginless">
                            {{$t('components.report_object_modal.why', {objectName:
                            reportedObjectInstanceTypeToString})}}
                        </h3>
                    </div>
                    <ok-moderation-categories-list
                            @onModerationCategoryClicked="onModerationCategoryClicked"></ok-moderation-categories-list>
                </template>
                <div v-else class="has-padding-20 content is-small">
                    <ok-report-object-form :object="params.object" :extra-data="params.extraData"
                                           :moderation-category="selectedModerationCategory"
                                           @onObjectReported="onObjectReported"></ok-report-object-form>
                </div>
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
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import OkModerationCategoriesList from "~/components/lists/OkModerationCategoriesList.vue";
    import { IModerationCategory } from "~/models/moderation/moderation_category/IModerationCategory";
    import OkReportObjectForm from "~/components/forms/OkReportObjectForm.vue";
    import { IToastService } from "~/services/toast/IToastService";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { IUtilsService } from "~/services/utils/IUtilsService";

    @Component({
        name: "OkReportObjectModal",
        components: {OkReportObjectForm, OkModerationCategoriesList, OkPostTheatre},
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

        $el: HTMLElement;
        $refs!: {
            modalBoxContainer: HTMLElement
        };

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        requestInProgress = false;
        selectedModerationCategory: IModerationCategory = null;


        onModerationCategoryClicked(moderationCategory: IModerationCategory) {
            this.selectedModerationCategory = moderationCategory;
            this.$nextTick(() => {
                this.$refs.modalBoxContainer.scrollTo(0,0 );
            });
        }

        onObjectReported(object: any) {
            this.$parent["close"]();
            if(this.params.onObjectReported) this.params.onObjectReported(object);
        }


        get reportedObjectInstanceTypeToString() {
            return this.utilsService.convertModelInstanceTypeToString(this.params.object, false);
        }
    }
</script>