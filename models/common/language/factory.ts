import { IModelFactory } from '~/interfaces/IModelFactory';
import { LanguageData } from 'types/models-data/common/LanguageData';
import { Language } from '~/models/common/language/Language';
import { ILanguage } from '~/models/common/language/ILanguage';

class LanguageFactory extends IModelFactory<ILanguage> {
    make(data: LanguageData): ILanguage {
        return new Language(data);
    }
}

const languageFactory = new LanguageFactory();

export default languageFactory;
