import { action, observable } from 'mobx';
import IUser from '~/types/User';
import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { ApiService } from '~/services/Api';

@singleton()
@autoInjectable()
export class UserService {
    @observable
    loggedInUser!: IUser;

    constructor(private apiService?: ApiService) {
    }

    @action.bound
    setLoggedInUser(user: IUser): void {
        this.loggedInUser = user;
    }

    getUser() {
        console.log('Im the user service and this is the api service');
    }

}