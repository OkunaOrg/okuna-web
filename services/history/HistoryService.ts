import { inject, injectable } from '~/node_modules/inversify';
import { IHistoryService, UpdatePostForUrlParams } from './IHistoryService';
import { TYPES } from '~/services/inversify-types';
import { IUtilsService } from '~/services/utils/IUtilsService';

@injectable()
export class HistoryService implements IHistoryService {
    constructor(@inject(TYPES.UtilsService) private utilsService?: IUtilsService) {
    }

    getPath(): string {
        return window.location.pathname;
    }

    // Updates the url to a post url without notifying the app of changes, useful for modal window post theatre
    updatePathForPostSilently(params: UpdatePostForUrlParams): void {
        let newQueryParams = {};

        if (params.linkedPostCommentId) newQueryParams['pc'] = params.linkedPostCommentId;

        if (params.linkedPostCommentReplyId) newQueryParams['pcr'] = params.linkedPostCommentReplyId;

        let newPath = `/p/${params.post.uuid}/`;

        if (Object.keys(params).length) {
            newPath += this.utilsService.makeUrlQueryString(newQueryParams);
        }

        // Update url without silently. Important as this component can operate both as a modal and a whole page
        this.setPathSilently(newPath);
    }

    setPathSilently(newPath: string): void {
        history.pushState(
            {},
            null,
            newPath
        );
    }

}