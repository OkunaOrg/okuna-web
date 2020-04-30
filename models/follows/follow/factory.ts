import { IModelFactory } from '~/interfaces/IModelFactory';
import { FollowData } from '~/types/models-data/follows/FollowData';
import { IFollow } from '~/models/follows/follow/IFollow';
import { Follow } from '~/models/follows/follow/Follow';

class FollowFactory extends IModelFactory<IFollow> {
    make(data: FollowData): IFollow {
        return new Follow(data);
    }
}

const followFactory = new FollowFactory();

export default followFactory;