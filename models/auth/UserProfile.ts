import { IModelData } from '~/models/abstract/DataModel';
import { IModelFactory } from '~/interfaces/IModelFactory';
import { ObservedDataModel } from '~/models/abstract/ObservedDataModel';
import { Badge } from '~/models/common/Badge';

class UserProfileFactory implements IModelFactory<UserProfile> {
    make(data: IModelData): UserProfile {
        return new UserProfile(data);
    }
}


export class UserProfile extends ObservedDataModel<UserProfile> {
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
        badges: {
            targetAttribute: 'badges',
            updater(instance: UserProfile, newDataValue: IModelData[]) {
                return newDataValue.map((badge) => Badge.factory.make(badge));
            }
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