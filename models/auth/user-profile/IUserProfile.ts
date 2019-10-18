import { IBadge } from '~/models/common/badge/IBadge';
import { IDataModel } from '~/models/abstract/IDataModel';


export interface IUserProfile extends IDataModel<IUserProfile> {
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

