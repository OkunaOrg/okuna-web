import { LinkPreviewsSetting } from '~/services/user-preferences/libs/LinkPreviewsSetting';
import { VideosAutoPlaySetting } from '~/services/user-preferences/libs/VideosAutoPlaySetting';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { HashtagDisplaySetting } from '~/services/user-preferences/libs/HashtagDisplaySetting';
import { PostCommentsSortSetting } from '~/services/user-preferences/libs/PostCommentsSortSetting';
import { VideosSoundSetting } from '~/services/user-preferences/libs/VideosSoundSetting';

export interface IUserPreferencesService {
    linkPreviewsSetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    linkPreviewsAreEnabled: BehaviorSubject<boolean | undefined>;

    notificationsSoundIsEnabled: BehaviorSubject<boolean | undefined>;

    setNotificationsSoundIsEnabled(notificationsSoundIsEnabled: boolean): Promise<void>;

    setLinkPreviewsSetting(linkPreviewsSetting: LinkPreviewsSetting): Promise<void>;

    getLinkPreviewsSettingLocalizationMap(): WeakMap<LinkPreviewsSetting, string>;

    videosAutoPlaySetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    videosAutoPlayIsEnabled: BehaviorSubject<boolean | undefined>;

    setVideosAutoPlaySetting(videosAutoPlaySetting: VideosAutoPlaySetting): Promise<void>;

    getVideosAutoPlaySettingLocalizationMap(): WeakMap<VideosAutoPlaySetting, string>;

    videosSoundSetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    videosSoundIsEnabled: BehaviorSubject<boolean | undefined>;

    setVideosSoundSetting(videosSoundSetting: VideosSoundSetting): Promise<void>;

    getVideosSoundSettingLocalizationMap(): WeakMap<VideosSoundSetting, string>;

    hashtagDisplaySetting: BehaviorSubject<HashtagDisplaySetting | undefined>;

    setHashtagDisplaySetting(hashtagDisplaySetting: HashtagDisplaySetting): Promise<void>;

    getHashtagDisplaySettingLocalizationMap(): WeakMap<HashtagDisplaySetting, string>;

    postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting | undefined>;

    setPostCommentsSortSetting(commentsSortSetting: PostCommentsSortSetting): Promise<void>;

    getPostCommentsSortSettingLocalizationMap(): Map<PostCommentsSortSetting, string>;

    clear(): Promise<void>;

}

