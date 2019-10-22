import { inject, injectable } from '~/node_modules/inversify';
import { IThemeService } from '~/services/theme-service/IThemeService';
import { action, observable } from '~/node_modules/mobx';
import { ITheme } from '~/models/common/theme/ITheme';
import themeFactory from '~/models/common/theme/factory';
import { TYPES } from '~/services/inversify-types';
import { IStorageService } from '~/services/storage/IStorage';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import jss from 'jss';
import preset from 'jss-preset-default';
import { IOkLogger } from '~/services/logging/types';
import { ILoggingService } from '~/services/logging/ILogging';

const createGenerateId = () => {
    return (rule: any, sheet: any) => `${rule.key}`;
};

jss.setup(Object.assign(preset(), {createGenerateId}));

@injectable()
export class ThemeService implements IThemeService {

    static ACTIVE_THEME_STORAGE_KEY = 'activeThemeId';

    static themeStylesheet = {
        'ok-has-background-primary': {
            'background-color': (data: ITheme) => {
                return [data.primaryColor, '!important'];
            }
        },
        'ok-has-background-primary-highlight': {
            'background-color': (data: ITheme) => {
                return [data.primaryHighlightColor, '!important'];
            }
        },
        'ok-has-background-success': {
            'background-color': (data: ITheme) => {
                return [data.successColor, '!important'];
            }
        },
        'ok-has-background-danger': {
            'background-color': (data: ITheme) => {
                return [data.dangerColor, '!important'];
            }
        },
        'ok-has-text-primary': {
            'color': (data: ITheme) => {
                return [data.primaryTextColor, '!important'];
            }
        },
        'ok-has-text-secondary': {
            'color': (data: ITheme) => {
                return [data.secondaryTextColor, '!important'];
            }
        },
        'ok-has-text-primary-accent': {
            'background': (data: ITheme) => {
                return [`-webkit-linear-gradient(${data.primaryAccentColor})`, '!important'];
            }
        },
        'ok-has-text-danger': {
            'color': (data: ITheme) => {
                return [data.dangerColor, '!important'];
            }
        },
        'ok-has-text-danger-accent': {
            'color': (data: ITheme) => {
                return [data.dangerColorAccent, '!important'];
            }
        },
    };

    static themes = [
        themeFactory.make({
            id: 1,
            name: 'White Gold',
            primary_text_color: '#505050',
            secondary_text_color: '#676767',
            primary_color: '#ffffff',
            primary_accent_color: '#e9a039,#f0c569',
            primary_highlight_color: '#dadada',
            success_color: '#7ED321',
            success_color_accent: '#ffffff',
            danger_color: '#FF3860',
            danger_color_accent: '#ffffff',
        }),
        themeFactory.make({
            id: 2,
            name: 'Dark Gold',
            primary_text_color: '#ffffff',
            secondary_text_color: '#b3b3b3',
            primary_color: '#000000',
            primary_accent_color: '#e9a039,#f0c569',
            primary_highlight_color: '#171717',
            success_color: '#7ED321',
            success_color_accent: '#ffffff',
            danger_color: '#FF3860',
            danger_color_accent: '#ffffff',
        }),
    ];

    @observable activeTheme: ITheme | undefined;

    private activeThemeStorage: IOkStorage<number>;
    private logger: IOkLogger;

    private themeStylesheet?: any;

    constructor(@inject(TYPES.StorageService)  storageService?: IStorageService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService,) {
        this.activeThemeStorage = storageService!.getLocalForageStorage('activeThemeStorage');
        this.logger = loggingService!.getLogger({
            name: ' ThemeService'
        });
    }

    getCuratedThemes(): ITheme[] {
        return ThemeService.themes.slice(0);
    }

    isActiveTheme(theme: ITheme): boolean {
        if (!this.activeTheme) return false;
        return this.activeTheme.id === theme.id;
    }

    @action.bound
    async setActiveTheme(theme: ITheme): Promise<void> {
        this.activeTheme = theme;
        this.applyActiveThemeStyles();
        await this.storeActiveThemeId();
    }

    async clearActiveTheme(): Promise<void> {
        await this.setDefaultTheme();
    }

    bootstrapTheme(): Promise<ITheme> {
        this.logger.info('Bootstrapping theme');
        return this.bootstrapWithStoredActiveThemeId();
    }

    private async bootstrapWithStoredActiveThemeId(): Promise<ITheme> {
        const storedActiveThemeId = await this.getStoredActiveThemeId();
        if (!storedActiveThemeId) return this.setDefaultTheme();

        const theme = this.getThemeWithId(storedActiveThemeId);

        if (!theme) {
            return this.setDefaultTheme();
        }

        await this.setActiveTheme(theme);

        return theme;
    }

    private async setDefaultTheme(): Promise<ITheme> {
        const defaultTheme = ThemeService.themes[2];
        await this.setActiveTheme(defaultTheme);
        return defaultTheme;
    }

    private getStoredActiveThemeId(): Promise<number | undefined> {
        return this.activeThemeStorage.get(ThemeService.ACTIVE_THEME_STORAGE_KEY);
    }

    private storeActiveThemeId() {
        return this.activeThemeStorage.set(ThemeService.ACTIVE_THEME_STORAGE_KEY, this.activeTheme!.id);
    }

    private getThemeWithId(id: number): ITheme | undefined {
        return ThemeService.themes.find((theme) => {
            return theme.id === id;
        });
    }

    private applyActiveThemeStyles(): void {
        if (!this.themeStylesheet) {
            this.logger.info('Creating and attaching stylesheet');
            this.themeStylesheet = jss.createStyleSheet(ThemeService.themeStylesheet, {link: true});
            this.themeStylesheet.attach();
        }

        this.logger.info('Updating stylesheet');
        this.themeStylesheet.update(this.activeTheme);
    }
}