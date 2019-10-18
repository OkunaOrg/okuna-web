import { IModelFactory } from 'interfaces/IModelFactory';
import { UserData } from 'types/models/auth/UserData';
import { User } from '~/models/auth/user/User';
import { IUser } from '~/models/auth/user/IUser';
import { LruCache } from '~/lib/caches/LruCache';

class UserFactory implements IModelFactory<IUser> {
    private sessionUsersCache: LruCache<number, User> = new LruCache(10);
    private navigationUsersCache: LruCache<number, User> = new LruCache(100);

    make(data: UserData, config: {storeInSessionCache: boolean} = {storeInSessionCache: true}): IUser {
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