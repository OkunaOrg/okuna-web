import { singleton } from '~/node_modules/tsyringe';
import VueI18n from '~/node_modules/vue-i18n';

@singleton()
export class LocalizationService {
    private vuei18n!: VueI18n;

    setVueTranslator(vueTranslator: VueI18n) {
        this.vuei18n = vueTranslator;
    }

    localize(key: string) {
        return this.vuei18n.t(key) as string;
    }

    getActiveLocale(){
        return this.vuei18n.locale;
    }
}