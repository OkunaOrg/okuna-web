import { IModelFactory } from '~/interfaces/IModelFactory';
import { Badge, BadgeData } from '~/models/common/Badge';
import { DataModel, ModelData } from '~/models/abstract/DataModel';

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

export default interface UserProfileData extends ModelData {
    name: string,
    avatar: string,
    cover: string,
    bio: string,
    url: string,
    location: string,
    badges: string,
    followers_count_visible: boolean,
    community_posts_visible: boolean,
}