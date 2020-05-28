<template>
    <section>
        Mobile
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from '~/lib/CancelableOperation';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { TYPES } from '~/services/inversify-types';
    import { okunaContainer } from '~/services/inversify';
    import { ICategory } from '~/models/common/category/ICategory';
    import { BehaviorSubject } from '~/node_modules/rxjs';
    import { IUser } from '~/models/auth/user/IUser';

    @Component({
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkMobileCommunitiesPage extends Vue {


        communitiesCategories: ICategory[] = [];

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private requestOperation?: CancelableOperation<any>;

        requestInProgress = false;

        created(){
            this.refreshCategories();
        }


        private async refreshCategories() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.getCategories());

                this.communitiesCategories = await this.requestOperation.value;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }
    }
</script>



