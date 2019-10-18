import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { AxiosError } from '~/node_modules/axios';
import { HandledError, IUtilsService } from '~/services/utils-service/IUtilsService';
import { IToastService } from '~/services/toast/IToast';

@singleton()
@autoInjectable()
export class UtilsService implements IUtilsService {
    constructor(private toastService?: IToastService) {

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
                    message = '🙅‍♀️ You are not allowed to do this.'
                } else if (status === 420) {
                    message = '😥 Too many requests. Please wait a couple minutes until trying again';
                } else if (status === 400) {
                    message = '🤔 The request was invalid.'
                } else if (status === 404) {
                    message = '👀 Not found'
                }
            }
        }

        if (!message) {
            isUnhandled = true;
            message = error.message;
        }

        if (!message) {
            message = '😭 Unhandled error:';
        }

        return {
            humanFriendlyMessage: message,
            // If unhandled, needs to report to sentry
            isUnhandled,
            error
        }
    }
}
