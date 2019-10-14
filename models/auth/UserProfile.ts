import { IModelData } from '~/models/abstract/Model';
import { IModelFactory } from '~/interfaces/IModelFactory';
import { IUserData, User } from '~/models/auth/User';
import { UpdatableModel } from '~/models/abstract/UpdatableModel';

class CircleFactory implements IModelFactory<Circle, ICircleData> {
    make(data: ICircleData): Circle {
        return new Circle(data);
    }
}


export class Circle extends UpdatableModel<Circle, ICircleData> {
    static factory = new CircleFactory();

    updatableDataToAttributesMap = {
        name: 'name',
        color: 'color',
        usersCount: 'usersCount',
        creator: {
            targetAttribute: 'creator',
            updater(instance: Circle, newDataValue: IUserData) {
                return User.factory.make(newDataValue);
            }
        },
        users: {
            targetAttribute: 'users',
            updater(instance: Circle, newDataValue: IUserData[]) {
                return newDataValue.map((user) => User.factory.make(user));
            }
        }
    };

    creator!: User;
    name!: string;
    color!: string;
    usersCount!: number;
    users!: User[];


    constructor(data: ICircleData) {
        super(data);
    }
}

export interface ICircleData extends IModelData {
    creator: IUserData,
    name: string,
    color: string,
    users_count: number,
    users: IUserData[],
}