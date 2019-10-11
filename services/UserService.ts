import { injectable } from '~/node_modules/inversify';
import { action, observable } from 'mobx';
import IUser from '~/types/User';

@injectable()
export class UserService{
    @observable
    loggedInUser!: IUser;

    @action.bound
    setLoggedInUser(user: IUser): void {
        this.loggedInUser = user;
    }
}