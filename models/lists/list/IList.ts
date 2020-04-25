import { IUser } from '~/models/auth/user/IUser';
import { IDataModel } from '~/models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';

export interface IList extends IDataModel<IList> {
    creator: IUser;
    emoji: IEmoji;
    name: string;
    followsCount: number;
}

