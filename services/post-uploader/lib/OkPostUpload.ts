import { OkPostStudioData } from '~/components/post-studio/lib/OkPostCreatorTypes';
import { IPost } from '~/models/posts/post/IPost';
import { OkFile } from '~/services/media/IMediaService';
import { PostStatus } from '~/models/posts/post/lib/PostStatus';
import { CancelableOperation } from '~/lib/CancelableOperation';
import { ICommunity } from '~/models/communities/community/ICommunity';

export class OkPostUpload {
    static readonly postStatusPollingRateInMs = 1000;

    status: OkPostUploadStatus = OkPostUploadStatus.idle;
    createdPost: IPost;
    remainingMediaToUpload: OkFile[];

    error?: Error;

    private postStatusPollingRemover: Function;
    private createPostOperation: CancelableOperation<IPost>;
    private appendMediaOperation: CancelableOperation<void>;
    private publishOperation: CancelableOperation<void>;
    private retrieveStatusOperation: CancelableOperation<PostStatus>;
    private retrievePostOperation: CancelableOperation<IPost>;
    private removePostOperation: CancelableOperation<void>;

    constructor(
        private id: string,
        private data: OkPostStudioData,
        private creator: OkPostCreator,
        private mediaAppender: OkPostMediaAppender,
        private publisher: OkPostPublisher,
        private statusRetriever: OkPostStatusRetriever,
        private retriever: OkPostRetriever,
        private remover: OkPostRemover,
        private logger: (message: string) => void,
        private onStatusChange?: OkPostOnStatusChange,
    ) {
        this.remainingMediaToUpload = this.data.media ? this.data.media.slice() : [];
    }


    start() {
        return this.uploadPost();
    }

    async cancel() {
        this.cleanUp();

        if (this.createdPost) {
            try {
                this.removePostOperation = CancelableOperation.fromPromise(
                    this.removePost()
                );

                await this.removePostOperation.value;
            } catch (error) {
                this.error = error;
                this.setStatus(OkPostUploadStatus.error);
            }
        }

        this.setStatus(OkPostUploadStatus.cancelled);
    }

    retry(): Promise<void> {
        if (this.status === OkPostUploadStatus.published) {
            throw new Error('Post is already published, cannot retry');
        }

        return this.uploadPost();
    }

    async uploadPost() {
        try {
            if (!this.createdPost) {
                this.setStatus(OkPostUploadStatus.creatingPost);
                this.createPostOperation = CancelableOperation.fromPromise(
                    this.createPost()
                );
                this.createdPost = await this.createPostOperation.value;
            }

            if (this.remainingMediaToUpload.length) {
                this.setStatus(OkPostUploadStatus.addingPostMedia);
                this.appendMediaOperation = CancelableOperation.fromPromise(
                    this.addPostMedia()
                );
                await this.appendMediaOperation.value;
            }

            if (this.createdPost.status !== PostStatus.published) {
                this.setStatus(OkPostUploadStatus.publishing);
                this.publishOperation = CancelableOperation.fromPromise(
                    this.publishPost()
                );
                await this.publishOperation.value;
            }

            this.setStatus(OkPostUploadStatus.processing);
            this.pollPostStatusUntilPublished();
        } catch (error) {
            if (this.postStatusPollingRemover) this.postStatusPollingRemover();
            this.error = error;
            this.setStatus(OkPostUploadStatus.error);
        }
    }

    belongsToCommunity(community: ICommunity) {
        return this.data.community && this.data.community.name === community.name;
    }

    get firstMediaSrc() {
        if (this.firstMedia) return URL.createObjectURL(this.firstMedia.file);
    }

    get firstMedia() {
        return this.data.media && this.data.media.length ? this.data.media[0] : null;
    }

    private pollPostStatusUntilPublished() {
        const timeoutRef = setTimeout(async () => {
            this.retrieveStatusOperation = CancelableOperation.fromPromise(
                this.retrievePostStatus()
            );
            const postStatus = await this.retrieveStatusOperation.value;
            if (postStatus === PostStatus.published) {
                this.postStatusPollingRemover();
                // On published, the post will have new attributes, retrieve it again
                this.retrievePostOperation = CancelableOperation.fromPromise(
                    this.retrievePost()
                );
                this.createdPost = await this.retrievePostOperation.value;
                this.setStatus(OkPostUploadStatus.published);
            } else {
                this.pollPostStatusUntilPublished();
            }
        }, OkPostUpload.postStatusPollingRateInMs);

        this.postStatusPollingRemover = () => clearTimeout(timeoutRef);
    }

    private createPost() {
        return this.creator(this.data);
    }

    private async addPostMedia(): Promise<void> {
        await Promise.all(
            this.remainingMediaToUpload.slice().map(
                (remainingMedia) => {
                    return this.mediaAppender(this.createdPost, remainingMedia).then(() => {
                        const index = this.remainingMediaToUpload.indexOf(remainingMedia);
                        this.remainingMediaToUpload.splice(index, 1);
                    })
                }
            )
        );
    }

    private publishPost() {
        return this.publisher(this.createdPost);
    }

    private retrievePostStatus() {
        return this.statusRetriever(this.createdPost);
    }

    private retrievePost() {
        return this.retriever(this.createdPost);
    }


    private removePost() {
        return this.remover(this.createdPost);
    }

    private setStatus(status: OkPostUploadStatus) {
        this.log(
            `Changing status from ${this.status} to ${status}`
        );
        this.status = status;
        if (this.onStatusChange) this.onStatusChange(status, this);
    }

    private cleanUp() {
        if (this.postStatusPollingRemover) this.postStatusPollingRemover();
        if (this.createPostOperation) this.createPostOperation.cancel();
        if (this.appendMediaOperation) this.appendMediaOperation.cancel();
        if (this.publishOperation) this.publishOperation.cancel();
        if (this.retrieveStatusOperation) this.retrieveStatusOperation.cancel();
        if (this.retrievePostOperation) this.retrievePostOperation.cancel();
    }

    private log(message: string) {
        this.logger(
            `OkPostUpload-${this.id}: ${message}`
        );
    }
}

export type OkPostCreator = (postData: OkPostStudioData) => Promise<IPost>;

export type OkPostMediaAppender = (post: IPost, media: OkFile) => Promise<void>;

export type OkPostPublisher = (post: IPost) => Promise<void>;

export type OkPostStatusRetriever = (post: IPost) => Promise<PostStatus>;

export type OkPostRetriever = (post: IPost) => Promise<IPost>;

export type OkPostRemover = (post: IPost) => Promise<void>;

export type OkPostOnStatusChange = (status: OkPostUploadStatus, postUpload: OkPostUpload) => void;

export class OkPostUploadStatus {
    static idle = new OkPostUploadStatus('Idle');
    static creatingPost = new OkPostUploadStatus('CreatingPost');
    static addingPostMedia = new OkPostUploadStatus('AddingPostMedia');
    static publishing = new OkPostUploadStatus('Publishing');
    static processing = new OkPostUploadStatus('Processing');
    static published = new OkPostUploadStatus('Published');
    static error = new OkPostUploadStatus('Error');
    static cancelling = new OkPostUploadStatus('Cancelling');
    static cancelled = new OkPostUploadStatus('Cancelled');

    static _values: OkPostUploadStatus[] = [
        OkPostUploadStatus.idle,
        OkPostUploadStatus.creatingPost,
        OkPostUploadStatus.addingPostMedia,
        OkPostUploadStatus.publishing,
        OkPostUploadStatus.processing,
        OkPostUploadStatus.published,
        OkPostUploadStatus.error,
        OkPostUploadStatus.cancelling,
        OkPostUploadStatus.cancelled,
    ];

    static values() {
        return OkPostUploadStatus._values.slice(0);
    }

    static parse(val: string): OkPostUploadStatus | undefined {
        let badgeKeyword;

        for (let i = 0; i < OkPostUploadStatus._values.length; i++) {
            const value = OkPostUploadStatus._values[i];
            if (val == value.code) {
                badgeKeyword = value;
                break;
            }
        }

        if (!badgeKeyword) {
            console.error('Unsupported post upload status type');
        }

        return badgeKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}
