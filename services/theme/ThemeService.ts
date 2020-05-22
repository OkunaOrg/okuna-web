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
    }

    getCuratedThemes(): ITheme[] {
        return ThemeService.themes.slice(0);
    }

    isActiveTheme(theme: ITheme): boolean {
        if (!this.activeTheme.value) return false;
        return this.activeTheme.value.id === theme.id;
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
