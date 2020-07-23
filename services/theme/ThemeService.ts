import { inject, injectable } from '~/node_modules/inversify';
import { IThemeService } from '~/services/theme/IThemeService';
import { ITheme } from '~/models/common/theme/ITheme';
import themeFactory from '~/models/common/theme/factory';
import { TYPES } from '~/services/inversify-types';
import { IStorageService } from '~/services/storage/IStorageService';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { IOkLogger } from '~/services/logging/types';
import { ILoggingService } from '~/services/logging/ILoggingService';
import { BehaviorSubject } from '~/node_modules/rxjs';
import Color from 'color';

@injectable()
export class ThemeService implements IThemeService {

    static ACTIVE_THEME_STORAGE_KEY = 'activeThemeId';

    static themes = [
        themeFactory.make({
            id: 1,
            name: 'White Gold',
            primary_color: '#ffffff',
            primary_invert_color: '#000000',
            accent_color: '#e9a039',
            accent_gradient: '#e9a039,#f0c569',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 2,
            name: 'Dark Gold',
            primary_color: '#060606',
            primary_invert_color: '#ffffff',
            accent_color: '#e9a039',
            accent_gradient: '#e9a039,#f0c569',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 3,
            name: 'Light',
            primary_color: '#ffffff',
            primary_invert_color: '#000000',
            accent_color: '#f93476',
            accent_gradient: '#ffdd00,#f93476',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 4,
            name: 'Dark',
            primary_color: '#060606',
            primary_invert_color: '#ffffff',
            accent_color: '#f93476',
            accent_gradient: '#ffdd00,#f93476',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 5,
            name: 'Light blue',
            primary_color: '#ffffff',
            primary_invert_color: '#060606',
            accent_color: '#045DE9',
            accent_gradient: '#045DE9,#7bd1e0',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 6,
            name: 'Space blue',
            primary_color: '#232323',
            primary_invert_color: '#ffffff',
            accent_color: '#045DE9',
            accent_gradient: '#045DE9,#7bd1e0',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 7,
            name: 'Light rose',
            primary_color: '#ffffff',
            primary_invert_color: '#505050',
            accent_color: '#D4418E',
            accent_gradient: '#D4418E,#ff84af',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 8,
            name: 'Space rose',
            primary_color: '#232323',
            primary_invert_color: '#ffffff',
            accent_color: '#D4418E',
            accent_gradient: '#D4418E,#ff84af',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 9,
            name: 'Light royale',
            primary_color: '#ffffff',
            primary_invert_color: '#505050',
            accent_color: '#B621FE',
            accent_gradient: '#5F0A87,#B621FE',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 10,
            name: 'Space royale',
            primary_color: '#232323',
            primary_invert_color: '#ffffff',
            accent_color: '#B621FE',
            accent_gradient: '#5F0A87,#B621FE',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 11,
            name: 'Light Cinnabar',
            primary_color: '#ffffff',
            primary_invert_color: '#505050',
            accent_color: '#F53844',
            accent_gradient: '#A71D31,#F53844',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
        themeFactory.make({
            id: 12,
            name: 'Space Cinnabar',
            primary_color: '#232323',
            primary_invert_color: '#ffffff',
            accent_color: '#F53844',
            accent_gradient: '#A71D31,#F53844',
            success_color: '#7ED321',
            success_color_invert: '#ffffff',
            error_color: '#FF3860',
            error_color_invert: '#ffffff',
            warning_color: '#ffaf34',
            warning_color_invert: '#ffffff',
            info_color: '#227cff',
            info_color_invert: '#ffffff',
        }),
    ];

    activeTheme: BehaviorSubject<ITheme | undefined> = new BehaviorSubject(undefined);

    private activeThemeStorage: IOkStorage<number>;
    private logger: IOkLogger;

    constructor(@inject(TYPES.StorageService)  storageService?: IStorageService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService,) {
        this.activeThemeStorage = storageService!.getLocalForageStorage('activeThemeStorage');
        this.logger = loggingService!.getLogger({
            name: ' ThemeService'
        });
        window['themeService'] = this;
    }

    getCuratedThemes(): ITheme[] {
        return ThemeService.themes.slice(0);
    }

    isActiveTheme(theme: ITheme): boolean {
        if (!this.activeTheme.value) return false;
        return this.activeTheme.value.id === theme.id;
    }

    setRandomTheme(): Promise<void> {
        let randomTheme = this.getRandomTheme();
        while (this.activeTheme.value == randomTheme) {
            randomTheme = this.getRandomTheme();
        }

        return this.setActiveTheme(randomTheme);
    }

    private getRandomTheme() {
        return ThemeService.themes[Math.floor(Math.random() * ThemeService.themes.length)];
    }

    async setActiveTheme(theme: ITheme): Promise<void> {
        this.activeTheme.next(theme);
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

    getColorForThemeColorType(themeColorType: OkThemeColorType): Color {
        switch (themeColorType) {
            case OkThemeColorType.primary:
                return this.activeTheme.value.primaryColor;
            case OkThemeColorType.primaryInvert:
                return this.activeTheme.value.primaryInvertColor;
            case OkThemeColorType.accent:
                return this.activeTheme.value.accent;
            case OkThemeColorType.accentGradient:
                throw Error('Accent gradient cant be converted to single Color');
            case OkThemeColorType.success:
                return this.activeTheme.value.success;
            case OkThemeColorType.successInvert:
                return this.activeTheme.value.successInvertColor;
            case OkThemeColorType.error:
                return this.activeTheme.value.error;
            case OkThemeColorType.errorInvert:
                return this.activeTheme.value.errorInvertColor;
            case OkThemeColorType.warning:
                return this.activeTheme.value.warning;
            case OkThemeColorType.warningInvert:
                return this.activeTheme.value.warningInvertColor;
            case OkThemeColorType.info:
                return this.activeTheme.value.infoColor;
            case OkThemeColorType.infoInvert:
                return this.activeTheme.value.infoInvertColor;
            case OkThemeColorType.primaryHighlight:
                return this.activeTheme.value.primaryHighlightColor;
        }
    }

    getBackgroundClassForThemeColorType(themeColorType: OkThemeColorType): string {
        switch (themeColorType) {
            case OkThemeColorType.accentGradient:
                return 'ok-has-background-accent-gradient';
            default:
                throw Error('Not implemented');
        }
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
        const defaultTheme = ThemeService.themes[0];
        await this.setActiveTheme(defaultTheme);
        return defaultTheme;
    }

    private getStoredActiveThemeId(): Promise<number | undefined> {
        return this.activeThemeStorage.get(ThemeService.ACTIVE_THEME_STORAGE_KEY);
    }

    private storeActiveThemeId() {
        return this.activeThemeStorage.set(ThemeService.ACTIVE_THEME_STORAGE_KEY, this.activeTheme.value.id);
    }

    private getThemeWithId(id: number): ITheme | undefined {
        return ThemeService.themes.find((theme) => {
            return theme.id === id;
        });
    }

    private applyActiveThemeStyles(): void {
        this.logger.info('Updating style properties');
        let styles = document.querySelector('html').style;
        styles.setProperty('--primary-color', this.activeTheme.value.primaryColor.hex());
        styles.setProperty('--primary-color-80', this.activeTheme.value.primaryColor80.hex());
        styles.setProperty('--primary-color-60', this.activeTheme.value.primaryColor60.hex());
        styles.setProperty('--primary-invert-color', this.activeTheme.value.primaryInvertColor.hex());
        styles.setProperty('--primary-invert-color-80', this.activeTheme.value.primaryInvertColor80.hsl().toString());
        styles.setProperty('--primary-invert-color-60', this.activeTheme.value.primaryInvertColor60.hsl().toString());
        styles.setProperty('--primary-highlight-color', this.activeTheme.value.primaryHighlightColor.hsl().toString());
        styles.setProperty('--accent-color', this.activeTheme.value.accentColor.hex());
        styles.setProperty('--accent-gradient-begin', this.activeTheme.value.accentGradient[0].hex());
        styles.setProperty('--accent-gradient-end', this.activeTheme.value.accentGradient[1].hex());
        styles.setProperty('--success-color', this.activeTheme.value.successColor.hex());
        styles.setProperty('--error-color', this.activeTheme.value.errorColor.hex());
        styles.setProperty('--error-color-invert', this.activeTheme.value.errorColorInvert.hex());
        styles.setProperty('--warning-color', this.activeTheme.value.warningColor.hex());
        styles.setProperty('--warning-color-invert', this.activeTheme.value.warningColorInvert.hex());
        styles.setProperty('--info-color', this.activeTheme.value.infoColor.hex());
        styles.setProperty('--info-color-invert', this.activeTheme.value.infoColorInvert.hex());
    }
}

export enum OkThemeColorType {
    primary,
    primaryInvert,
    accent,
    accentGradient,
    success,
    successInvert,
    error,
    errorInvert,
    warning,
    warningInvert,
    info,
    infoInvert,
    primaryHighlight,
}
