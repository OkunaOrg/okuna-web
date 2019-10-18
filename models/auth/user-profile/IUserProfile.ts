import { DataModel } from 'models/abstract/DataModel';
import { IBadge } from '~/models/common/badge/IBadge';


export interface IUserProfile extends DataModel<IUserProfile> {
    name: string;
    avatar: string;
    cover: string;
    bio: string;
    url: string;
    location: string;
    followersCountVisible: boolean;
    communityPostsVisible: boolean;
    badges: IBadge[];
}

