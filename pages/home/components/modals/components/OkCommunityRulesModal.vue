<template>
    <div class="is-flex justify-center align-items-center">
        <div class="ok-community-rules-modal">
            <div class="ok-has-background-primary is-semi-rounded has-padding-20 ok-has-text-primary-invert">
                <div class="content">
                    <h2>
                        <span>
                            {{$t('global.snippets.community_rules')}}
                        </span>
                    </h2>
                    <ok-smart-text :text="params.community.rules"></ok-smart-text>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-community-rules-modal {
        max-width: 390px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CommunityRulesModalParams} from "~/services/modal/IModalService";
    import OkPlayStoreButton from "~/components/buttons/play-store-button/OkPlayStoreButton.vue";
    import OkAppStoreButton from "~/components/buttons/app-store-button/OkAppStoreButton.vue";
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";

    @Component({
        name: "OkCommunityRulesModal",
        components: {OkSmartText, OkAppStoreButton, OkPlayStoreButton},
    })
    export default class OkCommunityRulesModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityRulesModalParams;


    }
</script>
