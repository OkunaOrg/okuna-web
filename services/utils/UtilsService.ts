import { AxiosError } from '~/node_modules/axios';
import { HandledError, IUtilsService, QueryParams } from '~/services/utils/IUtilsService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IToastService } from '~/services/toast/IToastService';
import { ILocalizationService } from '~/services/localization/ILocalizationService';
import { ToastType } from '~/services/toast/lib/ToastType';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '~/models/posts/post/Post';
import { PostComment } from '~/models/posts/post-comment/PostComment';
import { Community } from '~/models/communities/community/Community';
import { User } from '~/models/auth/user/User';
import { Hashtag } from '~/models/common/hashtag/Hashtag';

@injectable()
export class UtilsService implements IUtilsService {
    constructor(@inject(TYPES.ToastService) private toastService?: IToastService,
                @inject(TYPES.LocalizationService) private localizationService?: ILocalizationService) {
    }

    private userFriendlyLargeNumberRanges = [
        {divider: 1e18, suffix: 'e'},
        {divider: 1e15, suffix: 'p'},
        {divider: 1e12, suffix: 't'},
        {divider: 1e9, suffix: 'g'},
        {divider: 1e6, suffix: 'm'},
        {divider: 1e3, suffix: 'k'}
    ];

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

    makeUrlQueryString(queryParams: QueryParams): string {
        return '?' + Object.keys(queryParams)
            .map(key => {
                return (
                    encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key].toString())
                )
            })
            .join('&');
    }

    makeHumanFriendlyLargeNumberDisplay(n: number) {
        for (let i = 0; i < this.userFriendlyLargeNumberRanges.length; i++) {
            if (n >= this.userFriendlyLargeNumberRanges[i].divider) {
                const number = (n / this.userFriendlyLargeNumberRanges[i].divider).toFixed(1);
                return number.toString() + this.userFriendlyLargeNumberRanges[i].suffix;
            }
        }
        return n.toString();
    }

    parseTemplateString(template: string, templateData: {[key: string]: boolean | number | string}): string {
        let processedTemplate = template;
        Object.keys(templateData).forEach((key) => processedTemplate = processedTemplate.replace(`{${key}}`, templateData[key].toString()));
        return processedTemplate;
    }

    convertModelInstanceTypeToString(modelInstance, capitalize = false): string {

        let result;
        if (modelInstance instanceof Post) {
            result = this.localizationService.localize('global.models.post');
        } else if (modelInstance instanceof PostComment) {
            result = this.localizationService.localize('global.models.post_comment');
        } else if (modelInstance instanceof Community) {
            result = this.localizationService.localize('global.models.community');
        } else if (modelInstance instanceof User) {
            result = this.localizationService.localize('global.models.user');
        } else if (modelInstance instanceof Hashtag) {
            result = this.localizationService.localize('global.models.hashtag');
        } else {
            result = this.localizationService.localize('global.models.fallback');
        }

        return capitalize ? this.capitalizeString(result) : result;
    }

    capitalizeString(s: string): string {
        if (typeof s !== 'string') return '';

        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    isPromise(obj: Object): boolean {
        return obj && Object.prototype.toString.call(obj) === "[object Promise]";
    }

    getQueryStringParams(query): {[key: string]: string} {
        let res = {};
        (new URL(query)).searchParams.forEach((value: string, key: string,)=>{
            res[key] = value;
        });
        return res;
    };

    isUrl(str: string) : boolean {
        const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(str);
    }
}
