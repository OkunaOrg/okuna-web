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
import color from 'color';

@injectable()
export class ThemeService implements IThemeService {

    static ACTIVE_THEME_STORAGE_KEY = 'activeThemeId';

    static themes = [
        themeFactory.make({
            id: 1,
            name: 'White Gold',
            primary_text_color: '#505050',
            secondary_text_color: '#676767',
            primary_color: '#ffffff',
            primary_accent_color: '#e9a039,#f0c569',
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
            success_color: '#7ED321',
            success_color_accent: '#ffffff',
            danger_color: '#FF3860',
            danger_color_accent: '#ffffff',
        }),
    ];

    @observable activeTheme: ITheme | undefined;

    private activeThemeStorage: IOkStorage<number>;

    constructor(@inject(TYPES.StorageService)  storageService?: IStorageService) {
        this.activeThemeStorage = storageService!.getLocalForageStorage('activeThemeStorage');
        jss.setup(preset());
        this.bootstrapWithStoredActiveTheme();
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
        await this.storeActiveThemeId();
    }

    private async bootstrapWithStoredActiveThemeId() {
        const storedActiveThemeId = await this.getStoredActiveThemeId();
        if (!storedActiveThemeId) return this.bootstrapWithDefaultTheme();

        const theme = this.getThemeWithId(storedActiveThemeId);

        if(!theme)
        return this.setActiveTheme(theme);
    }


    private bootstrapWithDefaultTheme(){
        const defaultTheme = ThemeService.themes[0];

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
}