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

    creator!: User;
    name!: string;
    color!: string;
    usersCount!: number;
    users!: User[];

    constructor(data: ICircleData) {
        super(data);
    }

    getUpdatableDataToAttributesMap() {
        return {
            name: 'name',
            color: 'color',
            usersCount: 'usersCount',
            creator: {
                attribute: 'creator',
                updater(instance: Circle, dataKey: string, newDataValue: IUserData) {
                    return User.factory.make(newDataValue);
                }
            },
            users: {
                attribute: 'users',
                updater(instance: Circle, dataKey: string, newDataValue: IUserData[]) {
                    return newDataValue.map((user) => User.factory.make(user));
                }
            }
        };
    }
}

export interface ICircleData extends IModelData {
    creator: IUserData,
    name: string,
    color: string,
    users_count: number,
    users: IUserData[],
}