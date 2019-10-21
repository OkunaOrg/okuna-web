import { ITheme } from '~/models/common/theme/ITheme';

export interface IThemeService {
    activeTheme: ITheme | undefined;

    isActiveTheme(theme: ITheme): boolean;

    getCuratedThemes(): ITheme[];

    setActiveTheme(theme: ITheme): Promise<void>;

    clearActiveTheme() : Promise<void>;
}

