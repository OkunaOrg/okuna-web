import { injectable } from '~/node_modules/inversify';
import { action, observable } from 'mobx';
import IUser from '~/types/User';

@injectable()
export class UserService{
    @observable
    loggedInUser!: IUser;

    something(): void {
        console.log('Potato');
    }

    @action.bound
    setUser(user: IUser): void {
        this.loggedInUser = user;
    }
}