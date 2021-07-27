import { inject, injectable } from '~/node_modules/inversify';
import { IUserPreferencesService } from '~/services/user-preferences/IUserPreferencesService';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { HashtagDisplaySetting } from '~/services/user-preferences/libs/HashtagDisplaySetting';
import { LinkPreviewsSetting } from '~/services/user-preferences/libs/LinkPreviewsSetting';
import { VideosAutoPlaySetting } from '~/services/user-preferences/libs/VideosAutoPlaySetting';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { TYPES } from '~/services/inversify-types';
import { IStorageService } from '~/services/storage/IStorageService';
import { PostCommentsSortSetting } from '~/services/user-preferences/libs/PostCommentsSortSetting';
import { VideosSoundSetting } from '~/services/user-preferences/libs/VideosSoundSetting';
import { ILocalizationService } from '~/services/localization/ILocalizationService';

@injectable()
export class UserPreferencesService implements IUserPreferencesService {

    static readonly postCommentsSortSettingStorageKey = 'postCommentsSortSetting';
    static readonly videosAutoPlaySettingStorageKey = 'videosAutoPlaySetting';
    static readonly linkPreviewsSettingStorageKey = 'linkPreviewsSetting';
    static readonly videosSoundSettingStorageKey = 'videoSoundSetting';
    static readonly hashtagsDisplaySettingStorageKey = 'hashtagsSetting';
    static readonly notificationsSoundIsEnabledSettingStorageKey = 'notificationsSoundIsEnabledSetting';

    hashtagDisplaySetting: BehaviorSubject<HashtagDisplaySetting | undefined> = new BehaviorSubject(undefined);

    linkPreviewsAreEnabled: BehaviorSubject<boolean | undefined> = new BehaviorSubject(undefined);
    linkPreviewsSetting: BehaviorSubject<LinkPreviewsSetting | undefined> = new BehaviorSubject(undefined);

    videosAutoPlayIsEnabled: BehaviorSubject<boolean | undefined> = new BehaviorSubject(undefined);
    videosAutoPlaySetting: BehaviorSubject<LinkPreviewsSetting | undefined> = new BehaviorSubject(undefined);

    videosSoundIsEnabled: BehaviorSubject<boolean | undefined> = new BehaviorSubject(undefined);
    videosSoundSetting: BehaviorSubject<LinkPreviewsSetting | undefined> = new BehaviorSubject(undefined);

    postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting | undefined> = new BehaviorSubject(undefined);

    notificationsSoundIsEnabled: BehaviorSubject<boolean | undefined> = new BehaviorSubject(undefined);

    private storage: IOkStorage<any>;

    constructor(
        @inject(TYPES.StorageService)  storageService?: IStorageService,
        @inject(TYPES.LocalizationService) private localizationService?: ILocalizationService,
    ) {
        this.storage = storageService!.getStorage('userPreferencesService');
        // TODO Make a library out of this entire behavior of persisting Subjects
        this.bootstrapHashtagDisplaySetting();
        this.bootstrapPostCommentsSortSetting();
        this.bootstrapVideosAutoPlaySetting();
        this.bootstrapVideosSoundSetting();
        this.bootstrapLinkPreviewsSetting();
        this.bootstrapNotificationsSoundIsEnabled();
    }

    async setHashtagDisplaySetting(hashtagDisplaySetting: HashtagDisplaySetting): Promise<void> {
        const serializedValue = hashtagDisplaySetting.toString();
        await this.storage.set(UserPreferencesService.hashtagsDisplaySettingStorageKey, serializedValue);
        this.notifyHashtagDisplaySettingChange(hashtagDisplaySetting);
    }

    getHashtagDisplaySettingLocalizationMap(): WeakMap<HashtagDisplaySetting, string> {
        const localizationMap = new WeakMap();
        localizationMap.set(
            HashtagDisplaySetting.disco,
            this.localizationService.localize('user_preferences.hashtag_display_setting.disco')
        );

        localizationMap.set(
            HashtagDisplaySetting.traditional,
            this.localizationService.localize('user_preferences.hashtag_display_setting.traditional')
        );

        return localizationMap;
    }

    private async bootstrapHashtagDisplaySetting() {
        const serializedValue = await this.storage.get(UserPreferencesService.hashtagsDisplaySettingStorageKey, HashtagDisplaySetting.traditional.code);
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

    getPostCommentsSortSettingLocalizationMap(): Map<PostCommentsSortSetting, string> {
        const localizationMap = new Map();
        localizationMap.set(
            PostCommentsSortSetting.newestFirst,
            this.localizationService.localize('user_preferences.post_comments_sort_setting.newest_first')
        );

        localizationMap.set(
            PostCommentsSortSetting.oldestFirst,
            this.localizationService.localize('user_preferences.post_comments_sort_setting.oldest_first')
        );

        return localizationMap;
    }

    private async bootstrapPostCommentsSortSetting() {
        const serializedValue = await this.storage.get(
            UserPreferencesService.postCommentsSortSettingStorageKey,
            PostCommentsSortSetting.newestFirst.code,
        );
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

    getVideosAutoPlaySettingLocalizationMap(): WeakMap<VideosAutoPlaySetting, string> {
        const localizationMap = new WeakMap();
        localizationMap.set(
            VideosAutoPlaySetting.always,
            this.localizationService.localize('user_preferences.videos_auto_play_setting.always')
        );

        localizationMap.set(
            VideosAutoPlaySetting.never,
            this.localizationService.localize('user_preferences.videos_auto_play_setting.never')
        );

        return localizationMap;
    }

    private async bootstrapVideosAutoPlaySetting() {
        const serializedValue = await this.storage.get(
            UserPreferencesService.videosAutoPlaySettingStorageKey,
            VideosAutoPlaySetting.always.code
        );
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

    getVideosSoundSettingLocalizationMap(): WeakMap<VideosSoundSetting, string> {
        const localizationMap = new WeakMap();
        localizationMap.set(
            VideosSoundSetting.enabled,
            this.localizationService.localize('user_preferences.videos_sound_setting.enabled')
        );

        localizationMap.set(
            VideosSoundSetting.disabled,
            this.localizationService.localize('user_preferences.videos_sound_setting.disabled')
        );

        return localizationMap;
    }

    private async bootstrapVideosSoundSetting() {
        const serializedValue = await this.storage.get(
            UserPreferencesService.videosSoundSettingStorageKey,
            VideosSoundSetting.disabled.code
        );
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

    getLinkPreviewsSettingLocalizationMap(): WeakMap<LinkPreviewsSetting, string> {
        const localizationMap = new WeakMap();
        localizationMap.set(
            LinkPreviewsSetting.always,
            this.localizationService.localize('user_preferences.link_previews_setting.always')
        );

        localizationMap.set(
            LinkPreviewsSetting.never,
            this.localizationService.localize('user_preferences.link_previews_setting.never')
        );

        return localizationMap;
    }

    async setNotificationsSoundIsEnabled(notificationsSoundIsEnabled: boolean): Promise<void> {
        await this.storage.set(UserPreferencesService.notificationsSoundIsEnabledSettingStorageKey, notificationsSoundIsEnabled);
        this.notifyNotificationsSoundIsEnabledChange(notificationsSoundIsEnabled);
    }

    private async bootstrapLinkPreviewsSetting() {
        const serializedValue = await this.storage.get(
            UserPreferencesService.linkPreviewsSettingStorageKey,
            LinkPreviewsSetting.always.code
        );
        const deserializedValue = LinkPreviewsSetting.parse(serializedValue);
        this.notifyLinkPreviewsSettingChange(deserializedValue);
    }

    private notifyLinkPreviewsSettingChange(linkPreviewsSetting: LinkPreviewsSetting) {
        this.linkPreviewsSetting.next(linkPreviewsSetting);
        const linkPreviewsIsEnabled = linkPreviewsSetting === LinkPreviewsSetting.always;
        this.linkPreviewsAreEnabled.next(linkPreviewsIsEnabled);
    }

    private async bootstrapNotificationsSoundIsEnabled() {
        const serializedValue = await this.storage.get(
            UserPreferencesService.notificationsSoundIsEnabledSettingStorageKey,
            true
        );
        this.notifyNotificationsSoundIsEnabledChange(serializedValue);
    }

    private notifyNotificationsSoundIsEnabledChange(notificationsSoundIsEnabled: boolean) {
        this.notificationsSoundIsEnabled.next(notificationsSoundIsEnabled);
    }

    clear(): Promise<void> {
        return this.storage.clear();
    }

}
