import { IModelFactory } from '~/interfaces/IModelFactory';
import { UserProfileData } from 'types/models-data/auth/UserProfileData';
import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { UserProfile } from '~/models/auth/user-profile/UserProfile';

class UserProfileFactory extends IModelFactory<IUserProfile> {
    make(data: UserProfileData): IUserProfile {
        return new UserProfile(data);
    }
}

const userProfileFactory = new UserProfileFactory();

export default userProfileFactory;