import { inject, injectable } from '~/node_modules/inversify';
import { IPostUploaderService } from '~/services/post-uploader/IPostSubmitterService';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { OkPostUpload } from '~/services/post-uploader/lib/OkPostUpload';
import { OkPostStudioData } from '~/components/post-studio/lib/OkPostCreatorTypes';
import { IPost } from '~/models/posts/post/IPost';
import { PostStatus } from '~/models/posts/post/lib/PostStatus';
import { TYPES } from '~/services/inversify-types';
import { ILoggingService } from '~/services/logging/ILoggingService';
import { IOkLogger } from '~/services/logging/types';
import { IUserService } from '~/services/user/IUserService';
import { IUtilsService } from '~/services/utils/IUtilsService';
import { OkFile } from '~/services/media/IMediaService';

@injectable()
export class PostUploaderService implements IPostUploaderService {

    uploads = new BehaviorSubject<OkPostUpload[]>([]);
    logger: IOkLogger;

    constructor(
        @inject(TYPES.LoggingService)  loggingService?: ILoggingService,
        @inject(TYPES.UtilsService) private utilsService?: IUtilsService,
        @inject(TYPES.UserService) private userService?: IUserService,
    ) {
        this.logger = loggingService!.getLogger({
            name: ' PostUploaderService'
        });
    }

    uploadPost(postData: OkPostStudioData): OkPostUpload {

        const id = `pu-${this.utilsService.generateUuid()}`;

        const postUpload = new OkPostUpload(
            id,
            postData,
            this.postCreator,
            this.postMediaAppender,
            this.postPublisher,
            this.postStatusRetriever,
            this.postRetriever,
            this.postRemover,
        );

        const newPendingUploads = this.uploads.value.slice();

        newPendingUploads.unshift(postUpload);

        this.uploads.next(newPendingUploads);

        return postUpload;
    }

    postCreator(postData: OkPostStudioData): Promise<IPost> {
        return postData.community ? this.userService.createCommunityPost({
            text: postData.text,
            isDraft: true,
            community: postData.community
        }) : this.userService.createPost({
            text: postData.text,
            isDraft: true,
            circles: postData.circles
        });
    }

    postMediaAppender(post: IPost, media: OkFile): Promise<void> {
        return this.userService.addMediaToPost({
            post,
            media
        })
    }

    postPublisher(post: IPost): Promise<void> {
        return this.userService.publishPost({
            post
        });
    }

    postStatusRetriever(post: IPost): Promise<PostStatus> {
        return this.userService.getPostStatus({
            post
        });
    }

    postRetriever(post: IPost): Promise<IPost> {
        return this.userService.getPost({
            postUuid: post.uuid
        });
    }

    postRemover(post: IPost): Promise<void> {
        return this.userService.deletePost({
            post
        });
    }


}
