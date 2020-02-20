import { IModelFactory } from '~/interfaces/IModelFactory';
import { CategoryData } from 'types/models-data/common/CategoryData';
import { Category } from '~/models/common/category/Category';
import { ICategory } from '~/models/common/category/ICategory';

class CategoryFactory extends IModelFactory<ICategory> {
    make(data: CategoryData): ICategory {
        return new Category(data);
    }
}

const categoryFactory = new CategoryFactory();

export default categoryFactory;
