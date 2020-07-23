<template>
    <section class="is-flex">
        <ok-modals></ok-modals>
        <ok-header></ok-header>
        <div class="ok-has-background-primary has-width-100-percent is-relative">
            <nuxt-child class="has-width-100-percent ok-has-background-primary-highlight has-height-100-percent"/>
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
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import OkModals from '~/pages/home/components/modals/OkModals.vue';

    @Component({
        components: {
            OkModals,
            OkHeader,
        },
        middleware: [
            ensureHasStoredAuthToken
        ]
    })
    export default class extends Vue {
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "OkHomePage"
            });
            this.attemptToBootstrapLoggedInUser();
        }

        async attemptToBootstrapLoggedInUser() {
            try{
                const user = await this.userService.attemptToBootstrapLoggedInUser();
                this.logger.info('Bootstrapped user', user);
            } catch (e) {
                this.utilsService.handleErrorWithToast(e);
            }
        }
    }
</script>



