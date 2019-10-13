import { IModelFactory } from '~/interfaces/IModelFactory';
import { IUserData, User } from '~/models/auth/User';
import { LruCache } from '~/lib/caches/LruCache';

class UserFactory implements IModelFactory<User, IUserData> {
    private sessionUsersCache: LruCache<number, User> = new LruCache(10);
    private navigationUsersCache: LruCache<number, User> = new LruCache(100);

    make(data: IUserData, config: {storeInSessionCache: boolean} = {storeInSessionCache: true}): User {
        const userId = data.id;

        let user = this.navigationUsersCache.get(userId) || this.sessionUsersCache.get(userId);

        if (user) {
            user.update(data);
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