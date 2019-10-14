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

    creator: User;
    name: string;
    color: string;
    usersCount: number;
    users: User[];

    updatableDataToAttributesMap = new Map(
   );

    constructor(data: ICircleData) {
        super(data);
        this.creator = User.factory.make(data.creator);
        this.users = data.users.map((user) => User.factory.make(user));
        this.usersCount = data.users_count;
        this.color = data.color;
        this.name = data.name;
    }

    updateWithData(data: ICircleData): void {
        if(data.creator) this.creator = User.factory.make(data.creator);
        if(data.users) this.users = data.users.map((user) => User.factory.make(user));
    }
}

export interface ICircleData extends IModelData {
    creator: IUserData,
    name: string,
    color: string,
    users_count: number,
    users: IUserData[],
}