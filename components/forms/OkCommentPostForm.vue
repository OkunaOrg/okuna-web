<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label for="text" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                {{ titleText }}
            </label>
            <div class="control">
                <ok-resizable-text-area>
                              <textarea
                                      name="text"
                                      class="input ok-input"
                                      id="commentPostText"
                                      required
                                      :placeholder="placeholderText"
                                      v-model="text"
                                      @focus="inputIsFocused = true"
                                      @blur="inputIsFocused = false"
                              >
                        </textarea>
                </ok-resizable-text-area>
            </div>
            <p class="help is-danger has-text-left" v-if="!$v.text.required && $v.text.$dirty">
                {{$t('global.errors.post_comment_text.required')}}
            </p>
            <p class="help is-danger has-text-left" v-if="!$v.text.maxLength && $v.text.$dirty">
                {{$t('global.errors.post_comment_text.max_length')}}
            </p>
        </div>
        <!-- Main container -->
        <nav class="level is-mobile" v-if="inputIsFocused || text">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">
                        <ok-character-count :max-characters="postCommentMaxLength"
                                            :character-count="text.length"></ok-character-count>
                    </p>
                </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
                <div class="level-item">
                    <button class="button is-success is-rounded ok-has-background-accent-gradient has-text-weight-bold is-small"
                            type="submit"
                            :class="{'is-disabled' : submitInProgress}"
                            :disabled="this.$v.$invalid || submitInProgress"
                    >
                        {{ submitText }}
                    </button>
                </div>
            </div>
        </nav>
    </form>
</template>

<style lang="scss">
    .is-circular {
        width: 35px !important;
        height: 35px !important;
        border-radius: 500px !important;
    }

</style>

<script lang="ts">
    import { Validate } from "vuelidate-property-decorators";
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { postCommentMaxLength, postCommentValidators } from "~/validators/post-comment";
    import OkResizableTextArea from "~/components/OkResizableTextarea.vue";
    import OkCharacterCount from "~/components/OkCharacterCount.vue";
    import { IOkLogger } from "~/services/logging/types";
    import { ILoggingService } from "~/services/logging/ILoggingService";

    @Component({
        name: "OkCommentPostForm",
        components: {OkCharacterCount, OkResizableTextArea}
    })
    export default class OkCommentPostForm extends Vue {

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;
        @Prop(Object) readonly replyToPostComment: IPostComment;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;


        commentPostOperation?: CancelableOperation<IPostComment>;

        postCommentMaxLength = postCommentMaxLength;

        inputIsFocused = false;
        isPostCommentReply = false;
        formWasSubmitted = false;
        submitInProgress = false;

        @Validate(postCommentValidators)
        text = "";


        replyToReplyPrependedMention = "";

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "PostCommenter"
            });
        }

        destroyed() {
            if (this.commentPostOperation) this.commentPostOperation.cancel();
        }

        @Watch("postComment")
        onPostCommentChanged(val: IPostComment, oldVal: IPostComment) {
            this.isPostCommentReply = !!val;
        }

        @Watch("replyToPostComment")
        onReplyToPostCommentChanged(val: IPostComment, oldVal: IPostComment) {
            if (val) {
                this.replyToReplyPrependedMention = `@${this.postComment.commenter.username}`;
                this.text = `${this.replyToReplyPrependedMention} ${this.text}`
            } else if (oldVal) {
                // If we had a parentPostComment and all of the sudden we dont anymore
                if (this.text.startsWith(this.replyToReplyPrependedMention)) {
                    // Remove previously added mention on beginning of comment
                    this.text = this.text.replace(this.replyToReplyPrependedMention, "");
                }
                this.replyToReplyPrependedMention = "";
            }
        }

        get placeholderText() {
            return this.isPostCommentReply ?
                this.$t("forms.comment_post.placeholder_reply") :
                this.$t("forms.comment_post.placeholder")
        }

        get submitText() {
            return this.isPostCommentReply ?
                this.$t("forms.comment_post.submit_reply") :
                this.$t("forms.comment_post.submit")
        }

        get titleText() {
            return this.isPostCommentReply ?
                this.$t("forms.comment_post.title_reply") :
                this.$t("forms.comment_post.title")
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
            if (this.commentPostOperation) return;

            try {
                this.commentPostOperation = CancelableOperation.fromPromise<IPostComment>(
                    this.postComment ? this.userService.replyToPostComment({
                        text: this.text,
                        post: this.post,
                        postComment: this.postComment
                    }) : this.userService.commentPost({
                        text: this.text,
                        post: this.post
                    })
                );
                const postComment = await this.commentPostOperation.value;
                this._onCommentedPost(postComment, this.postComment);
                this.$v.$reset();
                this.reset();
            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.commentPostOperation = undefined;
            }
        }


        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }

        reset() {
            this.text = "";
            this.replyToReplyPrependedMention = "";
        }

        prependToText(value: string) {
            this.text = value + this.text;
        }

        unprependFromText(value: string) {
            if (this.text.startsWith(value)) {
                this.text = this.text.replace(value, "");
            }
        }

        _onCommentedPost(postComment: IPostComment, parentPostComment: IPostComment) {
            this.logger.info("Commented post", postComment, parentPostComment);
            this.$emit("onCommentedPost", postComment, parentPostComment);
        }
    }
</script>
