import { IModelFactory } from '~/interfaces/IModelFactory';
import { UserData } from 'types/models-data/auth/UserData';
import { User } from '~/models/auth/user/User';
import { IUser } from '~/models/auth/user/IUser';
import { LruCache } from '~/lib/caches/LruCache';

class UserFactory extends IModelFactory<IUser> {
    private sessionUsersCache: LruCache<number, User> = new LruCache(10);
    private navigationUsersCache: LruCache<number, User> = new LruCache(200);

    make(data: UserData, config: {storeInSessionCache: boolean} = {storeInSessionCache: true}): IUser {
        const userId = data.id;

        let user = this.sessionUsersCache.get(userId) || this.navigationUsersCache.get(userId);

        if (user) {
            user.updateWithData(data);
            return user;
        }

        user = new User(data);
        config.storeInSessionCache
            ? this.sessionUsersCache.set(userId, user)
            : this.navigationUsersCache.set(userId, user);

        return user;
    }
}

const userFactory = new UserFactory();

export default userFactory;