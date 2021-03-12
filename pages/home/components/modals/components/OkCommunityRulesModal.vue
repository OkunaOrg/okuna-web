<template>
    <div class="has-height-100-percent">
        <div class="ok-community-rules-modal has-height-100-percent">
            <div class="ok-has-background-primary is-semi-rounded has-padding-left-20 has-padding-top-20 has-padding-bottom-20 has-padding-right-10 ok-has-text-primary-invert has-height-100-percent">
                <div class="ok-community-rules-container has-padding-right-10 content">
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

        .ok-community-rules-container {
            overflow: scroll;
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 100%;
        }
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
