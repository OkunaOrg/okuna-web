<template>
    <div class="columns is-mobile is-multiline is-variable is-1 is-marginless">
        <div class="column is-narrow">
            <button
                    class="button is-rounded ok-has-background-primary-highlight is-borderless"
                    @click="onWantsToSeeCommunityStaff"
            >
                <ok-staff-icon class="ok-svg-icon-primary-invert" style="top: -3px"></ok-staff-icon>
                <span class="has-padding-left-10 has-padding-right-10 ok-has-text-primary-invert">
                            Staff
                        </span>
            </button>
        </div>
        <div class="column is-narrow" v-if="community.rules">
            <button
                    class="button is-rounded ok-has-background-primary-highlight is-borderless"
                    @click="onWantsToSeeCommunityRules"
            >
                <ok-rules-icon class="ok-svg-icon-primary-invert" style="top: -3px"></ok-rules-icon>
                <span class="has-padding-left-10 has-padding-right-10 ok-has-text-primary-invert">
                            Rules
                        </span>
            </button>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IModalService } from '~/services/modal/IModalService';
    import { TYPES } from '~/services/inversify-types';
    import { okunaContainer } from '~/services/inversify';

    @Component({
        name: "OkCommunityProfileInfoButtons",
    })
    export default class OkCommunityProfileInfoButtons extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        
        onWantsToSeeCommunityStaff(){
            this.modalService.openCommunityStaffModal({
                community: this.community
            });
        }

        onWantsToSeeCommunityRules(){
            this.modalService.openCommunityRulesModal({
                community: this.community
            });
        }


    }
</script>



