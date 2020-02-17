import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';

export interface IModerationReport extends IDataModel<IModerationReport> {
    description: string;
    reporter: IUser;
    category: IModerationCategory;
    created: Date;
}
