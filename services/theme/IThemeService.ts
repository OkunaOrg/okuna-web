import { ITheme } from '~/models/common/theme/ITheme';
import { BehaviorSubject } from '~/node_modules/rxjs';

export interface IThemeService {
    activeTheme: BehaviorSubject<ITheme | undefined>;


    isActiveTheme(theme: ITheme): boolean;

    getCuratedThemes(): ITheme[];

    setActiveTheme(theme: ITheme): Promise<void>;

    setRandomTheme(): Promise<void>;

    clearActiveTheme(): Promise<void>;

    bootstrapTheme(): Promise<ITheme>;
}

