import { IModelFactory } from 'interfaces/IModelFactory';
import { User } from 'models/auth/User';
import { CircleData } from '~/types/models/connections/CircleData';
import { UserData } from '~/types/models/auth/UserData';
import { DataModel } from '~/models/abstract/DataModel';

class CircleFactory implements IModelFactory<Circle> {
    make(data: CircleData): Circle {
        return new Circle(data);
    }
}


export class Circle extends DataModel<Circle> {
    static factory = new CircleFactory();

    dataMap = {
        name: 'name',
        color: 'color',
        users_count: 'usersCount',
        creator: (instance: Circle, data: UserData) => {
            instance.creator = User.factory.make(data);
        },
        users: (instance: Circle, data: UserData[]) => {
            instance.users = data.map((dataItem) => User.factory.make(dataItem));
        }
    };

    creator!: User;
    name!: string;
    color!: string;
    usersCount!: number;
    users!: User[];
}

