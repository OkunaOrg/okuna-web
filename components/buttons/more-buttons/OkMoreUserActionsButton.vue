<template>
    <div role="button" tabindex="0" @click="onClicked" class="is-flex align-items-center justify-center">
        <ok-more-vertical class="is-icon-2x ok-svg-icon-primary-invert"></ok-more-vertical>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { ICategory } from "~/models/common/category/ICategory";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { IThemeService } from "~/services/theme/IThemeService";
    import { IUser } from "~/models/auth/user/IUser";
    import { IModalService } from "~/services/modal/IModalService";

    @Component({
        name: "OkMoreUserActionsButton",
        components: {},
    })
    export default class OkMoreUserActionsButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        onClicked() {
            this.modalService.openUserActionsModal({
                user: this.user
            });
        }


    }
</script>
