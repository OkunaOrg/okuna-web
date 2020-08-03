<template>
    <div class="is-flex justify-center align-items-center">
        <div class="ok-community-staff-modal">
            <div class="ok-has-background-primary is-semi-rounded has-padding-20 ok-has-text-primary-invert">
                <div class="content">
                    <h2>
                        <span>
                            {{$t('global.snippets.community_staff')}}
                        </span>
                    </h2>
                </div>
                <div v-if="params.community.administrators.length > 0">
                    <div class="content">
                        <h4>
                            <ok-administrator-icon class="ok-svg-icon-accent" style="top: -3px"></ok-administrator-icon>
                            <span>
                            {{$t('global.keywords.administrators')}}
                        </span>
                        </h4>
                    </div>
                    <ok-community-administrators :community="params.community"></ok-community-administrators>
                </div>
                <div v-if="params.community.moderators.length > 0">
                    <div class="content has-padding-top-20">
                        <h4>
                            <ok-moderator-icon class="ok-svg-icon-accent" style="top: -3px"></ok-moderator-icon>
                            <span>
                            {{$t('global.keywords.moderators')}}
                        </span>
                        </h4>
                    </div>
                    <ok-community-moderators :community="params.community"></ok-community-moderators>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-community-staff-modal {
        max-width: 390px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CommunityStaffModalParams, } from "~/services/modal/IModalService";
    import OkPlayStoreButton from "~/components/buttons/play-store-button/OkPlayStoreButton.vue";
    import OkAppStoreButton from "~/components/buttons/app-store-button/OkAppStoreButton.vue";
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import OkCommunityAdministrators
        from "~/pages/home/components/modals/components/community-staff/components/OkCommunityAdministrators.vue";
    import OkCommunityModerators
        from "~/pages/home/components/modals/components/community-staff/components/OkCommunityModerators.vue";

    @Component({
        name: "OkCommunityStaffModal",
        components: {
            OkCommunityModerators,
            OkCommunityAdministrators,
            OkSmartText,
            OkAppStoreButton,
            OkPlayStoreButton
        },
    })
    export default class OkCommunityStaffModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityStaffModalParams;


    }
</script>
