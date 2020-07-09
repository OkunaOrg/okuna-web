<template>
    <form @submit.prevent="onSubmit" class="content">
        <h3 class="ok-has-text-primary-invert has-text-weight-bold">
            {{$t('forms.report_object.provide_additional_details')}}
        </h3>
        <div class="field">
            <label for="description" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                {{ descriptionLabel }}
            </label>
            <div class="control">
                      <textarea
                              style="resize: none; height: auto;"
                              rows="3"
                              name="description"
                              class="input ok-input"
                              id="reportObjectDescription"
                              :placeholder="placeholderText"
                              v-model="reportDescription"
                              @focus="inputIsFocused = true"
                              @blur="inputIsFocused = false"
                      >
                        </textarea>
            </div>
            <p class="help is-danger has-text-left"
               v-if="!$v.reportDescription.maxLength && $v.reportDescription.$dirty">
                {{$t('global.errors.moderation_report_description.max_length')}}
            </p>
        </div>
        <h4 class="ok-has-text-primary-invert">
            {{$t('forms.report_object.heres_what_happens_next')}}
        </h4>
        <ul class="ok-has-text-primary-invert">
            <li>
                            <span>
                                {{$t('forms.report_object.report_submitted_anon')}}
                            </span>
            </li>
            <li>
                            <span>
                                {{$t('forms.report_object.if_reporting_post_or_comment')}}
                            </span>
            </li>
            <li>
                            <span>
                                {{$t('forms.report_object.if_reporting_account_or_community')}}
                            </span>
            </li>
            <li>
                            <span>
                                {{$t('forms.report_object.we_will_review_it')}}
                            </span>
            </li>
            <li>
                            <span>
                                {{$t('forms.report_object.if_report_approved')}}
                            </span>
            </li>
        </ul>
        <div class="field has-padding-top-20">
            <button class="button ok-has-background-accent-gradient is-rounded is-fullwidth has-text-weight-bold has-text-white"
                    type="submit"
                    :class="{'is-disabled' : submitInProgress}" :disabled="submitInProgress">
                {{$t('forms.report_object.i_understand_submit')}}
            </button>
        </div>
    </form>
</template>

<style lang="scss">


</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import OkResizableTextArea from "~/components/OkResizableTextarea.vue";
    import { moderationReportDescriptionValidators } from "~/validators/moderation-report-description";
    import { IModerationCategory } from "~/models/moderation/moderation_category/IModerationCategory";
    import { Post } from "~/models/posts/post/Post";
    import { PostComment } from "~/models/posts/post-comment/PostComment";
    import { User } from "~/models/auth/user/User";
    import { Community } from "~/models/communities/community/Community";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { Hashtag } from "~/models/common/hashtag/Hashtag";

    @Component({
        name: "OkReportObjectForm",
        components: {OkResizableTextArea}
    })
    export default class OkReportObjectForm extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly object: any;

        @Prop({
            type: Object,
            required: false
        }) readonly extraData: {[key: string]: any};

        @Prop({
            type: Object,
            required: true
        }) readonly moderationCategory: IModerationCategory;


        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        reportOperation?: CancelableOperation<void>;

        formWasSubmitted = false;
        submitInProgress = false;

        @Validate(moderationReportDescriptionValidators)
        reportDescription = "";


        destroyed() {
            if (this.reportOperation) this.reportOperation.cancel();
        }

        async onSubmit() {
            if (this.submitInProgress) return;
            this.submitInProgress = true;

            const formIsValid = await this._validateAll();

            this.formWasSubmitted = true;
            if (formIsValid) {
                await this._onSubmitWithValidForm();
            }

            this.submitInProgress = false;
        }

        async _onSubmitWithValidForm() {
            if (this.reportOperation) return;

            try {

                let reportPromise;

                if (this.object instanceof Post) {
                    reportPromise = this.userService.reportPost({
                        post: this.object,
                        description: this.reportDescription,
                        moderationCategory: this.moderationCategory,
                    });
                } else if (this.object instanceof PostComment) {
                    const post = this.extraData["post"];
                    if (!post) throw Error("Reporting a post comment requires a post");

                    reportPromise = this.userService.reportPostComment({
                        post: post,
                        postComment: this.object,
                        description: this.reportDescription,
                        moderationCategory: this.moderationCategory,
                    });

                } else if (this.object instanceof User) {
                    reportPromise = this.userService.reportUser({
                        user: this.object,
                        description: this.reportDescription,
                        moderationCategory: this.moderationCategory,
                    });
                } else if (this.object instanceof Community) {
                    reportPromise = this.userService.reportCommunity({
                        community: this.object,
                        description: this.reportDescription,
                        moderationCategory: this.moderationCategory,
                    });

                } else if (this.object instanceof Hashtag) {
                    reportPromise = this.userService.reportHashtag({
                        hashtag: this.object,
                        description: this.reportDescription,
                        moderationCategory: this.moderationCategory,
                    });

                } else {
                    throw new Error("Object type not supported to report");
                }

                this.object.isReported = true;


                this.reportOperation = CancelableOperation.fromPromise<void>(reportPromise);
                await this.reportOperation.value;
                this._onObjectReported();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.reportOperation = undefined;
            }
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }


        _onObjectReported() {
            this.$emit("onObjectReported", this.object);
        }

        get placeholderText() {
            return this.localizationService.localize("global.snippets.type_here");
        }

        get descriptionLabel() {
            return this.localizationService.localize("global.keywords.description");
        }
    }
</script>
