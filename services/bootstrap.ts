import { container } from 'inversify-props';
import { UserService } from '~/services/UserService/UserService';
import IUserService from '~/services/UserService/IUserService';

export default function bootstrap(): void {
    container.addTransient<IUserService>(UserService);
}