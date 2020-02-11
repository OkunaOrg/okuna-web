import VueRouter from 'vue-router';
import { Context } from '@nuxt/types'


export interface INavigationService {
    navigateToLogin(config?: NavigationConfig): Promise<void>;

    navigateToRegister(config?: NavigationConfig): Promise<void>;

    navigateToHome(config?: NavigationConfig): Promise<void>;

    setVueRouter(vueRouter: VueRouter): void;
}

export interface NavigationConfig {
    nuxtContext?: Context;
}
