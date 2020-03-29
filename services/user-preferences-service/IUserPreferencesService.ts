import { LinkPreviewsSetting } from '~/services/user-preferences-service/libs/LinkPreviewsSetting';
import { VideosAutoPlaySetting } from '~/services/user-preferences-service/libs/VideosAutoPlaySetting';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { HashtagDisplaySetting } from '~/services/user-preferences-service/libs/HashtagDisplaySetting';
import { PostCommentsSortSetting } from '~/services/user-preferences-service/libs/PostCommentsSortSetting';
import { VideosSoundSetting } from '~/services/user-preferences-service/libs/VideosSoundSetting';

export interface IUserPreferencesService {
    linkPreviewsSetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    linkPreviewsAreEnabled: BehaviorSubject<boolean | undefined>;

    setLinkPreviewsSetting(linkPreviewsSetting: LinkPreviewsSetting): Promise<void>;

    videosAutoPlaySetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    videosAutoPlayIsEnabled: BehaviorSubject<boolean | undefined>;

    setVideosAutoPlaySetting(videosAutoPlaySetting: VideosAutoPlaySetting): Promise<void>;

    videosSoundSetting: BehaviorSubject<LinkPreviewsSetting | undefined>;

    videosSoundIsEnabled: BehaviorSubject<boolean | undefined>;

    setVideosSoundSetting(videosSoundSetting: VideosSoundSetting): Promise<void>;

    hashtagDisplaySetting: BehaviorSubject<HashtagDisplaySetting | undefined>;

    setHashtagDisplaySetting(hashtagDisplaySetting: HashtagDisplaySetting): Promise<void>;

    postCommentsSortSetting: BehaviorSubject<PostCommentsSortSetting | undefined>;

    setPostCommentsSortSetting(commentsSortSetting: PostCommentsSortSetting): Promise<void>;

    clear(): Promise<void>;

}

