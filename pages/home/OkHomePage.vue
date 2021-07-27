<template>
    <section class="is-flex">
        <ok-modals></ok-modals>
        <ok-header></ok-header>
        <div class="ok-has-background-primary has-width-100-percent is-relative">
            <nuxt-child keep-alive class="has-width-100-percent ok-has-background-primary-highlight has-height-100-percent"/>
        </div>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import ensureHasStoredAuthToken from "~/middleware/ensure-has-stored-auth-token";
    import OkHeader from "~/pages/home/components/header/Header.vue";
    import { IOkLogger } from "~/services/logging/types";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import OkModals from "~/pages/home/components/modals/OkModals.vue";
    import { IStorageService } from "~/services/storage/IStorageService";
    import { IOkStorage } from "~/services/storage/lib/okuna-storage/IOkStorage";
    import { IModalService } from "~/services/modal/IModalService";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { sha256 } from "crypto-hash";
    import { AxiosError } from '~/node_modules/axios';
    import { INavigationService } from '~/services/navigation/INavigationService';

    @Component({
        components: {
            OkModals,
            OkHeader,
        },
        middleware: [
            ensureHasStoredAuthToken
        ],
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkHomePage extends Vue {
        static readonly welcomeModalWasDisplayedStorageKey = "welcomeModalWasDisplayed";

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private storageService: IStorageService = okunaContainer.get<IStorageService>(TYPES.StorageService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);

        private logger: IOkLogger;
        private storage: IOkStorage<boolean>;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChange)
        }

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "OkHomePage"
            });
            this.storage = this.storageService.getStorage("okHomePage");
            this.attemptToBootstrapLoggedInUser();
        }

        async attemptToBootstrapLoggedInUser() {
            try {
                const user = await this.userService.attemptToBootstrapLoggedInUser();
                this.logger.info("Bootstrapped user", user);
            } catch (e) {
                if (e.response) {
                    // Http response outside the 2xx range
                    e = e as AxiosError;

                    if(e.response.status === 401){
                        // Not authorized, log out.
                        await this.userService.logout();
                        await this.navigationService.navigateToLogin();
                        return;
                    }
                }

                this.utilsService.handleErrorWithToast(e);
            }
        }

        async onLoggedInUserChange(user: IUser | undefined | null) {
            if (user) {
                const userUsernameHash = await sha256(user.username);
                const welcomeModalWasDisplayed = await this.storage.get(userUsernameHash, false);

                if (!welcomeModalWasDisplayed) {
                    await this.modalService.openWelcomeToOkunaWebModal();
                    await this.storage.set(userUsernameHash, true);
                }
            }
        }
    }
</script>
