<template>
    <section class="is-flex">
        <ok-header></ok-header>
        <nuxt-child class="ok-has-background-primary-80 has-width-100-percent"></nuxt-child>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUser";
    import { okunaContainer } from "~/services/inversify";
    import ensureHasStoredAuthToken from "~/middleware/ensure-has-stored-auth-token";
    import OkHeader from "~/pages/home/components/header/Header.vue";
    import { IOkLogger } from "~/services/logging/types";
    import { ILoggingService } from "~/services/logging/ILogging";
    import { IUtilsService } from '~/services/utils-service/IUtilsService';

    @Component({
        components: {
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
            this.bootstrapLoggedInUser();
        }

        async bootstrapLoggedInUser() {
            try{
                const user = await this.userService.bootstrapLoggedInUser();
                this.logger.info('Bootstrapped user', user);
            } catch (e) {
                this.utilsService.handleErrorWithToast(e);
            }
        }
    }
</script>



