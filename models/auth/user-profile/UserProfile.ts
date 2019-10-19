import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { IBadge } from '~/models/common/badge/IBadge';
import badgeFactory from '~/models/common/badge/factory';
import { DataModel } from '~/models/abstract/DataModel';
import { BadgeData } from '~/types/models-data/common/BadgeData';


export class UserProfile extends DataModel<UserProfile> implements IUserProfile {

    name!: string;
    avatar!: string;
    cover!: string;
    bio!: string;
    url!: string;
    location!: string;
    followersCountVisible!: boolean;
    communityPostsVisible!: boolean;
    badges!: IBadge[];

    dataMap = {
        id: 'id',
        name: 'name',
        avatar: 'avatar',
        cover: 'cover',
        bio: 'bio',
        url: 'url',
        location: 'location',
        followers_count_visible: 'followersCountVisible',
        community_posts_visible: 'communityPostsVisible',
        badges: (instance: UserProfile, newDataValue: BadgeData[]) => {
            return newDataValue.map((badge) => badgeFactory.make(badge));
        }
    };
}

