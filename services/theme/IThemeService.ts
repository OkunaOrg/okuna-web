import { ITheme } from '~/models/common/theme/ITheme';
import { BehaviorSubject } from '~/node_modules/rxjs';
import Color from 'color';
import { OkThemeColorType } from '~/services/theme/ThemeService';

export interface IThemeService {
    activeTheme: BehaviorSubject<ITheme | undefined>;

    isActiveTheme(theme: ITheme): boolean;

    activeThemeIsDark(): boolean;

    getCuratedThemes(): ITheme[];

    setActiveTheme(theme: ITheme): Promise<void>;

    setRandomTheme(): Promise<void>;

    clearActiveTheme(): Promise<void>;

    bootstrapTheme(): Promise<ITheme>;

    getColorForThemeColorType(themeColorType: OkThemeColorType): Color;

    getBackgroundClassForThemeColorType(themeColorType: OkThemeColorType): string;
}

