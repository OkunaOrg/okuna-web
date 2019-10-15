import { IModelFactory } from '~/interfaces/IModelFactory';
import { ObservedDataModel } from '~/models/abstract/ObservedDataModel';
import { User } from '~/models/auth/User';
import { IModelData } from '~/models/abstract/DataModel';

class CircleFactory implements IModelFactory<Circle> {
    make(data: IModelData): Circle {
        return new Circle(data);
    }
}


export class Circle extends ObservedDataModel<Circle> {
    static factory = new CircleFactory();

    dataMap = {
        name: 'name',
        color: 'color',
        usersCount: 'usersCount',
        creator: (instance: Circle, data: IModelData) => {
            instance.creator = User.factory.make(data);
        },
        users: (instance: Circle, data: IModelData[]) => {
            instance.users = data.map((dataItem) => User.factory.make(dataItem));
        }
    };

    creator!: User;
    name!: string;
    color!: string;
    usersCount!: number;
    users!: User[];
}