<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <div class="has-padding-20">
                <h2 class="is-size-5 ok-has-text-primary-invert has-text-weight-bold">
                    Create Circle
                </h2>
            </div>

            <form @submit="handleFormSubmit">
                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="circleName" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-circle-name-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-circle-name-icon>
                                Name
                            </label>

                            <div class="control">
                                <input type="text"
                                    placeholder="e.g. Friends, Family, Work"
                                    class="input ok-input is-rounded"
                                    required
                                    id="circleName" v-model="circleName" />
                            </div>

                            <div v-if="$v.circleName.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.circleName.required">
                                    Name is required
                                </p>

                                <p class="help is-danger" v-if="!$v.circleName.maxLength">
                                    Name cannot be more than 100 characters long
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
                            Color
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
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    import { Validate } from 'vuelidate-property-decorators';
    import { circleNameValidators } from '~/validators/circle-name';

    import OkTile from '~/components/tiles/OkTile.vue';
    import OkColorSelector from '~/components/input/OkColorSelector.vue';

    import Color from 'color';

    import { IUserService } from '~/services/user/IUserService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IModalService } from '~/services/modal/IModalService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    import { CreateConnectionsCircleParams } from '~/services/user/UserServiceTypes';

    @Component({
        name: 'OkCreateCircleForm',
        components: {
            OkTile,
            OkColorSelector
        }
    })
    export default class OkCreateCircleForm extends Vue {
        $refs!: {
            colorSelector: OkColorSelector
        };

        formWasSubmitted: boolean = false;
        requestInProgress: boolean = false;

        @Validate(circleNameValidators)
        circleName: string = '';

        colorString: string = '';

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

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
            this.modalService.openCirclesModal();
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

            try {
                this.requestInProgress = true;
                await this.userService.createConnectionsCircle(connectionsCircleDetails);
                this.modalService.openCirclesModal();
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }
            } finally {
                this.formWasSubmitted = false;
                this.requestInProgress = false;
            }
        }

        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }
    }
</script>
