import { IModelData } from '~/models/abstract/Model';
import { IModelFactory } from '~/interfaces/IModelFactory';
import { IUserData, User } from '~/models/auth/User';
import { UpdatableModel } from '~/models/abstract/UpdatableModel';
import { Badge, IBadgeData } from '~/models/common/Badge';

class UserProfileFactory implements IModelFactory<UserProfile, IUserProfileData> {
    make(data: IUserProfileData): UserProfile {
        return new UserProfile(data);
    }
}


export class UserProfile extends UpdatableModel<UserProfile, IUserProfileData> {
    static factory = new UserProfileFactory();

    updatableDataToAttributesMap = {
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
            updater(instance: UserProfile, newDataValue: IBadgeData[]) {
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


    constructor(data: IUserProfileData) {
        super(data);
    }
}

export interface IUserProfileData extends IModelData {
    creator: IUserData,
    name: string,
    color: string,
    users_count: number,
    users: IUserData[],
}