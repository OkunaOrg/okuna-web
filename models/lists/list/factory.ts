import { IModelFactory } from '~/interfaces/IModelFactory';
import { List } from '~/models/lists/list/List';
import { IList } from '~/models/lists/list/IList';
import { ListData } from '~/types/models-data/lists/ListData';

class ListFactory extends IModelFactory<IList> {
    make(data: ListData): IList {
        return new List(data);
    }
}

const listFactory = new ListFactory();

export default listFactory;