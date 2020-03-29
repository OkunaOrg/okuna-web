import { inject, injectable } from '~/node_modules/inversify';
import { IUserPreferencesService } from '~/services/user-preferences-service/IUserPreferencesService';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { HashtagDisplaySetting } from '~/services/user-preferences-service/libs/HashtagDisplaySetting';
import { LinkPreviewsSetting } from '~/services/user-preferences-service/libs/LinkPreviewsSetting';
import { VideosAutoPlaySetting } from '~/services/user-preferences-service/libs/VideosAutoPlaySetting';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { TYPES } from '~/services/inversify-types';
import { IStorageService } from '~/services/storage/IStorage';
import { PostCommentsSortSetting } from '~/services/user-preferences-service/libs/PostCommentsSortSetting';
import { VideosSoundSetting } from '~/services/user-preferences-service/libs/VideosSoundSetting';

@injectable()
export class UserPreferencesService implements IUserPreferencesService {

    static readonly postCommentsSortSettingStorageKey = 'postCommentsSortSetting';
    static readonly videosAutoPlaySettingStorageKey = 'videosAutoPlaySetting';
    static readonly linkPreviewsSettingStorageKey = 'linkPreviewsSetting';
    static readonly videosSoundSettingStorageKey = 'videoSoundSetting';
    static readonly hashtagsDisplaySettingStorageKey = 'hashtagsSetting';

    hashtagDisplaySetting: BehaviorSubject<HashtagDisplaySetting | undefined>;

    linkPreviewsAreEnabled: BehaviorSubject<boolean | undefined>;
    linkPreviewsSetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    videosAutoPlayIsEnabled: BehaviorSubject<boolean | undefined>;
    videosAutoPlaySetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    videosSoundIsEnabled: BehaviorSubject<boolean | undefined>;
    videosSoundSetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting | undefined>;

    private storage: IOkStorage<string>;

    constructor(@inject(TYPES.StorageService)  storageService?: IStorageService,) {
        this.storage = storageService!.getLocalForageStorage('userPreferencesService');
        // TODO Make a library out of this entire behavior of persisting Subjects
        this.bootstrapHashtagDisplaySetting();
        this.bootstrapPostCommentsSortSetting();
        this.bootstrapVideosAutoPlaySetting();
        this.bootstrapVideosSoundSetting();
        this.bootstrapLinkPreviewsSetting();
    }

    async setHashtagDisplaySetting(hashtagDisplaySetting: HashtagDisplaySetting): Promise<void> {
        const serializedValue = hashtagDisplaySetting.toString();
        await this.storage.set(UserPreferencesService.hashtagsDisplaySettingStorageKey, serializedValue);
        this.notifyHashtagDisplaySettingChange(hashtagDisplaySetting);
    }

    private async bootstrapHashtagDisplaySetting() {
        const serializedValue = await this.storage.get(UserPreferencesService.hashtagsDisplaySettingStorageKey);
        const deserializedValue = HashtagDisplaySetting.parse(serializedValue);
        this.notifyHashtagDisplaySettingChange(deserializedValue);
    }

    private notifyHashtagDisplaySettingChange(hashtagDisplaySetting: HashtagDisplaySetting) {
        this.hashtagDisplaySetting.next(hashtagDisplaySetting);
    }

    async setPostCommentsSortSetting(postCommentsSortSetting: PostCommentsSortSetting): Promise<void> {
        const serializedValue = postCommentsSortSetting.toString();
        await this.storage.set(UserPreferencesService.postCommentsSortSettingStorageKey, serializedValue);
        this.notifyPostCommentsSortSettingChange(postCommentsSortSetting);
    }

    private async bootstrapPostCommentsSortSetting() {
        const serializedValue = await this.storage.get(UserPreferencesService.postCommentsSortSettingStorageKey);
        const deserializedValue = PostCommentsSortSetting.parse(serializedValue);
        this.notifyPostCommentsSortSettingChange(deserializedValue);
    }

    private notifyPostCommentsSortSettingChange(postCommentsSortSetting: PostCommentsSortSetting) {
        this.postCommentsSortSetting.next(postCommentsSortSetting);
    }

    async setVideosAutoPlaySetting(videosAutoPlaySetting: VideosAutoPlaySetting): Promise<void> {
        const serializedValue = videosAutoPlaySetting.toString();
        await this.storage.set(UserPreferencesService.videosAutoPlaySettingStorageKey, serializedValue);
        this.notifyVideosAutoPlaySettingChange(videosAutoPlaySetting);
    }

    private async bootstrapVideosAutoPlaySetting() {
        const serializedValue = await this.storage.get(UserPreferencesService.videosAutoPlaySettingStorageKey);
        const deserializedValue = VideosAutoPlaySetting.parse(serializedValue);
        this.notifyVideosAutoPlaySettingChange(deserializedValue);
    }

    private notifyVideosAutoPlaySettingChange(videosAutoPlaySetting: VideosAutoPlaySetting) {
        this.videosAutoPlaySetting.next(videosAutoPlaySetting);
        const videosAutoPlayIsEnabled = videosAutoPlaySetting === VideosAutoPlaySetting.always;
        this.videosAutoPlayIsEnabled.next(videosAutoPlayIsEnabled);
    }

    async setVideosSoundSetting(videosSoundSetting: VideosSoundSetting): Promise<void> {
        const serializedValue = videosSoundSetting.toString();
        await this.storage.set(UserPreferencesService.videosSoundSettingStorageKey, serializedValue);
        this.notifyVideosSoundSettingChange(videosSoundSetting);
    }

    private async bootstrapVideosSoundSetting() {
        const serializedValue = await this.storage.get(UserPreferencesService.videosSoundSettingStorageKey);
        const deserializedValue = VideosSoundSetting.parse(serializedValue);
        this.notifyVideosSoundSettingChange(deserializedValue);
    }

    private notifyVideosSoundSettingChange(videosSoundSetting: VideosSoundSetting) {
        this.videosSoundSetting.next(videosSoundSetting);
        const videosSoundIsEnabled = videosSoundSetting === VideosSoundSetting.enabled;
        this.videosSoundIsEnabled.next(videosSoundIsEnabled);
    }

    async setLinkPreviewsSetting(linkPreviewsSetting: LinkPreviewsSetting): Promise<void> {
        const serializedValue = linkPreviewsSetting.toString();
        await this.storage.set(UserPreferencesService.linkPreviewsSettingStorageKey, serializedValue);
        this.notifyLinkPreviewsSettingChange(linkPreviewsSetting);
    }

    private async bootstrapLinkPreviewsSetting() {
        const serializedValue = await this.storage.get(UserPreferencesService.linkPreviewsSettingStorageKey);
        const deserializedValue = LinkPreviewsSetting.parse(serializedValue);
        this.notifyLinkPreviewsSettingChange(deserializedValue);
    }

    private notifyLinkPreviewsSettingChange(linkPreviewsSetting: LinkPreviewsSetting) {
        this.linkPreviewsSetting.next(linkPreviewsSetting);
        const linkPreviewsIsEnabled = linkPreviewsSetting === LinkPreviewsSetting.always;
        this.linkPreviewsAreEnabled.next(linkPreviewsIsEnabled);
    }

    clear(): Promise<void> {
        return this.storage.clear();
    }


}