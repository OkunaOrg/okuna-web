import { IModelFactory } from '~/interfaces/IModelFactory';
import { ITheme } from '~/models/common/theme/ITheme';
import { Theme } from '~/models/common/theme/Theme';
import { ThemeData } from '~/types/models-data/common/ThemeData';

class ThemeFactory extends IModelFactory<ITheme> {
    make(data: ThemeData): ITheme {
        return new Theme(data);
    }
}

const themeFactory = new ThemeFactory();

export default themeFactory;