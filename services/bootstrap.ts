import { container } from 'inversify-props';
import { UserService } from '~/services/UserService';

export default function bootstrap(): void {
    container.addTransient<UserService>(UserService);
}