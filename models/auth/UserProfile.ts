import { IModelFactory } from '~/interfaces/IModelFactory';
import { Badge } from '~/models/common/Badge';
import { DataModel } from '~/models/abstract/DataModel';
import { UserProfileData } from '~/types/models/auth/UserProfileData';
import { BadgeData } from '~/types/models/common/BadgeData';

class UserProfileFactory implements IModelFactory<UserProfile> {
    make(data: UserProfileData): UserProfile {
        return new UserProfile(data);
    }
}


export class UserProfile extends DataModel<UserProfile> {
    static factory = new UserProfileFactory();

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
            return newDataValue.map((badge) => Badge.factory.make(badge));
        }
    };

    name!: string;
    avatar!: string;
    cover!: string;
    bio!: string;
    url!: string;
    location!: string;
    followersCountVisible!: boolean;
    communityPostsVisible!: boolean;
    badges!: Badge[];
}

