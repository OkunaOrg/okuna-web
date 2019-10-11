import { injectable } from '~/node_modules/inversify';
import IUserService from '~/services/UserService/IUserService';


@injectable()
export class UserService implements IUserService {
    something(): void {
        console.log('Potato');
    }
}