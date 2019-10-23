export interface INavigationService {
    navigateToLogin(): Promise<void>;

    navigateToRegister(): Promise<void>;
}
