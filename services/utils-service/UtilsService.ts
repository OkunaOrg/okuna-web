import { AxiosError } from '~/node_modules/axios';
import { HandledError, IUtilsService } from '~/services/utils-service/IUtilsService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IToastService } from '~/services/toast/IToast';
import { ILocalizationService } from '~/services/localization/ILocalization';
import { ToastType } from '~/services/toast/lib/ToastType';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class UtilsService implements IUtilsService {
    constructor(@inject(TYPES.ToastService) private toastService?: IToastService,
                @inject(TYPES.LocalizationService) private localizationService?: ILocalizationService) {
    }

    generateUuid() {
        return uuidv4();
    }

    handleError(error: any): HandledError {
        let message;
        let isUnhandled = false;

        if (error.response) {
            // Http response outside the 2xx range
            error = error as AxiosError;
            const responseBody = error.response.data;
            if (responseBody) {
                const responseBodyIsArray = responseBody.constructor === Array;
                if (responseBodyIsArray) {
                    message = responseBody[0];
                } else if (typeof responseBody === 'string' || responseBody instanceof String) {
                    message = responseBody;
                } else {
                    const responseBodyFirstKey = Object.keys(responseBody)[0];
                    const responseBodyFirstKeyValue = responseBody[responseBodyFirstKey];
                    const responseBodyFirstKeyValueIsArray = responseBodyFirstKeyValue.constructor === Array;

                    if (responseBodyFirstKeyValueIsArray) {
                        message = responseBodyFirstKeyValue[0];
                    } else {
                        message = responseBodyFirstKeyValue;
                    }
                }
            }

            if (!message) {
                // Default to status codes
                const status = error.response.status;

                if (status === 403) {
                    message = this.localizationService!.localize('global.errors.generic.forbidden');
                } else if (status === 420) {
                    message = this.localizationService!.localize('global.errors.generic.tooManyRequests');
                } else if (status === 400) {
                    message = this.localizationService!.localize('global.errors.generic.badRequest');
                } else if (status === 404) {
                    message = this.localizationService!.localize('global.errors.generic.notFound');
                }
            }
        }

        if (!message) {
            isUnhandled = true;
            message = error.message;
        }

        if (!message) {
            message = this.localizationService!.localize('global.errors.generic.unhandled');
        }

        console.error(error);

        return {
            humanFriendlyMessage: message,
            // If unhandled, needs to report to sentry
            isUnhandled,
            error
        }
    }

    handleErrorWithToast(error: any): HandledError {
        const handledError = this.handleError(error);

        this.toastService!.show({
            message: handledError.humanFriendlyMessage,
            type: ToastType.error,
        });

        return handledError;
    }
}
