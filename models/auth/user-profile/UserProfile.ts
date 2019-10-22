import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { IBadge } from '~/models/common/badge/IBadge';
import badgeFactory from '~/models/common/badge/factory';
import { DataModel } from '~/models/abstract/DataModel';
import { BadgeData } from '~/types/models-data/common/BadgeData';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';


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

    dataMaps: DataModelAttributeMap<IUserProfile>[] = [
        {
            dataKey: 'id',
            attributeKey: 'id'
        },
        {
            dataKey: 'name',
            attributeKey: 'name'
        },
        {
            dataKey: 'avatar',
            attributeKey: 'avatar'
        },
        {
            dataKey: 'cover',
            attributeKey: 'cover'
        },
        {
            dataKey: 'bio',
            attributeKey: 'bio'
        },
        {
            dataKey: 'url',
            attributeKey: 'url'
        },
        {
            dataKey: 'location',
            attributeKey: 'location'
        },
        {
            dataKey: 'followers_count_visible',
            attributeKey: 'followersCountVisible'
        },
        {
            dataKey: 'community_posts_visible',
            attributeKey: 'communityPostsVisible'
        },
        {
            dataKey: 'badges',
            attributeKey: 'badges',
            deserializer: (instance, rawData: BadgeData[]) => {
                return rawData.map((rawDataItem) => badgeFactory.make(rawDataItem));
            }
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

