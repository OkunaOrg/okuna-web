<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <div class="has-padding-20">
                <h2 class="is-size-5 ok-has-text-primary-invert has-text-weight-bold">
                    {{ modalTitle }}
                </h2>
            </div>

            <form @submit="handleFormSubmit">
                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="circleName" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-circle-name-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-circle-name-icon>
                                {{ $t('manage_circles.circle_details_form.name.label') }}
                            </label>

                            <div class="control">
                                <input type="text"
                                    :placeholder="$t('manage_circles.circle_details_form.name.placeholder')"
                                    class="input ok-input is-rounded"
                                    required
                                    id="circleName" v-model="circleName" />
                            </div>

                            <div v-if="$v.circleName.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.circleName.required">
                                    {{ requiredError }}
                                </p>

                                <p class="help is-danger" v-if="!$v.circleName.maxLength">
                                    {{ maxLengthError }}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile :onClick="activateColorPicker" class="is-relative">
                    <template v-slot:leading>
                        <ok-circle-color-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-circle-color-icon>
                    </template>

                    <template v-slot:content>
                        <div class="ok-has-text-primary-invert">
                            {{ $t('manage_circles.circle_details_form.color.label') }}
                        </div>
                    </template>

                    <template v-slot:trailing>
                        <ok-color-selector
                            ref="colorSelector"
                            @change="handleColorChange"
                            id="colorString"
                        />
                    </template>
                </ok-tile>

                <ok-tile>
                    <template v-slot:content>
                        <div class="columns">
                            <div class="column">
                                <button
                                    class="button is-rounded is-borderless has-width-100-percent ok-has-background-primary-highlight ok-has-text-primary-invert"
                                    @click.prevent="handleCancelClick"
                                >
                                    {{ $t('global.keywords.cancel') }}
                                </button>
                            </div>

                            <div class="column">
                                <button
                                    class="button is-rounded is-borderless has-width-100-percent ok-has-background-accent has-text-white has-text-weight-bold"
                                    :disabled="requestInProgress"
                                >{{ $t('global.keywords.save') }}</button>
                            </div>
                        </div>
                    </template>
                </ok-tile>
            </form>

            <div class="has-padding-20" v-if="hasTrailingSlot">
                <slot name="trailing"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import { Validate } from 'vuelidate-property-decorators';
    import { circleNameMaxLength, circleNameValidators } from '~/validators/circle-name';

    import OkTile from '~/components/tiles/OkTile.vue';
    import OkColorSelector from '~/components/input/OkColorSelector.vue';

    import Color from 'color';

    import { CreateConnectionsCircleParams } from '~/services/user/UserServiceTypes';
    import { ICircle } from '~/models/connections/circle/ICircle';

    @Component({
        name: 'OkCircleDetailsForm',
        components: {
            OkTile,
            OkColorSelector
        }
    })
    export default class OkCircleDetailsForm extends Vue {
        $refs!: {
            colorSelector: OkColorSelector
        };

        @Prop({
            type: String,
            required: true
        }) readonly modalTitle: string;

        @Prop({
            type: Object,
            required: false
        }) readonly circle?: ICircle;

        @Prop({
            type: Boolean,
            required: true
        }) readonly requestInProgress: boolean;

        formWasSubmitted: boolean = false;

        @Validate(circleNameValidators)
        circleName: string = '';

        colorString: string = '';

        mounted() {
            if (this.circle) {
                this.circleName = this.circle.name;

                if (this.circle.color) {
                    this.colorString = this.circle.color.hex();
                    this.$refs.colorSelector.set(this.colorString);
                }
            }
        }

        get hasTrailingSlot() {
            return !!this.$slots.trailing;
        }

        handleColorChange(color: string) {
            this.colorString = color;
        }

        private buildConnectionsCircleDetails(): CreateConnectionsCircleParams {
            return {
                name: this.circleName,
                color: Color(this.colorString)
            };
        }

        activateColorPicker() {
            this.$refs.colorSelector.click();
        }

        handleCancelClick(e: Event) {
            this.$emit('cancel');
        }

        async handleFormSubmit(e: Event) {
            e.preventDefault();

            if (this.requestInProgress) {
                return;
            }

            this.formWasSubmitted = true;
            const isValid = this._validateAll();

            if (!isValid) {
                return;
            }

            const connectionsCircleDetails = this.buildConnectionsCircleDetails();
            this.$emit('submit', connectionsCircleDetails);

            this.formWasSubmitted = false;
        }

        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }

        get requiredError() {
            return this.$t('global.errors.circle_name.required');
        }

        get maxLengthError() {
            return this.$t('global.errors.circle_name.max_length', {
                max: circleNameMaxLength
            });
        }
    }
</script>
