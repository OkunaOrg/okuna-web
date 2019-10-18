import { IModelFactory } from 'interfaces/IModelFactory';
import { ObservedDataModel } from 'models/abstract/ObservedDataModel';
import UserData, { User } from 'models/auth/User';
import { ModelData } from 'models/abstract/DataModel';

class CircleFactory implements IModelFactory<Circle> {
    make(data: CircleData): Circle {
        return new Circle(data);
    }
}


export class Circle extends ObservedDataModel<Circle> {
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

export default interface CircleData extends ModelData {
    name: string,
    color: string,
    users_count: number,
    creator: UserData,
    users: UserData[],
}