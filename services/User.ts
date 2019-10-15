import { action, observable } from 'mobx';
import IUser from '~/types/User';
import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { ApiService } from '~/services/Api';
import { BehaviorSubject, Subject } from '~/node_modules/rxjs';

@singleton()
@autoInjectable()
export class UserService {
    private loggedInUser = new BehaviorSubject<IUser>();

    constructor(private apiService?: ApiService) {
    }

    setLoggedInUser(user: IUser): void {
        this.loggedInUser.next(user);
    }

    login(){

    }

    logout(){
        this.loggedInUser.next();
    }

    _bootstrapLoggedInUser(){

    }

}