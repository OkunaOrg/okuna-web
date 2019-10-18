import { ICircle } from '~/models/connections/circle/ICircle';
import { IUser } from '~/models/auth/user/IUser';
import userFactory from '~/models/auth/user/factory';
import { DataModel } from '~/models/abstract/DataModel';
import { UserData } from '~/types/models/auth/UserData';

export class Circle extends DataModel<Circle> implements ICircle {

    creator!: IUser;
    name!: string;
    color!: string;
    usersCount!: number;
    users!: IUser[];

    dataMap = {
        name: 'name',
        color: 'color',
        users_count: 'usersCount',
        creator: (instance: Circle, data: UserData) => {
            instance.creator = userFactory.make(data);
        },
        users: (instance: Circle, data: UserData[]) => {
            instance.users = data.map((dataItem) => userFactory.make(dataItem));
        }
    };
}

