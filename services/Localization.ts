import { singleton } from '~/node_modules/tsyringe';
import { EnvironmentService } from '~/services/Environment';
import { AxiosInstance } from '~/node_modules/axios';
import VueI18n from '~/node_modules/vue-i18n';

@singleton()
export class LocalizationService {
    private vueTranslator!: typeof VueI18n.prototype.t;

    setVueTranslator(vueTranslator: typeof VueI18n.prototype.t) {
        this.vueTranslator = vueTranslator;
    }

    localize(key: string): string {
        return this.vueTranslator(key) as string;
    }
}